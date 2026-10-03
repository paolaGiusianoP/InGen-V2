import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SteakModel } from './SteakModel';


const VERT = /* glsl */ `
  attribute vec4 aSeed;
  uniform float uTime, uScroll, uPx;
  uniform vec2 uMouse;
  varying float vHeat, vAlpha, vTemp;

  void main() {
    vec3 p = position;
    float speed = 0.25 + aSeed.x * 0.6;
    float t = uTime * speed + aSeed.y * 20.0;

    p.y = mod(p.y + t + 3.5, 7.0) - 3.5;
    p.x += sin(t * 1.3 + aSeed.y * 6.28) * 0.35;
    p.z += uScroll * 8.0;

    vec2 m = uMouse * vec2(9.0, 6.0);
    vec2 d = p.xy - m;
    p.xy += normalize(d + 0.0001) * exp(-dot(d, d) * 0.15) * 0.9;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float life = (p.y + 3.5) / 7.0;
    vHeat = 1.0 - life;
    float flicker = 0.7 + 0.3 * sin(uTime * 6.0 * aSeed.x + aSeed.y * 30.0);
    vAlpha = smoothstep(0.0, 0.1, life) * (1.0 - smoothstep(0.65, 1.0, life)) * flicker;

    vTemp = aSeed.w;

    gl_PointSize = (aSeed.z * aSeed.z * 14.0 + 2.5) * uPx * (14.0 / max(-mv.z, 0.1));
  }
`;

const FRAG = /* glsl */ `
  varying float vHeat, vAlpha, vTemp;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;

    vec3 colBlanco = vec3(1.0, 0.95, 0.75);   
    vec3 colAmbar  = vec3(1.0, 0.65, 0.15);   
    vec3 colRojo   = vec3(0.85, 0.20, 0.02);  

    vec3 col;
    if (vTemp < 0.5) {
      col = mix(colRojo, colAmbar, vTemp * 2.0);
    } else {
      col = mix(colAmbar, colBlanco, (vTemp - 0.5) * 2.0);
    }

    col = mix(col, colBlanco, vHeat * vHeat * 0.4);

    gl_FragColor = vec4(col, a * vAlpha * 1.5);
  }
`;

function Embers() {
  const matRef = useRef(null);
  const groupRef = useRef(null);
  const { size } = useThree();

  const count = useMemo(() => (size.width < 768 ? 300 : 700), [size.width]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count * 4);

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      seed[i * 4 + 0] = Math.random();
      seed[i * 4 + 1] = Math.random();
      seed[i * 4 + 2] = Math.random();
      seed[i * 4 + 3] = Math.random();
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 4));
    return geo;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPx: { value: Math.min(window.devicePixelRatio, 1.75) },
      uMouse: { value: new THREE.Vector2(0, -2) },
    }),
    []
  );

  const mouseTarget = useRef(new THREE.Vector2(0, -2));

  React.useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      mouseTarget.current.set(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        -(((e.clientY - r.top) / r.height) * 2 - 1)
      );
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((state, delta) => {
    if (!matRef.current) return;

    uniforms.uTime.value += delta;
    uniforms.uMouse.value.lerp(mouseTarget.current, 0.06);

    const hero = document.getElementById('hero');
    if (hero) {
      uniforms.uScroll.value = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
    }

    if (groupRef.current) {
      const targetX = mouseTarget.current.x * 0.5;
      const targetY = mouseTarget.current.y * 0.4;
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.04;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <shaderMaterial
          ref={matRef}
          vertexShader={VERT}
          fragmentShader={FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}


function EmbersTrail() {
  const matRef = useRef(null);
  const groupRef = useRef(null);
  const { size } = useThree();

  const count = useMemo(() => (size.width < 768 ? 200 : 450), [size.width]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count * 4);

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;

      seed[i * 4 + 0] = Math.random();
      seed[i * 4 + 1] = Math.random();
      seed[i * 4 + 2] = Math.random();
      seed[i * 4 + 3] = Math.random();
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 4));
    return geo;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPx: { value: Math.min(window.devicePixelRatio, 1.75) },
      uMouse: { value: new THREE.Vector2(0, -2) },
    }),
    []
  );

  const mouseTarget = useRef(new THREE.Vector2(0, -2));

  React.useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      mouseTarget.current.set(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        -(((e.clientY - r.top) / r.height) * 2 - 1)
      );
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const TRAIL_VERT = useMemo(() => VERT
    .replace('aSeed.x * 0.6', 'aSeed.x * 0.35')
    .replace('(aSeed.z * aSeed.z * 14.0 + 2.5)', '(aSeed.z * aSeed.z * 20.0 + 4.0)')
  , []);

  const TRAIL_FRAG = useMemo(() => FRAG
    .replace('* 1.5', '* 0.35')
  , []);

  useFrame((state, delta) => {
    if (!matRef.current) return;

    uniforms.uTime.value += delta * 0.7;
    uniforms.uMouse.value.lerp(mouseTarget.current, 0.03);

    const hero = document.getElementById('hero');
    if (hero) {
      uniforms.uScroll.value = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
    }

    if (groupRef.current) {
      const targetX = mouseTarget.current.x * 0.9;
      const targetY = mouseTarget.current.y * 0.7;
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.03;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <shaderMaterial
          ref={matRef}
          vertexShader={TRAIL_VERT}
          fragmentShader={TRAIL_FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export const EmbersCanvas = ({ className = '' }) => {
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ opacity: 0.7 }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.75]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
          color="#fff5e0"
        />
        <pointLight position={[-3, 2, 3]} intensity={1} color="#f59e0b" />
        <pointLight position={[3, -2, 2]} intensity={0.5} color="#fbbf24" />

        <EmbersTrail />

        <Suspense fallback={null}>
          <SteakModel position={[3, 0.4, 0]} scale={0.2} rotation={[Math.PI / 5, 0, 0]} />
        </Suspense>

        <Embers />
      </Canvas>
    </div>
  );
};