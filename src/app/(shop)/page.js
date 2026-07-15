import React from "react";
import HeroSection from "@/components/ui/HeroSection";
import Categories from "@/components/ui/Categories";
import ProductGrid from "@/components/ui/ProductGrid";
import WhyChooseUs from "@/components/ui/WhyChooseUs";
import FeaturedProducts from "@/components/ui/FeaturedProducts";
import Testimonials from "@/components/ui/Testimonials";
import Newsletter from "@/components/ui/Newsletter";
import Footer from "@/components/layout/Footer";
import { productsData } from "@/lib/dummyData";

export default function Home() {
  const newArrivals = productsData.slice(0, 3);

  return (
    <main className="flex-1 flex flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <HeroSection />
      <Categories />
      <ProductGrid
        title="New Arrivals"
        subtitle="Latest Additions"
        products={newArrivals}
        linkText="View All Pieces"
        linkHref="/products"
      />
      <WhyChooseUs />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
