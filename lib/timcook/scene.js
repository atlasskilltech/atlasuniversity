/*
 * WebGL particle layer — port of the reference's assets/js/scene.js (verbatim shaders, geometry,
 * counts, sizes and camera), importing the installed `three` package instead of the jsDelivr ESM
 * build. Loaded on demand (dynamic import from lib/timcook/motion.js) exactly as the reference
 * imports it on idle.
 *
 * Hero: a slowly turning globe of points — a "global perspective".
 * Finale: the same points regroup into the ATLAS triangle.
 * One draw call, one ShaderMaterial; rendering is paused whenever the layer is invisible.
 *
 * Port addition: dispose() also calls renderer.forceContextLoss() once the canvas has
 * left the document, so leaving the route on a client navigation releases the WebGL context instead
 * of waiting for GC.
 */
import {
  WebGLRenderer, Scene, PerspectiveCamera, BufferGeometry, BufferAttribute,
  ShaderMaterial, Points, Group, AdditiveBlending,
} from 'three';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uScatter;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uRot;
  attribute vec3 aTarget;
  attribute float aSeed;
  varying float vAlpha;
  varying float vWarm;

  vec3 rotY(vec3 p, float a) {
    float c = cos(a), s = sin(a);
    return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
  }

  void main() {
    vec3 sphere = rotY(position, uRot);
    // Staggered morph so the triangle assembles rather than snapping
    float m = smoothstep(0.0, 1.0, clamp(uMorph * 1.3 - aSeed * 0.3, 0.0, 1.0));
    vec3 p = mix(sphere, aTarget, m);

    float t = uTime * 0.35 + aSeed * 6.2831;
    p += vec3(sin(t + p.y * 1.7), cos(t * 0.8 + p.x * 1.3), sin(t * 1.2 + p.z * 1.1)) * (0.025 + 0.045 * (1.0 - m));
    p *= 1.0 + uScatter * (0.35 + aSeed * 1.25);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.35 + aSeed * 0.9) * uPixelRatio / -mv.z;

    vAlpha = (0.3 + 0.7 * smoothstep(9.0, 4.2, -mv.z)) * (1.0 - uScatter * 0.55);
    vWarm = step(0.9, aSeed);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying float vAlpha;
  varying float vWarm;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    vec3 col = mix(vec3(0.86, 0.89, 0.97), vec3(0.96, 0.81, 0.29), vWarm);
    gl_FragColor = vec4(col, a * vAlpha * uOpacity);
  }
`;

function buildGeometry(count) {
  const position = new Float32Array(count * 3);
  const target = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));

  // Equilateral triangle centred on its centroid
  const side = 4.3;
  const h = (side * Math.sqrt(3)) / 2;
  const A = [0, (2 * h) / 3];
  const B = [-side / 2, -h / 3];
  const C = [side / 2, -h / 3];
  const edges = [[A, B], [B, C], [C, A]];

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    seed[i] = Math.random();

    // Globe: fibonacci shell + a little outer dust
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const dust = Math.random() < 0.1;
    const R = dust ? 2.3 + Math.random() * 1.8 : 1.9 + (Math.random() - 0.5) * 0.1;
    position[i3] = Math.cos(theta) * r * R;
    position[i3 + 1] = y * R;
    position[i3 + 2] = Math.sin(theta) * r * R;

    // Triangle outline, with some ambient points left floating around it
    if (Math.random() < 0.84) {
      const [p, q] = edges[i % 3];
      const t = Math.random();
      const jitter = (Math.random() - 0.5) * 0.12;
      const nx = -(q[1] - p[1]);
      const ny = q[0] - p[0];
      const nl = Math.hypot(nx, ny);
      target[i3] = p[0] + (q[0] - p[0]) * t + (nx / nl) * jitter;
      target[i3 + 1] = p[1] + (q[1] - p[1]) * t + (ny / nl) * jitter;
      target[i3 + 2] = (Math.random() - 0.5) * 0.3;
    } else {
      const a = Math.random() * Math.PI * 2;
      const rr = 2.8 + Math.random() * 3.2;
      target[i3] = Math.cos(a) * rr;
      target[i3 + 1] = Math.sin(a) * rr * 0.6;
      target[i3 + 2] = -1.5 - Math.random() * 2;
    }
  }

  const geo = new BufferGeometry();
  geo.setAttribute('position', new BufferAttribute(position, 3));
  geo.setAttribute('aTarget', new BufferAttribute(target, 3));
  geo.setAttribute('aSeed', new BufferAttribute(seed, 1));
  return geo;
}

export function createScene(canvas, { mobile = false } = {}) {
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'default' });
  } catch {
    return null;
  }
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.1, 50);
  camera.position.set(0, 0, 6);

  const count = mobile ? 2200 : 6000;
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uScatter: { value: 0 },
      uOpacity: { value: 0 },
      uRot: { value: 0 },
      uSize: { value: mobile ? 30 : 34 },
      uPixelRatio: { value: 1 },
    },
  });
  const geometry = buildGeometry(count);
  const group = new Group();
  group.add(new Points(geometry, material));
  scene.add(group);

  const pointer = { x: 0, y: 0 };
  const onPointer = (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  if (!mobile) window.addEventListener('pointermove', onPointer, { passive: true });

  let lastW = 0;
  let lastH = 0;
  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w === lastW && Math.abs(h - lastH) < 2) return;
    lastW = w;
    lastH = h;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    material.uniforms.uPixelRatio.value = dpr;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // Keep the globe/triangle inside narrow (portrait) viewports
    group.scale.setScalar(Math.min(1, Math.max(0.5, camera.aspect * 0.85)));
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const u = material.uniforms;
  let elapsed = 0;

  return {
    set({ scatter, morph, opacity }) {
      if (scatter !== undefined) u.uScatter.value = scatter;
      if (morph !== undefined) u.uMorph.value = morph;
      if (opacity !== undefined) u.uOpacity.value = opacity;
    },
    get visible() {
      return u.uOpacity.value > 0.004;
    },
    // Called from gsap.ticker (seconds, delta ms)
    render(deltaMs) {
      const dt = Math.min(deltaMs, 50) / 1000;
      elapsed += dt;
      u.uTime.value = elapsed;
      u.uRot.value += dt * 0.07;
      group.rotation.x += (pointer.y * 0.18 - group.rotation.x) * 0.04;
      group.rotation.y += (pointer.x * 0.25 - group.rotation.y) * 0.04;
      renderer.render(scene, camera);
    },
    dispose() {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      // Release the WebGL context once the canvas has left the document (a route change). While it
      // is still connected — React StrictMode / Fast Refresh re-running the effect on the same DOM —
      // the context is kept, so the next renderer created on this canvas can reuse it.
      setTimeout(() => { if (!canvas.isConnected) renderer.forceContextLoss(); }, 0);
    },
  };
}
