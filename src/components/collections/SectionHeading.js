import React from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, description, align = "center" }) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center mx-auto" : "items-start text-left"
      )}
    >
      {eyebrow && (
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">{eyebrow}</span>
      )}
      <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-none font-serif tracking-tighter text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-sm text-muted-foreground max-w-xl leading-relaxed">{description}</p>
      )}
    </div>
  );
}
