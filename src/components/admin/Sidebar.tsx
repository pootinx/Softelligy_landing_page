"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Image,
  Type,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
  Building,
  Activity,
  Layout,
  Globe,
  MessageSquare
} from "lucide-react";
import { logout } from "@/firebase/auth";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero", label: "Hero Section", icon: Image },
  { href: "/admin/stats", label: "Stats Section", icon: Activity },
  { href: "/admin/consultations", label: "Consultations", icon: MessageSquare },
  { href: "/admin/services", label: "Services", icon: Settings },
  { href: "/admin/staff", label: "Staff", icon: Users },
  { href: "/admin/residences", label: "Residences", icon: Building },
  { href: "/admin/platform", label: "Platform Section", icon: Layout },
  { href: "/admin/navbar", label: "Navbar Section", icon: Layout },
  { href: "/admin/footer", label: "Footer Section", icon: Globe },
  { href: "/admin/logs", label: "Audit Logs", icon: FileText },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/images", label: "Images", icon: Image },
  { href: "/admin/content", label: "Content Blocks", icon: Type },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white flex flex-col transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white w-full transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
