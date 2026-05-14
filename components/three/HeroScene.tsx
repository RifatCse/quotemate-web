'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ThreeErrorBoundary } from './ThreeErrorBoundary';

// ─── Colour palette ────────────────────────────────────────────────────────
const GOLD   = '#f59e0b';
const AMBER  = '#fbbf24';
const ELEC   = '#60a5fa'; // electrician blue
const PLUMB  = '#34d399'; // plumber green
const PAINT  = '#f472b6'; // painter pink
const CARP   = '#fb923c'; // carpenter orange
const GREEN  = '#00843D'; // Bunnings green
const RED    = '#E4002B'; // Bunnings red

// ─── Shared material helper ────────────────────────────────────────────────
function MetalMat({ color, emissiveIntensity = 0.3 }: { color: string; emissiveIntensity?: number }) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={emissiveIntensity}
      metalness={0.9}
      roughness={0.1}
    />
  );
}

// ─── Central spanner / wrench ─────────────────────────────────────────────
function Spanner() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.rotation.z = Math.sin(t * 0.35) * 0.18;
    groupRef.current.rotation.y = t * 0.12;
  });

  return (
    <group ref={groupRef}>
      {/* Handle */}
      <mesh position={[0, -0.72, 0]}>
        <boxGeometry args={[0.28, 1.5, 0.18]} />
        <MetalMat color={GOLD} />
      </mesh>
      {/* Grip ridges */}
      {[-0.6, -0.3, 0.0, 0.3].map((y) => (
        <mesh key={y} position={[0, y - 0.35, 0.1]}>
          <boxGeometry args={[0.3, 0.055, 0.04]} />
          <meshStandardMaterial color={AMBER} metalness={0.85} roughness={0.1} />
        </mesh>
      ))}
      {/* Hex head */}
      <mesh position={[0, 0.82, 0]}>
        <cylinderGeometry args={[0.54, 0.54, 0.2, 6]} />
        <MetalMat color={GOLD} />
      </mesh>
      {/* Inner hex hole */}
      <mesh position={[0, 0.82, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.22, 6]} />
        <meshStandardMaterial color="#0a0600" metalness={0.4} roughness={0.5} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.16, 0.14, 0.45, 8]} />
        <MetalMat color={GOLD} />
      </mesh>
    </group>
  );
}

// ─── Hammer ────────────────────────────────────────────────────────────────
function Hammer({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.z = Math.sin(t * 0.55) * 0.28;
    ref.current.rotation.y = t * 0.35;
    ref.current.position.y = position[1] + Math.sin(t * 0.7) * 0.22;
  });
  return (
    <group ref={ref} position={position}>
      {/* Main head body */}
      <mesh position={[0, 0.28, 0]}>
        <boxGeometry args={[0.48, 0.22, 0.22]} />
        <MetalMat color={CARP} />
      </mesh>
      {/* Striking face — polished flat cap */}
      <mesh position={[0.25, 0.28, 0]}>
        <boxGeometry args={[0.04, 0.22, 0.22]} />
        <meshStandardMaterial color={AMBER} metalness={0.98} roughness={0.02} emissive={AMBER} emissiveIntensity={0.2} />
      </mesh>
      {/* Claw prong 1 */}
      <mesh position={[-0.22, 0.38, 0.055]} rotation={[0, 0, 0.55]}>
        <boxGeometry args={[0.18, 0.055, 0.06]} />
        <MetalMat color={CARP} emissiveIntensity={0.2} />
      </mesh>
      {/* Claw prong 2 */}
      <mesh position={[-0.22, 0.38, -0.055]} rotation={[0, 0, 0.55]}>
        <boxGeometry args={[0.18, 0.055, 0.06]} />
        <MetalMat color={CARP} emissiveIntensity={0.2} />
      </mesh>
      {/* Handle */}
      <mesh position={[0, -0.38, 0]}>
        <cylinderGeometry args={[0.045, 0.065, 0.95, 10]} />
        <meshStandardMaterial color="#7c4a1e" metalness={0.1} roughness={0.85} />
      </mesh>
      {/* Grip wrap bands */}
      {[-0.1, 0.1, 0.3].map((y) => (
        <mesh key={y} position={[0, y - 0.38, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.04, 10]} />
          <meshStandardMaterial color="#222" metalness={0.4} roughness={0.6} />
        </mesh>
      ))}
      {/* Eye (where handle meets head) */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.07, 0.065, 0.1, 8]} />
        <MetalMat color={CARP} emissiveIntensity={0.15} />
      </mesh>
    </group>
  );
}

