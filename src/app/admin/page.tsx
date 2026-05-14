"use client";

import React, { useState, useEffect } from "react";
import { useCollection } from "@/hooks/useFirestore";
import { FileText, Image, Clock, HardDrive, ExternalLink, Upload } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: pages } = useCollection("pages");
  const { data: images } = useCollection("images");
  const { data: contentBlocks } = useCollection("content");
  const [stats, setStats] = useState({
    totalPages: 0,
    totalImages: 0,
    totalContent: 0,
    lastUpdate: "Never",
  });

  useEffect(() => {
    const allItems = [
      ...pages.map((p: any) => ({ ...p, type: "page" })),
      ...images.map((i: any) => ({ ...i, type: "image" })),
      ...contentBlocks.map((c: any) => ({ ...c, type: "content" })),
    ];

    const sorted = allItems.sort(
      (a: any, b: any) =>
        (b.lastUpdated?.toMillis?.() || 0) -
        (a.lastUpdated?.toMillis?.() || 0)
    );

    let lastUpdate = "Never";
    if (sorted.length > 0) {
      const last = sorted[0].lastUpdated;
      if (last?.toMillis) {
        const diff = Date.now() - last.toMillis();
        const mins = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        lastUpdate =
          mins < 1 ? "Just now" : mins < 60 ? `${mins}m ago` : `${hours}h ago`;
      }
    }

    setStats({
      totalPages: pages.length,
      totalImages: images.length,
      totalContent: contentBlocks.length,
      lastUpdate,
    });
  }, [pages, images, contentBlocks]);

  const recentChanges = [
    ...pages.map((p: any) => ({
      date: p.lastUpdated,
      type: "Page",
      item: p.name || p.id,
      changedBy: "admin",
    })),
    ...images.map((i: any) => ({
      date: i.lastUpdated,
      type: "Image",
      item: i.name,
      changedBy: "admin",
    })),
    ...contentBlocks.map((c: any) => ({
      date: c.lastUpdated,
      type: "Content",
      item: c.key,
      changedBy: "admin",
    })),
  ]
    .sort(
      (a, b) => (b.date?.toMillis?.() || 0) - (a.date?.toMillis?.() || 0)
    )
    .slice(0, 10);

  const formatDate = (date: any) => {
    if (!date?.toMillis) return "-";
    const diff = Date.now() - date.toMillis();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const cards = [
    {
      label: "Total Pages",
      value: stats.totalPages,
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Images",
      value: stats.totalImages,
      icon: Image,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Content Blocks",
      value: stats.totalContent,
      icon: Clock,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Last Update",
      value: stats.lastUpdate,
      icon: HardDrive,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Overview of your website content
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {card.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${card.bg}`}>
                <card.icon size={24} className={card.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Changes
          </h2>
          {recentChanges.length === 0 ? (
            <p className="text-gray-500 text-sm">No changes yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-200">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Item</th>
                    <th className="pb-3 font-medium">Changed By</th>
                  </tr>
                </thead>
                <tbody>
                  {recentChanges.map((change: any, i: number) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-3 text-gray-600">
                        {formatDate(change.date)}
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            change.type === "Page"
                              ? "bg-blue-50 text-blue-600"
                              : change.type === "Image"
                              ? "bg-green-50 text-green-600"
                              : "bg-purple-50 text-purple-600"
                          }`}
                        >
                          {change.type}
                        </span>
                      </td>
                      <td className="py-3 text-gray-800">{change.item}</td>
                      <td className="py-3 text-gray-500">{change.changedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/admin/pages"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors"
            >
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Edit Pages</p>
                <p className="text-xs text-gray-500">
                  Manage website page content
                </p>
              </div>
            </Link>

            <Link
              href="/admin/images"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors"
            >
              <div className="p-2 bg-green-50 rounded-lg">
                <Upload size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Upload New Image
                </p>
                <p className="text-xs text-gray-500">
                  Add images to your media library
                </p>
              </div>
            </Link>

            <a
              href="https://syndic.softelligy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors"
            >
              <div className="p-2 bg-purple-50 rounded-lg">
                <ExternalLink size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  View Website
                </p>
                <p className="text-xs text-gray-500">
                  Open the live site in a new tab
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
