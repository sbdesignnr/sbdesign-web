"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site, socials } from "@/lib/site";
import Logo from "./Logo";
import Button from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;
const FLIP = "transition-transform duration-[480ms] ease-[cubic-bezier(0.76,0,0.24,1)]";

function NavLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link href={href} className="group relative px-1 py-2">
      <span className="relative block overflow-hidden">
        <span
          className={`block font-display text-[12.5px] font-medium uppercase tracking-[0.16em] ${FLIP} group-hover:-translate-y-full`}
          style={{ color: active ? "var(--color-marble)" : "var(--color-marble-dim)" }}
        >
          {label}
        </span>
        <span
          aria-hidden
          className={`absolute inset-0 block translate-y-full font-display text-[12.5px] font-medium uppercase tracking-[0.16em] text-azure ${FLIP} group-hover:translate-y-0`}
        >
          {label}
        </span>
      </span>
      {/* active dot */}
      <span
        className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-azure transition-opacity duration-300"
        style={{ opacity: active ? 1 : 0, boxShadow: "0 0 8px 1px rgba(47,107,255,0.7)" }}
      />
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
        style={{
          background: scrolled ? "rgba(5,7,14,0.9)" : "transparent",
        }}
      >
        {/* bottom hairline on scroll */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-500"
          style={{
            opacity: scrolled ? 1 : 0,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 25%, rgba(255,255,255,0.12) 75%, transparent)",
          }}
        />

        <div
          className="gutter flex items-center justify-between transition-all duration-500"
          style={{ height: scrolled ? 70 : 92 }}
        >
          <Logo />

          {/* desktop right cluster */}
          <div className="hidden items-center gap-8 md:flex">
            <nav aria-label="Hlavná navigácia" className="flex items-center gap-7">
              {nav.map((item) => (
                <NavLink key={item.href} label={item.label} href={item.href} active={isActive(item.href)} />
              ))}
            </nav>
            <span className="h-5 w-px bg-line-strong" />
            <Button href="/kontakt" size="md" cursorLabel="Poďme do toho">
              Začať projekt
            </Button>
          </div>

          {/* mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Zatvoriť menu" : "Otvoriť menu"}
            aria-expanded={open}
            className="relative z-50 grid h-11 w-11 place-items-center rounded-full border border-line-strong md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span className="absolute left-0 block h-px w-5 bg-marble transition-all duration-300" style={{ top: open ? 5 : 0, transform: open ? "rotate(45deg)" : "none" }} />
              <span className="absolute left-0 top-1.5 block h-px w-5 bg-marble transition-all duration-300" style={{ opacity: open ? 0 : 1 }} />
              <span className="absolute left-0 block h-px w-5 bg-marble transition-all duration-300" style={{ top: open ? 5 : 11, transform: open ? "rotate(-45deg)" : "none" }} />
            </span>
          </button>
        </div>
      </motion.header>

      {/* mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: "rgba(4,6,12,0.97)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
          >
            <div className="flex h-full flex-col justify-between gutter pt-32 pb-10">
              <nav className="flex flex-col gap-1" aria-label="Mobilná navigácia">
                {nav.map((item, i) => (
                  <motion.div key={item.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: EASE }}>
                    <Link href={item.href} className="flex items-baseline gap-3 border-b border-line py-5" onClick={() => setOpen(false)}>
                      <span className="font-mono text-[11px] text-azure">0{i + 1}</span>
                      <span className="font-display text-4xl font-extrabold tracking-tight text-marble">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6, ease: EASE }} className="flex flex-col gap-4">
                <a href={`mailto:${site.email}`} className="font-display text-xl text-marble">{site.email}</a>
                <a href={site.phoneHref} className="font-display text-xl text-marble-dim">{site.phone}</a>
                <div className="mt-2 flex gap-5">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="label">{s.label}</a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