// ─── Power drill ──────────────────────────────────────────────────────────
function Drill({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(t * 0.5) * 0.22;
    ref.current.rotation.y = t * 0.45;
    ref.current.position.y = position[1] + Math.sin(t * 0.8 + 1.0) * 0.2;
  });
  return (
    <group ref={ref} position={position} rotation={[0, 0, Math.PI / 2]}>
      {/* Body */}
      <mesh>
        <cylinderGeometry args={[0.13, 0.13, 0.52, 14]} />
        <MetalMat color={ELEC} />
      </mesh>
      {/* Chuck — 3-jaw appearance with slight taper */}
      <mesh position={[0, 0.31, 0]}>
        <cylinderGeometry args={[0.09, 0.11, 0.14, 6]} />
        <meshStandardMaterial color="#444" metalness={0.95} roughness={0.05} />
      </mesh>
      {/* Chuck jaw lines */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[Math.cos((i / 3) * Math.PI * 2) * 0.085, 0.31, Math.sin((i / 3) * Math.PI * 2) * 0.085]}>
          <boxGeometry args={[0.018, 0.15, 0.018]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      {/* Drill bit shaft */}
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.022, 0.028, 0.46, 6]} />
        <MetalMat color={GOLD} emissiveIntensity={0.35} />
      </mesh>
      {/* Bit fluting rings */}
      {[0.48, 0.58, 0.68, 0.78].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <torusGeometry args={[0.025, 0.007, 4, 8]} />
          <MetalMat color={GOLD} emissiveIntensity={0.5} />
        </mesh>
      ))}
      {/* Bit sharp tip */}
      <mesh position={[0, 0.87, 0]}>
        <coneGeometry args={[0.022, 0.08, 6]} />
        <MetalMat color={GOLD} emissiveIntensity={0.5} />
      </mesh>
      {/* Handle */}
      <mesh position={[0, -0.38, 0]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.065, 0.055, 0.4, 10]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.6} />
      </mesh>
    </group>
  );
}

// ─── Paint roller ─────────────────────────────────────────────────────────
function PaintRoller({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * 0.65;
    ref.current.rotation.y = Math.sin(t * 0.4 + 2.0) * 0.3;
    ref.current.position.y = position[1] + Math.sin(t * 0.75 + 2.0) * 0.2;
  });
  return (
    <group ref={ref} position={position}>
      {/* Roller sleeve */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.48, 14]} />
        <MetalMat color={PAINT} emissiveIntensity={0.45} />
      </mesh>
      {/* Axle */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.56, 6]} />
        <meshStandardMaterial color="#aaa" metalness={0.8} roughness={0.15} />
      </mesh>
      {/* L-arm */}
      <mesh position={[0.28, -0.16, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.38, 6]} />
        <meshStandardMaterial color="#aaa" metalness={0.75} roughness={0.2} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.28, -0.42, 0]}>
        <cylinderGeometry args={[0.045, 0.035, 0.44, 8]} />
        <meshStandardMaterial color="#c0392b" metalness={0.2} roughness={0.8} />
      </mesh>
    </group>
  );
}

// ─── Circular saw blade ───────────────────────────────────────────────────
function SawBlade({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);
  const TEETH = 20;
  const R = 0.32;
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 2.0;
    ref.current.position.y = position[1] + Math.sin(t * 0.65 + 3.0) * 0.2;
  });
  return (
    <group ref={ref} position={position}>
      {/* Main disk */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[R, R, 0.036, 40]} />
        <MetalMat color={GREEN} emissiveIntensity={0.22} />
      </mesh>
      {/* Lightening holes */}
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * R * 0.55, 0, Math.sin(a) * R * 0.55]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.046, 0.046, 0.05, 8]} />
            <meshStandardMaterial color="#111" metalness={0.4} roughness={0.6} />
          </mesh>
        );
      })}
      {/* Alternating-set teeth — every other tooth tilted ±8° */}
      {Array.from({ length: TEETH }).map((_, i) => {
        const angle = (i / TEETH) * Math.PI * 2;
        const cx = Math.cos(angle) * (R + 0.038);
        const cz = Math.sin(angle) * (R + 0.038);
        const setTilt = i % 2 === 0 ? 0.14 : -0.14;
        return (
          <mesh key={i} position={[cx, 0, cz]} rotation={[setTilt, -angle, 0]}>
            <boxGeometry args={[0.065, 0.036, 0.032]} />
            <MetalMat color={GREEN} emissiveIntensity={0.35} />
          </mesh>
        );
      })}
      {/* Center arbor hole */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.065, 0.065, 0.05, 12]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Arbor ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.065, 0.012, 6, 20]} />
        <MetalMat color={AMBER} emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

