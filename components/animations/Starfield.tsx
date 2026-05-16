"use client";

import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Particle {
  /** Home position that drifts slowly */
  baseX: number;
  baseY: number;
  /** Rendered position – lerps toward (baseX + mouseOffset) */
  x: number;
  y: number;
  /** Slow drift velocity applied to base each frame */
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  r: number;
  g: number;
  b: number;
  /** Multiplies drift speed to create perceived depth layers */
  speedFactor: number;
  /** Multiplies repulsion strength for variety */
  repulsionScale: number;
}

interface CanvasState {
  particles: Particle[];
  W: number;
  H: number;
  /** Smoothed mouse position */
  mx: number;
  my: number;
  /** Raw target mouse position */
  tx: number;
  ty: number;
  raf: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PARTICLE_COUNT = 260;
const STATIC_STAR_COUNT = 95;
/** Radius of mouse influence in px */
const MOUSE_RADIUS = 155;
/** Maximum displacement from base position when mouse is at edge of radius */
const REPULSION_STRENGTH = 72;
/** How fast the rendered position catches up to the target (0–1, lower = smoother) */
const POSITION_LERP = 0.052;
/** How fast the smoothed mouse position follows the real cursor */
const MOUSE_LERP = 0.09;
const DRIFT_SPEED = 0.16;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function randColor(): { r: number; g: number; b: number } {
  const roll = Math.random();
  // 35% pure electric blue, 20% lighter blue, 10% cyan, rest blue-white
  if (roll < 0.35) return { r: 0,   g: 102, b: 255 };
  if (roll < 0.55) return { r: 61,  g: 139, b: 255 };
  if (roll < 0.65) return { r: 0,   g: 163, b: 255 };
  const v = 175 + Math.floor(Math.random() * 80);
  return { r: v, g: v, b: 255 };
}

function createParticle(W: number, H: number): Particle {
  const { r, g, b } = randColor();
  const bx = Math.random() * W;
  const by = Math.random() * H;
  return {
    baseX: bx,
    baseY: by,
    x: bx,
    y: by,
    vx: (Math.random() - 0.5) * DRIFT_SPEED,
    vy: (Math.random() - 0.5) * DRIFT_SPEED,
    size: 0.4 + Math.random() * 1.75,
    opacity: 0.07 + Math.random() * 0.38,
    r, g, b,
    speedFactor: 0.3 + Math.random() * 1.4,
    repulsionScale: 0.55 + Math.random() * 0.95,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Starfield() {
  const staticRef = useRef<HTMLCanvasElement>(null);
  const dynRef    = useRef<HTMLCanvasElement>(null);
  const S         = useRef<CanvasState>({
    particles: [],
    W: 0, H: 0,
    mx: -9999, my: -9999,
    tx: -9999, ty: -9999,
    raf: 0,
  });

  useEffect(() => {
    const sCanvas = staticRef.current;
    const dCanvas = dynRef.current;
    if (!sCanvas || !dCanvas) return;

    const sCtx = sCanvas.getContext("2d");
    const dCtx = dCanvas.getContext("2d");
    if (!sCtx || !dCtx) return;

    const state = S.current;

    // ── Resize ──────────────────────────────────────────────────────────────
    const resize = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      state.W = W;
      state.H = H;
      sCanvas.width = dCanvas.width = W;
      sCanvas.height = dCanvas.height = H;
      state.particles = Array.from(
        { length: PARTICLE_COUNT },
        () => createParticle(W, H)
      );
      drawStatic(W, H);
    };

    // ── Static stars (drawn once per resize) ────────────────────────────────
    const drawStatic = (W: number, H: number) => {
      sCtx.clearRect(0, 0, W, H);
      for (let i = 0; i < STATIC_STAR_COUNT; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        const r = 0.15 + Math.random() * 0.5;
        const a = 0.04 + Math.random() * 0.16;
        sCtx.beginPath();
        sCtx.arc(x, y, r, 0, Math.PI * 2);
        sCtx.fillStyle = `rgba(200,220,255,${a.toFixed(3)})`;
        sCtx.fill();
      }
    };

    // ── Animation loop ───────────────────────────────────────────────────────
    const tick = () => {
      const { W, H, particles } = state;
      dCtx.clearRect(0, 0, W, H);

      // Smooth mouse toward target
      state.mx += (state.tx - state.mx) * MOUSE_LERP;
      state.my += (state.ty - state.my) * MOUSE_LERP;
      const { mx, my } = state;

      for (const p of particles) {
        // ── Drift base position ────────────────────────────────────────────
        p.baseX += p.vx * p.speedFactor;
        p.baseY += p.vy * p.speedFactor;

        // Wrap at edges (avoids visible pop at boundaries)
        if (p.baseX < -4)     p.baseX = W + 4;
        else if (p.baseX > W + 4) p.baseX = -4;
        if (p.baseY < -4)     p.baseY = H + 4;
        else if (p.baseY > H + 4) p.baseY = -4;

        // ── Mouse repulsion ───────────────────────────────────────────────
        const dx   = mx - p.baseX;
        const dy   = my - p.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = p.baseX;
        let targetY = p.baseY;

        if (dist < MOUSE_RADIUS && dist > 0.5) {
          // Ease-in^2 force curve: strongest near cursor, fades toward edge
          const t     = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const force = t * t * p.repulsionScale;
          targetX = p.baseX - (dx / dist) * force * REPULSION_STRENGTH;
          targetY = p.baseY - (dy / dist) * force * REPULSION_STRENGTH;
        }

        // ── Lerp rendered position toward target ──────────────────────────
        p.x += (targetX - p.x) * POSITION_LERP;
        p.y += (targetY - p.y) * POSITION_LERP;

        // ── Draw ──────────────────────────────────────────────────────────
        dCtx.beginPath();
        dCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        dCtx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.opacity.toFixed(3)})`;
        dCtx.fill();
      }

      state.raf = requestAnimationFrame(tick);
    };

    // ── Event listeners ─────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      state.tx = e.clientX;
      state.ty = e.clientY;
    };
    const onMouseLeave = () => {
      // Park the target far off-screen so repulsion fades out smoothly
      state.tx = -9999;
      state.ty = -9999;
    };
    const onResize = () => resize();

    resize();
    tick();

    window.addEventListener("mousemove",  onMouseMove,  { passive: true });
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });
    window.addEventListener("resize",     onResize,     { passive: true });

    return () => {
      cancelAnimationFrame(state.raf);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize",     onResize);
    };
  }, []);

  return (
    <>
      {/* Layer 1 – fixed background micro-stars */}
      <canvas
        ref={staticRef}
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
      />
      {/* Layer 2 – interactive animated particles */}
      <canvas
        ref={dynRef}
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden
      />
    </>
  );
}
