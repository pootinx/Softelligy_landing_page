"use client";

import React, { useState } from "react";
import { useCollection } from "@/hooks/useFirestore";
import { addDocument, updateDocument } from "@/firebase/firestore";
import { useToast } from "@/components/admin/Toast";
import { Type, Edit2, Plus, Save, X, Loader2 } from "lucide-react";

interface ContentForm {
  key: string;
  value: string;
  type: string;
}

const emptyForm: ContentForm = { key: "", value: "", type: "text" };

export default function ContentBlocksPage() {
  const { data: contentBlocks, loading } = useCollection("content");
  const { showToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ContentForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (block: any) => {
    setForm({ key: block.key, value: block.value, type: block.type || "text" });
    setEditingId(block.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!form.key.trim() || !form.value.trim()) {
      showToast("Key and value are required", "error");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateDocument("content", editingId, form);
        showToast("Content block updated");
      } else {
        await addDocument("content", form);
        showToast("Content block added");
      }
      closeForm();
    } catch {
      showToast("Failed to save content block", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Content Blocks</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage reusable content (phone, email, address, etc.)
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add Content Block
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      ) : contentBlocks.length === 0 && !showForm ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Type size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No content blocks yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Add content blocks like phone numbers, email addresses, etc.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-medium">Key</th>
                  <th className="p-4 font-medium">Value</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contentBlocks.map((block: any) => (
                  <tr
                    key={block.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4 font-medium text-gray-800">
                      {block.key}
                    </td>
                    <td className="p-4 text-gray-600 max-w-xs truncate">
                      {block.value}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                        {block.type || "text"}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => openEdit(block)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                      >
                        <Edit2 size={14} />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingId ? "Edit Content Block" : "Add Content Block"}
              </h3>
              <button
                onClick={closeForm}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key
                </label>
                <input
                  type="text"
                  value={form.key}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, key: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
                  placeholder="e.g., company-phone"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Value
                </label>
                <textarea
                  value={form.value}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, value: e.target.value }))
                  }
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800 resize-none"
                  placeholder="Enter value..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
                >
                  <option value="text">Text</option>
                  <option value="url">URL</option>
                  <option value="email">Email</option>
                  <option value="number">Number</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={closeForm}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {saving ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  {editingId ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
