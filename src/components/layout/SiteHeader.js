"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Container } from "@/components/layout/Container";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { useCart } from "@/context/CartProvider";
import { useWishlist } from "@/context/WishlistProvider";
import { mainNavLinks, isNavLinkActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const CLOSE_DELAY = 150;

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openMenuKey, setOpenMenuKey] = useState(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  const closeTimerRef = useRef(null);
  const shopTriggerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close all overlays on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setOpenMenuKey(null);
  }, [pathname]);

  // Lock body scroll when any overlay is open
  useEffect(() => {
    const shouldLock = isMobileMenuOpen || isSearchOpen;
    document.body.style.overflow = shouldLock ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => setOpenMenuKey(null), CLOSE_DELAY);
  }, [cancelClose]);

  const openMenu = useCallback(
    (key) => {
      cancelClose();
      setOpenMenuKey(key);
    },
    [cancelClose]
  );

  function handleTriggerKeyDown(e, key) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpenMenuKey((current) => (current === key ? null : key));
    }
  }

  return (
    <>
      <header
        onMouseLeave={scheduleClose}
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
              aria-label="Open menu"
            >
              <Menu strokeWidth={1.5} size={24} />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 items-center gap-8">
            {mainNavLinks.map((link) => {
              const isActive = isNavLinkActive(link, pathname, searchParams);

              if (!link.megaMenu) {
                return (
                  <Link
                    key={link.key ?? link.label}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium uppercase tracking-widest transition-colors duration-300 relative group py-2",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                      link.accent && !isActive && "text-destructive/80 hover:text-destructive"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {!isActive && (
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    )}
                  </Link>
                );
              }

              const menuOpen = openMenuKey === link.key;

              return (
                <div
                  key={link.key}
                  className="relative"
                  onMouseEnter={() => openMenu(link.key)}
                >
                  <Link
                    ref={shopTriggerRef}
                    href={link.href}
                    aria-haspopup="true"
                    aria-expanded={menuOpen}
                    aria-controls="shop-mega-menu"
                    onFocus={() => openMenu(link.key)}
                    onKeyDown={(e) => handleTriggerKeyDown(e, link.key)}
                    className={cn(
                      "flex items-center gap-1.5 text-sm font-medium uppercase tracking-widest transition-colors duration-300 relative group py-2",
                      isActive || menuOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      strokeWidth={1.5}
                      size={14}
                      className={cn("transition-transform duration-300", menuOpen && "rotate-180")}
                    />
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {!isActive && (
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Logo */}
          <div className="flex-1 md:flex-none flex justify-center">
            <Link
              href="/"
              className="font-serif text-3xl tracking-tighter text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label="Oxivos Home"
            >
              Oxivos.
            </Link>
          </div>

          {/* Icons & Actions */}
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hidden md:flex text-foreground hover:text-muted-foreground transition-colors rounded-full focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Search products"
            >
              <Search strokeWidth={1.5} size={20} />
            </button>

            <Link
              href="/wishlist"
              className="p-2 relative hidden md:flex text-foreground hover:text-muted-foreground transition-colors rounded-full focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Wishlist"
            >
              <Heart strokeWidth={1.5} size={20} />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    key={wishlistCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="absolute top-1 right-1 w-4 h-4 bg-rose text-rose-foreground text-[9px] font-bold rounded-full flex items-center justify-center border border-background"
                  >
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <ThemeToggle />

            <Link
              href="/cart"
              className="p-2 relative flex items-center text-foreground hover:text-muted-foreground transition-colors rounded-full focus-visible:ring-2 focus-visible:ring-accent group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag strokeWidth={1.5} size={20} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center border border-background"
                  >
                    {itemCount > 9 ? "9+" : itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </Container>

        <MegaMenu
          id="shop-mega-menu"
          isOpen={openMenuKey === "shop"}
          onClose={() => setOpenMenuKey(null)}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          triggerRef={shopTriggerRef}
        />
      </header>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        pathname={pathname}
        searchParams={searchParams}
        wishlistCount={wishlistCount}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
}
