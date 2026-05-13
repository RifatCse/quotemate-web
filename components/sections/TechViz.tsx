'use client';

import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';

const AINetworkScene = dynamic(() => import('@/components/three/AINetworkScene'), { ssr: false });

const FEATURES = [
  { icon: '🎤', label: 'Voice AI', desc: 'Speak the job in plain English' },
  { icon: '📷', label: 'Photo AI', desc: 'Snap, analyse, quote in seconds' },
  { icon: '💡', label: 'Rate Cards', desc: '2025 AU trade rates built-in' },
  { icon: '📄', label: 'GST Engine', desc: '10% inclusive, ATO-compliant' },
  { icon: '🔗', label: 'Xero & MYOB', desc: 'One-tap accounting sync' },
  { icon: '✅', label: 'ABN Verify', desc: 'Real-time ABN validation' },
];

export default function TechViz() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative py-0 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080808 0%, #0a0514 50%, #080808 100%)' }}
    >
      {/* Section label */}
      <motion.div
        className="relative z-10 text-center pt-20 pb-4 px-4"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[--primary] text-sm font-semibold uppercase tracking-widest mb-3">
          Under the Hood
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[--text] mb-4">
          AI that actually understands trades
        </h2>
        <p className="text-[--text-muted] text-lg max-w-xl mx-auto">
          Eight intelligent modules work together in real-time to produce accurate,
          compliant quotes every time.
        </p>
      </motion.div>

      {/* 3D AI network canvas */}
      <div className="relative" style={{ height: 440 }}>
        {!reduced && (
          <div className="absolute inset-0 z-0">
            <AINetworkScene />
          </div>
        )}

        {/* Node labels (overlay) */}
        <div className="absolute inset-0 z-10 pointer-events-none" />
      </div>

      {/* Feature grid below canvas */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.label}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="glass-card p-4 flex items-start gap-3"
            >
              <span className="text-xl mt-0.5">{f.icon}</span>
              <div>
                <div className="text-sm font-semibold text-white">{f.label}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{f.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
