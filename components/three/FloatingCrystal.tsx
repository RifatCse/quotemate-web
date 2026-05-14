'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// ─── Mechanical gear shape (replaces the original crystal) ─────────────────
function GearShape({
  color = '#f59e0b',
  wireColor = '#fbbf24',
}: {
  color?: string;
  wireColor?: string;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.rotation.z = t * 0.5;
    groupRef.current.rotation.y = Math.sin(t * 0.28) * 0.38;
  });

  const TEETH   = 10;
  const R       = 0.75;
  const TOOTH_H = R * 0.17;
  const TOOTH_W = (2 * Math.PI * R) / TEETH * 0.44;
  const THICK   = 0.30;

  return (
    <Float speed={1.6} floatIntensity={0.5} rotationIntensity={0.2}>
      <group ref={groupRef}>

        {/* Main disk — cylinder axis along Z so flat face is visible */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[R, R, THICK, 40]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.45}
            metalness={0.9}
            roughness={0.08}
          />
        </mesh>

        {/* Inner decorative ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[R * 0.5, R * 0.5, THICK + 0.01, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
            metalness={0.85}
            roughness={0.15}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Center bore */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[R * 0.19, R * 0.19, THICK + 0.02, 14]} />
          <meshStandardMaterial color="#060606" metalness={0.5} roughness={0.4} />
        </mesh>

        {/* 3 spokes radiating out */}
        {[0, 1, 2].map((i) => (
          <mesh key={`s${i}`} rotation={[0, 0, (i * Math.PI) / 3]}>
            <boxGeometry args={[R * 0.98, R * 0.055, THICK * 0.55]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.35}
              metalness={0.88}
              roughness={0.1}
            />
          </mesh>
        ))}

        {/* Teeth around perimeter */}
        {Array.from({ length: TEETH }).map((_, i) => {
          const angle = (i / TEETH) * Math.PI * 2;
          const cx = Math.cos(angle) * (R + TOOTH_H / 2);
          const cy = Math.sin(angle) * (R + TOOTH_H / 2);
          return (
            <mesh key={i} position={[cx, cy, 0]} rotation={[0, 0, angle]}>
              <boxGeometry args={[TOOTH_H, TOOTH_W, THICK]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.4}
                metalness={0.9}
                roughness={0.08}
              />
            </mesh>
          );
        })}

        {/* Outer wireframe ring */}
        <mesh>
          <torusGeometry args={[R + TOOTH_H + 0.032, 0.011, 6, 64]} />
          <meshBasicMaterial color={wireColor} transparent opacity={0.28} />
        </mesh>
      </group>
    </Float>
  );
}

import { ThreeErrorBoundary } from './ThreeErrorBoundary';

interface FloatingCrystalProps {
  color?: string;
  wireColor?: string;
  height?: string | number;
}

function FloatingCrystalInner({ color, wireColor, height = 320 }: FloatingCrystalProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1]}
      style={{ height, width: '100%' }}
    >
      <ambientLight intensity={0.2} />
      <pointLight color={color ?? '#f59e0b'} intensity={3.5} distance={8} position={[2, 2, 2]} />
      <pointLight color="#fff4d6" intensity={2.0} distance={7} position={[-2, -1, 1]} />

      <GearShape color={color} wireColor={wireColor} />
    </Canvas>
  );
}

export default function FloatingCrystal(props: FloatingCrystalProps) {
  return (
    <ThreeErrorBoundary>
      <FloatingCrystalInner {...props} />
    </ThreeErrorBoundary>
  );
}
