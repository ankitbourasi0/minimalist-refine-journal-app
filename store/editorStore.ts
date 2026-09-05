interface EditorStore {
    documentId: string | null;
    syncState: "idle" | "saving-local" | "syncing" | "synced" | "offline" | "error";
    isDirty: boolean;
    localVersion: number;
    serverVersion: number;
    lastSavedAt: string | null;
    pendinChange: number;
}