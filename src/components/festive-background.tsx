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
    // Scale by the longer side so wide desktops get the same broad folds as phones
    uv = vec2(uv.x * uAspect, uv.y) * (0.9 / max(uAspect, 1.0));
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

// Shared motion for every floating layer: each point loops along y, swaying as it goes.
const pointVertex = (direction: "down" | "up", speed: string) => /* glsl */ `
  attribute float aSize;
  attribute float aSeed;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vSeed;
  varying float vLife;
  varying vec3 vColor;
  varying float vAngle;
  varying float vFlip;
  void main() {
    vec3 p = position;
    float life = fract(aSeed * 7.13 + uTime * (${speed}));
    p.y = ${direction === "down" ? "mix(1.15, -1.15, life)" : "mix(-1.15, 1.15, life)"};
    p.x += sin(uTime * 0.55 + aSeed * 31.0) * 0.07 + sin(uTime * 0.17 + aSeed * 11.0) * 0.04;
    vSeed = aSeed;
    vLife = life;
    vColor = aColor;
    vAngle = aSeed * 6.2831 + uTime * (0.35 + aSeed * 0.9) * (aSeed > 0.5 ? 1.0 : -1.0);
    vFlip = cos(uTime * (0.7 + aSeed * 1.3) + aSeed * 19.0);
    gl_Position = vec4(p.xy, 0.0, 1.0);
    gl_PointSize = aSize * uPixelRatio;
  }
`;

// Marigold and rose petals that tumble as they fall
const petalFragment = /* glsl */ `
  precision highp float;
  uniform vec2 uResolution;
  uniform vec4 uCalm;
  varying float vLife;
  varying vec3 vColor;
  varying float vAngle;
  varying float vFlip;
  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float c = cos(vAngle), s = sin(vAngle);
    p = mat2(c, -s, s, c) * p;
    p.x /= max(abs(vFlip), 0.38);
    float width = 0.2 + 0.22 * (0.45 - p.y);
    float r = length(vec2(p.x / width, (p.y - 0.02) / 0.4));
    // a softly ruffled outer edge, like a marigold petal
    r += 0.035 * sin(atan(p.y, p.x) * 9.0) * smoothstep(0.0, -0.3, p.y);
    float a = smoothstep(1.0, 0.86, r);
    if (a < 0.01) discard;
    vec3 col = vColor * (0.88 + 0.3 * (0.5 - p.y));
    col *= 1.0 - 0.18 * smoothstep(0.035, 0.0, abs(p.x)) * step(-0.25, p.y);
    col *= mix(0.82, 1.0, step(0.0, vFlip));
    float fade = smoothstep(0.0, 0.06, vLife) * smoothstep(1.0, 0.93, vLife);
    // Petals turn translucent while they pass behind the headline and copy
    vec2 frag = gl_FragCoord.xy / uResolution;
    vec2 inside = smoothstep(uCalm.xy - 0.04, uCalm.xy + 0.02, frag) * smoothstep(uCalm.zw + 0.04, uCalm.zw - 0.02, frag);
    fade *= 1.0 - 0.75 * inside.x * inside.y;
    gl_FragColor = vec4(col, a * fade);
  }
`;

// Out-of-focus diya and fairy lights
const glowFragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  varying float vSeed;
  varying float vLife;
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.44, d) * 0.45 + smoothstep(0.5, 0.0, d) * 0.55;
    float pulse = 0.65 + 0.35 * sin(uTime * (0.6 + vSeed) + vSeed * 40.0);
    float fade = sin(vLife * 3.14159);
    gl_FragColor = vec4(vColor, a * pulse * fade * 0.5);
  }
`;

// Tiny four-point gold stars that twinkle
const sparkleFragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  varying float vSeed;
  varying vec3 vColor;
  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float star = max(0.0, 1.0 - abs(p.x * p.y) * 160.0) * smoothstep(0.5, 0.0, length(p));
    float core = smoothstep(0.12, 0.0, length(p));
    float twinkle = pow(abs(sin(uTime * (0.8 + vSeed * 1.6) + vSeed * 60.0)), 8.0);
    gl_FragColor = vec4(vColor, (star * 0.9 + core) * twinkle);
  }
`;

