<template>
  <section ref="rootRef" class="pscan" data-nav-theme="dark" aria-label="Portfolio showcase">
    <div class="pscan-head">
      <span class="pscan-kicker">Selected work</span>
      <h2 class="pscan-word" aria-hidden="true">PORTFOLIO</h2>
    </div>

    <div ref="stageRef" class="pscan-stage">
      <canvas ref="dustRef" class="pscan-dust" aria-hidden="true"></canvas>

      <div class="pscan-stream">
        <div
          ref="lineRef"
          class="pscan-line"
          :style="{ gap: gap + 'px' }"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointercancel="onPointerUp"
          @dragstart.prevent
        >
          <div
            v-for="(card, i) in cards"
            :key="card.key"
            class="pscan-card-wrap"
            :style="{ width: cardW + 'px', height: cardH + 'px' }"
          >
            <div class="pscan-card pscan-card--media" aria-hidden="true">
              <img :src="card.image" alt="" draggable="false" />
              <span class="pscan-card-meta">
                <span class="pscan-card-kind">{{ card.kind }}</span>
                <span class="pscan-card-title">{{ card.plainTitle }}</span>
              </span>
            </div>

            <div class="pscan-card pscan-card--code" aria-hidden="true">
              <pre class="pscan-code">{{ card.code }}</pre>
            </div>

            <!-- Separate hit layer: both visual layers are clipped by the beam, and
                 clip-path clips hit-testing too, so a card's scanned half would not
                 be clickable if the link lived on them. -->
            <NuxtLink
              :to="localePath(card.link || '/portfolio')"
              class="pscan-card-hit"
              :tabindex="i < projectCount ? 0 : -1"
              :aria-hidden="i >= projectCount ? 'true' : undefined"
              :aria-label="card.plainTitle"
              @click="onCardClick"
            />
          </div>
        </div>
      </div>

      <canvas ref="beamRef" class="pscan-beam" aria-hidden="true"></canvas>
    </div>

    <div class="pscan-cta-wrap">
      <NuxtLink :to="localePath('/portfolio')" class="pscan-cta">See Showcase</NuxtLink>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useLocalePath } from '#i18n';

const localePath = useLocalePath();

const props = defineProps({
  projects: { type: Array, default: () => [] },
});

const rootRef = ref(null);
const stageRef = ref(null);
const lineRef = ref(null);
const dustRef = ref(null);
const beamRef = ref(null);

const cardW = ref(400);
const cardH = ref(250);
const gap = ref(60);

const FALLBACK = [
  { id: 'fitlife', title: 'FitLife Tracker', kind: 'App', image: '/img/works/1.jpg' },
  { id: 'commerce', title: 'Commerce Engine', kind: 'Web', image: '/img/works/2.jpg' },
  { id: 'apex', title: 'Apex Horizon', kind: 'Project', image: '/img/works/3.jpg' },
  { id: 'finance', title: 'Global Finance Hub', kind: 'Web', image: '/img/works/4.jpg' },
  { id: 'motion', title: 'Motion Vault', kind: 'Video', image: '/img/works/5.jpg' },
];

