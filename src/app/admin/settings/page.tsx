"use client";

import React, { useState } from "react";
import { changePassword } from "@/firebase/auth";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { getFirebaseApp } from "@/firebase/config";
import { useToast } from "@/components/admin/Toast";
import { useAuth } from "@/context/AuthContext";
import { Key, Download, Trash2, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const { showToast } = useToast();
  const { user } = useAuth();
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [changingPassword, setChangingPassword] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      showToast("Passwords do not match", "error");
      return;
    }
    if (passwordForm.new.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }
    setChangingPassword(true);
    try {
      await changePassword(passwordForm.current, passwordForm.new);
      showToast("Password changed successfully");
      setPasswordForm({ current: "", new: "", confirm: "" });
    } catch (err: any) {
      showToast(
        err.message || "Failed to change password",
        "error"
      );
    } finally {
      setChangingPassword(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const collections = ["pages", "images", "content"];
      const data: Record<string, any[]> = {};
      const firestore = getFirestore(getFirebaseApp());

      for (const name of collections) {
        const snapshot = await getDocs(collection(firestore, name));
        data[name] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      }

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `syndic-backup-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Data exported successfully");
    } catch {
      showToast("Failed to export data", "error");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your admin settings
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Admin Account
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Logged in as: {user?.email}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Key size={20} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Change Password
            </h2>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={passwordForm.current}
              onChange={(e) =>
                setPasswordForm((p) => ({ ...p, current: e.target.value }))
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={passwordForm.new}
              onChange={(e) =>
                setPasswordForm((p) => ({ ...p, new: e.target.value }))
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordForm.confirm}
              onChange={(e) =>
                setPasswordForm((p) => ({ ...p, confirm: e.target.value }))
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
              required
            />
          </div>
          <button
            type="submit"
            disabled={changingPassword}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {changingPassword ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Key size={16} />
            )}
            Change Password
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-50 rounded-lg">
            <Download size={20} className="text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Backup</h2>
            <p className="text-sm text-gray-500">
              Export all content as JSON
            </p>
          </div>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          {exporting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Download size={16} />
          )}
          Export Data
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-50 rounded-lg">
            <Trash2 size={20} className="text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Cache</h2>
            <p className="text-sm text-gray-500">
              Clear local cached data
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              localStorage.clear();
              sessionStorage.clear();
            }
            showToast("Cache cleared");
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
        >
          <Trash2 size={16} />
          Clear Cache
        </button>
      </div>
    </div>
  );
}
