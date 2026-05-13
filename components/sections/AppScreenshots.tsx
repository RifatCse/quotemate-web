"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const FloatingCrystal = dynamic(
  () => import("@/components/three/FloatingCrystal"),
  { ssr: false }
);

const SLIDES = [
  {
    label: "New Quote",
    description: "Voice, photo, or text — pick your style",
    bg: "#8B5CF6",
    content: (
      <div className="flex flex-col gap-3 p-4">
        <div className="text-xs font-bold text-white/60 mb-1">CREATE QUOTE</div>
        {[
          { icon: "🎤", label: "Voice to Quote", color: "#FB923C" },
          { icon: "📷", label: "Photo AI", color: "#34D399" },
          { icon: "↔️", label: "Before / After", color: "#F472B6" },
          { icon: "⌨️", label: "Describe It", color: "#60A5FA" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5"
            style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}
          >
            <span className="text-base">{item.icon}</span>
            <span className="text-white text-xs font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: "Quote Detail",
    description: "Editable line items with GST",
    bg: "#0F0820",
    content: (
      <div className="flex flex-col gap-2 p-4">
        <div className="text-xs font-bold text-white/60 mb-1">QUOTE #Q-2026-0042</div>
        {[
          { desc: "Labour — 3 hrs @ $110/hr", amount: "$330.00" },
          { desc: "Cable 20m (2.5mm twin)", amount: "$48.00" },
          { desc: "Switchboard component", amount: "$95.00" },
        ].map((item) => (
          <div key={item.desc} className="flex justify-between items-center text-xs py-2 border-b border-white/10">
            <span className="text-white/70 flex-1 pr-2">{item.desc}</span>
            <span className="text-white font-semibold">{item.amount}</span>
          </div>
        ))}
        <div className="flex justify-between text-xs pt-2">
          <span className="text-white/50">Subtotal</span><span className="text-white">$473.00</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/50">GST (10%)</span><span className="text-white">$47.30</span>
        </div>
        <div className="flex justify-between text-sm font-bold pt-2 border-t border-white/10">
          <span className="text-white">Total</span><span style={{ color: "#8B5CF6" }}>$520.30</span>
        </div>
      </div>
    ),
  },
  {
    label: "Analytics",
    description: "Track your revenue and time saved",
    bg: "#080808",
    content: (
      <div className="flex flex-col gap-3 p-4">
        <div className="text-xs font-bold text-white/60 mb-1">THIS MONTH</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Revenue", value: "$8,420", color: "#4ADE80" },
            { label: "Quotes", value: "23", color: "#8B5CF6" },
            { label: "Approved", value: "18", color: "#60A5FA" },
            { label: "Hours Saved", value: "12h", color: "#F472B6" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-3" style={{ background: "#151515" }}>
              <div className="text-xs text-white/50 mb-1">{s.label}</div>
              <div className="text-sm font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
        {/* Mini bar chart */}
        <div className="flex items-end gap-1 h-12 mt-2">
          {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 5 ? "#8B5CF6" : "#262626" }}/>
          ))}
        </div>
        <div className="text-xs text-white/30 text-center">Last 7 days</div>
      </div>
    ),
  },
  {
    label: "PDF Preview",
    description: "Professional invoices, ready to send",
    bg: "#f8f8f8",
    content: (
      <div className="flex flex-col gap-2 p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="text-xs font-bold text-gray-800">INVOICE</div>
            <div className="text-xs text-gray-500">#INV-2026-0012</div>
          </div>
          <div className="text-xs font-bold text-purple-600">SENT</div>
        </div>
        <div className="text-xs text-gray-500 mb-3">Dave&apos;s Electrical · ABN 12 345 678 901</div>
        {[
          { desc: "Install power points x4", amount: "$280.00" },
          { desc: "Labour 2.5hrs", amount: "$275.00" },
        ].map((r) => (
          <div key={r.desc} className="flex justify-between text-xs py-1 border-b border-gray-200">
            <span className="text-gray-600">{r.desc}</span>
            <span className="text-gray-800 font-medium">{r.amount}</span>
          </div>
        ))}
        <div className="flex justify-between text-xs font-bold pt-2" style={{ color: "#8B5CF6" }}>
          <span>Total (inc. GST)</span><span>$610.50</span>
        </div>
      </div>
    ),
  },
  {
    label: "Before / After",
    description: "Quote the scope of change",
    bg: "#0F0820",
    content: (
      <div className="flex flex-col gap-3 p-4">
        <div className="text-xs font-bold text-white/60 mb-1">BEFORE / AFTER QUOTE</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl aspect-square flex flex-col items-center justify-center" style={{ background: "#151515", border: "1px dashed #F472B620" }}>
            <span className="text-2xl mb-1">📷</span>
            <span className="text-[10px] text-white/40">Before</span>
          </div>
          <div className="rounded-xl aspect-square flex flex-col items-center justify-center" style={{ background: "#151515", border: "1px dashed #F472B620" }}>
            <span className="text-2xl mb-1">📷</span>
            <span className="text-[10px] text-white/40">After</span>
          </div>
        </div>
        <button className="w-full py-2.5 rounded-xl text-xs font-semibold" style={{ background: "#F472B620", color: "#F472B6", border: "1px solid #F472B630" }}>
          ✨ Analyse Changes
        </button>
      </div>
    ),
  },
];

