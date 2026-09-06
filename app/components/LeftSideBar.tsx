"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  BookMarked,
  CheckSquare2,
  BookMarked as Note,
  Lightbulb,
  Cog,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Journal", href: "/journal", icon: BookMarked },
  { name: "Tasks", href: "/tasks", icon: CheckSquare2 },
  { name: "Notes", href: "/notes", icon: Note },
  { name: "Insights", href: "/insights", icon: Lightbulb },
  { name: "Settings", href: "/settings", icon: Cog },
];

export function LeftSideBar() {
  const pathname = usePathname();

  const isRouteActive = (href: string) => {
    if (href === "/dashboard")
      return pathname === "/dashboard" || pathname.startsWith("/dashboard/");

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="sticky top-0 h-screen w-64 shrink-0 border-r border-gray-200 bg-white">
      <div className="flex h-full flex-col px-4 py-6">

        <div className="mb-8 flex items-center gap-3 px-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg">
            <Image
              src="/images/refine-logo.png"
              alt="Refine logo"
              width={40}
              height={40}
              priority
            />
          </div>

          <span className="text-xl font-semibold text-sidebar-foreground">
            Refine
          </span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = isRouteActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

      </div>
    </aside>
  );
}