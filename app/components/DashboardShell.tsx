import React from "react";
import DashboardAppbar from "./DashboardAppbar";

interface DashboardShellProps {
  listContent: React.ReactNode; // Column 2 ke andar ki list (Jaise Notes list, Media list, etc.)
  children: React.ReactNode;     // Column 3 ka main content (Jaise Editor, Overview, etc.)
}

export default function DashboardShell({ listContent, children }: DashboardShellProps) {
  return (
    <>
      {/* Column 2: Appbar aur uske niche ki dynamic list */}
      <div className="w-1/4 border-r border-gray-300 flex flex-col h-screen">
        <DashboardAppbar />
        <div className="flex-1 overflow-y-auto p-2">
          {listContent}
        </div>
      </div>

      {/* Column 3: Main Content */}
      <div className="flex-1 h-screen overflow-y-auto bg-white">
        {children}
      </div>
    </>
  );
}