"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Heart, ChevronDown } from "lucide-react";
import { mainNavLinks, shopMegaMenu, isNavLinkActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function MobileDrawer({ isOpen, onClose, pathname, searchParams, wishlistCount, onOpenSearch }) {
  const [openSection, setOpenSection] = useState(null);

  function toggleSection(title) {
    setOpenSection((current) => (current === title ? null : title));
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-background border-r border-border z-50 flex flex-col md:hidden shadow-luxury"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <span className="font-serif text-2xl tracking-tighter italic">Oxivos.</span>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-foreground hover:text-muted-foreground transition-colors"
                aria-label="Close menu"
              >
                <X strokeWidth={1.5} size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenSearch();
                }}
                className="flex items-center gap-4 py-4 text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors border-b border-border"
              >
                <Search strokeWidth={1.5} size={18} />
                Search
              </button>

              <nav className="flex flex-col">
                {mainNavLinks.map((link) => {
                  const active = isNavLinkActive(link, pathname, searchParams);

                  if (!link.megaMenu) {
                    return (
                      <Link
                        key={link.key ?? link.label}
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center py-4 text-base font-medium uppercase tracking-wider border-b border-border transition-colors",
                          active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                          link.accent && "text-destructive"
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  }

                  // Shop: link to /products directly, plus an accordion toggle
                  return (
                    <div key={link.key} className="border-b border-border">
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={cn(
                            "flex-1 py-4 text-base font-medium uppercase tracking-wider transition-colors",
                            active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {link.label}
                        </Link>
                        <button
                          onClick={() => toggleSection(link.key)}
                          aria-expanded={openSection === link.key}
                          aria-label={openSection === link.key ? "Collapse categories" : "Expand categories"}
                          className="p-4 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <motion.span
                            animate={{ rotate: openSection === link.key ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="block"
                          >
                            <ChevronDown strokeWidth={1.5} size={18} />
                          </motion.span>
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {openSection === link.key && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4 pl-2 flex flex-col gap-5">
                              {shopMegaMenu.columns.map((column) => (
                                <div key={column.title} className="flex flex-col gap-3">
                                  {column.href ? (
                                    <Link
                                      href={column.href}
                                      onClick={onClose}
                                      className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground w-fit"
                                    >
                                      {column.title}
                                    </Link>
                                  ) : (
                                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/80">
                                      {column.title}
                                    </span>
                                  )}
                                  {column.items.length > 0 && (
                                    <div className="flex flex-col gap-3 pl-3 border-l border-border">
                                      {column.items.map((item) => (
                                        <Link
                                          key={item.label}
                                          href={item.href}
                                          onClick={onClose}
                                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                          {item.label}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>

              <Link
                href="/wishlist"
                onClick={onClose}
                className="flex items-center gap-4 py-4 mt-2 text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                <Heart strokeWidth={1.5} size={18} />
                Wishlist
                {wishlistCount > 0 && <span className="text-xs text-foreground">({wishlistCount})</span>}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
