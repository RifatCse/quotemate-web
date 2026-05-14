'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ThreeErrorBoundary } from './ThreeErrorBoundary';

// ─── Colour palette — warm Australian trade ────────────────────────────────
const GOLD  = '#f59e0b';
const AMBER = '#fbbf24';
const CARP  = '#fb923c';  // carpenter orange / warm accent

// ─── Single gear geometry (all in XY plane, viewed face-on from +Z) ───────
function GearMesh({
  baseRadius,
  teethCount,
  color,
  thickness = 0.30,
}: {
  baseRadius: number;
  teethCount: number;
  color: string;
  thickness?: number;
}) {
  const TOOTH_H = baseRadius * 0.15;
  const TOOTH_W = (2 * Math.PI * baseRadius) / teethCount * 0.44;

  return (
    <group>
      {/* Main disk — cylinder rotated so flat face points at camera (+Z) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[baseRadius, baseRadius, thickness, 40]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.28}
          metalness={0.88}
          roughness={0.1}
        />
      </mesh>

      {/* Inner decorative hub ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[baseRadius * 0.45, baseRadius * 0.45, thickness + 0.01, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.14}
          metalness={0.85}
          roughness={0.18}
          transparent
          opacity={0.82}
        />
      </mesh>

      {/* Center bore */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[baseRadius * 0.18, baseRadius * 0.18, thickness + 0.02, 12]} />
        <meshStandardMaterial color="#060604" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* 3 spokes */}
      {[0, 1, 2].map((i) => (
        <mesh key={`sp${i}`} rotation={[0, 0, (i * Math.PI) / 3]}>
          <boxGeometry args={[baseRadius * 0.95, baseRadius * 0.042, thickness * 0.58]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.22}
            metalness={0.88}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Teeth */}
      {Array.from({ length: teethCount }).map((_, i) => {
        const angle = (i / teethCount) * Math.PI * 2;
        const cx = Math.cos(angle) * (baseRadius + TOOTH_H / 2);
        const cy = Math.sin(angle) * (baseRadius + TOOTH_H / 2);
        return (
          <mesh key={i} position={[cx, cy, 0]} rotation={[0, 0, angle]}>
            <boxGeometry args={[TOOTH_H, TOOTH_W, thickness]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.28}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        );
      })}

      {/* Outer torus ring (accent) */}
      <mesh>
        <torusGeometry args={[baseRadius + TOOTH_H + 0.03, 0.011, 6, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

// ─── Animated gear wrapper ─────────────────────────────────────────────────
function Gear({
  position,
  baseRadius,
  teethCount,
  color,
  speed,
  initialAngle = 0,
}: {
  position: [number, number, number];
  baseRadius: number;
  teethCount: number;
  color: string;
  speed: number;
  initialAngle?: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    groupRef.current.rotation.z = clock.getElapsedTime() * speed + initialAngle;
  });

  return (
    <group ref={groupRef} position={position}>
      <GearMesh baseRadius={baseRadius} teethCount={teethCount} color={color} />
    </group>
  );
}

// ─── Warm dust / spark particles ──────────────────────────────────────────
function GearDust() {
  const ref = useRef<THREE.Points>(null!);

  const { geo, speeds } = useMemo(() => {
    const count = 55;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      speeds[i] = 0.003 + Math.random() * 0.006;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return { geo: g, speeds };
  }, []);

  useFrame(() => {
    const pos = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < 55; i++) {
      pos[i * 3 + 1] += speeds[i];
      if (pos[i * 3 + 1] > 4.5) pos[i * 3 + 1] = -4.5;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={AMBER} size={0.032} transparent opacity={0.38} sizeAttenuation />
    </points>
  );
}

// ─── Scene — parent tilts gently to reveal 3-D depth ─────────────────────
function GearScene() {
  const sceneRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    sceneRef.current.rotation.x = Math.sin(t * 0.11) * 0.22;
    sceneRef.current.rotation.y = Math.sin(t * 0.08) * 0.18;
  });

  return (
    <group ref={sceneRef}>
      {/* Lights */}
      <ambientLight intensity={0.18} />
      <pointLight color={GOLD}   intensity={5}   distance={14} position={[1, 2, 4]} />
      <pointLight color="#fff4d6" intensity={2.5} distance={10} position={[-3, -1, 3]} />
      <pointLight color={CARP}   intensity={1.8} distance={8}  position={[3, -2, 2]} />

      {/* Subtle blueprint-grid backdrop */}
      <gridHelper
        args={[18, 18, '#18100a', '#0e0804']}
        // @ts-expect-error — rotation prop accepted at runtime by R3F
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, -1.6]}
      />

      {/*
        Three interlocking gears.
        Speed ratios satisfy ω_B = -ω_A * r_A / r_B so teeth mesh in sync.

        Gear A (centre):   r=1.1, 12 teeth, speed=+0.22 rad/s
        Gear B (right):    r=0.85, 9 teeth, speed=-0.285 rad/s  (-0.22 × 1.1/0.85)
        Gear C (left):     r=0.65, 7 teeth, speed=-0.372 rad/s  (-0.22 × 1.1/0.65)
      */}
      <Gear
        position={[0, 0, 0]}
        baseRadius={1.1}
        teethCount={12}
        color={GOLD}
        speed={0.22}
        initialAngle={0}
      />
      <Gear
        position={[2.35, 0.05, -0.3]}
        baseRadius={0.85}
        teethCount={9}
        color={AMBER}
        speed={-0.285}
        initialAngle={Math.PI / 9}
      />
      <Gear
        position={[-2.1, 0.18, -0.2]}
        baseRadius={0.65}
        teethCount={7}
        color={CARP}
        speed={-0.372}
        initialAngle={Math.PI / 7}
      />

      <GearDust />
    </group>
  );
}

// ─── Canvas wrapper ────────────────────────────────────────────────────────
function AINetworkSceneInner() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 58 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1]}
      style={{ position: 'absolute', inset: 0 }}
    >
      <GearScene />
    </Canvas>
  );
}

export default function AINetworkScene() {
  return (
    <ThreeErrorBoundary>
      <AINetworkSceneInner />
    </ThreeErrorBoundary>
  );
}
