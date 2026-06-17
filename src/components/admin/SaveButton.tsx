import React from "react";
import { Loader2 } from "lucide-react";

interface SaveButtonProps {
  loading: boolean;
  label?: string;
  loadingLabel?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function SaveButton({
  loading,
  label = "Save Changes",
  loadingLabel = "Saving...",
  onClick,
  type = "submit",
}: SaveButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading && <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />}
      {loading ? loadingLabel : label}
    </button>
  );
}
