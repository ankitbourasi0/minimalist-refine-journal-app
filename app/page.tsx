
"use client"
import JournalEditor from "@/JournalEditor";
import SideNavbar from "./components/side-navbar";
import { useState } from "react";
import { LeftSideBar } from "./components/LeftSideBar";
import { Header } from "./components/Header";

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
        flex 
        ">
      <div className="  border border-gray-300" >
        <LeftSideBar />
      </div>
      <div className=" border w-1/4 border-gray-300" >

        <SideNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div>
          {activeTab === "entries" &&
            <div className="h-full flex items-center justify-center">
              <div className="flex flex-col items-center justify-center  w-1/6   text-center h-28  ">
                <p className="font-semibold text-xs">SAT</p>
                <h4 className="text-xl font-bold ">
                  30
                </h4>
              </div>

              <div className="w-5/6 p-1 space-y-1">
                <h3 className="text-sm font-semibold line-clamp-1 text-gray-700">
                  Your journal is empty. Start
                </h3>
                <p className="text-xs line-clamp-2 text-gray-500">
                  Write your first entry and it will appear here. You can also
                </p>
              </div>
            </div>
          }
          {activeTab === "media" && <div className="p-4 text-gray-700">Media Content</div>}
          {activeTab === "calendar" && <div className="p-4 text-gray-700">Calendar Content</div>}
        </div>

      </div>
      <div className="w-1/2 border border-gray-300" >
      <Header />
        <JournalEditor />

      </div>

    </div>
  );
}
