declare module "vanta/dist/vanta.fog.min" {
  type VantaEffect = { destroy: () => void; resize: () => void };
  const FOG: (options: Record<string, unknown>) => VantaEffect;
  export default FOG;
}

// three.js is only handed to Vanta, so its full types are not needed.
declare module "three";
