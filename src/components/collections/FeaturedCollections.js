"use client";

import React from "react";
import { getFeaturedCollections } from "@/lib/products";
import { CollectionCard } from "./CollectionCard";
import { SectionHeading } from "./SectionHeading";

// Asymmetric bento spans, cycled across however many featured collections
// exist — same technique as the homepage category grid.
const COL_SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

export function FeaturedCollections() {
  const collections = getFeaturedCollections(4);
  if (collections.length === 0) return null;

  return (
    <section className="w-full px-4 md:px-6 py-[clamp(4rem,10vw,8rem)] max-w-[1800px] mx-auto">
      <SectionHeading
        eyebrow="Curated Edits"
        title="Featured Collections"
        description="The pieces our editors keep coming back to — signature silhouettes and season-defining staples."
      />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[400px] md:auto-rows-[550px] mt-12 md:mt-16">
        {collections.map((collection, index) => (
          <CollectionCard
            key={collection.name}
            href={collection.href}
            title={collection.name}
            subtitle={`${collection.productCount} ${collection.productCount === 1 ? "Piece" : "Pieces"}`}
            image={collection.image}
            index={index}
            className={COL_SPANS[index % COL_SPANS.length]}
          />
        ))}
      </div>
    </section>
  );
}
