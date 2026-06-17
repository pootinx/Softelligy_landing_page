import React, { useState, useEffect } from "react";
import Image from "next/image";
import { UploadCloud, X, ImageIcon, Loader2 } from "lucide-react";
import { uploadImage } from "@/lib/uploadImage";
import toast from "react-hot-toast";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { getFirebaseApp } from "@/firebase/config";

interface ImageUploaderProps {
  currentUrl: string;
  storagePath: string;
  onUploadSuccess: (url: string) => void;
  label?: string;
}

export default function ImageUploader({
  currentUrl,
  storagePath,
  onUploadSuccess,
  label = "Image",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<{url: string, name: string}[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);

  const loadGallery = async () => {
    setLoadingGallery(true);
    try {
      const storage = getStorage(getFirebaseApp());
      const listRef = ref(storage, storagePath);
      const res = await listAll(listRef);
      const urls = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { url, name: itemRef.name };
        })
      );
      
      // Add local fallback images to the gallery view
      const localDefaults = [
        { url: "/residences/Residence1.jpg", name: "Residence1.jpg (Default)" },
        { url: "/residences/Residence2.png", name: "Residence2.png (Default)" },
        { url: "/residences/Residence3.jpg", name: "Residence3.jpg (Default)" },
        { url: "/residences/Residence4.jpg", name: "Residence4.jpg (Default)" },
        { url: "/Staff/security_guarde.png", name: "security_guarde.png (Default)" },
        { url: "/Staff/cleaning_women.png", name: "cleaning_women.png (Default)" },
        { url: "/Staff/camera_technicien.png", name: "camera_technicien.png (Default)" },
        { url: "/Staff/elevator_technicien.png", name: "elevator_technicien.png (Default)" },
        { url: "/logo-horizontal-white.png", name: "logo-horizontal-white.png (Default)" },
      ];

      setGalleryImages([...localDefaults, ...urls]);
    } catch (err: any) {
      toast.error(`Failed to load gallery: ${err.message}`);
    } finally {
      setLoadingGallery(false);
    }
  };

  useEffect(() => {
    if (galleryOpen && galleryImages.length === 0) {
      loadGallery();
    }
  }, [galleryOpen]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);

    const { url, error } = await uploadImage(file, storagePath, (p) => {
      setProgress(Math.round(p));
    });

    if (error) {
      toast.error(`Upload failed: ${error.message}`);
    } else if (url) {
      toast.success("Image uploaded successfully");
      onUploadSuccess(url);
      setGalleryOpen(false);
    }

    setUploading(false);
    setProgress(0);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <div className="flex flex-col gap-3">
        {/* Preview */}
        <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center shrink-0">
          {currentUrl ? (
            <Image
              src={currentUrl}
              alt="Preview"
              fill
              className="object-contain"
            />
          ) : (
            <div className="text-center text-gray-400">
              <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <span className="text-sm">No image selected</span>
            </div>
          )}
        </div>

        {/* Unified Action Button */}
        <button
          type="button"
          onClick={() => setGalleryOpen(true)}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          {currentUrl ? "Change Image" : "Select Image"}
        </button>
      </div>

      {/* Unified Modal */}
      {galleryOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold text-lg text-gray-900">Select Image</h3>
              <button onClick={() => setGalleryOpen(false)} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Upload Area inside Modal */}
            <div className="p-4 border-b bg-gray-50 flex flex-col md:flex-row items-center gap-4 justify-between">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <label className={`cursor-pointer inline-flex items-center px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors ${uploading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                  <UploadCloud className="w-4 h-4 mr-2" />
                  {uploading ? `Uploading... ${progress}%` : "Upload New File"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                </label>
                {!uploading && <span className="text-sm text-gray-500 font-medium">or select an existing image below</span>}
              </div>
              
              {uploading && (
                <div className="w-full md:w-48 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              )}
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-gray-50/50">
              {loadingGallery ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-600" />
                  <p className="font-medium">Loading your images...</p>
                </div>
              ) : galleryImages.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {galleryImages.map((img) => (
                    <button
                      key={img.url}
                      onClick={() => {
                        onUploadSuccess(img.url);
                        setGalleryOpen(false);
                      }}
                      className="group relative aspect-square rounded-xl overflow-hidden border-2 border-gray-200 hover:border-blue-600 focus:border-blue-600 transition-all bg-white shadow-sm hover:shadow-md"
                    >
                      <Image src={img.url} alt={img.name} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-white text-xs font-medium truncate w-full text-left drop-shadow-md">{img.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-gray-500">
                  <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p className="font-medium">No images found in this folder.</p>
                  <p className="text-sm mt-1">Use the upload button above to add one.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
