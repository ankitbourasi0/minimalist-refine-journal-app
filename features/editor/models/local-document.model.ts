export interface LocalDocumentRecord {
  documentId: string;
  lexicalState: object;
  localRevision: number;
  serverRevision: number;
  isDirty: boolean;
  schemaVersion: number;
  createdAt: string;
  locallyUpdatedAt: string;
  serverUpdatedAt: string | null;
}