const source = computed(() => {
  const list = Array.isArray(props.projects) && props.projects.length ? props.projects : FALLBACK;
  return list.map((p, i) => ({
    id: p.id || p.slug || `p${i}`,
    plainTitle: String(p.title || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
    kind: p.kind || 'Project',
    image: p.image || FALLBACK[i % FALLBACK.length].image,
    imageAlt: p.imageAlt,
    link: p.link || '/portfolio',
  }));
});

const projectCount = computed(() => source.value.length);

// One "set" is repeated until it is wider than the viewport, then rendered twice —
// wrapping the offset by exactly one set width makes the loop seamless.
const repeats = ref(2);

const cards = computed(() => {
  const set = [];
  for (let r = 0; r < repeats.value; r++) {
    source.value.forEach((p, i) => set.push({ ...p, key: `${p.id}-${r}-${i}`, code: '' }));
  }
  return [...set, ...set.map((c, i) => ({ ...c, key: `${c.key}-b${i}` }))];
});

// Live DOM order is the only safe source of truth here: a ref array collected
// through :ref only gets refreshed for elements Vue re-creates, so it silently
// falls out of sync with layout order when the card count changes.
const cardElements = () => (lineRef.value ? Array.from(lineRef.value.children) : []);

/* ── code rain text ─────────────────────────────────────────────────────── */
const CODE_LIBRARY = [
  '// compiled preview • scanner demo',
  '/* generated for visual effect – not executed */',
  'const SCAN_WIDTH = 8;',
  'const FADE_ZONE = 35;',
  'const MAX_PARTICLES = 2500;',
  'function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }',
  'function lerp(a, b, t) { return a + (b - a) * t; }',
  'const now = () => performance.now();',
  'class Particle { constructor(x, y, vx, vy, r, a) { this.x = x; this.y = y; this.vx = vx; this.vy = vy; } }',
  'step(dt) { this.x += this.vx * dt; this.y += this.vy * dt; }',
  "const scanner = { x: Math.floor(window.innerWidth / 2), width: SCAN_WIDTH, glow: 3.5 };",
  'function drawParticle(ctx, p) { ctx.globalAlpha = clamp(p.a, 0, 1); }',
  'function tick(t) { const dt = 0.016; requestAnimationFrame(tick); }',
  'const state = { intensity: 1.2, particles: MAX_PARTICLES };',
  'const bounds = { w: window.innerWidth, h: 300 };',
  "ctx.globalCompositeOperation = 'lighter';",
  '// ascii overlay is masked with a 3-phase gradient',
];

function generateCode(cols, rows) {
  let flow = '';
  while (flow.length < cols * rows + cols) {
    flow += CODE_LIBRARY[Math.floor(Math.random() * CODE_LIBRARY.length)] + ' ';
    if (Math.random() < 0.25) flow += `const v${Math.floor(Math.random() * 90 + 10)} = ${Math.floor(Math.random() * 9 + 1)} * 0.${Math.floor(Math.random() * 9 + 1)}; `;
  }
  flow = flow.replace(/\s+/g, ' ');
  let out = '';
  for (let r = 0; r < rows; r++) {
    out += flow.slice(r * cols, r * cols + cols).padEnd(cols, ' ');
    if (r < rows - 1) out += '\n';
  }
  return out;
}

const CHAR_W = 6;
const LINE_H = 13;
let codeGrid = '';

// Written once per card and left alone: re-rolling the text mid-flight reads as
// the card glitching rather than as code. Only a real change of grid size
// (a breakpoint switch) regenerates it — plain resize events must not, or a
// phone's address bar sliding away would rescramble every card.
function fillCode(el, cols, rows) {
  const pre = el.querySelector('.pscan-code');
  if (!pre) return;
  pre.textContent = generateCode(cols, rows);
}

function fillAllCode(force = false) {
  const cols = Math.floor(cardW.value / CHAR_W);
  const rows = Math.floor(cardH.value / LINE_H);
  const key = `${cols}x${rows}`;
  const gridChanged = key !== codeGrid;
  codeGrid = key;
  cardElements().forEach((el) => {
    const pre = el.querySelector('.pscan-code');
    if (!pre) return;
    // Cards added by a wider viewport start empty and need filling; the rest keep
    // the text they already have unless the grid itself changed.
    if (force || gridChanged || !pre.textContent) fillCode(el, cols, rows);
  });
}

/* ── stream motion ──────────────────────────────────────────────────────── */
const BASE_SPEED = 45;
let position = 0;
let setWidth = 0;
let stageWidth = 0;
let velocity = BASE_SPEED;
let direction = -1;
let dragging = false;
let captured = false;
let dragMoved = 0;
let lastPointerX = 0;
let pointerVelocity = 0;
let lastFrame = 0;
let rafId = 0;
let reduceMotion = false;
let onStage = true;

const pitch = () => cardW.value + gap.value;

function measure() {
  if (!stageRef.value || typeof window === 'undefined') return;
  const isPhone = window.innerWidth < 768;
  cardW.value = isPhone ? 248 : 400;
  cardH.value = isPhone ? 155 : 250;
  gap.value = isPhone ? 32 : 60;

  const rect = stageRef.value.getBoundingClientRect();
  stageWidth = rect.width;

  const needed = Math.ceil((stageWidth + pitch() * 2) / (projectCount.value * pitch()));
  repeats.value = Math.max(2, needed);
  setWidth = repeats.value * projectCount.value * pitch();

  sizeCanvas(dustRef.value, stageWidth, rect.height);
  sizeCanvas(beamRef.value, stageWidth, rect.height);
  buildDust();
}

function sizeCanvas(canvas, w, h) {
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
}

function wrap(p) {
  if (!setWidth) return p;
  let v = p % setWidth;
  if (v > 0) v -= setWidth;
  return v;
}

function applyClipping() {
  const beamX = stageWidth / 2;
  const beamHalf = 4;
  const w = cardW.value;
  let scanning = false;

  cardElements().forEach((el, i) => {
    // Derived from the offset instead of getBoundingClientRect: reading ~30 rects
    // every frame would force a layout on each one.
    const left = position + i * pitch();
    const right = left + w;
    const media = el.children[0];
    const code = el.children[1];

    let clipLeft;
    if (right < beamX - beamHalf) clipLeft = 100;
    else if (left > beamX + beamHalf) clipLeft = 0;
    else {
      scanning = true;
      clipLeft = Math.min(Math.max(((beamX + beamHalf - left) / w) * 100, 0), 100);
    }
    const clipRight = Math.min(Math.max(((beamX - beamHalf - left) / w) * 100, 0), 100);

    media.style.clipPath = `inset(0 0 0 ${clipRight}%)`;
    code.style.clipPath = `inset(0 ${100 - clipLeft}% 0 0)`;
  });

  return scanning;
}

function step(now) {
  const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.05) : 0;
  lastFrame = now;

  // Route changes tear the refs down a frame before onUnmounted cancels this loop.
  if (!lineRef.value) return;

  // The canvases and the stream cost nothing to keep still while the section is
  // scrolled past — this page has plenty of other work to do.
  if (!onStage) {
    rafId = requestAnimationFrame(step);
    return;
  }

  if (!dragging && !reduceMotion) {
    if (velocity > BASE_SPEED) velocity = Math.max(BASE_SPEED, velocity * 0.95);
    position = wrap(position + velocity * direction * dt);
    lineRef.value.style.transform = `translate3d(${position}px,0,0)`;
  }

  const scanning = applyClipping();
  drawDust(dt);
  drawBeam(scanning, dt);

  rafId = requestAnimationFrame(step);
}

