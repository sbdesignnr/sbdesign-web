import Link from "next/link";

const NAV_LINKS = [
  { label: "Služby",    href: "#sluzby"    },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Proces",    href: "#proces"    },
  { label: "Kontakt",   href: "#kontakt"   },
] as const;

export default function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-white/8 bg-black px-6 md:px-10">

      {/* Logo */}
      <a href="/" aria-label="SBDESIGN — domov" className="shrink-0">
        <img
          src="/SB-Design-Logo-1-5.png"
          alt="SB Design"
          className="h-7 w-auto"
        />
      </a>

      {/* Nav */}
      <nav aria-label="Hlavná navigácia" className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-[11px] font-semibold uppercase tracking-widest text-white/50 transition-colors duration-200 hover:text-white"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Right — CTA */}
      <a
        href="#kontakt"
        className="text-[11px] font-semibold uppercase tracking-widest text-white/50 transition-colors duration-200 hover:text-white"
      >
        Konzultácia
      </a>

    </header>
  );
}
