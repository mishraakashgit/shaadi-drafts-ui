"use client";

import { useEffect, useRef } from "react";

const BURSTS = 4;
const SPARKS_PER_BURST = 110;
const PERIOD = 4.2;

const skyVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Night sky warming towards the diya light at the bottom
const skyFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vec3 top = vec3(0.075, 0.086, 0.059);
    vec3 bottom = vec3(0.17, 0.12, 0.05);
    vec3 col = mix(bottom, top, smoothstep(0.0, 0.75, vUv.y));
    float glow = exp(-pow((vUv.y - 0.02) * 4.0, 2.0)) * (0.14 + 0.03 * sin(uTime * 1.7));
    col += vec3(0.85, 0.55, 0.18) * glow;
    gl_FragColor = vec4(col, 1.0);
  }
`;

// Fireworks: every spark's path is computed from time alone, so no CPU work per frame
const fireworkVertex = /* glsl */ `
  attribute float aBurst;
  attribute vec2 aDir;
  attribute float aSeed;
  uniform float uTime;
  uniform float uAspect;
  uniform float uPixelRatio;
  varying float vAlpha;
  varying vec3 vColor;

  float hash(float n) { return fract(sin(n) * 43758.5453); }

  void main() {
    float period = ${PERIOD.toFixed(1)};
    float clock = uTime + aBurst * period / ${BURSTS.toFixed(1)};
    float cycle = floor(clock / period);
    float t = mod(clock, period);
    float id = cycle * 7.31 + aBurst * 13.7;

    vec2 origin = vec2(hash(id) * 1.6 - 0.8, hash(id + 1.3) * 0.4 + 0.4);
    float speed = (0.95 + 0.6 * hash(id + 2.1)) * (0.6 + 0.4 * aSeed);
    float travel = (1.0 - exp(-2.8 * t)) / 2.8;
    vec2 p = origin + aDir * speed * travel;
    p.x /= max(uAspect, 0.6);
    p.y -= 0.06 * t * t;

    float pick = hash(id + 3.7);
    vec3 gold = vec3(1.0, 0.82, 0.45);
    vec3 marigold = vec3(0.98, 0.6, 0.18);
    vec3 rani = vec3(0.92, 0.33, 0.55);
    vColor = pick < 0.45 ? gold : (pick < 0.8 ? marigold : rani);
    vColor = mix(vColor, vec3(1.0, 0.95, 0.85), smoothstep(0.4, 0.0, t));

    float twinkle = 0.75 + 0.25 * sin(uTime * 30.0 + aSeed * 50.0);
    vAlpha = smoothstep(0.0, 0.04, t) * (1.0 - smoothstep(0.9, 2.6, t)) * twinkle * 1.3;
    gl_Position = vec4(p, 0.0, 1.0);
    gl_PointSize = mix(8.0, 3.0, smoothstep(0.0, 2.2, t)) * uPixelRatio;
  }
`;

const sparkFragment = /* glsl */ `
  precision highp float;
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * a * vAlpha);
  }
`;

// Embers rising from the diyas
const emberVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    vec3 p = position;
    float life = fract(aSeed * 5.3 + uTime * (0.05 + aSeed * 0.06));
    p.y = mix(-1.0, 0.6, life);
    p.x += sin(uTime * 1.3 + aSeed * 40.0) * 0.03 * life;
    vAlpha = sin(life * 3.14159) * (0.5 + 0.5 * sin(uTime * 9.0 + aSeed * 30.0));
    vColor = mix(vec3(1.0, 0.75, 0.35), vec3(1.0, 0.55, 0.2), aSeed);
    gl_Position = vec4(p.xy, 0.0, 1.0);
    gl_PointSize = (2.0 + aSeed * 3.0) * uPixelRatio;
  }
`;

// A row of flickering diya lights along the bottom edge
const diyaVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uScale;
  varying float vFlicker;
  void main() {
    vFlicker = 0.75 + 0.15 * sin(uTime * 7.0 + aSeed * 20.0) + 0.1 * sin(uTime * 13.0 + aSeed * 7.0);
    gl_Position = vec4(position.xy, 0.0, 1.0);
    gl_PointSize = (70.0 + aSeed * 50.0) * uScale * uPixelRatio * vFlicker;
  }
`;

const diyaFragment = /* glsl */ `
  precision highp float;
  varying float vFlicker;
  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float d = length(p * vec2(1.0, 0.8));
    float halo = smoothstep(0.5, 0.0, d) * 0.35;
    float flame = smoothstep(0.09, 0.0, length((p - vec2(0.0, -0.02)) * vec2(1.6, 0.9)));
    vec3 col = mix(vec3(1.0, 0.6, 0.2), vec3(1.0, 0.93, 0.7), flame);
    gl_FragColor = vec4(col, (halo + flame) * vFlicker);
  }
