"use client"
import { usePathname } from "next/navigation";
import DashboardAppbar from "../components/DashboardAppbar";
import JournalCard from "../components/JournalCard";
import Calendar from "../components/Calendar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const pathName = usePathname()
  return (
    
    <div className="flex flex-1 w-full h-screen min-w-0 overflow-hidden">

      <aside className="w-[380px] shrink-0 border-r border-gray-300 flex flex-col bg-white">
        <DashboardAppbar />

        <div className="flex-1 overflow-y-auto">
         {pathName === "/dashboard/notes" && (<JournalCard />) }
         {pathName === "/dashboard/media" && (<JournalCard />) }

         {pathName === "/dashboard/calendar" && (<Calendar />) }

          
         
        </div>
      </aside>

      <main className="flex-1 min-w-0 h-screen overflow-hidden">
        {children}
      </main>

    </div>
  );
}