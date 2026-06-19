"use client";

import type { ReactNode } from "react";

export default function Marquee({
  children,
  duration = 36,
  reverse = false,
  pauseOnHover = false,
  className = "",
  gap = "3rem",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  gap?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden ${pauseOnHover ? "marquee-paused" : ""} ${className}`}>
      <div
        className="marquee-track"
        data-reverse={reverse}
        style={{ ["--marquee-duration" as string]: `${duration}s`, gap }}
      >
        <div className="flex shrink-0 items-center" style={{ gap }}>{children}</div>
        <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden>{children}</div>
      </div>
    </div>
  );
}
