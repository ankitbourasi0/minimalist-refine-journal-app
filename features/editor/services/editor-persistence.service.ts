import { SerializedEditorState } from "lexical";
import {getLocalDocument,saveLocalDocument } from "../database/document.repository"
import type {LocalDocumentRecord} from  "../models/local-document.model"

export async function saveEditorStateLocally( documentId: string, lexicalState: SerializedEditorState): Promise<LocalDocumentRecord> {
    const now = new Date().toISOString();

    const existingDocument = await getLocalDocument(documentId);

    const documentToSave: LocalDocumentRecord = {
        documentId,
        lexicalState,
        localRevision: existingDocument ? existingDocument.localRevision + 1 : 1,
        serverRevision: existingDocument ? existingDocument.serverRevision : 0,
        isDirty: true,
        schemaVersion: existingDocument ? existingDocument.schemaVersion : 1,
        createdAt: existingDocument ? existingDocument.createdAt : now,
        locallyUpdatedAt: now,
        serverUpdatedAt: existingDocument ? existingDocument.serverUpdatedAt : null,
    }

    await saveLocalDocument(documentToSave);

    return documentToSave;
} 

export async function loadEditorStateLocally(documentId: string): Promise<SerializedEditorState | null> {
    const existingDocument = await getLocalDocument(documentId);
    return existingDocument ? existingDocument.lexicalState : null;
}