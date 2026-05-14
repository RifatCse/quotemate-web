'use client';

import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import GradientText from '@/components/ui/GradientText';
import WaitlistForm from '@/components/ui/WaitlistForm';
import GetAppButton from '@/components/ui/GetAppButton';

// Load 3D canvas only on client — no SSR
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false });

const WORDS = 'Quotes in 60 seconds. Built for Aussie tradies.'.split(' ');

const TRUST_TAGS = [
  'GPT-4o Powered',
  'GST Compliant',
  'ABN Verified',
  'Xero + MYOB',
];

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-16 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 60% 10%, #031a0e 0%, #080808 60%)',
      }}
    >
      {/* ── 3D canvas fills the entire section ── */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* ── Subtle vignette so text stays readable ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(8,8,8,0.55) 100%)',
        }}
      />

      {/* ── Bottom fade to bg colour ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #080808)',
        }}
      />

      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),
                            linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <Badge variant="shimmer">
            <span className="w-1.5 h-1.5 rounded-full bg-[--success] inline-block animate-float" />
            Now Accepting Beta Waitlist
          </Badge>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
          {WORDS.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.3 + i * 0.05,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {word === 'tradies.' ? (
                <GradientText>{word}</GradientText>
              ) : (
                <span className="text-[--text]">{word}</span>
              )}
            </motion.span>
          ))}
        </h1>

        {/* Sub-headline */}
        <motion.p
          className="text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ color: 'var(--text-muted)' }}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
        >
          Speak your job, snap a photo, or describe it — QuoteMate turns it into a{' '}
          <span className="text-[--text]">GST-compliant quote</span> instantly. Used by
          electricians, plumbers, painters, and handymen across Australia.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mb-6"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <WaitlistForm />
        </motion.div>

        {/* Get the app button */}
        <motion.div
          className="flex justify-center mb-10"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <GetAppButton size="lg" />
        </motion.div>

        {/* Trust tags */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-5"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          {TRUST_TAGS.map((tag) => (
            <span
              key={tag}
              className="text-xs flex items-center gap-1.5"
              style={{ color: 'var(--text-muted)' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="var(--success)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span className="text-xs" style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
          SCROLL
        </span>
        <motion.div
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, var(--primary), transparent)' }}
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
