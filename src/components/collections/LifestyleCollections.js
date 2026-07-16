"use client";

import React from "react";
import { getLifestyleEdits } from "@/lib/products";
import { CollectionCard } from "./CollectionCard";
import { SectionHeading } from "./SectionHeading";

export function LifestyleCollections() {
  const edits = getLifestyleEdits();
  if (edits.length === 0) return null;

  return (
    <section className="w-full px-4 md:px-6 py-[clamp(4rem,10vw,8rem)] max-w-[1800px] mx-auto">
      <SectionHeading
        eyebrow="Shop By Lifestyle"
        title="Lifestyle Collections"
        description="Wardrobes built around how you actually live — on duty, off duty, and everything between."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-16">
        {edits.map((edit, index) => (
          <CollectionCard
            key={edit.gender}
            href={edit.href}
            title={edit.label}
            subtitle={`${edit.productCount} ${edit.productCount === 1 ? "Piece" : "Pieces"}`}
            image={edit.image}
            index={index}
            className="aspect-[4/5]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ))}
      </div>
    </section>
  );
}
