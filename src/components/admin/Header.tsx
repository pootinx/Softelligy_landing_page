"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import { logout } from "@/firebase/auth";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
      </div>
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-gray-500">{user.email}</span>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}
