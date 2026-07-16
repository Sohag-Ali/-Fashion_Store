"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || status === "submitting") return;
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 800);
  }

  return (
    <section className="w-full py-[clamp(5rem,10vw,8rem)] border-t border-foreground/10 bg-background">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-6">
            Join the Inner Circle
          </h2>
          <p className="text-muted-foreground text-sm font-light mb-10 max-w-md mx-auto leading-relaxed">
            Subscribe to receive exclusive access to private sales, early collection drops, and editorial insights.
          </p>
          
          {status === "success" ? (
            <p className="text-sm text-foreground">
              Thanks — you&apos;re on the list. This is a demo, so no email is actually sent.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="relative max-w-md mx-auto group">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-foreground/30 py-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-300"
                required
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-xs uppercase tracking-[0.2em] font-medium text-muted-foreground hover:text-foreground transition-colors p-2 disabled:opacity-50"
              >
                {status === "submitting" ? "Submitting…" : "Submit"}
              </button>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-foreground transition-all duration-700 ease-out group-focus-within:w-full" />
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
