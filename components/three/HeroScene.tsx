'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Sparkles,
  Stars,
  Float,
  MeshDistortMaterial,
  GradientTexture,
  Trail,
  Torus,
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

// ─── Central holographic orb ───────────────────────────────────────────────
function CoreOrb() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.08;
    meshRef.current.rotation.y = t * 0.14;
    wireRef.current.rotation.x = -t * 0.06;
    wireRef.current.rotation.y = t * 0.10;
    // Pulsing scale
    const pulse = 1 + Math.sin(t * 1.2) * 0.04;
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <group>
      {/* Solid distorted sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 4]} />
        <MeshDistortMaterial
          color="#7c3aed"
          emissive="#5b21b6"
          emissiveIntensity={0.6}
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Outer wireframe */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.85, 1]} />
        <meshBasicMaterial
          color="#a78bfa"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
    </group>
  );
}

// ─── Orbiting rings ────────────────────────────────────────────────────────
function OrbitRing({
  radius,
  speed,
  tilt,
  color,
}: {
  radius: number;
  speed: number;
  tilt: [number, number, number];
  color: string;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    groupRef.current.rotation.y = clock.getElapsedTime() * speed;
  });

  return (
    <group ref={groupRef} rotation={tilt}>
      {/* Ring tube */}
      <mesh>
        <torusGeometry args={[radius, 0.008, 6, 120]} />
        <meshBasicMaterial color={color} transparent opacity={0.45} />
      </mesh>

      {/* Orbiting bright dot */}
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={3}
        />
      </mesh>
    </group>
  );
}

// ─── Floating satellite shards ─────────────────────────────────────────────
function Shard({
  position,
  speed,
  color,
}: {
  position: [number, number, number];
  speed: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    meshRef.current.rotation.x = t;
    meshRef.current.rotation.z = t * 0.7;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.12, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        roughness={0.2}
        metalness={0.9}
      />
    </mesh>
  );
}

// ─── Mouse parallax camera ─────────────────────────────────────────────────
function ParallaxCamera() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame(({ pointer }) => {
    target.current.x += (pointer.x * 0.8 - target.current.x) * 0.04;
    target.current.y += (pointer.y * 0.5 - target.current.y) * 0.04;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Floating data nodes (small spheres on paths) ─────────────────────────
function DataNodes() {
  const nodes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      angle: (i / 8) * Math.PI * 2,
      radius: 2.8 + (i % 3) * 0.4,
      speed: 0.15 + i * 0.03,
      y: Math.sin(i * 1.1) * 0.6,
      color: i % 2 === 0 ? '#c4b5fd' : '#60a5fa',
    }));
  }, []);

  return (
    <>
      {nodes.map((node, i) => (
        <AnimatedNode key={i} {...node} />
      ))}
    </>
  );
}

function AnimatedNode({
  angle,
  radius,
  speed,
  y,
  color,
}: {
  angle: number;
  radius: number;
  speed: number;
  y: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + angle;
    meshRef.current.position.x = Math.cos(t) * radius;
    meshRef.current.position.z = Math.sin(t) * radius;
    meshRef.current.position.y = y + Math.sin(clock.getElapsedTime() * 0.6 + angle) * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
      />
    </mesh>
  );
}

// ─── Inner scene (everything 3D) ───────────────────────────────────────────
function Scene() {
  return (
    <>
      <ParallaxCamera />

      {/* Ambient + directional lights */}
      <ambientLight intensity={0.2} />
      <pointLight color="#8b5cf6" intensity={4} distance={8} position={[0, 0, 3]} />
      <pointLight color="#3b82f6" intensity={2} distance={10} position={[4, 3, -2]} />
      <pointLight color="#ec4899" intensity={1.5} distance={8} position={[-4, -2, 2]} />

      {/* Stars far background */}
      <Stars radius={80} depth={60} count={3000} factor={3} fade speed={0.5} />

      {/* Central orb */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <CoreOrb />
      </Float>

      {/* Orbiting rings at different tilts */}
      <OrbitRing radius={2.6} speed={0.4}  tilt={[0.3, 0, 0]}  color="#8b5cf6" />
      <OrbitRing radius={3.1} speed={-0.25} tilt={[1.1, 0.4, 0]} color="#60a5fa" />
      <OrbitRing radius={2.2} speed={0.6}  tilt={[0.7, 1.0, 0.5]} color="#c084fc" />

      {/* Floating crystal shards */}
      <Shard position={[ 3.2, 1.4, -1.0]} speed={0.8} color="#a78bfa" />
      <Shard position={[-2.8, -1.2, 0.5]} speed={0.6} color="#818cf8" />
      <Shard position={[ 2.0, -2.2, 1.0]} speed={1.0} color="#c084fc" />
      <Shard position={[-1.8, 2.4, -0.8]} speed={0.7} color="#60a5fa" />
      <Shard position={[ 3.8, -0.5, 0.2]} speed={0.9} color="#e879f9" />

      {/* Data nodes orbiting */}
      <DataNodes />

      {/* Sparkles around core */}
      <Sparkles
        count={120}
        scale={7}
        size={1.2}
        speed={0.3}
        opacity={0.6}
        color="#c4b5fd"
      />
      <Sparkles
        count={60}
        scale={12}
        size={0.8}
        speed={0.2}
        opacity={0.3}
        color="#60a5fa"
      />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={1.4}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.8}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0008, 0.0008)}
        />
      </EffectComposer>
    </>
  );
}

// ─── Exported canvas wrapper ───────────────────────────────────────────────
import { ThreeErrorBoundary } from './ThreeErrorBoundary';

function HeroSceneInner() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
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
