"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

const EXIT = "group-hover:translate-x-[170%] group-hover:-translate-y-[170%]";
const ENTER = "-translate-x-[170%] translate-y-[170%] group-hover:translate-x-0 group-hover:translate-y-0";
const FLIP = "transition-transform duration-[560ms] ease-[cubic-bezier(0.76,0,0.24,1)]";

function ArrowGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M3 13L13 3M13 3H5.5M13 3v7.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowCircle({ light, size }: { light: boolean; size: string }) {
  return (
    <span
      className={`relative grid ${size} shrink-0 place-items-center overflow-hidden rounded-full ${
        light ? "bg-white text-ink-950" : "bg-azure text-white"
      }`}
    >
      <span className={`absolute grid place-items-center ${FLIP} ${EXIT}`}>
        <ArrowGlyph />
      </span>
      <span className={`absolute grid place-items-center ${FLIP} ${ENTER}`}>
        <ArrowGlyph />
      </span>
    </span>
  );
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  arrow = true,
  className = "",
  external = false,
  cursorLabel,
  type = "button",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: "md" | "lg";
  arrow?: boolean;
  className?: string;
  external?: boolean;
  cursorLabel?: string;
  type?: "button" | "submit";
}) {
  const dims =
    size === "lg"
      ? { circle: "h-11 w-11", text: "text-[15px]", padArrow: "py-2 pl-8 pr-2", padPlain: "px-9 py-4", gap: "gap-4" }
      : { circle: "h-9 w-9", text: "text-[14px]", padArrow: "py-2 pl-6 pr-2", padPlain: "px-7 py-3.5", gap: "gap-3" };

  const variantClass =
    variant === "primary"
      ? "text-white"
      : variant === "outline"
        ? "border border-line-strong text-marble hover:border-azure/70"
        : "text-marble";

  const cls = [
    "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full font-display font-semibold",
    "transition-[border-color,color] duration-300 select-none",
    dims.gap,
    arrow ? dims.padArrow : dims.padPlain,
    dims.text,
    variantClass,
    className,
  ].join(" ");

  const inner = (
    <>
      {/* primary gradient bg */}
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(110deg, var(--color-azure-deep), var(--color-azure) 52%, var(--color-cyan))" }}
        />
      )}
      {/* subtle hover tint for outline/ghost */}
      {variant !== "primary" && (
        <span aria-hidden className="absolute inset-0 -z-10 bg-white/0 transition-colors duration-500 group-hover:bg-white/[0.04]" />
      )}
      {/* light gleam sweep */}
      <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute top-0 -left-1/3 h-full w-1/4 -skew-x-12 bg-white/25 blur-md transition-transform duration-[900ms] ease-out group-hover:translate-x-[600%]" />
      </span>

      <span className="relative z-10 whitespace-nowrap">{children}</span>
      {arrow && <ArrowCircle light={variant === "primary"} size={dims.circle} />}
    </>
  );

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} data-cursor-label={cursorLabel}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={cls} data-cursor-label={cursorLabel}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} data-cursor-label={cursorLabel}>
      {inner}
    </button>
  );
}
