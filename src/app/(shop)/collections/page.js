import React from "react";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import { CollectionsHero } from "@/components/collections/CollectionsHero";
import { FeaturedCollections } from "@/components/collections/FeaturedCollections";
import { EditorialBanner } from "@/components/collections/EditorialBanner";
import { SeasonalCollections } from "@/components/collections/SeasonalCollections";
import { LifestyleCollections } from "@/components/collections/LifestyleCollections";
import { getCollections, getFeaturedProducts } from "@/lib/products";

const SCROLL_TARGET_ID = "collections-grid";

export const metadata = {
  title: "Collections",
  description: "Explore our curated collections — seasonal edits, signature staples, and lifestyle essentials.",
};

export default function CollectionsPage() {
  const collections = getCollections();
  const totalProducts = collections.reduce((sum, collection) => sum + collection.productCount, 0);
  const featuredProducts = getFeaturedProducts(6);
  const topCollection = collections[0] ?? null;

  return (
    <main className="flex-1 flex flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <CollectionsHero
        collectionCount={collections.length}
        productCount={totalProducts}
        scrollTargetId={SCROLL_TARGET_ID}
      />

      <div id={SCROLL_TARGET_ID} className="scroll-mt-20">
        <FeaturedCollections />
      </div>

      <EditorialBanner
        image="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2400&auto=format&fit=crop"
        eyebrow="The Story"
        title="Crafted for the long season"
        description="Every collection is built around pieces that outlast the trend cycle — natural fibers, considered tailoring, and a palette that moves easily from one season to the next."
        cta={topCollection ? `Shop ${topCollection.name}` : "Shop All"}
        href={topCollection?.href ?? "/products"}
      />

      <SeasonalCollections />

      <ProductGrid
        title="Shop The Edit"
        subtitle="Editor's Picks"
        products={featuredProducts}
        linkText="View All Pieces"
        linkHref="/products"
      />

      <LifestyleCollections />

      <Footer />
    </main>
  );
}
