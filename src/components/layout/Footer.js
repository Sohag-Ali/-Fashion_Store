"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral-950 text-white pt-24 pb-12 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-sm">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-serif text-4xl tracking-tighter mb-8 italic pr-4"
            >
              Luxe.
            </motion.div>
            <p className="text-sm text-white/50 leading-relaxed font-light">
              Elevated essentials for the modern wardrobe. Designed with extreme precision, crafted with uncompromising quality, and built for tomorrow.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-16 lg:gap-32 text-sm">
            <div className="flex flex-col gap-6">
              <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-white/80 mb-2">Company</h4>
              <FooterLink href="#">The Vision</FooterLink>
              <FooterLink href="#">Boutiques</FooterLink>
              <FooterLink href="#">Journal</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
            </div>
            <div className="flex flex-col gap-6">
              <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-white/80 mb-2">Support</h4>
              <FooterLink href="#">Client Services</FooterLink>
              <FooterLink href="#">Shipping & Delivery</FooterLink>
              <FooterLink href="#">Returns & Exchanges</FooterLink>
              <FooterLink href="#">Care Guide</FooterLink>
            </div>
            <div className="flex flex-col gap-6">
              <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-white/80 mb-2">Legal</h4>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Cookie Policy</FooterLink>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-white/40 uppercase tracking-widest font-medium">
          <p>&copy; {currentYear} Luxe. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Pinterest</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }) {
  return (
    <a 
      href={href} 
      className="text-white/50 hover:text-white transition-colors duration-300 relative group w-fit"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
    </a>
  );
}
