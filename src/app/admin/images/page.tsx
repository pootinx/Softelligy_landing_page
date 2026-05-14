"use client";

import React, { useState } from "react";
import { useCollection } from "@/hooks/useFirestore";
import { deleteImage } from "@/firebase/storage";
import { useToast } from "@/components/admin/Toast";
import ImageUpload from "@/components/admin/ImageUpload";
import { Image, Trash2, Copy, Check, Upload, X } from "lucide-react";

export default function ImagesPage() {
  const { data: images, loading, remove } = useCollection("images");
  const { showToast } = useToast();
  const [showUpload, setShowUpload] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleCopyUrl = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      showToast("URL copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      showToast("Failed to copy URL", "error");
    }
  };

  const handleDelete = async (img: any) => {
    try {
      await deleteImage(img.url);
      await remove(img.id);
      showToast("Image deleted");
      setDeleteConfirm(null);
    } catch {
      showToast("Failed to delete image", "error");
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (date: any) => {
    if (!date) return "-";
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Images</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your media library
          </p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          <Upload size={16} />
          Upload Image
        </button>
      </div>

      {showUpload && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Upload New Image</h3>
            <button
              onClick={() => setShowUpload(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X size={18} />
            </button>
          </div>
          <ImageUpload
            onUploadComplete={() => {
              setShowUpload(false);
              showToast("Image uploaded successfully");
            }}
          />
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      ) : images.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Image size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No images uploaded yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Click &quot;Upload Image&quot; to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((img: any) => (
            <div
              key={img.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden group"
            >
              <div className="aspect-square relative">
                <img
                  src={img.url}
                  alt={img.name || "uploaded image"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                  <button
                    onClick={() => handleCopyUrl(img.url, img.id)}
                    className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                    title="Copy URL"
                  >
                    {copiedId === img.id ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(img.id)}
                    className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm text-gray-800 truncate">{img.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {img.size ? formatSize(img.size) : ""}
                  {img.uploadedAt && <> &middot; {formatDate(img.uploadedAt)}</>}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Delete Image?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone. The image will be permanently
              deleted from storage.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const img = images.find((i: any) => i.id === deleteConfirm);
                  if (img) handleDelete(img);
                }}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
