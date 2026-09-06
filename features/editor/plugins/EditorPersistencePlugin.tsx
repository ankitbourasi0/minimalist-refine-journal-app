"use client";

import { useCallback, useEffect, useRef } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import {
    loadEditorStateLocally,
    saveEditorStateLocally,
} from "../services/editor-persistence.service";
import { EditorState } from 'lexical';

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
    const latestEditorStateRef = useRef<EditorState | null>(null);
    const isRestoredRef = useRef(false);

    const isRestoringRef = useRef(false);

    const saveState  = useCallback(async () => {
        const editorState= latestEditorStateRef.current;
        if (!editorState || !isRestoredRef.current) {
            return;
        }
        try {
            const serializedEditorState = editorState.toJSON();

                        console.log(
                            "Attempting IndexedDB save:",
                            serializedEditorState
                        );

                       await saveEditorStateLocally(
                            documentId,
                            serializedEditorState
                        );

                        console.log(
                            "IndexedDB save successful:",
                            documentId
                        );
                    } catch (error) {
                        console.error(
                            "Failed to save Lexical editor state locally:",
                            error
                        );
                    }
                },[documentId]
            )


    useEffect(() => {

        let isCancelled = false;
        isRestoredRef.current = false;
        latestEditorStateRef.current = null;

        async function restoreDocument() {
              try {
          
                const storedLexicalState = await loadEditorStateLocally(documentId);

                if (isCancelled) {
                    return;
                }

                if (storedLexicalState) {
                    const children = storedLexicalState?.root?.children;
                    if(Array.isArray(children) && children.length > 0) {
                        
                    const parsedEditorState = editor.parseEditorState(JSON.stringify(storedLexicalState));

                    editor.setEditorState(parsedEditorState, { tag: "local-restore" });

                    console.log("Lexical document restored from IndexedDB:", documentId);

                    
                } else {
                    console.log(
                         "Stored Lexical document is empty. Restore skipped:",
                        documentId
                    );
                }
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
                 latestEditorStateRef.current = editorState;

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

                saveTimeRef.current = setTimeout( ()=>{
                    void saveState();
                    saveTimeRef.current = null;

                }, debounceMilliseconds);
            }
        );

        const handlePageHide = ()=>{
            if (saveTimeRef.current) {
            clearTimeout(saveTimeRef.current)
            saveTimeRef.current = null
            }    
            void saveState();

        }

        window.addEventListener("pagehide", handlePageHide);



        return () => {

            isCancelled = true;
               
            unregisterUpdateListener();
window.removeEventListener("pagehide", handlePageHide);
            if (saveTimeRef.current) {
                clearTimeout(saveTimeRef.current)
                saveTimeRef.current = null
            }

            void saveState();
        };
    }, [documentId, debounceMilliseconds, editor, saveState]);

    return null;
}

export default EditorPersistencePlugin