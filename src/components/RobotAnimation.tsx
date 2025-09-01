'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface RobotProps {
  [key: string]: any;
}

function Robot(props: RobotProps) {
  const group = useRef<THREE.Group>(null!);
  // GLB robot modeli yolunu belirtiyoruz
  const { scene, animations } = useGLTF('/robots/robot.glb');
  const [mixer] = useState(() => new THREE.AnimationMixer(scene));
  const { mouse } = useThree();
  
  // Mouse etkileşimi
  useFrame((state) => {
    if (group.current) {
      // Robot fareyi takip ediyor
      const target = new THREE.Vector3(
        (mouse.x * 2), 
        (mouse.y * 0.5) + 1, 
        3
      );
      group.current.lookAt(target);
      
      // Yavaşça yukarı-aşağı yüzen animasyon
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Animasyonları güncelle
      mixer.update(state.clock.getDelta());
    }
  });
  
  // Bileşen yüklendiğinde animasyonu başlat
  useEffect(() => {
    if (animations && animations.length > 0) {
      const animation = animations[0];
      if (animation) {
        const idleAnimation = mixer.clipAction(animation);
        idleAnimation.play();
      }
    }
    
    return () => {
      // Temizlik
      mixer.stopAllAction();
    };
  }, [animations, mixer]);
  
  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} scale={0.75} position={[0, -1, 0]} />
    </group>
  );
}

export default function RobotAnimation() {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Robot />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2 - 0.5}
          maxPolarAngle={Math.PI / 2 + 0.5}
        />
      </Canvas>
    </div>
  );
}

// GLB modelini önceden yükle
useGLTF.preload('/robots/robot.glb');
