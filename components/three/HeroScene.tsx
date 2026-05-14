'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ThreeErrorBoundary } from './ThreeErrorBoundary';

// ─── Colour palette — warm Australian trade ────────────────────────────────
const GOLD   = '#f59e0b';
const AMBER  = '#fbbf24';
const ELEC   = '#60a5fa'; // electrician blue
const PLUMB  = '#34d399'; // plumber green
const PAINT  = '#f472b6'; // painter pink
const CARP   = '#fb923c'; // carpenter orange
const ROOF   = '#a78bfa'; // roofer purple (brand)

// ─── Central spanner / wrench ─────────────────────────────────────────────
function Spanner() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.rotation.z = Math.sin(t * 0.35) * 0.18;
    groupRef.current.rotation.y = t * 0.12;
  });

  const mat = (
    <meshStandardMaterial
      color={GOLD}
      emissive={AMBER}
      emissiveIntensity={0.35}
      metalness={0.92}
      roughness={0.08}
    />
  );

  return (
    <group ref={groupRef}>
      {/* Handle — tapered bar */}
      <mesh position={[0, -0.72, 0]}>
        <boxGeometry args={[0.28, 1.5, 0.18]} />
        {mat}
      </mesh>

      {/* Grip ridges on handle */}
      {[-0.6, -0.3, 0.0, 0.3].map((y) => (
        <mesh key={y} position={[0, y - 0.35, 0.1]}>
          <boxGeometry args={[0.3, 0.055, 0.04]} />
          <meshStandardMaterial color={AMBER} metalness={0.85} roughness={0.1} />
        </mesh>
      ))}

      {/* Hex head (6-sided nut shape) */}
      <mesh position={[0, 0.82, 0]}>
        <cylinderGeometry args={[0.54, 0.54, 0.2, 6]} />
        {mat}
      </mesh>

      {/* Inner hex hole */}
      <mesh position={[0, 0.82, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.22, 6]} />
        <meshStandardMaterial color="#0a0600" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Neck connecting handle to head */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.16, 0.14, 0.45, 8]} />
        {mat}
      </mesh>
    </group>
  );
}

// ─── Floating trade tool shapes ────────────────────────────────────────────
function TradeTool({
  position,
  color,
  shape,
  speed,
  offset,
}: {
  position: [number, number, number];
  color: string;
  shape: 'bolt' | 'drop' | 'brush' | 'beam' | 'tile';
  speed: number;
  offset: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    meshRef.current.rotation.x = t * 0.6;
    meshRef.current.rotation.y = t * 0.9;
    meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.7 + offset) * 0.25;
  });

  const mat = (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={0.5}
      metalness={0.8}
      roughness={0.15}
    />
  );

  const geo: Record<string, JSX.Element> = {
    bolt:  <octahedronGeometry args={[0.22, 0]} />,  // lightning bolt / electrician
    drop:  <sphereGeometry args={[0.18, 8, 8]} />,   // water drop / plumber
    brush: <cylinderGeometry args={[0.1, 0.06, 0.42, 8]} />, // paint brush / painter
    beam:  <boxGeometry args={[0.38, 0.1, 0.1]} />,  // timber beam / carpenter
    tile:  <boxGeometry args={[0.22, 0.22, 0.06]} />, // tile / tiler
  };

  return (
    <mesh ref={meshRef} position={position}>
      {geo[shape]}
      {mat}
    </mesh>
  );
}

// ─── Orbiting ring around the spanner ─────────────────────────────────────
function OrbitRing({
  radius,
  speed,
  tilt,
}: {
  radius: number;
  speed: number;
  tilt: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * speed;
  });

  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.007, 6, 100]} />
      <meshBasicMaterial color={GOLD} transparent opacity={0.25} />
    </mesh>
  );
}

// ─── Warm dust particles ───────────────────────────────────────────────────
function DustParticles() {
  const ref = useRef<THREE.Points>(null!);

  const { geo, speeds } = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      speeds[i] = 0.003 + Math.random() * 0.007;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return { geo: g, speeds };
  }, []);

  useFrame(() => {
    const pos = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < 80; i++) {
      pos[i * 3 + 1] += speeds[i];
      if (pos[i * 3 + 1] > 7) pos[i * 3 + 1] = -7;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={AMBER} size={0.045} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

// ─── Scene contents ────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      {/* Warm Australian sun key light */}
      <ambientLight intensity={0.18} />
      <pointLight color={GOLD}  intensity={4}   distance={10} position={[ 2, 3,  3]} />
      <pointLight color={ELEC}  intensity={1.8}  distance={8}  position={[-3, 1,  1]} />
      <pointLight color="#fff8e7" intensity={1.2} distance={12} position={[ 0, -3, 2]} />

      {/* Far stars */}
      <Stars radius={70} depth={50} count={2000} factor={2.5} fade speed={0.4} />

      {/* Central spanner */}
      <Float speed={1.2} floatIntensity={0.4} rotationIntensity={0.15}>
        <Spanner />
      </Float>

      {/* Orbit rings around spanner */}
      <OrbitRing radius={2.4} speed={ 0.3} tilt={[0.3, 0,    0  ]} />
      <OrbitRing radius={2.9} speed={-0.2} tilt={[1.0, 0.4,  0  ]} />

      {/* Trade tool icons floating outward */}
      <TradeTool position={[-3.0,  0.8, -0.5]} color={ELEC}  shape="bolt"  speed={0.7} offset={0}    />
      <TradeTool position={[ 2.8,  1.2,  0.3]} color={PLUMB} shape="drop"  speed={0.5} offset={1.2}  />
      <TradeTool position={[-2.6, -1.5,  0.8]} color={PAINT} shape="brush" speed={0.9} offset={2.4}  />
      <TradeTool position={[ 2.4, -1.8, -0.4]} color={CARP}  shape="beam"  speed={0.6} offset={3.6}  />
      <TradeTool position={[ 0.4,  3.0, -1.0]} color={ROOF}  shape="tile"  speed={0.8} offset={4.8}  />
      <TradeTool position={[-0.6, -3.2,  0.6]} color={GOLD}  shape="bolt"  speed={0.6} offset={0.9}  />

      {/* Warm dust */}
      <DustParticles />
    </>
  );
}

// ─── Export ────────────────────────────────────────────────────────────────
function HeroSceneInner() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 52 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1]}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Scene />
    </Canvas>
  );
}

export default function HeroScene() {
  return (
    <ThreeErrorBoundary>
      <HeroSceneInner />
    </ThreeErrorBoundary>
  );
}
