import React from "react";
import { cn } from "@/lib/utils";

export function Container({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "w-full max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
