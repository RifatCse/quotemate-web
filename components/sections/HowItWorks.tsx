"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { HOW_IT_WORKS } from "@/lib/constants";

const ParticleBackground = dynamic(
  () => import("@/components/three/ParticleBackground"),
  { ssr: false }
);

const ICONS = {
  describe: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M12 18.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 8v4l2.5 2.5M21 21l-2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  ai: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  send: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M9 12h6M9 16h4M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

const ACCENT_COLORS = ["#8B5CF6", "#34D399", "#60A5FA"];

export default function HowItWorks() {
  const reduced = useReducedMotion();

  return (
    <section id="how-it-works" className="relative py-24 px-4 overflow-hidden">
      {/* Subtle 3D particle field */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <ParticleBackground />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[--primary] text-sm font-semibold uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[--text] mb-4">
            Three steps to a pro quote
          </h2>
          <p className="text-[--text-muted] text-lg max-w-xl mx-auto">
            No training required. If you can describe a job, you can use
            QuoteMate.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting dashed line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-1/4 right-1/4 h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, var(--primary), var(--primary), transparent)", opacity: 0.3 }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <GlassCard
                key={step.step}
                className="p-8 text-center"
                hover
                delay={i * 0.12}
              >
                {/* Step number */}
                <div className="text-xs font-bold tracking-widest text-[--text-muted] mb-4">
                  STEP {step.step}
                </div>

                {/* Icon with float animation */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 animate-float"
                  style={{
                    background: `${ACCENT_COLORS[i]}18`,
                    color: ACCENT_COLORS[i],
                    animationDelay: `${i * 0.6}s`,
                  }}
                >
                  {ICONS[step.icon as keyof typeof ICONS]}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-[--text] mb-3">
                  {step.title}
                </h3>
                <p className="text-[--text-muted] text-sm leading-relaxed">
                  {step.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { value: "60s", label: "Average quote time" },
            { value: "5,000+", label: "Quotes generated" },
            { value: "$39/mo", label: "Pro plan, AUD" },
            { value: "100%", label: "GST compliant" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-[--text-muted]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
