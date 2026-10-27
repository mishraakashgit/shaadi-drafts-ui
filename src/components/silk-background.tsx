"use client";

import { useEffect, useRef } from "react";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Ivory satin: domain-warped noise bends soft bands into folds, with a gold sheen on the crests.
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uAspect;
  uniform vec3 uBase;
  uniform vec3 uShadow;
  uniform vec3 uHighlight;
  uniform vec3 uGold;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.02 + 17.0; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= uAspect;
    float t = uTime * 0.06;

    vec2 q = vec2(fbm(uv * 0.8 + vec2(0.0, t)), fbm(uv * 0.8 + vec2(5.2, 1.3) - t));
    float warp = fbm(uv * 0.7 + 1.8 * q + t * 0.5);

    float folds = sin((uv.x * 0.9 + uv.y * 0.55 + warp * 2.4) * 3.14159 * 1.15);
    float shade = smoothstep(-1.0, 1.0, folds);

    vec3 col = mix(uShadow, uBase, shade);
    col = mix(col, uHighlight, pow(max(folds, 0.0), 3.0) * 0.75);
    float sheen = pow(1.0 - abs(folds - 0.45), 10.0);
    col = mix(col, uGold, sheen * 0.18);

    vec2 m = vec2(uMouse.x * uAspect, uMouse.y);
    float d = distance(uv, m);
    col = mix(col, uHighlight, exp(-d * d * 7.0) * 0.35);

    gl_FragColor = vec4(col, 1.0);
  }
`;

const dustVertex = /* glsl */ `
  attribute float aSize;
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    float life = fract(aSeed + uTime * (0.015 + aSeed * 0.02));
    p.y = mix(-1.1, 1.1, life);
    p.x += sin(uTime * 0.4 + aSeed * 40.0) * 0.04;
    vAlpha = sin(life * 3.14159) * (0.45 + aSeed * 0.45);
    gl_Position = vec4(p.xy, 0.0, 1.0);
    gl_PointSize = aSize * uPixelRatio;
  }
`;

const dustFragment = /* glsl */ `
  precision highp float;
  uniform vec3 uGold;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uGold, a * vAlpha);
  }
`;

/**
 * A custom Three.js scene behind the landing hero: flowing ivory satin with drifting gold dust.
 * Loads after first paint, pauses off screen or in a background tab, renders a single still
 * frame for reduced motion, and leaves the CSS fallback in place without WebGL.
 */
export function SilkBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const probe = document.createElement("canvas");
    if (!probe.getContext("webgl") && !probe.getContext("experimental-webgl")) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767.98px)").matches;
    let disposed = false;
    let cleanup = () => {};

    void import("three").then((THREE) => {
      if (disposed) return;
      const renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: "low-power",
      });
      const ratio = Math.min(window.devicePixelRatio, small ? 1.25 : 1.75);
      renderer.setPixelRatio(ratio);
      renderer.domElement.className =
        "absolute inset-0 size-full opacity-0 transition-opacity duration-[1.6s]";
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.Camera();
      const color = (hex: string) => new THREE.Color(hex);

      const silk = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.75, 0.6) },
          uAspect: { value: 1 },
          uBase: { value: color("#f6f1e7") },
          uShadow: { value: color("#e6dbc2") },
          uHighlight: { value: color("#fffdf8") },
          uGold: { value: color("#d4b06a") },
        },
      });
      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), silk));

      const count = small ? 36 : 80;
      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const seeds = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = Math.random() * 2 - 1;
        sizes[i] = 3 + Math.random() * 5;
        seeds[i] = Math.random();
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      dustGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
      dustGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
      const dust = new THREE.ShaderMaterial({
        vertexShader: dustVertex,
        fragmentShader: dustFragment,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: ratio },
          uGold: { value: color("#b8913f") },
        },
      });
      scene.add(new THREE.Points(dustGeo, dust));

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = host;
        renderer.setSize(w, h, false);
        silk.uniforms.uAspect.value = w / Math.max(h, 1);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);

      // Soft light that follows the cursor, eased towards the target each frame
      const target = new THREE.Vector2(0.75, 0.6);
      const onPointer = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        target.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      let frame = 0;
      let visible = true;
      const start = performance.now() - Math.random() * 20000;
      const render = () => {
        const t = (performance.now() - start) / 1000;
        silk.uniforms.uTime.value = t;
        dust.uniforms.uTime.value = t;
        (silk.uniforms.uMouse.value as InstanceType<typeof THREE.Vector2>).lerp(target, 0.04);
        renderer.render(scene, camera);
      };
      const loop = () => {
        render();
        if (visible && !document.hidden) frame = requestAnimationFrame(loop);
      };
      const resume = () => {
        cancelAnimationFrame(frame);
        if (!reduced && visible && !document.hidden) frame = requestAnimationFrame(loop);
      };

      render();
      renderer.domElement.style.opacity = "1";
      resume();

      const io = new IntersectionObserver(([entry]) => {
        visible = !!entry?.isIntersecting;
        resume();
      });
      io.observe(host);
      document.addEventListener("visibilitychange", resume);

      cleanup = () => {
        cancelAnimationFrame(frame);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onPointer);
        document.removeEventListener("visibilitychange", resume);
        silk.dispose();
        dust.dispose();
        dustGeo.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      style={{
        background:
          "radial-gradient(60% 70% at 78% 35%, #fffdf8 0%, transparent 60%), radial-gradient(50% 60% at 20% 90%, #ece4d2 0%, transparent 70%), #f6f1e7",
      }}
    />
  );
}