export default function AppScreenshots() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  const next = useCallback(() => setActive((a) => (a + 1) % SLIDES.length), []);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [next, reduced]);

  const slide = SLIDES[active];

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* 3D crystal — decorative, right side, desktop only */}
      <div
        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none"
        style={{ width: 340, height: 340 }}
      >
        <FloatingCrystal color="#3b82f6" wireColor="#93c5fd" height={340} />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[--primary] text-sm font-semibold uppercase tracking-widest mb-3">
            The App
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[--text] mb-4">
            See it in action
          </h2>
          <p className="text-[--text-muted] text-lg max-w-xl mx-auto">
            Built from the ground up for mobile — clean, fast, and works on any job site.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Phone frame */}
          <motion.div
            className="shrink-0 relative"
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Glow behind phone */}
            <div
              className="absolute inset-0 blur-3xl opacity-20 rounded-full"
              style={{ background: "var(--primary)" }}
            />

            {/* Phone shell */}
            <div
              className="relative w-[220px] h-[430px] rounded-[2.5rem] p-2 shadow-2xl"
              style={{
                background: "#1a1a1a",
                border: "2px solid #333",
                boxShadow: "0 40px 80px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.05)",
              }}
            >
              {/* Screen */}
              <div
                className="w-full h-full rounded-[2rem] overflow-hidden relative"
                style={{ background: slide.bg, transition: "background 0.4s" }}
              >
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-10" />

                {/* Screen content */}
                <div className="pt-10 h-full overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={reduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      {slide.content}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Slide info + dots */}
          <div className="flex-1 text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduced ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-[--text] mb-2">
                  {slide.label}
                </h3>
                <p className="text-[--text-muted] mb-6">{slide.description}</p>
              </motion.div>
            </AnimatePresence>

            {/* Dot navigation */}
            <div className="flex gap-2 justify-center lg:justify-start mb-8">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="transition-all cursor-pointer"
                  style={{
                    width: active === i ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: active === i ? "var(--primary)" : "var(--border)",
                  }}
                />
              ))}
            </div>

            {/* Slide labels */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SLIDES.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setActive(i)}
                  className="px-3 py-2 rounded-xl text-xs font-medium text-left transition-all cursor-pointer"
                  style={{
                    background: active === i ? "var(--primary-bg)" : "var(--surface)",
                    color: active === i ? "var(--text-soft)" : "var(--text-muted)",
                    border: `1px solid ${active === i ? "var(--primary)" + "30" : "var(--border)"}`,
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
