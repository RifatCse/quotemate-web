"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PRICING } from "@/lib/constants";
import Badge from "@/components/ui/Badge";

function CheckIcon({ included }: { included: boolean }) {
  if (included) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M20 6L9 17l-5-5" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  return <span className="text-[--border] text-base leading-none font-bold">—</span>;
}

export default function Pricing() {
  const reduced = useReducedMotion();

  return (
    <section
      id="pricing"
      className="py-24 px-4"
      style={{ background: "var(--surface-dark)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[--primary] text-sm font-semibold uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[--text] mb-4">
            Simple, honest pricing
          </h2>
          <p className="text-[--text-muted] text-lg max-w-xl mx-auto">
            Start free, upgrade when you&apos;re ready. No lock-in contracts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free card */}
          <motion.div
            className="glass-card p-8"
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            whileHover={reduced ? undefined : { y: -4, transition: { duration: 0.2 } }}
          >
            <div className="mb-6">
              <h3 className="text-lg font-bold text-[--text] mb-1">
                {PRICING.free.name}
              </h3>
              <p className="text-[--text-muted] text-sm mb-4">
                {PRICING.free.tagline}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-[--text]">
                  {PRICING.free.price}
                </span>
                <span className="text-[--text-muted] text-sm">
                  {PRICING.free.period}
                </span>
              </div>
            </div>

            <a
              href="#waitlist"
              className="block w-full py-3 rounded-xl text-center text-sm font-semibold transition-all mb-6"
              style={{
                background: "var(--surface-elevated)",
                color: "var(--text)",
                border: "1px solid var(--border)",
              }}
            >
              Get Started Free
            </a>

            <ul className="space-y-3">
              {PRICING.free.features.map((f) => (
                <li key={f.text} className="flex items-center gap-3 text-sm">
                  <CheckIcon included={f.included} />
                  <span className={f.included ? "text-[--text-muted]" : "text-[--border]"}>
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Pro card */}
          <motion.div
            className="relative glass-card p-8 glow-purple"
            style={{ borderColor: "rgba(139,92,246,0.3)" }}
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={reduced ? undefined : { y: -6, transition: { duration: 0.2 } }}
          >
            {/* Most Popular badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge variant="default" className="text-xs">
                ⚡ Most Popular
              </Badge>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-[--text] mb-1">
                {PRICING.pro.name}
              </h3>
              <p className="text-[--text-muted] text-sm mb-4">
                {PRICING.pro.tagline}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold gradient-text">
                  {PRICING.pro.price}
                </span>
                <span className="text-[--text-muted] text-sm">
                  {PRICING.pro.period}
                </span>
              </div>
            </div>

            <a
              href="#waitlist"
              className="block w-full py-3 rounded-xl text-center text-sm font-semibold transition-all mb-6 hover:bg-purple-500"
              style={{ background: "var(--primary)", color: "white" }}
            >
              Join the Waitlist
            </a>

            <ul className="space-y-3">
              {PRICING.pro.features.map((f) => (
                <li key={f.text} className="flex items-center gap-3 text-sm">
                  <CheckIcon included={f.included} />
                  <span className="text-[--text-muted]">{f.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.p
          className="text-center text-[--text-muted] text-sm mt-8"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          All prices in AUD. GST included. Cancel any time.
        </motion.p>
      </div>
    </section>
  );
}
