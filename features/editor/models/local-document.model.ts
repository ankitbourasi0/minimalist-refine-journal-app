import { SerializedEditorState } from "lexical";


export interface LocalDocumentRecord {
  documentId: string;
  lexicalState: SerializedEditorState;
  localRevision: number;
  serverRevision: number;
  isDirty: boolean;
  schemaVersion: number;
  createdAt: string;
  locallyUpdatedAt: string;
  serverUpdatedAt: string | null;
}