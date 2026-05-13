"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[0] }) {
  return (
    <div
      className="glass-card shrink-0 p-6 w-[300px] sm:w-[340px] flex flex-col gap-4"
    >
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="#FCD34D"
              stroke="#FCD34D"
              strokeWidth="1"
            />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p className="text-[--text] text-sm leading-relaxed flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: "var(--primary)" }}
        >
          {t.name[0]}
        </div>
        <div>
          <div className="text-sm font-semibold text-[--text]">{t.name}</div>
          <div className="text-xs text-[--text-muted]">
            {t.role} · {t.location}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const reduced = useReducedMotion();
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-24 overflow-hidden">
      {/* Header */}
      <motion.div
        className="text-center px-4 mb-14"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[--primary] text-sm font-semibold uppercase tracking-widest mb-3">
          Testimonials
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[--text] mb-4">
          Tradies love it
        </h2>
        <p className="text-[--text-muted] text-lg max-w-xl mx-auto">
          Don&apos;t take our word for it — hear from the tradies using QuoteMate
          every day.
        </p>
      </motion.div>

      {/* Marquee track */}
      <div
        className="testimonials-track relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div
          className={`flex gap-5 w-max ${reduced ? "" : "animate-marquee"}`}
          style={{ paddingLeft: "20px" }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