`;

/**
 * A Diwali night scene for dark sections: fireworks in gold, marigold and rani pink, embers
 * rising, and a row of flickering diya lights. Loads when on screen, pauses off screen or in a
 * background tab, and shows one still frame mid-celebration for reduced motion.
 */
export function DiwaliNight({ className = "" }: { className?: string }) {
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
      const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "low-power" });
      const ratio = Math.min(window.devicePixelRatio, small ? 1.25 : 1.75);
      renderer.setPixelRatio(ratio);
      // Resizing wipes the canvas; clear to the section colour rather than black
      renderer.setClearColor("#161a11");
      renderer.domElement.className =
        "absolute inset-0 size-full opacity-0 transition-opacity duration-[1.6s]";
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.Camera();
      const materials: InstanceType<typeof THREE.ShaderMaterial>[] = [];
      const geometries: InstanceType<typeof THREE.BufferGeometry>[] = [];
      const shared = {
        uTime: { value: 0 },
        uPixelRatio: { value: ratio },
        uAspect: { value: 1 },
        uScale: { value: small ? 0.7 : 1 },
      };
      const material = (vertexShader: string, fragmentShader: string, additive = true) => {
        const m = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: shared,
          transparent: true,
          depthWrite: false,
          blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
        });
        materials.push(m);
        return m;
      };
      const points = (
        attrs: Record<string, [Float32Array, number]>,
        m: InstanceType<typeof THREE.ShaderMaterial>,
      ) => {
        const geo = new THREE.BufferGeometry();
        for (const [name, [data, size]] of Object.entries(attrs)) {
          geo.setAttribute(name, new THREE.BufferAttribute(data, size));
        }
        geometries.push(geo);
        scene.add(new THREE.Points(geo, m));
      };

      const skyGeo = new THREE.PlaneGeometry(2, 2);
      geometries.push(skyGeo);
      scene.add(new THREE.Mesh(skyGeo, material(skyVertex, skyFragment, false)));

      // Diyas
      const diyas = small ? 5 : 9;
      const diyaPos = new Float32Array(diyas * 3);
      const diyaSeed = new Float32Array(diyas);
      for (let i = 0; i < diyas; i++) {
        diyaPos[i * 3] = -0.9 + (1.8 * (i + 0.5)) / diyas + (Math.random() - 0.5) * 0.06;
        diyaPos[i * 3 + 1] = -0.9 + Math.random() * 0.05;
        diyaSeed[i] = Math.random();
      }
      points({ position: [diyaPos, 3], aSeed: [diyaSeed, 1] }, material(diyaVertex, diyaFragment));

      // Embers
      const embers = small ? 30 : 60;
      const emberPos = new Float32Array(embers * 3);
      const emberSeed = new Float32Array(embers);
      for (let i = 0; i < embers; i++) {
        emberPos[i * 3] = Math.random() * 2 - 1;
        emberSeed[i] = Math.random();
      }
      points(
        { position: [emberPos, 3], aSeed: [emberSeed, 1] },
        material(emberVertex, sparkFragment),
      );

      // Fireworks
      const sparks = BURSTS * SPARKS_PER_BURST;
      const fwPos = new Float32Array(sparks * 3);
      const fwBurst = new Float32Array(sparks);
      const fwDir = new Float32Array(sparks * 2);
      const fwSeed = new Float32Array(sparks);
      for (let i = 0; i < sparks; i++) {
        const angle = Math.random() * Math.PI * 2;
        fwBurst[i] = Math.floor(i / SPARKS_PER_BURST);
        fwDir[i * 2] = Math.cos(angle);
        fwDir[i * 2 + 1] = Math.sin(angle);
        fwSeed[i] = Math.random();
      }
      points(
        { position: [fwPos, 3], aBurst: [fwBurst, 1], aDir: [fwDir, 2], aSeed: [fwSeed, 1] },
        material(fireworkVertex, sparkFragment),
      );

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = host;
        renderer.setSize(w, h, false);
        shared.uAspect.value = w / Math.max(h, 1);
      };
      resize();
      // Redraw after every resize: when paused (reduced motion, off screen) nothing else would,
      // and a resized WebGL canvas is blank until drawn again
      const ro = new ResizeObserver(() => {
        resize();
        render();
      });
      ro.observe(host);

      let frame = 0;
      let visible = true;
      const start = performance.now() - 1300; // open mid-burst rather than on an empty sky
      const render = () => {
        shared.uTime.value = (performance.now() - start) / 1000;
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

      const io = new IntersectionObserver(
        ([entry]) => {
          visible = !!entry?.isIntersecting;
          resume();
        },
        { rootMargin: "100px 0px" },
      );
      io.observe(host);
      document.addEventListener("visibilitychange", resume);

      cleanup = () => {
        cancelAnimationFrame(frame);
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", resume);
        materials.forEach((m) => m.dispose());
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
          "radial-gradient(70% 40% at 50% 100%, rgb(217 140 46 / 0.3), transparent 70%), radial-gradient(40% 35% at 70% 25%, rgb(198 161 91 / 0.18), transparent 70%), #161a11",
      }}
    />
  );
}
