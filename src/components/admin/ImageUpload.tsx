"use client";

import React, { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { uploadImage } from "@/firebase/storage";
import { addDocument } from "@/firebase/firestore";

interface ImageUploadProps {
  onUploadComplete?: (url: string) => void;
}

export default function ImageUpload({ onUploadComplete }: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setProgress(0);

    try {
      const url = await uploadImage(file, (p) => setProgress(p));
      await addDocument("images", {
        name: file.name,
        url,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
      });
      onUploadComplete?.(url);
      reset();
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const reset = () => {
    setPreview(null);
    setProgress(0);
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        dragOver
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-gray-400"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="max-h-48 rounded-lg mx-auto"
          />
          {!uploading && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                reset();
              }}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
            >
              <X size={14} />
            </button>
          )}
          {uploading && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Uploading... {Math.round(progress)}%
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-500">
          <Upload size={40} className="mx-auto mb-3" />
          <p className="text-sm">
            Drag & drop an image here, or click to browse
          </p>
        </div>
      )}
    </div>
  );
}
