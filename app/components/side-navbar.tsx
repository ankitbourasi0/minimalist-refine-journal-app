"use client"
import { CalendarDays, Image, PanelRightOpen, Search, TableOfContents } from 'lucide-react'
import React, { useState } from 'react'

const styles = {
    cornerButton: ' border-0 p-2 hover:bg-gray-100 rounded-lg ',
    midButton: ' border-t-0  border-l-0 border-b-0  p-3  '
}
const SideNavbar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {

    return (
        // Navbar Container 
        <div className="appbar w-full h-16  p-4 flex justify-between items-center  bg-white shadow-sm">
            {/*  Left corner button */}
            <div className="flex items-center w-1/4 ">
                <button className={styles.cornerButton}>
                    <PanelRightOpen className=" w-[18px] h-[18px]" />
                </button>
            </div>

            {/*  Middle buttons */}
            <div className="flex  items-center  ">
                <button className={`${styles.midButton} ${activeTab === "entries" ? "bg-blue-500 text-white" : "bg-gray-100 "} rounded-l-xl`} onClick={() => setActiveTab("entries")}>
                    <TableOfContents className="w-[18px] h-[18px]" />
                </button>

                <button className={`${styles.midButton} ${activeTab === "media" ? "bg-blue-500 text-white" : "bg-gray-100 "} rounded-none`} onClick={() => setActiveTab("media")}>
                    <Image className="w-[18px] h-[18px]" />
                </button>

                <button className={`${styles.midButton} ${activeTab === "calendar" ? "bg-blue-500 text-white" : "bg-gray-100 "} rounded-r-xl `} onClick={() => setActiveTab("calendar")}>
                    <CalendarDays className="w-[18px] h-[18px]" />
                </button>
            </div>

            {/*  Right corner button */}
            <div className="flex items-center justify-end w-1/4 ">
                <button className={styles.cornerButton}>
                    <Search className="w-[18px] h-[18px]" />
                </button>
            </div>


        </div>
    )
}

export default SideNavbar