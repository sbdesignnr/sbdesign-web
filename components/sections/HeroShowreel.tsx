"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Curated screenshots (real work) used as the cinematic backdrop.
const shots = [
  "/projects/lubica.jpg",
  "/projects/starea-v2.jpg",
  "/projects/mukera.jpg",
  "/projects/penzionnaj.jpg",
  "/projects/dubravsky.jpg",
  "/projects/propsyche.jpg",
  "/projects/zaar.jpg",
];

const columns: { items: string[]; dur: number; dir: "up" | "down" }[] = [
  { items: [shots[0], shots[2], shots[4], shots[6]], dur: 70, dir: "up" },
  { items: [shots[1], shots[3], shots[5], shots[0]], dur: 88, dir: "down" },
  { items: [shots[6], shots[4], shots[2], shots[1]], dur: 78, dir: "up" },
];

function Card({ src, eager }: { src: string; eager?: boolean }) {
  return (
    <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)]">
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        sizes="30vw"
        priority={eager}
        className="object-cover object-top"
        draggable={false}
      />
    </div>
  );
}

export default function HeroShowreel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(true);

  // Pause the animation when the hero is scrolled out of view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 3D tilted gallery */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: "150%",
          height: "180%",
          transform: "translate(-50%, -50%) perspective(1600px) rotateX(14deg) rotateZ(-9deg) scale(1.05)",
          transformOrigin: "center",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="grid h-full grid-cols-3 gap-6">
          {columns.map((col, ci) => (
            <div key={ci} className="relative overflow-hidden">
              <div
                className="vscroll-track"
                data-dir={col.dir}
                style={{ ["--vdur" as string]: `${col.dur}s`, animationPlayState: running ? "running" : "paused" }}
              >
                {[...col.items, ...col.items].map((src, i) => (
                  <Card key={`${ci}-${i}`} src={src} eager={ci === 0 && i === 0} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
