// Tematické ilustrácie pre sekciu Služby. Čisté SVG, žiadne fotky.
// V pokoji STATICKÉ (žiadny jank); motív „ožije" pri hoveri panela (`.group:hover .bca-*`).

const fillBox = { transformBox: "fill-box" as const };

function WebMotif({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 320 300" className="h-[78%] w-[78%] overflow-visible" fill="none">
      {/* browser window */}
      <rect x={34} y={56} width={252} height={184} rx={16} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.14)" />
      <path d="M34 88 h252" stroke="rgba(255,255,255,0.12)" />
      <circle cx={52} cy={72} r={3.6} fill="rgba(255,255,255,0.34)" />
      <circle cx={66} cy={72} r={3.6} fill="rgba(255,255,255,0.2)" />
      <circle cx={80} cy={72} r={3.6} fill="rgba(255,255,255,0.2)" />
      <rect x={118} y={66} width={120} height={12} rx={6} fill="rgba(255,255,255,0.07)" />
      {/* hero block */}
      <rect x={54} y={108} width={130} height={26} rx={6} fill={accent} className="bca-pulse" style={{ ...fillBox, transformOrigin: "left center" }} />
      <rect x={54} y={146} width={200} height={10} rx={4} fill="rgba(255,255,255,0.24)" />
      <rect x={54} y={162} width={158} height={10} rx={4} fill="rgba(255,255,255,0.16)" />
      {/* two cards */}
      <rect x={54} y={186} width={94} height={40} rx={9} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
      <rect x={160} y={186} width={94} height={40} rx={9} fill="rgba(255,255,255,0.05)" stroke={accent} className="bca-float" style={{ ...fillBox }} />
      {/* floating code bracket */}
      <g className="bca-float" style={{ ...fillBox, transformOrigin: "center" }}>
        <path d="M268 36 l-16 14 16 14" stroke={accent} strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M286 36 l16 14 -16 14" stroke={accent} strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}

function ShopMotif({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 320 300" className="h-[78%] w-[78%] overflow-visible" fill="none">
      {/* product card */}
      <rect x={48} y={50} width={140} height={196} rx={16} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.14)" />
      <rect x={66} y={68} width={104} height={86} rx={10} fill={`${accent}26`} />
      {/* image glyph */}
      <circle cx={92} cy={96} r={9} fill={`${accent}`} fillOpacity={0.6} />
      <path d="M70 138 l24 -26 18 16 14 -12 24 22 v8 h-80 z" fill={accent} fillOpacity={0.4} />
      <rect x={66} y={166} width={76} height={11} rx={4} fill="rgba(255,255,255,0.24)" />
      <rect x={66} y={184} width={48} height={11} rx={4} fill={accent} />
      {/* buy button */}
      <rect x={66} y={208} width={104} height={20} rx={10} fill={accent} className="bca-pulse" style={{ ...fillBox, transformOrigin: "center" }} />
      {/* shopping cart (floating) */}
      <g className="bca-float" style={{ ...fillBox, transformOrigin: "center" }}>
        <path d="M212 96 h14 l16 74 h70 l16 -52 h-92" stroke={accent} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" fill="none" transform="translate(0 0)" />
        <circle cx={250} cy={192} r={9} fill="none" stroke={accent} strokeWidth={4} />
        <circle cx={300} cy={192} r={9} fill="none" stroke={accent} strokeWidth={4} />
      </g>
      {/* +1 badge */}
      <g className="bca-pulse" style={{ ...fillBox, transformOrigin: "center" }}>
        <circle cx={288} cy={92} r={16} fill={accent} />
        <path d="M288 84 v16 M280 92 h16" stroke="#fff" strokeWidth={3} strokeLinecap="round" />
      </g>
    </svg>
  );
}

function AdsMotif({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 320 300" className="h-[80%] w-[80%] overflow-visible" fill="none">
      {/* axis */}
      <path d="M52 232 h170" stroke="rgba(255,255,255,0.14)" strokeLinecap="round" />
      {/* bars */}
      {[
        { x: 64, h: 60 },
        { x: 104, h: 96 },
        { x: 144, h: 78 },
        { x: 184, h: 124 },
      ].map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={232 - b.h}
          width={26}
          height={b.h}
          rx={6}
          fill={i === 3 ? accent : "rgba(255,255,255,0.22)"}
          className="bca-bar"
          style={{ ...fillBox, transformOrigin: "bottom", animationDelay: `${i * 0.15}s` }}
        />
      ))}
      {/* trend line */}
      <path d="M62 176 L112 138 L152 154 L212 86" stroke={accent} strokeWidth={3.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M192 82 L216 82 L216 106" stroke={accent} strokeWidth={3.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* target */}
      <g style={{ ...fillBox, transformOrigin: "center" }}>
        <circle cx={250} cy={92} r={40} stroke="rgba(255,255,255,0.18)" strokeWidth={2.4} />
        <circle cx={250} cy={92} r={25} stroke={accent} strokeWidth={2.4} />
        <circle cx={250} cy={92} r={9} fill={accent} className="bca-pulse" style={{ ...fillBox, transformOrigin: "center" }} />
      </g>
    </svg>
  );
}

const MOTIFS: Record<string, (p: { accent: string }) => React.ReactElement> = {
  weby: WebMotif,
  eshopy: ShopMotif,
  marketing: AdsMotif,
};

export default function ServiceVisual({
  motif,
  accent,
  className = "",
}: {
  motif: string;
  accent: string;
  className?: string;
}) {
  const Motif = MOTIFS[motif] ?? WebMotif;
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(155deg, ${accent}24, #0a1020 52%, #06080f)` }} />
      {/* grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage: "radial-gradient(ellipse at center, #000 35%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, #000 35%, transparent 85%)",
        }}
      />
      {/* static accent glow (soft radial — žiadny blur filter kvôli výkonu) */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 transition-opacity duration-700 group-hover:opacity-75"
        style={{ background: `radial-gradient(circle, ${accent}66 0%, ${accent}1f 38%, transparent 72%)` }}
      />
      <div className="absolute inset-0 grid place-items-center transition-transform duration-700 ease-out group-hover:scale-[1.05]">
        <Motif accent={accent} />
      </div>
      {/* sheen sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 -translate-x-[260%] transition-transform duration-[1000ms] ease-out group-hover:translate-x-[520%]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent)" }}
      />
    </div>
  );
}
