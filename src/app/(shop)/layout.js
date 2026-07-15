import React, { Suspense } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function ShopLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Suspense fallback={null}>
        <SiteHeader />
      </Suspense>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