/* ── pointer drag ───────────────────────────────────────────────────────── */
const DRAG_THRESHOLD = 6;

function onPointerDown(e) {
  dragging = true;
  captured = false;
  dragMoved = 0;
  lastPointerX = e.clientX;
  pointerVelocity = 0;
}

function onPointerMove(e) {
  if (!dragging) return;
  const dx = e.clientX - lastPointerX;
  lastPointerX = e.clientX;
  dragMoved += Math.abs(dx);
  if (!captured && dragMoved > DRAG_THRESHOLD) {
    captured = true;
    lineRef.value.setPointerCapture?.(e.pointerId);
    lineRef.value.classList.add('is-dragging');
  }
  if (!captured) return;
  pointerVelocity = dx * 60;
  position = wrap(position + dx);
  lineRef.value.style.transform = `translate3d(${position}px,0,0)`;
}

function onPointerUp(e) {
  if (!dragging) return;
  dragging = false;
  if (captured) lineRef.value.releasePointerCapture?.(e.pointerId);
  captured = false;
  lineRef.value.classList.remove('is-dragging');
  if (Math.abs(pointerVelocity) > 30) {
    velocity = Math.min(Math.abs(pointerVelocity), 2600);
    direction = pointerVelocity > 0 ? 1 : -1;
  } else {
    velocity = BASE_SPEED;
  }
}

// A drag that ends on a card must not count as a click on its link.
function onCardClick(e) {
  if (dragMoved > DRAG_THRESHOLD) {
    e.preventDefault();
    e.stopPropagation();
  }
}

/* ── background dust ────────────────────────────────────────────────────── */
let dust = [];
let sprite = null;

function makeSprite() {
  const c = document.createElement('canvas');
  c.width = c.height = 32;
  const g = c.getContext('2d');
  const half = 16;
  const grad = g.createRadialGradient(half, half, 0, half, half, half);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.3, 'rgba(255,196,107,0.85)');
  grad.addColorStop(0.7, 'rgba(255,153,0,0.35)');
  grad.addColorStop(1, 'rgba(255,153,0,0)');
  g.fillStyle = grad;
  g.beginPath();
  g.arc(half, half, half, 0, Math.PI * 2);
  g.fill();
  return c;
}

function buildDust() {
  if (!dustRef.value) return;
  const h = dustRef.value.clientHeight;
  const count = Math.round(Math.min(stageWidth, 1600) / 4);
  dust = Array.from({ length: count }, () => ({
    x: Math.random() * stageWidth,
    y: Math.random() * h,
    r: Math.random() * 1.6 + 0.4,
    vx: Math.random() * 26 + 12,
    a: Math.random() * 0.6 + 0.2,
    tw: Math.random() * 0.06 + 0.02,
    t: Math.random() * 100,
  }));
}

