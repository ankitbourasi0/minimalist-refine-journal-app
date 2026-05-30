
"use client"
import JournalEditor from "@/JournalEditor";
import SideNavbar from "./components/side-navbar";
import { useState } from "react";

export default function Home() {
    const [activeTab, setActiveTab] = useState("entries");



  return (
    <div
      className="
        min-h-screen 
        bg-white
        rounded-2xl 
        shadow-2xl 
        shadow-gray-500  
        border-gray-800 
        flex justify-between
        ">
      <div className="w-1/4 border border-gray-300" >

        <SideNavbar activeTab={activeTab} setActiveTab={setActiveTab}/>
        <div>
        {activeTab === "entries" && <div className="p-4 text-gray-700">Entries Content</div>}
        {activeTab === "media" && <div className="p-4 text-gray-700">Media Content</div>}
        {activeTab === "calendar" && <div className="p-4 text-gray-700">Calendar Content</div>}
        </div>

      </div>
      <div className="w-1/2 border border-gray-300" >
        <JournalEditor />

      </div>
      <div className="w-1/4   border border-gray-300" >
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Your Journal</h1>
      </div>
    </div>
  );
}
