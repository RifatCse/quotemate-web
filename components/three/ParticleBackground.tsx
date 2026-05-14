'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 120 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null!);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      speeds[i] = 0.002 + Math.random() * 0.008;
    }
    return { positions, speeds };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return geo;
  }, [positions]);

  useFrame(() => {
    const pos = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i];
      if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10;
    }
    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        color="#f59e0b"
        size={0.04}
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

import { ThreeErrorBoundary } from './ThreeErrorBoundary';

function ParticleBackgroundInner() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1]}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Particles count={150} />
    </Canvas>
  );
}

export default function ParticleBackground() {
  return (
    <ThreeErrorBoundary>
      <ParticleBackgroundInner />
    </ThreeErrorBoundary>
  );
}
