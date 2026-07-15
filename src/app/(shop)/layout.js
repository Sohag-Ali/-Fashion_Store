import React from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function ShopLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
