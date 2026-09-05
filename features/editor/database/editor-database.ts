import Dexie, {type Table } from "dexie";
import type  { LocalDocumentRecord } from "../models/local-document.model";

class EditorDatabase extends Dexie {
    documents!: Table<LocalDocumentRecord, string>

    constructor() {
        super("lexical-editor-database");
        this.version(1).stores({
            documents: "documentId, localRevision, serverRevision, isDirty, locallyUpdatedAt"
        });
    }
}


let databaseInstance: EditorDatabase | null = null;
// Singleton pattern to ensure only one database instance is used.
export function getEditorDatabase(): EditorDatabase{
    if(typeof window === "undefined"){
        throw new Error("EditorDatabase can only be used in a browser");
    }

    if(!databaseInstance){
        databaseInstance = new EditorDatabase();
    }
    return databaseInstance;
}