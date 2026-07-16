'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 4200;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 38;
      const z = (Math.random() - 0.5) * 42 - 8;
      const y = (Math.random() - 0.5) * 9 + Math.sin(x * 0.3) * 2.2;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const r = 0.6 + Math.random() * 0.3;
      const g = 0.75 + Math.random() * 0.2;
      const b = 0.9 + Math.random() * 0.1;

      col[i * 3] = r;
      col[i * 3 + 1] = g;
      col[i * 3 + 2] = b;
    }
    return [pos, col];
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime * 0.28;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const ix = i % 65;

      const wave = Math.sin(time + x * 0.6 + z * 0.35) * 1.3 +
                   Math.cos(time * 0.7 + ix * 0.4) * 0.6;

      posAttr.setY(i, wave + Math.sin(x * 0.25) * 1.6);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} geometry={geometry}>
      <PointMaterial
        transparent
        vertexColors
        size={0.07}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const scrollProgress = useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame(() => {
    const t = scrollProgress.current;

    const targetX = Math.sin(t * 1.6) * 5.5;
    const targetY = 9.5 - t * 5.5;
    const targetZ = 26 - t * 38;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.07);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.07);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.07);

    const lookTargetY = 3.5 - t * 2;
    camera.lookAt(0, lookTargetY, -6 + t * 10);
  });

  return null;
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 28, 85]} />

      <ambientLight intensity={0.25} color="#a8b4ff" />
      <pointLight position={[-15, 18, -10]} intensity={2.4} color="#b8c8ff" decay={1.6} />
      <pointLight position={[18, 12, -22]} intensity={1.8} color="#d4c4ff" decay={1.8} />

      <ParticleField />
      <CameraRig />
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 10, 26], fov: 55, near: 0.5, far: 150 }}
        style={{ background: '#050505' }}
        gl={{ 
          alpha: true, 
          antialias: true, 
          powerPreference: "high-performance",
          preserveDrawingBuffer: false 
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
