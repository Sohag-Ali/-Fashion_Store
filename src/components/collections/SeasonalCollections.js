"use client";

import React from "react";
import { getSeasons } from "@/lib/products";
import { CollectionCard } from "./CollectionCard";
import { SectionHeading } from "./SectionHeading";

export function SeasonalCollections() {
  const seasons = getSeasons();
  if (seasons.length === 0) return null;

  return (
    <section className="w-full px-4 md:px-6 py-[clamp(4rem,10vw,8rem)] max-w-[1800px] mx-auto bg-secondary/40">
      <SectionHeading
        eyebrow="Shop By Season"
        title="Seasonal Collections"
        description="Dressed for the calendar — from resort-ready linen to fall's heavier cloth."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-16">
        {seasons.map((season, index) => (
          <CollectionCard
            key={season.name}
            href={season.href}
            title={season.name}
            subtitle={`${season.productCount} ${season.productCount === 1 ? "Piece" : "Pieces"}`}
            image={season.image}
            index={index}
            className="aspect-[3/4]"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          />
        ))}
      </div>
    </section>
  );
}
