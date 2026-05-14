"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import WaitlistForm from "@/components/ui/WaitlistForm";
import GetAppButton from "@/components/ui/GetAppButton";

const FloatingCrystal = dynamic(
  () => import("@/components/three/FloatingCrystal"),
  { ssr: false }
);

export default function CTA() {
  const reduced = useReducedMotion();

  return (
    <section
      id="waitlist"
      className="py-28 px-4 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--bg) 0%, var(--surface-dark) 40%, var(--bg) 100%)",
      }}
    >
      {/* 3D crystal — left side, desktop */}
      {!reduced && (
        <>
          <div
            className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 opacity-35 pointer-events-none"
            style={{ width: 300, height: 300 }}
          >
            <FloatingCrystal color="#ec4899" wireColor="#f9a8d4" height={300} />
          </div>
          <div
            className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 opacity-35 pointer-events-none"
            style={{ width: 300, height: 300 }}
          >
            <FloatingCrystal color="#7c3aed" wireColor="#c4b5fd" height={300} />
          </div>
        </>
      )}

      {/* Purple glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: "var(--primary-bg)", border: "1px solid rgba(139,92,246,0.2)" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="var(--primary)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[--text] mb-3">
            Be first in line.
          </h2>
          <p className="text-[--text-muted] text-lg mb-3 leading-relaxed">
            Join the waitlist and get early access when QuoteMate launches.
            <br className="hidden sm:block" />
            Free to join. No spam. Cancel any time.
          </p>

          {/* Social proof */}
          <p className="text-[--text-muted] text-sm mb-8">
            <span className="text-[--text] font-semibold">500+</span> tradies already waiting
          </p>

          <WaitlistForm />

          {/* Get the app */}
          <div className="flex justify-center mt-5 mb-2">
            <GetAppButton size="md" />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            {[
              { icon: "🇦🇺", text: "Australian Made" },
              { icon: "🔒", text: "Privacy First" },
              { icon: "⚡", text: "Powered by GPT-4o" },
            ].map((b) => (
              <span
                key={b.text}
                className="flex items-center gap-1.5 text-xs text-[--text-muted] px-3 py-1.5 rounded-full"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <span>{b.icon}</span>
                {b.text}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
