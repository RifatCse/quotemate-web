'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function Crystal({ color = '#7c3aed', wireColor = '#a78bfa' }: { color?: string; wireColor?: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
    wireRef.current.rotation.y = -t * 0.2;
  });

  return (
    <Float speed={2} floatIntensity={0.6} rotationIntensity={0.2}>
      <group>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1, 2]} />
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            distort={0.2}
            speed={3}
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh ref={wireRef}>
          <octahedronGeometry args={[1.25, 0]} />
          <meshBasicMaterial
            color={wireColor}
            wireframe
            transparent
            opacity={0.2}
          />
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
      camera={{ position: [0, 0, 3.5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ height, width: '100%' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight color="#8b5cf6" intensity={3} position={[2, 2, 2]} />
      <pointLight color="#3b82f6" intensity={2} position={[-2, -1, 1]} />

      <Crystal color={color} wireColor={wireColor} />

      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={0.1} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>
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