function drawDust(dt) {
  const canvas = dustRef.value;
  if (!canvas || !sprite) return;
  const ctx = canvas.getContext('2d');
  const h = canvas.clientHeight;
  ctx.clearRect(0, 0, stageWidth, h);
  ctx.globalCompositeOperation = 'lighter';

  dust.forEach((p) => {
    if (!reduceMotion) {
      p.x += p.vx * dt;
      p.t += 1;
      if (p.x > stageWidth + 10) { p.x = -10; p.y = Math.random() * h; }
    }
    const twinkle = 1 + Math.sin(p.t * p.tw) * 0.35;
    ctx.globalAlpha = Math.max(0, Math.min(1, p.a * twinkle)) * 0.8;
    ctx.drawImage(sprite, p.x - p.r * 3, p.y - p.r * 3, p.r * 6, p.r * 6);
  });
  ctx.globalAlpha = 1;
}

/* ── scanner beam ───────────────────────────────────────────────────────── */
let beamParticles = [];
let beamGlow = 1;

function spawnBeamParticle(h) {
  return {
    x: stageWidth / 2 + (Math.random() - 0.5) * 3,
    y: Math.random() * h,
    vx: Math.random() * 60 + 14,
    vy: (Math.random() - 0.5) * 12,
    r: Math.random() * 0.9 + 0.35,
    a: Math.random() * 0.4 + 0.6,
    life: 1,
    decay: Math.random() * 0.02 + 0.006,
    t: Math.random() * 60,
    tw: Math.random() * 0.06 + 0.02,
  };
}

function drawBeam(scanning, dt) {
  const canvas = beamRef.value;
  if (!canvas || !sprite) return;
  const ctx = canvas.getContext('2d');
  const h = canvas.clientHeight;
  const x = stageWidth / 2;
  const fade = 60;

  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, stageWidth, h);
  ctx.globalCompositeOperation = 'lighter';

  beamGlow += ((scanning ? 3.2 : 1) - beamGlow) * 0.05;

  // core + two orange glow passes, widening outward
  const bar = (halfWidth, stops, alpha) => {
    const g = ctx.createLinearGradient(x - halfWidth, 0, x + halfWidth, 0);
    stops.forEach(([o, c]) => g.addColorStop(o, c));
    ctx.globalAlpha = alpha;
    ctx.fillStyle = g;
    ctx.fillRect(x - halfWidth, 0, halfWidth * 2, h);
  };

  bar(1.5, [
    [0, 'rgba(255,255,255,0)'],
    [0.5, `rgba(255,255,255,${Math.min(1, beamGlow)})`],
    [1, 'rgba(255,255,255,0)'],
  ], 1);
  bar(6, [
    [0, 'rgba(255,153,0,0)'],
    [0.5, `rgba(255,196,107,${0.75 * beamGlow})`],
    [1, 'rgba(255,153,0,0)'],
  ], scanning ? 1 : 0.8);
  bar(12, [
    [0, 'rgba(255,153,0,0)'],
    [0.5, `rgba(255,153,0,${0.38 * beamGlow})`],
    [1, 'rgba(255,153,0,0)'],
  ], scanning ? 0.85 : 0.55);
  if (scanning) {
    bar(24, [
      [0, 'rgba(255,153,0,0)'],
      [0.5, 'rgba(255,153,0,0.2)'],
      [1, 'rgba(255,153,0,0)'],
    ], 0.6);
  }

  // particles streaming off the beam
  const target = scanning ? 900 : 260;
  if (!reduceMotion) {
    for (let i = 0; i < (scanning ? 14 : 4); i++) {
      if (beamParticles.length < target) beamParticles.push(spawnBeamParticle(h));
    }
  }

  beamParticles = beamParticles.filter((p) => {
    if (!reduceMotion) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= p.decay;
      p.t += 1;
    }
    if (p.life <= 0 || p.x > stageWidth + 10) return false;
    let edge = 1;
    if (p.y < fade) edge = p.y / fade;
    else if (p.y > h - fade) edge = (h - p.y) / fade;
    ctx.globalAlpha = Math.max(0, Math.min(1, p.a * p.life * edge + Math.sin(p.t * p.tw) * 0.1));
    ctx.drawImage(sprite, p.x - p.r * 3, p.y - p.r * 3, p.r * 6, p.r * 6);
    return true;
  });
  if (beamParticles.length > target) beamParticles.length = target;

  // fade the whole beam layer out at the top and bottom edges
  ctx.globalCompositeOperation = 'destination-in';
  ctx.globalAlpha = 1;
  const mask = ctx.createLinearGradient(0, 0, 0, h);
  mask.addColorStop(0, 'rgba(0,0,0,0)');
  mask.addColorStop(fade / h, 'rgba(0,0,0,1)');
  mask.addColorStop(1 - fade / h, 'rgba(0,0,0,1)');
  mask.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = mask;
  ctx.fillRect(0, 0, stageWidth, h);
  ctx.globalAlpha = 1;
}

