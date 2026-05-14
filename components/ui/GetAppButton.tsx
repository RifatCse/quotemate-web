'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const APP_STORE_URL = 'https://apps.apple.com/au/app/quotemate';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=au.com.quotemate';

type Platform = 'ios' | 'android' | 'default';

function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'default';
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return 'default';
}

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const AndroidIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.523 15.341a1 1 0 01-1 1 1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1m-9.046 0a1 1 0 01-1 1 1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1m9.405-5.084l1.938-3.358a.403.403 0 00-.147-.55.403.403 0 00-.55.147L17.16 9.879A11.938 11.938 0 0012 8.75c-1.812 0-3.524.425-5.16 1.129L4.832 6.496a.403.403 0 00-.55-.147.403.403 0 00-.147.55l1.938 3.358C3.748 11.742 2.25 14.1 2.25 16.75h19.5c0-2.65-1.498-5.008-3.868-6.493z"/>
  </svg>
);

interface GetAppButtonProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function GetAppButton({ size = 'md', className = '' }: GetAppButtonProps) {
  const [platform, setPlatform] = useState<Platform>('default');

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const isAndroid = platform === 'android';
  const href = isAndroid ? PLAY_STORE_URL : APP_STORE_URL;
  const label = isAndroid ? 'Get on Google Play' : 'Download on the App Store';
  const sublabel = isAndroid ? 'Google Play' : 'App Store';

  const sizeStyles = {
    sm: { px: '16px', py: '10px', fontSize: '13px', iconSize: 16 },
    md: { px: '20px', py: '13px', fontSize: '14px', iconSize: 20 },
    lg: { px: '24px', py: '16px', fontSize: '16px', iconSize: 22 },
  }[size];

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-3 rounded-2xl font-semibold text-white transition-shadow ${className}`}
      style={{
        padding: `${sizeStyles.py} ${sizeStyles.px}`,
        fontSize: sizeStyles.fontSize,
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.14)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 0 0 0 transparent',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(0,132,61,0.3)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,132,61,0.5)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 transparent';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)';
      }}
    >
      <span style={{ opacity: 0.9 }}>
        {isAndroid ? <AndroidIcon /> : <AppleIcon />}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] font-normal opacity-70 tracking-wide">
          {isAndroid ? 'GET IT ON' : 'DOWNLOAD ON THE'}
        </span>
        <span style={{ fontSize: sizeStyles.fontSize, fontWeight: 600 }}>{sublabel}</span>
      </span>
    </motion.a>
  );
}
