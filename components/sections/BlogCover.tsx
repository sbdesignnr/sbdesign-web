// Generované ilustračné „obrázky" pre blog karty. Čisté SVG, žiadne fotky.
// V pokoji STATICKÉ (žiadne prekresľovanie → žiadny jank). Motív „ožije" až pri
// hoveri karty (cez `.group:hover .bca-*` pravidlá v globals.css).

const fillBox = { transformBox: "fill-box" as const };

function Speed({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 320 200" className="h-[80%] w-[80%] overflow-visible" fill="none">
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={44}
          y={58 + i * 18}
          width={64 + i * 24}
          height={7}
          rx={3.5}
          fill={i === 2 ? accent : "rgba(255,255,255,0.22)"}
          className="bca-streak"
          style={{ ...fillBox, transformOrigin: "left center", animationDelay: `${i * 0.12}s` }}
        />
      ))}
      <path
        d="M214 44 l-36 64 h26 l-18 48 56 -78 h-28 z"
        fill={accent}
        className="bca-float"
        style={{ ...fillBox, transformOrigin: "center" }}
      />
      <circle cx={252} cy={150} r={4} fill={accent} className="bca-float" style={{ ...fillBox, animationDelay: "0.4s" }} />
      <circle cx={276} cy={70} r={3} fill="rgba(255,255,255,0.4)" className="bca-float" style={{ ...fillBox, animationDelay: "0.8s" }} />
    </svg>
  );
}

function Blocks({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 320 200" className="h-[82%] w-[82%] overflow-visible" fill="none">
      <rect x={42} y={32} width={236} height={136} rx={14} fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.14)" />
      <path d="M42 58 h236" stroke="rgba(255,255,255,0.12)" />
      <circle cx={60} cy={45} r={3.4} fill="rgba(255,255,255,0.35)" />
      <circle cx={73} cy={45} r={3.4} fill="rgba(255,255,255,0.22)" />
      <circle cx={86} cy={45} r={3.4} fill="rgba(255,255,255,0.22)" />
      <rect x={60} y={74} width={120} height={20} rx={5} fill={accent} className="bca-pulse" style={{ ...fillBox, transformOrigin: "left center" }} />
      <rect x={60} y={104} width={96} height={11} rx={3.5} fill="rgba(255,255,255,0.26)" />
      <rect x={60} y={122} width={72} height={11} rx={3.5} fill="rgba(255,255,255,0.18)" />
      <rect x={196} y={74} width={64} height={70} rx={8} fill="rgba(255,255,255,0.05)" stroke={accent} className="bca-float" style={{ ...fillBox }} />
      <circle cx={228} cy={100} r={11} fill={accent} fillOpacity={0.5} className="bca-pulse" style={{ ...fillBox, transformOrigin: "center", animationDelay: "0.3s" }} />
      <path d="M214 132 l0 26 6 -7 5 10 4 -2 -5 -10 9 0 z" fill="#fff" className="bca-float" style={{ ...fillBox, transformOrigin: "center", animationDelay: "0.2s" }} />
    </svg>
  );
}

function Ads({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 320 200" className="h-[82%] w-[82%] overflow-visible" fill="none">
      <path d="M52 156 h150" stroke="rgba(255,255,255,0.14)" strokeLinecap="round" />
      {[
        { x: 64, h: 44 },
        { x: 98, h: 70 },
        { x: 132, h: 56 },
        { x: 166, h: 88 },
      ].map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={156 - b.h}
          width={20}
          height={b.h}
          rx={5}
          fill={i === 3 ? accent : "rgba(255,255,255,0.22)"}
          className="bca-bar"
          style={{ ...fillBox, transformOrigin: "bottom", animationDelay: `${i * 0.15}s` }}
        />
      ))}
      <path d="M62 120 L100 96 L134 108 L186 64" stroke={accent} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M170 62 L188 62 L188 80" stroke={accent} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx={246} cy={74} r={30} stroke="rgba(255,255,255,0.2)" strokeWidth={2} />
      <circle cx={246} cy={74} r={19} stroke={accent} strokeWidth={2} />
      <circle cx={246} cy={74} r={7} fill={accent} className="bca-pulse" style={{ ...fillBox, transformOrigin: "center" }} />
    </svg>
  );
}

const MOTIFS: Record<string, (p: { accent: string }) => React.ReactElement> = {
  speed: Speed,
  blocks: Blocks,
  ads: Ads,
};

export default function BlogCover({
  motif,
  accent,
  className = "",
}: {
  motif: string;
  accent: string;
  className?: string;
}) {
  const Motif = MOTIFS[motif] ?? Speed;
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(150deg, ${accent}26, #0a1020 52%, #06080f)` }} />
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage: "radial-gradient(ellipse at center, #000 35%, transparent 82%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, #000 35%, transparent 82%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-50 transition-opacity duration-700 group-hover:opacity-80"
        style={{ background: `radial-gradient(circle, ${accent}59 0%, ${accent}1f 38%, transparent 72%)` }}
      />
      <div className="absolute inset-0 grid place-items-center transition-transform duration-700 ease-out group-hover:scale-[1.07]">
        <Motif accent={accent} />
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 -translate-x-[260%] transition-transform duration-[900ms] ease-out group-hover:translate-x-[520%]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)" }}
      />
      <span aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(4,6,12,0.15), transparent 30%, transparent 70%, rgba(4,6,12,0.35))" }} />
    </div>
  );
}
