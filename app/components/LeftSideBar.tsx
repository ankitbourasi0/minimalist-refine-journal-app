"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Home, BookMarked, CheckSquare2, BookMarked as Note, Lightbulb, Cog } from "lucide-react"


const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Journal", href: "/journal", icon: BookMarked },
    { name: "Tasks", href: "/tasks", icon: CheckSquare2 },
    { name: "Notes", href: "/notes", icon: Note },
    { name: "Insights", href: "/insights", icon: Lightbulb },
    { name: "Settings", href: "/settings", icon: Cog },
]

export function LeftSideBar() {
    const pathname = usePathname()

    return (
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="  h-screen w-64 border-r-1 border-sidebar-border bg-sidebar"
        >
            <div className="flex h-full flex-col px-4 py-6">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 flex items-center gap-3 px-3"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg">
                        <Image
                            src="/images/refine-logo.png"
                            alt="Refine logo"
                            width={40}
                            height={40}
                            priority
                        />
                    </div>
                    <span className="text-xl font-semibold text-sidebar-foreground">Refine</span>
                </motion.div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.href
                        return (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * (index + 1) }}
                            >
                                <Link
                                    href={item.href}
                                    className={`
                    flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 
                    ${isActive
                                            ? "bg-primary/15 text-primary"
                                            : "text-muted-foreground hover:text-foreground"
                                        }
                  `}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                </Link>
                            </motion.div>
                        )
                    })}
                </nav>
            </div>
        </motion.aside>
    )
}
