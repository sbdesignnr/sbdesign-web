// ════════════════════════════════════════════════════════════════════════════
//  SB DESIGN — Services, process, proof, FAQ content.
// ════════════════════════════════════════════════════════════════════════════

export interface Service {
  id: string;
  index: string;
  title: string;
  short: string;
  description: string;
  features: string[];
  deliverables: string[];
  accent: string;
}

export const services: Service[] = [
  {
    id: "weby",
    index: "01",
    title: "Weby na mieru",
    short: "Vlastný kód. Žiadne šablóny.",
    description:
      "Navrhujem a programujem weby, ktoré sa načítavajú za sekundu, vyzerajú výnimočne a predovšetkým predávajú. Každý pixel a každá animácia má dôvod — viesť návštevníka k akcii.",
    features: [
      "Dizajn na mieru",
      "Custom kód alebo Next.js",
      "Animácie a interakcie",
      "PageSpeed 95+",
      "Plná responzívnosť",
      "SEO základ",
    ],
    deliverables: ["UX/UI dizajn", "Vývoj", "Nasadenie", "Školenie", "30 dní podpory"],
    accent: "#2f6bff",
  },
  {
    id: "eshopy",
    index: "02",
    title: "E-shopy",
    short: "Od dizajnu po platobné brány.",
    description:
      "Kompletné e-shopy postavené na konverziu — od premysleného nákupného procesu cez platobné brány až po napojenie na sklad a dopravcov. Predajný stroj, ktorý pracuje aj keď spíte.",
    features: [
      "Shopify / WooCommerce",
      "Platobné brány",
      "Napojenie na dopravcov",
      "Optimalizovaný checkout",
      "Mobilný dizajn",
      "Analytika predaja",
    ],
    deliverables: ["Návrh e-shopu", "Vývoj", "Integrácie", "Migrácia produktov", "Školenie"],
    accent: "#18d6ff",
  },
  {
    id: "marketing",
    index: "03",
    title: "Meta & Google Ads",
    short: "Kampane, ktoré prinášajú zákazníkov.",
    description:
      "Výkonnostný marketing zameraný na reálne výsledky, nie na márne kliky. Stratégia, kreatíva a denná optimalizácia kampaní, ktoré privádzajú zákazníkov s pozitívnou návratnosťou.",
    features: [
      "Meta Ads (FB + IG)",
      "Google Ads (Search + PMax)",
      "Stratégia a cielenie",
      "Reklamná kreatíva",
      "A/B testovanie",
      "Mesačný reporting",
    ],
    deliverables: ["Audit a stratégia", "Nastavenie kampaní", "Kreatíva", "Optimalizácia", "Reporting"],
    accent: "#5a8bff",
  },
];

export interface ProcessStep {
  index: string;
  title: string;
  duration: string;
  description: string;
  output: string;
}

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Konzultácia",
    duration: "deň 1",
    description:
      "Bezplatné stretnutie. Pochopím váš biznis, ciele, zákazníka a konkurenciu. Bez technického žargónu — len jasné otázky a jasné odpovede.",
    output: "Cenová ponuka na mieru",
  },
  {
    index: "02",
    title: "Návrh",
    duration: "5–7 dní",
    description:
      "Unikátny dizajn na mieru v interaktívnom prototype. Vidíte presne, ako bude web vyzerať a fungovať — ešte pred riadkom kódu.",
    output: "Figma prototyp na schválenie",
  },
  {
    index: "03",
    title: "Vývoj",
    duration: "10–21 dní",
    description:
      "Čistý kód, Next.js alebo custom riešenie. Animácie, výkon, SEO. Priebežne vám posielam web na testovacej doméne, aby ste videli každý krok.",
    output: "Web na testovacej doméne",
  },
  {
    index: "04",
    title: "Spustenie",
    duration: "deň D",
    description:
      "Nasadenie na vašu doménu, školenie správy a 30-dňová podpora. Web je váš a pracuje za vás od prvej minúty.",
    output: "Živý web + prístupy + podpora",
  },
];

export const stats = [
  { value: "30+", label: "dokončených projektov" },
  { value: "98", label: "priemerné PageSpeed skóre" },
  { value: "3×", label: "priemerný nárast dopytov" },
  { value: "100%", label: "weby na mieru, žiadne šablóny" },
];

export const faqs = [
  {
    q: "Koľko stojí web?",
    a: "Každý projekt je iný, preto cenu počítam vždy na mieru podľa rozsahu a cieľov. Po bezplatnej konzultácii dostanete jasnú cenovú ponuku — bez skrytých poplatkov a bez záväzkov.",
  },
  {
    q: "Ako dlho trvá vytvorenie webu?",
    a: "Bežný web zvládnem za 3–4 týždne od schválenia návrhu, e-shop za 4–6 týždňov. Termín vždy dohodneme vopred a držím sa ho.",
  },
  {
    q: "Robíte aj texty a fotografie?",
    a: "Áno. Copywriting zameraný na konverziu je súčasťou každého projektu. Pri fotografiách viem odporučiť overených fotografov alebo pracovať s vašimi podkladmi.",
  },
  {
    q: "Budem si vedieť web spravovať sám?",
    a: "Záleží na našej dohode. Buď vám vytvorím vlastný CMS systém na mieru, cez ktorý si obsah webu jednoducho spravujete sami (súčasťou je školenie), alebo kompletnú správu webstránky preberiem na seba a vy sa venujete len svojmu biznisu.",
  },
  {
    q: "Postaráte sa aj o reklamu po spustení?",
    a: "Áno. Vediem Meta a Google Ads kampane, ktoré privedú na nový web reálnych zákazníkov. Web a reklama fungujú najlepšie spolu.",
  },
];

// Trust logos (existing assets in /public/logos)
export const clientLogos = [
  { src: "/logos/starea-logo.png", alt: "STAREA" },
  { src: "/logos/gssd-2.png", alt: "GSSD" },
  { src: "/logos/profinam-logo-oz-2.png", alt: "Profinam" },
  { src: "/logos/up-2-3.png", alt: "UP" },
  { src: "/logos/logo_svg3.png", alt: "Klient" },
];
