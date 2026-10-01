import { useEffect } from 'react';
import * as THREE from 'three';

const VERT = /* glsl */ `
  attribute vec4 aSeed;
  uniform float uTime, uScroll, uPx;
  uniform vec2 uMouse;
  varying float vHeat, vAlpha;
  void main() {
    vec3 p = position;
    float speed = 0.25 + aSeed.x * 0.6;
    float t = uTime * speed + aSeed.y * 20.0;

    p.y = mod(p.y + t + 6.0, 12.0) - 6.0;                
    p.x += sin(t * 1.3 + aSeed.y * 6.28) * 0.35;         
    p.z += uScroll * 8.0;                                 

    vec2 m = uMouse * vec2(9.0, 6.0);                    
    vec2 d = p.xy - m;
    p.xy += normalize(d + 0.0001) * exp(-dot(d, d) * 0.15) * 0.9;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float life = (p.y + 6.0) / 12.0;
    vHeat = 1.0 - life;
    float flicker = 0.7 + 0.3 * sin(uTime * 6.0 * aSeed.x + aSeed.y * 30.0);
    vAlpha = smoothstep(0.0, 0.1, life) * (1.0 - smoothstep(0.65, 1.0, life)) * flicker;
    gl_PointSize = (aSeed.z * 2.5 + 0.8) * uPx * (8.0 / max(-mv.z, 0.1));
  }
`;

const FRAG = /* glsl */ `
  varying float vHeat, vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    vec3 col = mix(vec3(0.95, 0.35, 0.05), vec3(1.0, 0.82, 0.35), vHeat * vHeat);
    gl_FragColor = vec4(col, a * vAlpha);
  }
`;

export const useEmbers = (canvasRef, heroRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const count = window.innerWidth < 768 ? 450 : 1000;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 6;

    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) {
      pos.set([(Math.random() - 0.5) * 18, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 10], i * 3);
      seed.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 4));

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uPx: { value: renderer.getPixelRatio() },
        uMouse: { value: new THREE.Vector2(0, -2) }, 
      },
    });
    scene.add(new THREE.Points(geo, mat));

    const resize = () => {
      const w = hero.clientWidth, h = hero.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(hero);

    const target = new THREE.Vector2(0, -2);
    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      target.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let visible = true, raf = 0;
    const clock = new THREE.Clock();
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      mat.uniforms.uTime.value = clock.getElapsedTime();
      mat.uniforms.uMouse.value.lerp(target, 0.06);
      mat.uniforms.uScroll.value = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
      renderer.render(scene, camera);
    };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(hero);

    if (reduced) { mat.uniforms.uTime.value = 3; renderer.render(scene, camera); }
    else frame();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      geo.dispose(); mat.dispose(); renderer.dispose();
    };
  }, [canvasRef, heroRef]);
};
