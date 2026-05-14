"use client";

import React, { useState } from "react";
import { useCollection } from "@/hooks/useFirestore";
import { Check, Upload, X } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface ImagePickerProps {
  selected: string | null;
  onSelect: (url: string) => void;
  onClose: () => void;
}

export default function ImagePicker({
  selected,
  onSelect,
  onClose,
}: ImagePickerProps) {
  const { data: images, loading } = useCollection("images");
  const [showUpload, setShowUpload] = useState(false);

  const handleUploadComplete = (url: string) => {
    onSelect(url);
    setShowUpload(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Select Image</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 border-b">
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <Upload size={16} />
            Upload New Image
          </button>
          {showUpload && (
            <div className="mt-4">
              <ImageUpload onUploadComplete={handleUploadComplete} />
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          ) : images.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No images yet</p>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img: any) => (
                <button
                  key={img.id}
                  onClick={() => onSelect(img.url)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selected === img.url
                      ? "border-blue-600 ring-2 ring-blue-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover"
                  />
                  {selected === img.url && (
                    <div className="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-0.5">
                      <Check size={14} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
