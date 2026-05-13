"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className = "",
  hover = false,
  delay = 0,
}: GlassCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`glass-card ${className}`}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={
        hover && !reduced ? { y: -4, transition: { duration: 0.2 } } : undefined
      }
    >
      {children}
    </motion.div>
  );
}