// ─── Pipe (plumber) ───────────────────────────────────────────────────────
function Pipe({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.4;
    ref.current.rotation.z = Math.sin(t * 0.55 + 1.2) * 0.3;
    ref.current.position.y = position[1] + Math.sin(t * 0.7 + 1.2) * 0.22;
  });
  return (
    <group ref={ref} position={position}>
      {/* Pipe body */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.65, 14]} />
        <MetalMat color={PLUMB} />
      </mesh>
      {/* Inner bore */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.076, 0.076, 0.68, 12]} />
        <meshStandardMaterial color="#0a1a12" metalness={0.3} roughness={0.6} />
      </mesh>
      {/* End flanges */}
      {[0.34, -0.34].map((z) => (
        <mesh key={z} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, z]}>
          <cylinderGeometry args={[0.13, 0.13, 0.048, 14]} />
          <MetalMat color={PLUMB} emissiveIntensity={0.4} />
        </mesh>
      ))}
      {/* Thread rings near each end */}
      {[-0.22, -0.14, 0.14, 0.22].map((z) => (
        <mesh key={`t${z}`} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, z]}>
          <torusGeometry args={[0.1, 0.008, 4, 14]} />
          <MetalMat color={PLUMB} emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Nail ─────────────────────────────────────────────────────────────────
function Nail({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.7;
    ref.current.rotation.z = Math.sin(t * 0.5 + 4.0) * 0.35;
    ref.current.position.y = position[1] + Math.sin(t * 0.8 + 4.0) * 0.2;
  });
  return (
    <group ref={ref} position={position}>
      {/* Shaft — uniform diameter */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.028, 0.028, 0.72, 8]} />
        <MetalMat color={RED} emissiveIntensity={0.3} />
      </mesh>
      {/* Sharp pointed tip */}
      <mesh position={[0, -0.38, 0]}>
        <coneGeometry args={[0.028, 0.1, 8]} />
        <MetalMat color={RED} emissiveIntensity={0.4} />
      </mesh>
      {/* Head — flat disk */}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.045, 12]} />
        <MetalMat color={RED} emissiveIntensity={0.25} />
      </mesh>
      {/* Head bevel edge */}
      <mesh position={[0, 0.395, 0]}>
        <cylinderGeometry args={[0.1, 0.028, 0.025, 12]} />
        <MetalMat color={RED} emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

// ─── Orbiting ring ─────────────────────────────────────────────────────────
function OrbitRing({ radius, speed, tilt }: { radius: number; speed: number; tilt: [number, number, number] }) {
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

// ─── Scene ─────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.18} />
      <pointLight color={GOLD}     intensity={4}   distance={10} position={[ 2,  3,  3]} />
      <pointLight color={ELEC}     intensity={1.8} distance={8}  position={[-3,  1,  1]} />
      <pointLight color="#fff8e7"  intensity={1.2} distance={12} position={[ 0, -3,  2]} />
      <pointLight color={GREEN}    intensity={1.5} distance={9}  position={[ 3, -2,  2]} />

      <Stars radius={70} depth={50} count={2000} factor={2.5} fade speed={0.4} />

      {/* Central wrench */}
      <Float speed={1.2} floatIntensity={0.4} rotationIntensity={0.15}>
        <Spanner />
      </Float>

      {/* Orbit rings */}
      <OrbitRing radius={2.4} speed={ 0.30} tilt={[0.3, 0,   0  ]} />
      <OrbitRing radius={2.9} speed={-0.20} tilt={[1.0, 0.4, 0  ]} />

      {/* Tradie tools floating around */}
      <Hammer      position={[-3.0,  0.8, -0.5]} />
      <Drill       position={[ 2.8,  1.2,  0.3]} />
      <PaintRoller position={[-2.6, -1.5,  0.8]} />
      <SawBlade    position={[ 2.4, -1.8, -0.4]} />
      <Pipe        position={[ 0.4,  3.0, -1.0]} />
      <Nail        position={[-0.6, -3.2,  0.6]} />

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