/**
 * A custom Three.js scene behind the landing hero: warm champagne satin with a festive petal shower
 * (marigold and rose), soft diya glow and twinkling gold sparkles.
 * Loads after first paint, pauses off screen or in a background tab, renders a single still
 * frame for reduced motion, and leaves the CSS fallback in place without WebGL.
 */
export function FestiveBackground({ className = "" }: { className?: string }) {
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
          uBase: { value: color("#f7f0e2") },
          uShadow: { value: color("#eadabb") },
          uHighlight: { value: color("#fffaf0") },
          uGold: { value: color("#dcab55") },
        },
      });
      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), silk));

      const layers: InstanceType<typeof THREE.ShaderMaterial>[] = [];
      const geometries: InstanceType<typeof THREE.BufferGeometry>[] = [];
      const addLayer = (
        count: number,
        size: [number, number],
        palette: string[],
        vertexShader: string,
        fragmentShader: string,
      ) => {
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const seeds = new Float32Array(count);
        const colors = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          positions[i * 3] = Math.random() * 2.2 - 1.1;
          sizes[i] = size[0] + Math.random() * (size[1] - size[0]);
          seeds[i] = Math.random();
          color(palette[i % palette.length]!).toArray(colors, i * 3);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
        geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
        geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
        const mat = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          transparent: true,
          depthWrite: false,
          uniforms: {
            uTime: { value: 0 },
            uPixelRatio: { value: ratio },
            uResolution: { value: new THREE.Vector2(1, 1) },
            uCalm: { value: new THREE.Vector4(0, 0, 0, 0) },
          },
        });
        scene.add(new THREE.Points(geo, mat));
        layers.push(mat);
        geometries.push(geo);
      };

      // Diya glow sits furthest back, then sparkles, then the petal shower in front
      addLayer(
        small ? 10 : 18,
        small ? [40, 90] : [60, 150],
        ["#f5c26b", "#f0a94a", "#fcd98f"],
        pointVertex("up", "0.006 + aSeed * 0.006"),
        glowFragment,
      );
      addLayer(
        small ? 18 : 36,
        [10, 18],
        ["#c9a35a", "#e2bf73"],
        pointVertex("up", "0.008 + aSeed * 0.01"),
        sparkleFragment,
      );
      addLayer(
        small ? 16 : 34,
        small ? [20, 32] : [26, 46],
        ["#f2a52b", "#e8821e", "#f6c445", "#d6336c", "#e77c94"],
        pointVertex("down", "0.022 + aSeed * 0.02"),
        petalFragment,
      );

      let size = { w: 1, h: 1 };
      const resize = () => {
        const { clientWidth: w, clientHeight: h } = host;
        size = { w, h };
        renderer.setSize(w, h, false);
        silk.uniforms.uAspect.value = w / Math.max(h, 1);
        for (const layer of layers) layer.uniforms.uResolution.value.set(w * ratio, h * ratio);
      };
      // The text block marked data-calm, in canvas coordinates (0–1, y up). Re-read every frame
      // because the canvas stays pinned while the page scrolls underneath it.
      const calm = document.querySelector<HTMLElement>("[data-calm]");
      const updateCalm = () => {
        if (!calm) return;
        const box = host.getBoundingClientRect();
        const r = calm.getBoundingClientRect();
        const { w, h } = size;
        for (const layer of layers)
          layer.uniforms.uCalm.value.set(
            (r.left - box.left) / w,
            1 - (r.bottom - box.top) / h,
            (r.right - box.left) / w,
            1 - (r.top - box.top) / h,
          );
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
        for (const layer of layers) layer.uniforms.uTime.value = t;
        (silk.uniforms.uMouse.value as InstanceType<typeof THREE.Vector2>).lerp(target, 0.04);
        updateCalm();
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
        layers.forEach((m) => m.dispose());
        geometries.forEach((g) => g.dispose());
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
