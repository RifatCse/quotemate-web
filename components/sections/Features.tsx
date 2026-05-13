"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FEATURES } from "@/lib/constants";

// SVG icons for each feature
const FEATURE_ICONS: Record<string, React.ReactNode> = {
  mic: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  camera: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  compare: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M8 3H5a2 2 0 00-2 2v14a2 2 0 002 2h3M16 3h3a2 2 0 012 2v14a2 2 0 01-2 2h-3M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  scan: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  tag: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7" cy="7" r="1" fill="currentColor"/>
    </svg>
  ),
  sync: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

export default function Features() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const feature = FEATURES[active];

  return (
    <section
      id="features"
      className="py-24 px-4"
      style={{ background: "var(--surface-dark)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[--primary] text-sm font-semibold uppercase tracking-widest mb-3">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[--text] mb-4">
            Everything a tradie needs
          </h2>
          <p className="text-[--text-muted] text-lg max-w-xl mx-auto">
            From voice dictation to AR measurements — all the tools to quote
            faster and win more jobs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Tab list */}
          <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {FEATURES.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setActive(i)}
                className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all whitespace-nowrap lg:whitespace-normal shrink-0 lg:shrink cursor-pointer"
                style={{
                  background: active === i ? `${f.color}12` : "transparent",
                  border: `1px solid ${active === i ? f.color + "30" : "transparent"}`,
                  color: active === i ? f.color : "var(--text-muted)",
                }}
              >
                {active === i && (
                  <motion.div
                    layoutId="feature-indicator"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: `${f.color}08` }}
                    transition={{ duration: 0.25 }}
                  />
                )}
                <span
                  className="relative z-10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${f.color}18` }}
                >
                  {FEATURE_ICONS[f.icon]}
                </span>
                <span className="relative z-10 text-sm font-medium">
                  {f.label}
                </span>
              </button>
            ))}
          </div>

          {/* Feature panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={feature.id}
                initial={reduced ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="glass-card p-8 h-full"
                style={{ borderColor: `${feature.color}20` }}
              >
                {/* Icon + headline */}
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      background: `${feature.color}18`,
                      color: feature.color,
                    }}
                  >
                    {FEATURE_ICONS[feature.icon]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[--text] mb-1">
                      {feature.headline}
                    </h3>
                    <p className="text-[--text-muted] text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Bullet list */}
                <ul className="space-y-3">
                  {feature.bullets.map((bullet, i) => (
                    <motion.li
                      key={bullet}
                      className="flex items-center gap-3 text-sm text-[--text-muted]"
                      initial={reduced ? false : { opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: `${feature.color}18`,
                          color: feature.color,
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {bullet}
                    </motion.li>
                  ))}
                </ul>

                {/* Color bar at bottom */}
                <div
                  className="mt-8 h-0.5 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${feature.color}, transparent)`,
                    opacity: 0.4,
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
