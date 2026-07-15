"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Women", href: "/categories/women" },
  { name: "Men", href: "/categories/men" },
  { name: "Objects", href: "/categories/objects" },
  { name: "Editorial", href: "/editorial" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/70 backdrop-blur-md border-border/50 py-3 shadow-sm"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <div className="flex-1 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-2 text-foreground hover:text-muted-foreground transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu strokeWidth={1.5} size={24} />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium uppercase tracking-widest transition-colors duration-300 relative group py-2",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {/* Hover Indicator */}
                {!isActive && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logo */}
        <div className="flex-1 md:flex-none flex justify-center">
          <Link
            href="/"
            className="font-serif text-3xl tracking-tighter text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            aria-label="Luxe Home"
          >
            Luxe.
          </Link>
        </div>

        {/* Icons & Actions */}
        <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
          <button
            className="p-2 hidden md:flex text-foreground hover:text-muted-foreground transition-colors rounded-full focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Search"
          >
            <Search strokeWidth={1.5} size={20} />
          </button>
          
          <button
            className="p-2 hidden md:flex text-foreground hover:text-muted-foreground transition-colors rounded-full focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Wishlist"
          >
            <Heart strokeWidth={1.5} size={20} />
          </button>

          <ThemeToggle />

          <button
            className="p-2 relative flex items-center text-foreground hover:text-muted-foreground transition-colors rounded-full focus-visible:ring-2 focus-visible:ring-primary group"
            aria-label="Shopping Cart"
          >
            <ShoppingBag strokeWidth={1.5} size={20} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center border border-background transition-transform group-hover:scale-110">
              0
            </span>
          </button>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-background border-r border-border z-50 flex flex-col md:hidden shadow-luxury"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="font-serif text-2xl tracking-tighter">Luxe.</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-foreground hover:text-muted-foreground transition-colors"
                  aria-label="Close mobile menu"
                >
                  <X strokeWidth={1.5} size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-8">
                <nav className="flex flex-col gap-6">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "text-lg font-medium uppercase tracking-wider transition-colors",
                        pathname === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="w-full h-px bg-border my-2" />

                <div className="flex flex-col gap-6">
                  <button className="flex items-center gap-4 text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                    <Search strokeWidth={1.5} size={20} />
                    Search
                  </button>
                  <button className="flex items-center gap-4 text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                    <Heart strokeWidth={1.5} size={20} />
                    Wishlist
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
