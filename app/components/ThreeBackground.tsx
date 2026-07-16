'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
}

function ParticleField({ count = 8500 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null!);
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    const gridSize = 92;
    const spacing = 1.35;
    
    for (let i = 0; i < count; i++) {
      const ix = i % gridSize;
      const iz = Math.floor(i / gridSize);
      
      const x = (ix - gridSize / 2) * spacing + (Math.random() - 0.5) * 0.8;
      const z = (iz - gridSize / 3) * spacing * 0.95 + (Math.random() - 0.5) * 1.2;
      
      const baseY = Math.sin(ix * 0.28) * 1.8 + Math.cos(iz * 0.31) * 1.4;
      const y = baseY + (Math.random() - 0.5) * 2.2;
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      const r = 0.65 + Math.random() * 0.25;
      const g = 0.75 + Math.random() * 0.2;
      const b = 0.95 + Math.random() * 0.05;
      
      col[i * 3] = r;
      col[i * 3 + 1] = g;
      col[i * 3 + 2] = b;
    }
    
    return [pos, col];
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.elapsedTime * 0.35;
    const positionsAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    
    for (let i = 0; i < count; i++) {
      const ix = i % 92;
      const iz = Math.floor(i / 92);
      
      const x = positionsAttr.getX(i);
      const z = positionsAttr.getZ(i);
      
      const wave = 
        Math.sin(time + x * 0.55 + z * 0.4) * 1.1 +
        Math.sin(time * 0.6 + z * 0.75) * 0.7 +
        Math.cos(time * 0.4 + ix * 0.2) * 0.5;
      
      const baseY = Math.sin(ix * 0.28) * 1.8 + Math.cos(iz * 0.31) * 1.4;
      positionsAttr.setY(i, baseY + wave + (Math.sin(i) * 0.3));
    }
    
    positionsAttr.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.065}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function CameraController() {
  const { camera } = useThree();
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
      targetProgressRef.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    progressRef.current = THREE.MathUtils.lerp(
      progressRef.current,
      targetProgressRef.current,
      0.065
    );

    const t = progressRef.current;

    const startX = 0;
    const startY = 11;
    const startZ = 28;

    const midX = Math.sin(t * Math.PI * 0.9) * 6.5;
    const midY = 6.5 + Math.cos(t * Math.PI * 1.1) * 2.8;
    const midZ = 28 - t * 32;

    const endX = Math.sin(t * 1.8) * 4.2;
    const endY = 3.8 + Math.sin(t * 2.2) * 1.5;
    const endZ = -6;

    const x = THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(startX, midX, t),
      endX,
      t * t
    );
    const y = THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(startY, midY, t),
      endY,
      t
    );
    const z = THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(startZ, midZ, t),
      endZ,
      t
    );

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, x, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, y, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, z, 0.08);

    const lookX = Math.sin(t * 1.3) * 3.5;
    const lookY = 2.5 + Math.cos(t * 0.9) * 1.8;
    const lookZ = -4 + t * 8;

    camera.lookAt(lookX, lookY, lookZ);
  });

  return null;
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 35, 95]} />

      <ambientLight intensity={0.2} color="#a5b4fc" />
      
      <pointLight 
        position={[-18, 22, -12]} 
        intensity={2.2} 
        color="#c0d0ff" 
        decay={1.5}
      />
      <pointLight 
        position={[22, 14, -25]} 
        intensity={1.6} 
        color="#e0d4ff" 
        decay={1.7}
      />
      <pointLight 
        position={[0, -6, 18]} 
        intensity={0.8} 
        color="#f0e6d2" 
        decay={2}
      />

      <ParticleField count={8500} />
      
      <Points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={380}
            array={new Float32Array(380 * 3).map((_, i) => (Math.random() - 0.5) * 160)}
            itemSize={3}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          size={0.04}
          color="#ffffff"
          sizeAttenuation
          opacity={0.5}
          depthWrite={false}
        />
      </Points>

      <CameraController />
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 11, 28], fov: 52, near: 0.1, far: 200 }}
        style={{ background: '#050505' }}
        gl={{ 
          alpha: true, 
          antialias: true, 
          powerPreference: "high-performance"
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
