"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DiskParticle {
  angle:       number;   // current orbital angle (radians)
  radius:      number;   // orbital radius (CSS px, in disk plane)
  speed:       number;   // angular velocity (rad/frame)
  size:        number;   // dot radius (CSS px)
  baseOpacity: number;   // opacity before Doppler modulation
  hue:         number;   // HSL hue: 215 (blue-white, inner) → 270 (violet, outer)
  lightness:   number;   // HSL lightness: ~80% inner, ~55% outer
}

// ─── Constants ────────────────────────────────────────────────────────────────

/** Total number of particles in the accretion disk */
const PARTICLE_COUNT  = 420;
/** Fraction of diskRadius that the event horizon occupies */
const CORE_FRACTION   = 0.27;
/** Duration and ease for tilt animation responding to mouse */
const TILT_DURATION   = 0.9;

// ─── Helper: spawn one particle in the ring range [innerR, outerR] ───────────

function spawnParticle(innerR: number, outerR: number): DiskParticle {
  // √-distributed radial position → denser near the event horizon (inner edge)
  const t        = Math.pow(Math.random(), 0.5);
  const radius   = innerR + t * (outerR - innerR);
  const fraction = (radius - innerR) / (outerR - innerR); // 0 = inner, 1 = outer

  // Keplerian-ish: inner particles orbit faster
  const speed = (0.004 + (1 - fraction) * 0.011) * (0.5 + Math.random() * 1.0);

  return {
    angle:       Math.random() * Math.PI * 2,
    radius,
    speed,
    size:        0.4 + (1 - fraction * 0.55) * 2.1 * (0.2 + Math.random() * 0.8),
    baseOpacity: 0.10 + (1 - fraction * 0.6) * 0.68 * Math.random(),
    hue:         215 + fraction * 58,         // blue-white → violet
    lightness:   80  - fraction * 24,         // bright → dim
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BlackHole() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /** Smoothed tilt values driven by mouse (GSAP quickTo target) */
  const tilt      = useRef({ x: 0, y: 0 });
  /** Raw mouse position in CSS px */
  const mouse     = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
    let W = 0, H = 0, cx = 0, cy = 0;
    let diskR = 0, coreR = 0;
    let particles: DiskParticle[] = [];
    let raf = 0;

    // ── Resize ───────────────────────────────────────────────────────────────
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      cx = W / 2;
      cy = H / 2;
      diskR = Math.min(W, H) * 0.285;
      coreR = diskR * CORE_FRACTION;

      // Set physical canvas size (DPR-aware) and logical CSS size
      canvas.width        = W * dpr;
      canvas.height       = H * dpr;
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      // After resizing, the context transform is reset – reapply DPR scale
      ctx.scale(dpr, dpr);

      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        spawnParticle(coreR * 1.07, diskR),
      );
    };

    // ── GSAP quickTo for buttery-smooth tilt ─────────────────────────────────
    const tiltXTo = gsap.quickTo(tilt.current, "x", {
      duration: TILT_DURATION,
      ease:     "power2.out",
    });
    const tiltYTo = gsap.quickTo(tilt.current, "y", {
      duration: TILT_DURATION,
      ease:     "power2.out",
    });

    // ── Main render loop ─────────────────────────────────────────────────────
    const tick = (ts: number) => {
      ctx.clearRect(0, 0, W, H);

      const t       = ts * 0.001;
      /** Breathing: ±3.5 % scale on a slow sine */
      const breathe = 1 + Math.sin(t * 0.45) * 0.035;
      /** Eccentricity of disk ellipse (viewing angle).
       *  Mouse Y: move up → more face-on (higher ecc), down → more edge-on */
      const ecc     = Math.max(0.18, 0.36 - tilt.current.y * 0.1);
      /** Hot-spot rotation offset driven by mouse X */
      const rotShift = tilt.current.x * 0.35;

      ctx.save();
      ctx.translate(cx, cy);

      // ── Layer A: Outer nebula halo ─────────────────────────────────────────
      const halo = ctx.createRadialGradient(0, 0, diskR * 0.55, 0, 0, diskR * 2.8);
      halo.addColorStop(0,   "rgba(0,  50, 190, 0.11)");
      halo.addColorStop(0.4, "rgba(55,  0, 165, 0.06)");
      halo.addColorStop(1,   "rgba(0,   0,   0, 0.00)");
      ctx.beginPath();
      ctx.arc(0, 0, diskR * 2.8, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      // ── Layer B: Accretion disk smooth glow (elliptical) ──────────────────
      ctx.save();
      ctx.scale(breathe, breathe * ecc);

      const diskGlow = ctx.createRadialGradient(0, 0, coreR * 0.9, 0, 0, diskR);
      diskGlow.addColorStop(0.00, "rgba(200,230,255, 0.00)");
      diskGlow.addColorStop(0.04, "rgba(200,230,255, 0.32)");
      diskGlow.addColorStop(0.20, "rgba(0,  85,255,  0.20)");
      diskGlow.addColorStop(0.55, "rgba(80,  0, 210, 0.10)");
      diskGlow.addColorStop(1.00, "rgba(0,   0,  0,  0.00)");
      ctx.beginPath();
      ctx.arc(0, 0, diskR, 0, Math.PI * 2);
      ctx.fillStyle = diskGlow;
      ctx.fill();
      ctx.restore();

      // ── Layer C: Orbital particles ─────────────────────────────────────────
      ctx.save();
      ctx.scale(breathe, breathe * ecc);

      for (const p of particles) {
        p.angle += p.speed;

        const sinA = Math.sin(p.angle + rotShift);
        const cosA = Math.cos(p.angle + rotShift);

        const px = cosA * p.radius;
        const py = sinA * p.radius;

        // ── Doppler brightening: approaching side of disk is hotter ──────
        // sin(angle) > 0 = front side (toward viewer), boosted
        const doppler = 0.38 + 0.62 * (0.5 + 0.5 * sinA);

        // ── Particle attraction toward mouse cursor ───────────────────────
        // Convert mouse to disk-plane coordinates (un-project eccentricity)
        const relMX = mouse.current.x - cx;
        const relMY = (mouse.current.y - cy) / ecc;
        const mdx   = relMX - px;
        const mdy   = relMY - py;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        let drawX = px, drawY = py;
        if (mdist < 200 && mdist > 4) {
          const pull = Math.pow((200 - mdist) / 200, 2) * 16;
          drawX += (mdx / mdist) * pull;
          drawY += (mdy / mdist) * pull;
        }

        // ── Cull particles on the far side near the core (behind horizon) ─
        if (sinA < 0 && p.radius < coreR * 1.4) continue;

        const opacity = p.baseOpacity * doppler;
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue.toFixed(0)},90%,${p.lightness.toFixed(0)}%,${opacity.toFixed(3)})`;
        ctx.fill();
      }

      ctx.restore();

      // ── Layer D: Photon sphere (thin bright ring at horizon edge) ─────────
      ctx.save();
      ctx.scale(breathe, breathe * ecc);

      const photonR  = coreR * 1.035;
      const pGrad    = ctx.createRadialGradient(0, 0, photonR - 3, 0, 0, photonR + 6);
      pGrad.addColorStop(0,   "rgba(210,238,255, 0.00)");
      pGrad.addColorStop(0.45,"rgba(210,238,255, 0.80)");
      pGrad.addColorStop(1,   "rgba(100,165,255, 0.00)");
      ctx.beginPath();
      ctx.arc(0, 0, photonR, 0, Math.PI * 2);
      ctx.strokeStyle = pGrad;
      ctx.lineWidth   = 7;
      ctx.stroke();
      ctx.restore();

      // ── Layer E: Event horizon (absolute black sphere) ─────────────────────
      const ehGrad = ctx.createRadialGradient(0, 0, coreR * 0.5, 0, 0, coreR);
      ehGrad.addColorStop(0, "#000");
      ehGrad.addColorStop(1, "rgba(0,0,0,0.97)");
      ctx.beginPath();
      ctx.arc(0, 0, coreR * breathe, 0, Math.PI * 2);
      ctx.fillStyle = ehGrad;
      ctx.fill();

      // ── Layer F: Gravitational lens distortion rings ───────────────────────
      ctx.save();
      ctx.scale(breathe, breathe * ecc);
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(0, 0, coreR * (1.07 + i * 0.075), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(155,205,255,${(0.13 - i * 0.035).toFixed(3)})`;
        ctx.lineWidth   = 0.8;
        ctx.stroke();
      }
      ctx.restore();

      ctx.restore(); // ← undo main translate

      raf = requestAnimationFrame(tick);
    };

    // ── Event listeners ──────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      tiltXTo((e.clientX / W - 0.5) * 2 * 0.38);
      tiltYTo((e.clientY / H - 0.5) * 2 * 0.38);
    };

    const onMouseLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
      tiltXTo(0);
      tiltYTo(0);
    };

    const onResize = () => resize();

    resize();
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove",  onMouseMove,  { passive: true });
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });
    window.addEventListener("resize",     onResize,     { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      gsap.killTweensOf(tilt.current);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize",     onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[2]"
      aria-hidden
    />
  );
}
