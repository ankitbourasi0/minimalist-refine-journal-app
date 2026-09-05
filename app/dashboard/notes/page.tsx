import JournalEditor from "@/JournalEditor";
import IndexedDbTest from "@/features/editor/component/IndexedDbTest";

export default function NotesPage() {
  return (
    <div className="h-full w-full overflow-y-auto">
      <JournalEditor />
      <IndexedDbTest />
    </div>
  );
}