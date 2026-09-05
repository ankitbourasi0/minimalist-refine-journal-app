import type { LocalDocumentRecord } from "../models/local-document.model";
import { getEditorDatabase } from "./editor-database";


export async function getLocalDocument(documentId: string): Promise<LocalDocumentRecord | undefined> {
    const database = getEditorDatabase()

    return database.documents.get(documentId);
}
export async function saveLocalDocument(document: LocalDocumentRecord):Promise<string> {
    const database = getEditorDatabase()
    return database.documents.put(document);


}