/* ── lifecycle ──────────────────────────────────────────────────────────── */
let onResize = null;
let observer = null;

onMounted(async () => {
  if (typeof window === 'undefined') return;
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  sprite = makeSprite();

  measure();
  await nextTick();
  measure();
  position = wrap(-setWidth / 2);
  lineRef.value.style.transform = `translate3d(${position}px,0,0)`;
  fillAllCode(true);

  observer = new IntersectionObserver(
    ([entry]) => { onStage = entry.isIntersecting; if (onStage) lastFrame = 0; },
    { rootMargin: '150px 0px' },
  );
  observer.observe(rootRef.value);

  onResize = () => { measure(); nextTick(() => { measure(); fillAllCode(); }); };
  window.addEventListener('resize', onResize);

  rafId = requestAnimationFrame(step);
});

onUnmounted(() => {
  cancelAnimationFrame(rafId);
  observer?.disconnect();
  if (onResize) window.removeEventListener('resize', onResize);
  beamParticles = [];
  dust = [];
});
</script>

<style scoped>
.pscan {
  position: relative;
  background: #000;
  padding: clamp(5rem, 10vw, 8rem) 0 clamp(4rem, 8vw, 6rem);
  overflow: clip;
}

.pscan-head {
  position: relative;
  z-index: 2;
  text-align: center;
  margin-bottom: clamp(2rem, 5vw, 3.5rem);
  padding: 0 1.5rem;
}

.pscan-kicker {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #ff9900;
  margin-bottom: 1rem;
}

.pscan-word {
  margin: 0;
  font-size: clamp(2.75rem, 11vw, 9rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.02em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.16);
}

.pscan-stage {
  position: relative;
  height: clamp(280px, 42vw, 420px);
  width: 100%;
}

.pscan-dust,
.pscan-beam {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.pscan-dust { z-index: 0; }
.pscan-beam { z-index: 3; }

.pscan-stream {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  z-index: 2;
}

.pscan-line {
  display: flex;
  align-items: center;
  gap: 60px;
  will-change: transform;
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
}

.pscan-line.is-dragging { cursor: grabbing; }

.pscan-card-wrap {
  position: relative;
  flex: 0 0 auto;
}

.pscan-card {
  position: absolute;
  inset: 0;
  border-radius: 15px;
  overflow: hidden;
}

.pscan-card--media {
  display: block;
  z-index: 2;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.45);
}

.pscan-card--media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(1.05) contrast(1.05);
  -webkit-user-drag: none;
}

.pscan-card-meta {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 2.5rem 1.25rem 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.82), transparent);
  color: #fff;
}

.pscan-card-kind {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #ff9900;
}

.pscan-card-title {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
}

.pscan-card--code {
  z-index: 1;
  background: #000;
}

.pscan-card-hit {
  position: absolute;
  inset: 0;
  z-index: 4;
  border-radius: 15px;
}

.pscan-card-hit:focus-visible {
  outline: 2px solid #ff9900;
  outline-offset: 3px;
}

.pscan-code {
  margin: 0;
  padding: 0;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  line-height: 13px;
  white-space: pre;
  color: rgba(255, 196, 107, 0.62);
  /* the code reads brightest right at the beam and fades out behind it */
  -webkit-mask-image: linear-gradient(to right, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.55) 45%, rgba(0, 0, 0, 1) 100%);
  mask-image: linear-gradient(to right, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.55) 45%, rgba(0, 0, 0, 1) 100%);
}

.pscan-cta-wrap {
  position: relative;
  z-index: 4;
  display: flex;
  justify-content: center;
  margin-top: clamp(2rem, 5vw, 3.5rem);
}

.pscan-cta {
  display: inline-flex;
  align-items: center;
  padding: 0.9rem 2.4rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #fff;
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

.pscan-cta:hover {
  background: #ff9900;
  border-color: #ff9900;
  color: #0a0a0a;
}

@media (max-width: 767px) {
  .pscan-card-meta { padding: 2rem 0.9rem 0.75rem; }
  .pscan-card-title { font-size: 0.85rem; }
}
</style>
