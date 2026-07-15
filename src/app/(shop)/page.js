import React from "react";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col bg-background selection:bg-primary selection:text-primary-foreground">

      {/* Hero Section with Fluid Typography */}
      <section className="relative w-full h-[85vh] bg-card flex flex-col items-center justify-center overflow-hidden">
        {/* Subtle vignette/gradient to focus text without relying heavily on color */}
        <div className="absolute inset-0 bg-muted">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
            alt="Fashion Hero" 
            className="w-full h-full object-cover opacity-90 scale-100 animate-in fade-in zoom-in duration-[2000ms] ease-out"
          />
        </div>
        
        <div className="relative z-10 text-center flex flex-col items-center gap-8 px-4 max-w-5xl mx-auto mix-blend-difference">
          {/* Using text-balance and Playfair Display for massive editorial impact */}
          <h1 className="text-fluid-hero font-serif tracking-tight text-white text-balance drop-shadow-2xl font-normal">
            The Autumn Silhouette
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl font-light tracking-wide text-balance">
            Discover a meticulously curated collection of perfectly tailored essentials.
          </p>
          {/* Perfectly rounded pill button (Apple style) */}
          <button className="mt-8 px-8 py-4 rounded-full bg-white text-black font-medium tracking-wider uppercase text-xs hover:scale-105 transition-transform duration-300 ease-out shadow-luxury">
            Explore the Collection
          </button>
        </div>
      </section>

      {/* Product Grid with Fluid Spacing & Shadows */}
      <section className="w-full max-w-[1600px] mx-auto px-6 py-[clamp(4rem,10vw,8rem)]">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-fluid-h2 font-serif tracking-tight text-balance">New Arrivals</h2>
          <a href="#" className="text-xs font-medium tracking-widest uppercase border-b border-foreground/30 pb-1 hover:border-foreground transition-colors duration-300">
            View All Pieces
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(1.5rem,4vw,3rem)]">
          {/* Product 1 */}
          <div className="group cursor-pointer">
            <div className="aspect-[3/4] bg-muted relative overflow-hidden rounded-md mb-6 shadow-luxury">
              <img src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=987&auto=format&fit=crop" alt="Wool Coat" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ease-out" />
            </div>
            <div className="flex justify-between items-start px-1">
              <div>
                <h3 className="font-serif text-xl tracking-tight">Tailored Wool Coat</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-2">Camel</p>
              </div>
              <p className="font-medium text-sm tabular-nums tracking-tight">$890</p>
            </div>
          </div>
          
          {/* Product 2 */}
          <div className="group cursor-pointer">
            <div className="aspect-[3/4] bg-muted relative overflow-hidden rounded-md mb-6 shadow-luxury">
              <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1160&auto=format&fit=crop" alt="Silk Dress" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ease-out" />
            </div>
            <div className="flex justify-between items-start px-1">
              <div>
                <h3 className="font-serif text-xl tracking-tight">Silk Midi Dress</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-2">Noir</p>
              </div>
              <p className="font-medium text-sm tabular-nums tracking-tight">$520</p>
            </div>
          </div>

          {/* Product 3 */}
          <div className="group cursor-pointer hidden xl:block">
            <div className="aspect-[3/4] bg-muted relative overflow-hidden rounded-md mb-6 shadow-luxury">
              <img src="https://images.unsplash.com/photo-1594938298596-73346c1b5948?q=80&w=1160&auto=format&fit=crop" alt="Leather Bag" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ease-out" />
            </div>
            <div className="flex justify-between items-start px-1">
              <div>
                <h3 className="font-serif text-xl tracking-tight">Structured Leather Tote</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-2">Graphite</p>
              </div>
              <p className="font-medium text-sm tabular-nums tracking-tight">$1,250</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Refined Footer */}
      <footer className="w-full border-t border-border mt-auto bg-card">
        <div className="max-w-[1600px] mx-auto px-6 py-24 flex flex-col lg:flex-row justify-between items-start gap-16">
          <div className="max-w-sm">
            <div className="font-serif text-3xl tracking-tighter mb-8">Luxe.</div>
            <p className="text-sm text-muted-foreground leading-relaxed font-light">
              Elevated essentials for the modern wardrobe. Designed with extreme precision, crafted with uncompromising quality, and built for tomorrow.
            </p>
          </div>
          <div className="flex flex-wrap gap-16 lg:gap-32 text-sm">
            <div className="flex flex-col gap-6">
              <h4 className="font-medium text-foreground tracking-tight mb-2">Company</h4>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">The Vision</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Boutiques</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a>
            </div>
            <div className="flex flex-col gap-6">
              <h4 className="font-medium text-foreground tracking-tight mb-2">Support</h4>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Concierge</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Shipping</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Returns</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
