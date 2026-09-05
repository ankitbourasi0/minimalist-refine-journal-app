
"use client";
import React, { useEffect, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { loadEditorStateLocally } from "../services/editor-persistence.service";

interface EditorLocalRestorePluginProps {
    documentId: string;
}

/*
Editor opens
    ↓
Load test-document from IndexedDB
    ↓
Read lexicalState
    ↓
Parse the JSON into a Lexical EditorState
    ↓
Replace the empty editor state*/
function EditorLocalRestorePlugin({ documentId }: EditorLocalRestorePluginProps) {
    const [editor] = useLexicalComposerContext();
    const restoreDocumentRef = useRef<string | null>(null);

    useEffect(() => {
        if (restoreDocumentRef.current === documentId) {
            return;
        }
        let isCancelled = false;

        async function restoreLocalDocument() {
            try {
                const storeLexicalState = await loadEditorStateLocally(documentId)

                if (isCancelled) {
                    return;
                }
                restoreDocumentRef.current = documentId;

                if (!storeLexicalState) {
                    console.log("No document found in IndexedDB for documentId:", documentId);
                    return;
                }
                // converts the stored JSON into a real Lexical editor state:
                const parsedEditorState = editor.parseEditorState(JSON.stringify(storeLexicalState));
                //applies it to the editor:
                editor.setEditorState(parsedEditorState, { tag: "local-restore" });
                // The tag tells the persistence plugin:
                // This update is restoration, not user typing.
                // Do not save it as a new revision.
                
                
                console.log(
                    "Lexical document restored from IndexedDB:",
                    documentId
                );
            } catch (error) {
                console.error(
                    "Failed to restore Lexical document:",
                    error
                );
            }
        }
        void restoreLocalDocument();

        return () => {
            isCancelled = true;
        }
    }, [documentId, editor])

    return null
}

export default EditorLocalRestorePlugin