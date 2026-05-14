"use client";

import React, { createContext, useContext } from "react";
import { useContent, useContentBlocks } from "@/hooks/useContent";

interface SiteContentContextType {
  page: any;
  pageLoading: boolean;
  blocks: any[];
  blocksLoading: boolean;
  getContentBlock: (key: string) => string;
}

const SiteContentContext = createContext<SiteContentContextType>({
  page: null,
  pageLoading: true,
  blocks: [],
  blocksLoading: true,
  getContentBlock: () => "",
});

export function SiteContentProvider({
  children,
  pageId = "home",
}: {
  children: React.ReactNode;
  pageId?: string;
}) {
  const { data: page, loading: pageLoading } = useContent(pageId);
  const { blocks, loading: blocksLoading, getValue } = useContentBlocks();

  return (
    <SiteContentContext.Provider
      value={{
        page,
        pageLoading,
        blocks,
        blocksLoading,
        getContentBlock: getValue,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
