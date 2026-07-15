import React from "react";
import HeroSection from "@/components/ui/HeroSection";
import Categories from "@/components/ui/Categories";
import ProductGrid from "@/components/ui/ProductGrid";
import WhyChooseUs from "@/components/ui/WhyChooseUs";
import FeaturedProducts from "@/components/ui/FeaturedProducts";
import Testimonials from "@/components/ui/Testimonials";
import Newsletter from "@/components/ui/Newsletter";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const newArrivals = [
    {
      id: 1,
      title: "Tailored Wool Coat",
      category: "Outerwear",
      price: "$890",
      image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=987&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Silk Midi Dress",
      category: "Dresses",
      price: "$520",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1160&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Structured Leather Tote",
      category: "Accessories",
      price: "$1,250",
      image: "https://images.unsplash.com/photo-1594938298596-73346c1b5948?q=80&w=1160&auto=format&fit=crop"
    }
  ];

  return (
    <main className="flex-1 flex flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <HeroSection />
      <Categories />
      <ProductGrid 
        title="New Arrivals" 
        subtitle="Latest Additions" 
        products={newArrivals} 
        linkText="View All Pieces" 
      />
      <WhyChooseUs />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
