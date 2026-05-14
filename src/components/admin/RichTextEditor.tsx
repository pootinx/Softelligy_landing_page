"use client";

import React, { useRef, useCallback } from "react";
import { Bold, Italic, Underline, List, ListOrdered, Link, Heading } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormatting = useCallback((format: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    let formatted = "";

    switch (format) {
      case "bold":
        formatted = `**${selectedText || "bold text"}**`;
        break;
      case "italic":
        formatted = `*${selectedText || "italic text"}*`;
        break;
      case "underline":
        formatted = `<u>${selectedText || "underlined text"}</u>`;
        break;
      case "bullet":
        formatted = selectedText
          ? selectedText
              .split("\n")
              .map((l) => `- ${l}`)
              .join("\n")
          : "- list item";
        break;
      case "numbered":
        formatted = selectedText
          ? selectedText
              .split("\n")
              .map((l, i) => `${i + 1}. ${l}`)
              .join("\n")
          : "1. list item";
        break;
      case "link":
        formatted = `[${selectedText || "link text"}](url)`;
        break;
      case "heading":
        formatted = `## ${selectedText || "Heading"}`;
        break;
      default:
        formatted = selectedText;
    }

    const newValue = value.substring(0, start) + formatted + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      const newCursor = start + formatted.length;
      textarea.setSelectionRange(newCursor, newCursor);
    }, 0);
  }, [value, onChange]);

  const buttons = [
    { icon: Bold, action: "bold", label: "Bold" },
    { icon: Italic, action: "italic", label: "Italic" },
    { icon: Underline, action: "underline", label: "Underline" },
    { icon: Heading, action: "heading", label: "Heading" },
    { icon: List, action: "bullet", label: "Bullet List" },
    { icon: ListOrdered, action: "numbered", label: "Numbered List" },
    { icon: Link, action: "link", label: "Link" },
  ];

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-300">
        {buttons.map((btn) => (
          <button
            key={btn.action}
            type="button"
            onClick={() => insertFormatting(btn.action)}
            className="p-1.5 hover:bg-gray-200 rounded text-gray-600 hover:text-gray-800 transition-colors"
            title={btn.label}
          >
            <btn.icon size={16} />
          </button>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 text-sm text-gray-800 bg-white focus:outline-none resize-y min-h-[150px]"
      />
    </div>
  );
}
