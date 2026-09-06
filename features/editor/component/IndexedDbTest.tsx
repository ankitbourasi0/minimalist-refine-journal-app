"use client";

import { useState } from "react";

import {
    loadEditorStateLocally,
    saveEditorStateLocally,
} from "../services/editor-persistence.service";

const TEST_DOCUMENT_ID = "indexddb-test-document"

export default function IndexedDbTest() {
    const [message, setMessage] = useState<string>("Not tested yet.");
    const handleSave = async () => {
        try {
            const savedDocument = await saveEditorStateLocally(
                TEST_DOCUMENT_ID,
                {
                    root: {
                        children: [],
                        direction: null,
                        format: "",
                        indent: 0,
                        type: "root",
                        version: 1,
                    },
                }
            );

            setMessage(
                `Saved successfully. Revision: ${savedDocument.localRevision}`
            );

            console.log("Saved document:", savedDocument);
        } catch (error) {
            console.error("Failed to save:", error);
            setMessage("Failed to save.");
        }
    }


    const handleRead = async () => {
        try {
            const lexicalState =
                await loadEditorStateLocally(TEST_DOCUMENT_ID);

            if (!lexicalState) {
                setMessage("No document found.");
                return;
            }

            setMessage("Document loaded successfully.");

            console.log("Loaded Lexical state:", lexicalState);
        } catch (error) {
            console.error("Failed to load:", error);
            setMessage("Failed to load.");
        }

    }

    return (

        <div>
            <h2>IndexedDB Test</h2>

            <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSave}>
                Save Test Document
            </button>

            <button type="button" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleRead}>
                Read Test Document
            </button>

            <p>{message}</p>
        </div>
    )
}