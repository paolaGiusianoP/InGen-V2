import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SteakModel({
  position = [0, 0, 0],
  scale = 0.01,
  rotation = [-Math.PI / 3, Math.PI, 0],   
}) {
  const groupRef = useRef(null);
  const { scene } = useGLTF('/models/steak.glb');

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.material) {
          child.material.envMapIntensity = 1.2;
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y =
      Math.PI + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;

    groupRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.55;
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
    >
      <primitive object={scene} scale={scale} />
    </group>
  );
}

useGLTF.preload('/models/steak.glb');