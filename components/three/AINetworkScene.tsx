'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// ─── Network node ─────────────────────────────────────────────────────────
function Node({
  position,
  color,
  size = 0.08,
  emissive = 2,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
  emissive?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 2 + position[0]) * 0.15;
    meshRef.current.scale.setScalar(pulse);
  });
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 10, 10]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={emissive} />
    </mesh>
  );
}

// ─── Connection line between nodes ────────────────────────────────────────
function Connection({
  start,
  end,
  color = '#8b5cf6',
  opacity = 0.25,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  opacity?: number;
}) {
  const lineRef = useRef<THREE.Line>(null!);

  const geometry = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [start, end]);

  return (
    // @ts-expect-error — Line extends Object3D but tsx types are strict
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  );
}

// ─── Central AI orb ───────────────────────────────────────────────────────
function AIOrb() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    ringRef.current.rotation.z = t * 0.5;
    ring2Ref.current.rotation.x = t * 0.35;
    // Breathe
    const s = 1 + Math.sin(t * 0.8) * 0.05;
    meshRef.current.scale.setScalar(s);
  });

  return (
    <group>
      {/* Core */}
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#5b21b6"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.95}
          wireframe={false}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.75, 16, 16]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.05} />
      </mesh>

      {/* Rings */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.0, 0.012, 6, 80]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[0.8, 0.4, 0]}>
        <torusGeometry args={[1.25, 0.008, 6, 80]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

// ─── Animated connection pulse ─────────────────────────────────────────────
function PulsingPath({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const speed = 0.4 + Math.random() * 0.4;
  const offset = Math.random() * Math.PI * 2;

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * speed + offset) % 1;
    meshRef.current.position.x = start[0] + (end[0] - start[0]) * t;
    meshRef.current.position.y = start[1] + (end[1] - start[1]) * t;
    meshRef.current.position.z = start[2] + (end[2] - start[2]) * t;
    meshRef.current.visible = t < 0.95;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.04, 6, 6]} />
      <meshStandardMaterial color="#c4b5fd" emissive="#c4b5fd" emissiveIntensity={4} />
    </mesh>
  );
}

// ─── Full network scene ────────────────────────────────────────────────────
const NODES: { pos: [number, number, number]; color: string; label: string }[] = [
  { pos: [-3.5, 1.2, -1],   color: '#60a5fa', label: 'Voice AI' },
  { pos: [-3.0, -1.4, 0.5], color: '#34d399', label: 'Photo AI' },
  { pos: [3.2, 1.5, -0.8],  color: '#f472b6', label: 'GST Engine' },
  { pos: [3.5, -1.0, 1.0],  color: '#fbbf24', label: 'PDF Gen' },
  { pos: [-1.5, 2.8, 0.2],  color: '#a78bfa', label: 'Rate Cards' },
  { pos: [1.8, 2.6, -0.5],  color: '#e879f9', label: 'Xero Sync' },
  { pos: [-2.0, -2.6, -0.8],color: '#38bdf8', label: 'ABN Check' },
  { pos: [2.2, -2.4, 0.8],  color: '#fb923c', label: 'Client Hub' },
];

function NetworkScene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight color="#8b5cf6" intensity={3} position={[0, 0, 3]} />
      <pointLight color="#3b82f6" intensity={2} position={[3, 2, 0]} />
      <pointLight color="#ec4899" intensity={1.5} position={[-3, -2, 1]} />

      {/* Central AI orb */}
      <Float speed={1} floatIntensity={0.3}>
        <AIOrb />
      </Float>

      {/* Outer nodes */}
      {NODES.map((n) => (
        <Float key={n.label} speed={0.8 + Math.random()} floatIntensity={0.4}>
          <Node position={n.pos} color={n.color} size={0.1} emissive={2.5} />
        </Float>
      ))}

      {/* Connections from center to each node */}
      {NODES.map((n) => (
        <Connection key={`c-${n.label}`} start={[0, 0, 0]} end={n.pos} color={n.color} opacity={0.2} />
      ))}

      {/* Pulsing data packets */}
      {NODES.map((n) => (
        <PulsingPath key={`p-${n.label}`} start={[0, 0, 0]} end={n.pos} />
      ))}

      {/* Sparkles */}
      <Sparkles count={80} scale={8} size={0.8} speed={0.2} opacity={0.5} color="#c4b5fd" />

      <EffectComposer>
        <Bloom intensity={1.8} luminanceThreshold={0.1} luminanceSmoothing={0.8} mipmapBlur />
      </EffectComposer>
    </>
  );
}

import { ThreeErrorBoundary } from './ThreeErrorBoundary';

function AINetworkSceneInner() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0 }}
    >
      <NetworkScene />
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
