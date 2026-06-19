"use client";

import { createElement, useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Scroll-triggered line/word reveal. Splits text and animates each unit up
 * from behind a mask. Falls back to plain text for reduced motion.
 */
export default function TextReveal({
  text,
  as = "h2",
  className,
  split = "words",
  stagger = 0.06,
  start = "top 85%",
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  split?: "words" | "lines" | "chars";
  stagger?: number;
  start?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const Tag: ElementType = as;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const instance = new SplitType(el, {
        types: split === "lines" ? "lines" : split === "chars" ? "words,chars" : "lines,words",
      });
      const targets =
        split === "lines" ? instance.lines : split === "chars" ? instance.chars : instance.words;
      if (!targets) return;

      // Mask each line so words rise from behind it.
      if (instance.lines) {
        instance.lines.forEach((line) => {
          line.style.overflow = "hidden";
          line.style.paddingBottom = "0.08em";
          line.style.marginBottom = "-0.08em";
        });
      }

      gsap.set(targets, { yPercent: 120, opacity: 0 });
      gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        stagger,
        delay,
        scrollTrigger: { trigger: el, start },
      });

      return () => instance.revert();
    },
    { scope: ref, dependencies: [text] }
  );

  return createElement(Tag, { ref, className }, text);
}
