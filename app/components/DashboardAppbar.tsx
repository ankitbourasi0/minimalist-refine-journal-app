"use client"
import { CalendarDays, Image, PanelRightOpen, Search, TableOfContents } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const styles = {
    cornerButton: ' border-0 p-2 hover:bg-gray-100 rounded-lg ',
    midButton: ' border-t-0  border-l-0 border-b-0  p-3  '
}
const DashboardAppbar = () => {
    const pathName = usePathname() //get current url
    return (
        // Navbar Container 
        <div className="appbar w-full h-16  p-4 flex justify-between items-center  bg-white border-b-1">
            {/*  Left corner button */}
            <div className="flex items-center w-1/4 ">
                <button  className={styles.cornerButton}>
                    <PanelRightOpen className=" w-[18px] h-[18px]" />
                </button>
            </div>

            {/*  Middle buttons */}
            <div className="flex  items-center  ">
                <Link href="/dashboard/notes" className={`${styles.midButton} ${pathName.includes("/notes")  ? "bg-blue-500 text-white" : "bg-gray-100 "} rounded-l-xl`} >
                    <TableOfContents className="w-[18px] h-[18px]" />
                </Link>
        
                <Link href="/dashboard/media" className={`${styles.midButton} ${pathName.includes("/media") ? "bg-blue-500 text-white" : "bg-gray-100 "} rounded-none`} >
                    <Image className="w-[18px] h-[18px]" />
                </Link>

                <Link href="/dashboard/calendar" className={`${styles.midButton} ${pathName.includes("/calendar") ? "bg-blue-500 text-white" : "bg-gray-100 "} rounded-r-xl `} >
                    <CalendarDays className="w-[18px] h-[18px]" />
                </Link>
            </div>

            {/*  Right corner button */}
            <div className="flex items-center justify-end w-1/4 ">
                <Link href="/dashboard/search" className={styles.cornerButton}>
                    <Search className="w-[18px] h-[18px]" />
                </Link>
            </div>


        </div>
    )
}

export default DashboardAppbar