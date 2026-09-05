"use client";

import { useEffect, useRef } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import {
    loadEditorStateLocally,
    saveEditorStateLocally,
} from "../services/editor-persistence.service";

interface EditorPersistencePluginProps {
    documentId: string;
    debounceMilliseconds?: number;
}

/*
Lexical editor changes
        ↓
registerUpdateListener runs
        ↓
Wait 500 milliseconds
        ↓
Convert EditorState to JSON
        ↓
Save JSON through the persistence service
        ↓
Persistence service saves it in IndexedDB
*/
function EditorPersistencePlugin({
    documentId, debounceMilliseconds = 500
}: EditorPersistencePluginProps) {

    const [editor] = useLexicalComposerContext();

    const saveTimeRef = useRef<ReturnType<typeof setTimeout> | null>(
        null
    );

    const isRestoredRef = useRef(false);
    const isRestoringRef = useRef(false);

    useEffect(() => {

        let isCancelled = false;
        isRestoredRef.current = false;
        async function restoreDocument() {
            if (isRestoringRef.current) {
                return;
            }

            isRestoringRef.current = true;

            try {
                const storedLexicalState = await loadEditorStateLocally(documentId);

                if (isCancelled) {
                    return;
                }

                if (storedLexicalState) {
                    const parsedEditorState = editor.parseEditorState(JSON.stringify(storedLexicalState));
                    editor.setEditorState(parsedEditorState, { tag: "local-restore" });

                    console.log("Lexical document restored from IndexedDB:", documentId);
                } else {
                    console.log(
                        "No local Lexical document found:",
                        documentId
                    );
                }
            } catch (error) {
                console.error(
                    "Failed to restore Lexical document:",
                    error
                );
            } finally {
                if (!isCancelled) {
                    isRestoredRef.current = true;
                }

                isRestoringRef.current = false;
            }

        }

        void restoreDocument();


        //registerUpdateListener() is the appropriate mechanism for observing editor-state changes. 
        //The editor state can then be serialized using editorState.toJSON().
        const unregisterUpdateListener = editor.registerUpdateListener(
            ({ editorState, dirtyElements, dirtyLeaves, tags }) => {


                /*
          * Do not save anything until the initial IndexedDB restoration
          * has finished.
          */
                if (!isRestoredRef.current) {
                    return;
                }

                /*
         * Do not save the programmatic restoration itself.
         */
                if (tags.has("local-restore")) {
                    return;
                }
                const editorContentChanged = dirtyElements.size > 0 || dirtyLeaves.size > 0;

                if (!editorContentChanged) {
                    return;
                }

                /*
                The timer resets whenever the user types again.
    
    For example:
    
    User types at 10 ms
    Timer starts
    
    User types again at 200 ms
    Old timer is cancelled
    New timer starts
    
    User stops typing
    After 500 ms, the document is saved
                */
                if (saveTimeRef.current) {
                    clearTimeout(saveTimeRef.current)
                }

                saveTimeRef.current = setTimeout(async () => {
                    try {
                        const serializedEditorState = editorState.toJSON();

                        console.log(
                            "Attempting IndexedDB save:",
                            serializedEditorState
                        );

                        const savedDocument = await saveEditorStateLocally(
                            documentId,
                            serializedEditorState
                        );

                        console.log(
                            "IndexedDB save successful:",
                            savedDocument
                        );
                    } catch (error) {
                        console.error(
                            "Failed to save Lexical editor state locally:",
                            error
                        );
                    }
                }, debounceMilliseconds);
            }
        );


        return () => {

            isCancelled = true;
               
            unregisterUpdateListener();

            if (saveTimeRef.current) {
                clearTimeout(saveTimeRef.current)
                saveTimeRef.current = null
            }
        };
    }, [documentId, debounceMilliseconds, editor])

    return null;
}

export default EditorPersistencePlugin