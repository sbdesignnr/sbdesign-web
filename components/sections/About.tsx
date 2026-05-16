"use client";

const PARTNERS = [
  "WebSupport",
  "Penzión Naj",
  "Výťahy Barborík",
  "Webglobe",
  "Naba",
  "FinGo",
];
const MARQUEE_ITEMS = [...PARTNERS, ...PARTNERS, ...PARTNERS];

export default function About() {
  return (
    <section
      id="o-mne"
      className="relative min-h-screen overflow-hidden py-20 md:py-32"
      aria-label="O mne – SBDESIGN"
    >
      {/* Ambient glow blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 z-[1] h-[600px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-blue-600/8 blur-[130px]"
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Responsive two-column layout */}
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:gap-16 lg:gap-24">

          {/* LEFT: Text column */}
          <div className="flex w-full flex-col md:w-1/2">

            {/* Section badge */}
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span className="font-inter text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-blue-400">
                Web developer &amp; Designer
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-syne bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-5xl font-bold leading-none tracking-tight text-transparent md:text-6xl lg:text-[clamp(3.5rem,7vw,6.5rem)]">
              O mne
            </h2>

            {/* Decorative rule */}
            <div className="mt-6 h-[1px] w-16 bg-gradient-to-r from-blue-500 to-transparent" />

            {/* Bio */}
            <p className="font-inter mt-8 text-base leading-relaxed text-gray-400 md:text-lg">
              <span className="font-semibold text-white">
                Kreativita, spoľahlivosť a chuť pomáhať druhým
              </span>{" "}
              je to, čo ma vystihuje. Nie je mojím cieľom{" "}
              <span className="font-semibold text-white">kvantum klientov</span>,
              mojím cieľom je{" "}
              <span className="font-semibold text-white">doručiť kvalitu</span> a
              to, na čom sme sa dohodli, pretože{" "}
              <span className="font-semibold text-white">Vaša spokojnosť</span> je
              na konci dňa to, na čom najviac záleží. Som tu pre Vás a som
              pripravený Vás posunúť na{" "}
              <span className="font-semibold text-white">nový level!</span>
            </p>

            {/* Signature block */}
            <div className="mt-10 flex flex-wrap items-end gap-6 border-t border-white/[0.08] pt-8">
              <div>
                <p className="font-inter mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gray-600">
                  — autor
                </p>
                {/* Static Caveat signature with blue glow */}
                <p
                  className="font-caveat text-4xl italic text-blue-300 md:text-5xl"
                  style={{
                    textShadow:
                      "0 0 18px rgba(96, 165, 250, 0.65), 0 0 40px rgba(59, 130, 246, 0.35)",
                  }}
                >
                  Samuel Biben
                </p>
              </div>

              {/* Divider + location */}
              <div className="flex items-center gap-6">
                <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-blue-500/40 to-transparent" />
                <p className="font-inter text-xs leading-relaxed text-gray-600">
                  SBDESIGN<br />Slovensko
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Photo column */}
          <div className="relative flex w-full items-center justify-center py-4 md:w-1/2 md:py-8">
            {/* Glassmorphic depth card */}
            <div
              aria-hidden
              className="absolute inset-0 z-0 rotate-3 scale-105 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl"
            />

            {/* Ambient blue glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[1] m-auto h-[65%] w-[65%] rounded-full bg-blue-600/15 blur-[100px]"
            />

            {/* Photo — responsive sizing */}
            <img
              src="/Fotka-nova-2.png"
              alt="Samuel Biben"
              className="relative z-10 mx-auto w-full max-w-xs rounded-2xl object-cover drop-shadow-2xl sm:max-w-sm md:max-w-full"
            />
          </div>
        </div>

        {/* Apple-style pill marquee */}
        <div
          className="relative mt-20 overflow-hidden border-y border-white/5 bg-white/[0.02] py-6 backdrop-blur-sm md:mt-24"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
          aria-label="Klienti a partneri"
        >
          <div className="marquee-track">
            {MARQUEE_ITEMS.map((name, i) => (
              <span key={i} className="mx-3 inline-flex shrink-0 items-center">
                <span className="cursor-pointer whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-6 py-2.5 font-syne text-sm uppercase tracking-widest text-gray-400 transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-600/20 hover:text-white">
                  {name}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
