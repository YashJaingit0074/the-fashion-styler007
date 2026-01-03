
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Fix: Define Three.js intrinsic elements as capitalized components to bypass JSX.IntrinsicElements errors
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const SphereGeometry = 'sphereGeometry' as any;
const TorusGeometry = 'torusGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const CylinderGeometry = 'cylinderGeometry' as any;
const SpotLight = 'spotLight' as any;
const PointLight = 'pointLight' as any;

interface AvatarProps {
  isSpeaking: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ isSpeaking }) => {
  const group = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = Math.sin(t * 1.5) * 0.1;
      group.current.rotation.y = Math.sin(t * 0.5) * 0.1;
    }
    
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.5;
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }

    if (headRef.current) {
      if (isSpeaking) {
        // More erratic pulsing for "speaking" feel
        const pulse = 1 + Math.sin(t * 20) * 0.04 + Math.cos(t * 12) * 0.02;
        headRef.current.scale.set(pulse, pulse, pulse);
      } else {
        headRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <Group ref={group}>
      <Mesh ref={headRef} position={[0, 0, 0]}>
        <SphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#111111"
          distort={isSpeaking ? 0.45 : 0.15}
          speed={isSpeaking ? 4 : 1.5}
          roughness={0.1}
          metalness={0.9}
        />
      </Mesh>

      <Mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
        <TorusGeometry args={[1.4, 0.015, 16, 120]} />
        <MeshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.8} />
      </Mesh>

      <Mesh position={[0, -1.6, 0]}>
        <CylinderGeometry args={[0.2, 0.6, 1.2, 32]} />
        <MeshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
      </Mesh>

      <Float speed={4} rotationIntensity={1} floatIntensity={1.5}>
        <Sphere args={[0.04]} position={[1.4, 1.2, -0.5]}>
          <MeshStandardMaterial color="#d4af37" emissive="#d4af37" />
        </Sphere>
        <Sphere args={[0.03]} position={[-1.6, 0.2, 0.8]}>
          <MeshStandardMaterial color="#7c3aed" emissive="#7c3aed" />
        </Sphere>
        <Sphere args={[0.02]} position={[0.8, -1.2, 1.2]}>
          <MeshStandardMaterial color="#ffffff" emissive="#ffffff" />
        </Sphere>
      </Float>

      <SpotLight position={[5, 5, 5]} intensity={2} color="#ffffff" angle={0.3} penumbra={1} />
      <PointLight position={[2, 2, 2]} intensity={1.5} color="#d4af37" />
      <PointLight position={[-3, -2, 2]} intensity={1} color="#7c3aed" />
    </Group>
  );
};
