/*
  Hero confetti — a light Three.js layer of drifting gold foil.
  Port of the reference's js/hero-scene.js (verbatim counts, geometry, lights, material, palette,
  spawn/fall/sway physics and pointer parallax), importing the installed `three` package instead of
  the jsDelivr ESM build (the reference pins three@0.169; nothing it uses changed by 0.186).

  It stands in for the gold ribbon artwork of the original site and echoes the
  gold dignitary robes. One InstancedMesh (a single draw call), no textures.

  Performance guards (the reference's)
  - Skipped for prefers-reduced-motion (static confetti image shown instead).
  - Pixel ratio capped at 1.5; fewer pieces on small screens.
  - Renders only while the hero is on screen and the tab is visible.

  Port changes: the reference runs at module load against document-level selectors and never stops;
  here `startConfetti()` takes the page's own elements and returns a disposer (rAF, observers,
  listeners, failsafe timer, geometry/material/renderer + WebGL context), so a client navigation
  away from /convocation leaves nothing running. The fallback image is shown with an inline display
  instead of removing a `hidden` class, and the canvas is hidden rather than removed — React owns both.
*/
import * as THREE from 'three';

export function startConfetti({ canvas, fallback, hero, released: alreadyReleased = false }) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const showFallback = () => {
    if (fallback) fallback.style.display = 'block';
    if (canvas) canvas.style.display = 'none';
  };
  if (!canvas) return () => {};
  if (reduced) {
    showFallback();
    return () => {};
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
  } catch {
    showFallback();
    return () => {};
  }

  const small = window.innerWidth < 768;
  const COUNT = small ? 70 : 170;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
  camera.position.set(0, 0, 14);

  // Warm key light for the foil glints + a cool ultramarine fill (the gowns)
  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const key = new THREE.DirectionalLight(0xfff0cc, 2.6);
  key.position.set(4, 6, 8);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x6b6bff, 1.1);
  fill.position.set(-6, -2, 4);
  scene.add(fill);

  // A slightly bent strip reads as foil rather than a flat square
  const geometry = new THREE.PlaneGeometry(0.34, 0.14, 4, 1);
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) pos.setZ(i, Math.sin(pos.getX(i) * 9) * 0.03);
  geometry.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.55,
    roughness: 0.32,
    side: THREE.DoubleSide,
    emissive: 0x2a1d05,
  });

  const mesh = new THREE.InstancedMesh(geometry, material, COUNT);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(mesh);

  // Palette: robe gold, pale gold, antique gold, and the odd white stole
  const palette = [0xd6ae55, 0xefd592, 0xb8893a, 0xd6ae55, 0xf5f6fc].map((c) => new THREE.Color(c));

  const pieces = [];
  const dummy = new THREE.Object3D();

  function visibleSize(depth) {
    const dist = camera.position.z - depth;
    const h = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * dist;
    return { w: h * camera.aspect, h };
  }

  function spawn(p, initial) {
    p.z = THREE.MathUtils.randFloat(-6, 4);
    const size = visibleSize(p.z);
    p.halfW = size.w / 2 + 1;
    p.halfH = size.h / 2 + 1;
    p.x = THREE.MathUtils.randFloatSpread(size.w + 2);
    // First wave starts above the frame so the confetti "arrives" with the intro
    p.y = initial ? p.halfH + Math.random() * size.h * 1.2 : p.halfH;
    p.fall = THREE.MathUtils.randFloat(0.45, 1.1);
    p.sway = THREE.MathUtils.randFloat(0.3, 0.9);
    p.phase = Math.random() * Math.PI * 2;
    p.rx = Math.random() * Math.PI; p.ry = Math.random() * Math.PI; p.rz = Math.random() * Math.PI;
    p.vx = THREE.MathUtils.randFloatSpread(3); p.vy = THREE.MathUtils.randFloatSpread(3); p.vz = THREE.MathUtils.randFloatSpread(2);
    p.scale = THREE.MathUtils.randFloat(0.6, 1.25);
  }

  for (let i = 0; i < COUNT; i++) {
    const p = {};
    spawn(p, true);
    pieces.push(p);
    mesh.setColorAt(i, palette[i % palette.length]);
  }
  mesh.instanceColor.needsUpdate = true;

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    pieces.forEach((p) => {
      const s = visibleSize(p.z);
      p.halfW = s.w / 2 + 1;
      p.halfH = s.h / 2 + 1;
    });
  }
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  // Gentle pointer parallax on the camera
  const pointer = { x: 0, y: 0 };
  const onPointer = (e) => {
    pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  // Run only while visible
  let inView = true;
  let released = alreadyReleased; // wait for the intro so confetti falls as the doors open
  const io = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; }, { threshold: 0 });
  if (hero) io.observe(hero);
  const onIntro = () => { released = true; };
  window.addEventListener('convocation:intro', onIntro, { once: true });
  const failsafe = setTimeout(() => { released = true; }, 4500); // failsafe if the intro event never fires

  // The reference's THREE.Clock().getDelta() — a performance.now() delta in seconds. Written out
  // because THREE.Clock is deprecated in the installed three (it logs a console warning).
  let last = performance.now();
  const getDelta = () => { const now = performance.now(); const d = (now - last) / 1000; last = now; return d; };
  let t = 0;
  let raf = 0;

  function tick() {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(getDelta(), 0.05);
    if (!inView || document.hidden || !released) return;
    t += dt;

    for (let i = 0; i < COUNT; i++) {
      const p = pieces[i];
      p.y -= p.fall * dt;
      p.x += Math.sin(t * p.sway + p.phase) * 0.35 * dt;
      p.rx += p.vx * dt; p.ry += p.vy * dt; p.rz += p.vz * dt;
      if (p.y < -p.halfH) spawn(p, false);
      if (p.x > p.halfW) p.x = -p.halfW; else if (p.x < -p.halfW) p.x = p.halfW;

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rx, p.ry, p.rz);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;

    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (-pointer.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  tick();

  return function dispose() {
    cancelAnimationFrame(raf);
    clearTimeout(failsafe);
    ro.disconnect();
    io.disconnect();
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('convocation:intro', onIntro);
    mesh.dispose();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    // Release the WebGL context once the canvas has left the document (a route change). While it is
    // still connected — React StrictMode / Fast Refresh re-running the effect on the same DOM — the
    // context is kept, so the next renderer created on this canvas can reuse it.
    setTimeout(() => { if (!canvas.isConnected) renderer.forceContextLoss(); }, 0);
  };
}
