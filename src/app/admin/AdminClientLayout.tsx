"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  LayoutDashboard,
  FileText,
  Image,
  Blocks,
  Settings,
  LogOut,
  Building2,
  Users,
  DollarSign,
  Wrench,
  Menu,
  X,
} from "lucide-react";

export default function AdminClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    });
    return () => unsubscribe();
  }, [pathname, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="bg-white rounded-xl p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user && pathname !== "/admin/login") {
    return null;
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard, color: "text-indigo-500" },
    { name: "Pages", href: "/admin/pages", icon: FileText, color: "text-blue-500" },
    { name: "Images", href: "/admin/images", icon: Image, color: "text-green-500" },
    { name: "Content", href: "/admin/content", icon: Blocks, color: "text-purple-500" },
    { name: "Résidences", href: "/admin/residences", icon: Building2, color: "text-amber-500" },
    { name: "Locataires", href: "/admin/locataires", icon: Users, color: "text-emerald-500" },
    { name: "Paiements", href: "/admin/paiements", icon: DollarSign, color: "text-rose-500" },
    { name: "Maintenances", href: "/admin/maintenances", icon: Wrench, color: "text-orange-500" },
    { name: "Settings", href: "/admin/settings", icon: Settings, color: "text-gray-500" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-72" : "w-20"
        } bg-white shadow-2xl flex flex-col transition-all duration-300 ease-in-out`}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className={`flex items-center space-x-3 ${!sidebarOpen && "justify-center w-full"}`}>
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-white text-xl">🏢</span>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Softelligy Admin
                </h1>
                <p className="text-xs text-gray-400">Gestion des résidences</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } ${!sidebarOpen && "justify-center"}`}
              >
                <item.icon
                  size={20}
                  className={`transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? item.color : "text-gray-400"
                  }`}
                />
                {sidebarOpen && (
                  <>
                    <span className="font-medium flex-1">{item.name}</span>
                    {isActive && (
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className={`flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group ${
              !sidebarOpen && "justify-center"
            }`}
          >
            <LogOut size={20} className="transition-transform duration-200 group-hover:scale-110" />
            {sidebarOpen && <span className="font-medium">Déconnexion</span>}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {menuItems.find((item) => item.href === pathname)?.name || "Admin"}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Bienvenue, {user?.email || "Admin"}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  {user?.email?.charAt(0).toUpperCase() || "A"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}