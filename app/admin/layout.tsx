"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menu = [
    {
      name: "Dashboard",
      href: "/admin",
    },
    {
      name: "Schools",
      href: "/admin/schools",
    },
    {
      name: "Students",
      href: "/admin/students",
    },
    {
      name: "Users",
      href: "/admin/users",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080910] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-[#121622] border-r border-[#1e2536] p-5">
        <h1 className="text-2xl font-bold text-[#9E7C2F] mb-10">Admin Panel</h1>

        <nav className="space-y-2">
          {menu.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  block
                  px-4
                  py-3
                  rounded-xl
                  transition
                  ${
                    active
                      ? "bg-[#9E7C2F] text-black font-bold"
                      : "text-gray-300 hover:bg-[#181e2b]"
                  }
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
