"use client";

import React, { useState } from "react";
import { useCollection } from "@/hooks/useFirestore";
import { setDocument } from "@/firebase/firestore";
import { useToast } from "@/components/admin/Toast";
import ImagePicker from "@/components/admin/ImagePicker";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { FileText, Plus, Save, Image as ImageIcon, Edit2, X, Loader2 } from "lucide-react";

export default function PagesPage() {
  const { data: pages, loading } = useCollection("pages");
  const { showToast } = useToast();
  const [editingPage, setEditingPage] = useState<any>(null);
  const [editedSections, setEditedSections] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [imagePickerFor, setImagePickerFor] = useState<string | null>(null);
  const [newSectionName, setNewSectionName] = useState("");

  const openEditor = (page: any) => {
    setEditingPage(page);
    setEditedSections(JSON.parse(JSON.stringify(page.sections || {})));
  };

  const closeEditor = () => {
    setEditingPage(null);
    setEditedSections({});
    setNewSectionName("");
  };

  const updateSectionField = (
    sectionKey: string,
    field: string,
    value: any
  ) => {
    setEditedSections((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: value,
      },
    }));
  };

  const addSection = () => {
    if (!newSectionName.trim()) return;
    const key = newSectionName.toLowerCase().replace(/\s+/g, "-");
    setEditedSections((prev) => ({
      ...prev,
      [key]: { title: "", content: "" },
    }));
    setNewSectionName("");
  };

  const removeSection = (key: string) => {
    const newSections = { ...editedSections };
    delete newSections[key];
    setEditedSections(newSections);
  };

  const saveAll = async () => {
    if (!editingPage) return;
    setSaving(true);
    try {
      await setDocument("pages", editingPage.id, {
        ...editingPage,
        sections: editedSections,
      });
      showToast("All changes saved successfully");
    } catch {
      showToast("Failed to save changes", "error");
    } finally {
      setSaving(false);
    }
  };

  const getFieldType = (sectionKey: string, field: string): string => {
    const val = editedSections[sectionKey]?.[field];
    if (typeof val === "string" && val.length > 100) return "richtext";
    if (field === "subtitle" || field === "description" || field === "content")
      return "richtext";
    if (field.toLowerCase().includes("image") || field.toLowerCase().includes("icon") || field.toLowerCase().includes("background"))
      return "image";
    return "text";
  };

  if (editingPage) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Editing: {editingPage.name || editingPage.id}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage sections and content
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={closeEditor}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Back
            </button>
            <button
              onClick={saveAll}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Save All Changes
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(editedSections).map(([key, section]: [string, any]) => (
            <div key={key} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 capitalize">
                  Section: {key.replace(/-/g, " ")}
                </h3>
                <button
                  onClick={() => removeSection(key)}
                  className="p-1 hover:bg-red-50 rounded text-red-500"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {Object.entries(section).map(([field, value]: [string, any]) => {
                  const fieldType = getFieldType(key, field);

                  return (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {field.replace(/([A-Z])/g, " $1").trim()}
                      </label>

                      {fieldType === "image" ? (
                        <div>
                          <div
                            className="relative border border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-blue-400 transition-colors"
                            onClick={() => setImagePickerFor(`${key}.${field}`)}
                          >
                            {value ? (
                              <div className="relative group">
                                <img
                                  src={value}
                                  alt={field}
                                  className="w-full h-32 object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <span className="text-white text-sm">
                                    Click to change
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center h-32 bg-gray-50">
                                <div className="text-center text-gray-400">
                                  <ImageIcon size={24} className="mx-auto mb-1" />
                                  <span className="text-sm">Click to select image</span>
                                </div>
                              </div>
                            )}
                          </div>
                          {value && (
                            <button
                              onClick={() =>
                                updateSectionField(key, field, "")
                              }
                              className="text-xs text-red-500 mt-1 hover:text-red-600"
                            >
                              Remove image
                            </button>
                          )}
                        </div>
                      ) : fieldType === "richtext" ? (
                        <RichTextEditor
                          value={value || ""}
                          onChange={(v) => updateSectionField(key, field, v)}
                          placeholder={`Enter ${field}...`}
                        />
                      ) : (
                        <input
                          type="text"
                          value={value || ""}
                          onChange={(e) =>
                            updateSectionField(key, field, e.target.value)
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
                          placeholder={`Enter ${field}...`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Add New Section
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              placeholder="Section name (e.g., Team, Gallery)"
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
            />
            <button
              onClick={addSection}
              disabled={!newSectionName.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 disabled:opacity-50 transition-colors"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
        </div>

        {imagePickerFor && (
          <ImagePicker
            selected={
              (() => {
                const [sk, fk] = imagePickerFor.split(".");
                return editedSections[sk]?.[fk];
              })()
            }
            onSelect={(url) => {
              const [sk, fk] = imagePickerFor.split(".");
              updateSectionField(sk, fk, url);
              setImagePickerFor(null);
            }}
            onClose={() => setImagePickerFor(null)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Pages</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage website page content
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      ) : pages.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No pages found</p>
          <p className="text-sm text-gray-400 mt-1">
            Add pages to the &quot;pages&quot; collection in Firestore
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {pages.map((page: any) => (
            <div
              key={page.id}
              className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FileText size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {page.name || page.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {page.sections
                      ? Object.keys(page.sections).length
                      : 0}{" "}
                    sections
                    {page.lastUpdated?.toMillis && (
                      <> &middot; Updated {formatTimestamp(page.lastUpdated)}</>
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={() => openEditor(page)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit2 size={16} />
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatTimestamp(date: any) {
  if (!date?.toMillis) return "-";
  const diff = Date.now() - date.toMillis();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}
