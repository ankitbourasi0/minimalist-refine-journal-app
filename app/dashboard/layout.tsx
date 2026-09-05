import DashboardAppbar from "../components/DashboardAppbar";
import JournalCard from "../components/JournalCard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 w-full h-screen min-w-0 overflow-hidden">

      <aside className="w-[380px] shrink-0 border-r border-gray-300 flex flex-col bg-white">
        <DashboardAppbar />

        <div className="flex-1 overflow-y-auto">
          <JournalCard />
          <JournalCard />
          <JournalCard />
        </div>
      </aside>

      <main className="flex-1 min-w-0 h-screen overflow-hidden">
        {children}
      </main>

    </div>
  );
}