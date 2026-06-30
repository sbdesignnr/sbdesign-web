// ════════════════════════════════════════════════════════════════════════════
//  SB DESIGN — Real projects / case studies.
//  Screenshots in /public/projects/<slug>.jpg
// ════════════════════════════════════════════════════════════════════════════

export interface Metric {
  value: string;
  label: string;
  sub?: string;
}

export interface CaseBlock {
  kicker: string;
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  discipline: string[];
  year?: string;
  url?: string;
  liveLabel?: string;
  comingSoon?: boolean;
  image: string;
  accent: string;
  accent2?: string;
  tagline: string;
  summary: string;
  featured: boolean;
  industry: string;
  timeline?: string;
  role?: string;
  stack: string[];
  metrics?: Metric[];
  intro?: string;
  blocks?: CaseBlock[];
  deliverables: string[];
  testimonial?: { quote: string; author: string; role: string };
  next?: string;
}

export const projects: Project[] = [
  // ── FEATURED ──────────────────────────────────────────────────────────────
  {
    slug: "lubica-bibenova",
    title: "Ľubica Bibeňová",
    client: "Ľubica Bibeňová — reality",
    category: "Realitná kancelária",
    discipline: ["Web na mieru", "Vývoj", "Admin aplikácia", "Automatizácia"],
    year: "2025",
    url: "https://lubicabibenova.sk",
    liveLabel: "lubicabibenova.sk",
    image: "/projects/lubica.jpg",
    accent: "#ec4899",
    accent2: "#f9a8d4",
    tagline: "Realitný web, ktorý si spravuje sama.",
    summary:
      "Web realitnej kancelárie naprogramovaný od základov na mieru — s vlastnou aplikáciou, kde si klientka spravuje celú ponuku, a s automatizáciou, ktorá jej šetrí hodiny práce.",
    featured: true,
    industry: "Reality",
    timeline: "Vývoj na mieru",
    role: "Dizajn, vývoj, vlastný systém, automatizácia",
    stack: ["Custom kód", "Next.js", "Vlastný admin systém", "Automatizácia"],
    metrics: [
      { value: "100%", label: "samospráva", sub: "bez programátora" },
      { value: "Auto", label: "kompresia + vodotlač" },
      { value: "1×", label: "nahrá raz", sub: "čoskoro všade" },
    ],
    intro:
      "Maklérka trávila hodiny manuálnym nahrávaním nehnuteľností a fotiek. Cieľom bolo dať jej bleskovo rýchly, prémiový web — a hlavne nástroj, vďaka ktorému zvládne celú správu sama, za pár minút.",
    blocks: [
      {
        kicker: "Výzva",
        title: "Realitný web musí žiť každý deň",
        body: "Ponuky pribúdajú a menia sa neustále. Bez vlastného systému by bola maklérka pri každej úprave závislá od programátora — pomalé, drahé a frustrujúce. Web musel byť zároveň rýchly a dôveryhodný na prvý pohľad.",
      },
      {
        kicker: "Prístup",
        title: "Vlastný kód a nástroj na mieru",
        body: "Web som napísal od základov v čistom, modernom kóde s dôrazom na maximálnu rýchlosť. K nemu som postavil vlastnú admin aplikáciu navrhnutú presne podľa toho, ako klientka pracuje — jednoduchú natoľko, aby ju zvládla bez akejkoľvek technickej znalosti.",
      },
      {
        kicker: "Riešenie",
        title: "Nahrá fotku — o zvyšok sa postará systém",
        body: "V admine maklérka pridá nehnuteľnosť, nahrá fotky a nastaví status. Systém fotky automaticky skomprimuje (rovnaká kvalita, zlomková veľkosť), naformátuje pre web a pridá na ne vodotlač s logom. Čo uloží, sa okamžite premietne na web.",
      },
      {
        kicker: "Výsledok",
        title: "Plná kontrola, nulová réžia",
        body: "Maklérka má kompletnú správu ponuky vo vlastných rukách, bez závislosti od kohokoľvek. Web je bleskovo rýchly a pripravuje sa prepojenie na realitné portály (nehnutelnosti.sk a ďalšie) — nahrá raz, zverejní všade.",
      },
    ],
    deliverables: [
      "Web na mieru naprogramovaný od základov",
      "Vlastná admin aplikácia na správu ponúk",
      "Automatická kompresia a formátovanie fotiek",
      "Automatická vodotlač loga na fotky",
      "Okamžitá synchronizácia admin → web",
      "Pripravované prepojenie na realitné portály",
    ],
    next: "starea",
  },
  {
    slug: "starea",
    title: "STAREA Reality",
    client: "STAREA Reality",
    category: "Realitný portál",
    discipline: ["Web na mieru", "Vývoj", "Custom systém", "Školenie"],
    year: "2026",
    url: "https://www.starea.sk",
    liveLabel: "starea.sk",
    image: "/projects/starea-v2.jpg",
    accent: "#10b981",
    accent2: "#6ee7b7",
    tagline: "Nehnuteľnosti, ktoré spravujete sami.",
    summary:
      "Realitná kancelária s vlastným systémom na správu ponúk — makléri pridávajú nehnuteľnosti sami, fotky sa automaticky komprimujú a web ostáva bleskovo rýchly.",
    featured: true,
    industry: "Reality",
    timeline: "Web na mieru",
    role: "Dizajn, vývoj, systém ponúk, školenie",
    stack: ["WordPress", "Custom systém", "Automatická kompresia"],
    metrics: [
      { value: "100%", label: "samospráva", sub: "klient pridáva sám" },
      { value: "Auto", label: "kompresia fotiek" },
      { value: "1:1", label: "osobné zaškolenie" },
    ],
    intro:
      "STAREA potrebovala vlastné prostredie, kde sa nehnuteľnosti prezentujú prémiovo a kde si ponuky spravuje sama — bez závislosti od portálov a bez technických starostí.",
    blocks: [
      {
        kicker: "Výzva",
        title: "Vlastný kanál namiesto cudzích portálov",
        body: "Ponuky žili na anonymných portáloch, kde sa značka strácala a každý kontakt bol drahý. Cieľom bol vlastný portál, ktorý buduje dôveru v značku STAREA a vracia kontakty späť kancelárii.",
      },
      {
        kicker: "Riešenie",
        title: "Systém, ktorý zvládne maklér sám",
        body: "Postavil som systém správy ponúk, v ktorom maklér pridá nehnuteľnosť za pár minút. Fotky sa automaticky skomprimujú na zlomok veľkosti pri zachovaní kvality, takže web ostáva rýchly aj pri stovkách fotografií. Klientku som osobne zaškolil, ako s celým systémom pracovať.",
      },
      {
        kicker: "Výsledok",
        title: "Prémiová prezentácia, plná samospráva",
        body: "STAREA má dnes samostatný portál, kde si ponuky spravuje sama a nehnuteľnosti dostávajú prezentáciu ako v magazíne. Kontakty smerujú priamo do kancelárie.",
      },
    ],
    deliverables: [
      "Realitný portál na mieru",
      "Systém správy ponúk",
      "Automatická kompresia fotiek",
      "Osobné zaškolenie klientky",
      "SEO základ + analytika",
    ],
    next: "mukera",
  },
  {
    slug: "mukera",
    title: "JUDr. Peter Múkera",
    client: "Advokátska kancelária JUDr. Peter Múkera",
    category: "Advokátska kancelária",
    discipline: ["Web na mieru", "Dizajn", "Vývoj"],
    year: "2025",
    url: "https://www.mukera.sk",
    liveLabel: "mukera.sk",
    image: "/projects/mukera.jpg",
    accent: "#c9a45c",
    accent2: "#e6cf9a",
    tagline: "Advokácia, ktorej sa dá veriť.",
    summary:
      "Prémiový web pre advokátsku kanceláriu s desaťročiami praxe — elegantný, dôveryhodný, s dôrazom na osobný prístup a odbornosť.",
    featured: true,
    industry: "Právo",
    timeline: "Web na mieru",
    role: "Dizajn, vývoj, copywriting",
    stack: ["Next.js", "Custom dizajn", "Vercel"],
    metrics: [
      { value: "25+", label: "rokov praxe", sub: "klienta" },
      { value: "500+", label: "spokojných klientov" },
      { value: "100", label: "PageSpeed", sub: "cieľ" },
    ],
    intro:
      "Právo stojí na dôvere. Web musel sprostredkovať skúsenosť, odbornosť a istotu — a zároveň pôsobiť pokojne a prémiovo, aby klient cítil, že je v dobrých rukách.",
    blocks: [
      {
        kicker: "Prístup",
        title: "Pokoj, autorita, elegancia",
        body: "Navrhol som tmavú, vznešenú estetiku s jemnou serif typografiou a zlatými akcentmi. Hlavná myšlienka „Vaše práva. Naša priorita.“ dáva návštevníkovi okamžitú istotu, že kancelária stojí pri ňom.",
      },
      {
        kicker: "Riešenie",
        title: "Skúsenosť, ktorú vidno na prvý pohľad",
        body: "Obsah vedie klienta od dôvery cez oblasti práva až k nezáväznej konzultácii. Roky praxe a počet spokojných klientov sú v popredí — dôkaz, nie sľub.",
      },
    ],
    deliverables: ["Vizuálna identita webu", "UX/UI dizajn", "Vývoj na mieru", "Copywriting", "Nasadenie"],
    next: "penzion-naj",
  },
  {
    slug: "penzion-naj",
    title: "Penzión Naj",
    client: "Penzión & reštaurácia Karla Naj",
    category: "Penzión & reštaurácia",
    discipline: ["Web na mieru", "Dizajn", "Vývoj"],
    year: "2025",
    url: "https://www.penzionnaj.sk",
    liveLabel: "penzionnaj.sk",
    image: "/projects/penzionnaj.jpg",
    accent: "#e0894a",
    accent2: "#f6c27a",
    tagline: "Pobyt, svadba aj gastro — na jednom mieste.",
    summary:
      "Web pre penzión s reštauráciou a svadobnými priestormi — predáva atmosféru a vedie hosťa od nálady až k priamej rezervácii bez provízií portálov.",
    featured: true,
    industry: "Hospitality",
    timeline: "Web na mieru",
    role: "Dizajn, vývoj",
    stack: ["Next.js", "Framer Motion", "Vercel"],
    intro:
      "Penzión spája tri svety — ubytovanie, svadby a reštauráciu. Web ich musel predstaviť ako jeden plynulý zážitok a presvedčiť hosťa rezervovať priamo.",
    blocks: [
      {
        kicker: "Prístup",
        title: "Predať pocit, nie izbu",
        body: "Postavil som hero ako tri atmosférické svety — Penzión, Svadby, Reštaurácia — s veľkými emotívnymi fotografiami a elegantnou serif typografiou. Návštevník hneď cíti náladu miesta.",
      },
      {
        kicker: "Riešenie",
        title: "Od atmosféry k rezervácii",
        body: "Každá sekcia vedie hosťa jasnou cestou k akcii — rezervovať pobyt, opýtať sa na svadbu, rezervovať stôl. Bleskové načítanie aj na mobiloch, odkiaľ prichádza väčšina hostí.",
      },
    ],
    deliverables: ["UX/UI dizajn", "Vývoj v Next.js", "Galéria a rezervačné CTA", "Mobilná optimalizácia"],
    next: "dubravsky",
  },
  {
    slug: "dubravsky",
    title: "Arch. Norbert Dúbravský",
    client: "Arch. Norbert Dúbravský",
    category: "Architektúra",
    discipline: ["Web na mieru", "Dizajn", "Portfólio"],
    year: "2025",
    url: "https://novy.dubravsky.sk",
    liveLabel: "dubravsky.sk",
    comingSoon: true,
    image: "/projects/dubravsky.jpg",
    accent: "#a98c6b",
    accent2: "#cbb594",
    tagline: "Architektúra, ktorá hovorí tichom.",
    summary:
      "Portfóliový web pre architektonické štúdio — minimalistický a fotograficky vedený, kde realizácie dostávajú priestor dýchať.",
    featured: true,
    industry: "Architektúra",
    timeline: "Web na mieru",
    role: "Dizajn, vývoj",
    stack: ["WordPress", "Custom téma", "Elementor"],
    intro:
      "Architektúra nepotrebuje krik. Web musel ustúpiť do pozadia a nechať vyniknúť realizácie — čisto, pokojne, s rešpektom k fotografii.",
    blocks: [
      {
        kicker: "Prístup",
        title: "Menej je viac",
        body: "Zvolil som minimalistický, takmer galerijný jazyk — veľké fotografie realizácií, vzdušná typografia a žiadne rušivé prvky. Web pôsobí ako tlačené portfólio.",
      },
      {
        kicker: "Riešenie",
        title: "Realizácie v hlavnej úlohe",
        body: "Štruktúra vedie návštevníka od silného úvodného záberu cez portfólio až ku kontaktu. Každý projekt má priestor dýchať, presne ako si architektúra zaslúži.",
      },
    ],
    deliverables: ["UX/UI dizajn", "Vývoj", "Portfólio realizácií", "SEO základ"],
    next: "propsyche",
  },

  // ── ĎALŠIE PROJEKTY ───────────────────────────────────────────────────────
  {
    slug: "propsyche",
    title: "ProPsyché",
    client: "ProPsyché — psychoterapia",
    category: "Psychológia",
    discipline: ["Web na mieru", "Dizajn", "SEO"],
    year: "2025",
    url: "https://www.propsyche.sk",
    liveLabel: "propsyche.sk",
    image: "/projects/propsyche.jpg",
    accent: "#8b5cf6",
    accent2: "#c4b5fd",
    tagline: "Dôvera ešte pred prvým slovom.",
    summary:
      "Web pre psychoterapeutku s jemnou, dôveryhodnou estetikou, ktorá z neistého návštevníka spraví objednaného klienta.",
    featured: false,
    industry: "Zdravie & terapia",
    role: "Dizajn, vývoj, SEO",
    stack: ["WordPress", "Custom téma", "SEO"],
    intro:
      "Psychoterapia stojí na dôvere a bezpečí. Web musel komunikovať pokoj a odbornosť ešte skôr, než návštevník prečíta prvú vetu — a jemne ho doviesť k objednaniu.",
    deliverables: ["UX/UI dizajn", "Vývoj na mieru", "Copywriting", "Technické SEO"],
    next: "zaar",
  },
  {
    slug: "zaar",
    title: "ZAAR Trnava",
    client: "ZAAR — architektonická kancelária",
    category: "Architektúra",
    discipline: ["Web na mieru", "Dizajn", "Vývoj"],
    year: "2024",
    url: "https://www.zaartrnava.sk",
    liveLabel: "zaartrnava.sk",
    image: "/projects/zaar.jpg",
    accent: "#d97742",
    accent2: "#f0a878",
    tagline: "Priestor s charakterom.",
    summary:
      "Web pre architektonickú kanceláriu, ktorý prezentuje realizácie čisto a sebavedomo — s dôrazom na vizuál a remeslo.",
    featured: false,
    industry: "Architektúra",
    role: "Dizajn, vývoj",
    stack: ["Web na mieru", "Responzívny dizajn", "SEO"],
    deliverables: ["UX/UI dizajn", "Vývoj", "Portfólio", "SEO základ"],
    next: "renata",
  },
  {
    slug: "renata-kolencikova",
    title: "Renáta Kolenčíková",
    client: "Renáta Kolenčíková — reality",
    category: "Realitná kancelária",
    discipline: ["Web na mieru", "Dizajn", "Vývoj"],
    year: "2024",
    url: "https://www.renatakolencikova.com",
    liveLabel: "renatakolencikova.com",
    image: "/projects/renata.jpg",
    accent: "#14b8a6",
    accent2: "#5eead4",
    tagline: "Osobnosť, ktorá predáva.",
    summary:
      "Web realitnej maklérky budujúci autoritu a dôveru — čistý, elegantný a zameraný na premenu návštevníka na klienta.",
    featured: false,
    industry: "Reality",
    role: "Dizajn, vývoj",
    stack: ["Web na mieru", "Responzívny dizajn", "SEO"],
    deliverables: ["UX/UI dizajn", "Vývoj", "SEO základ"],
    next: "advokat-kanaba",
  },
  {
    slug: "advokat-kanaba",
    title: "Advokát Kanaba",
    client: "Advokátska kancelária Kanaba",
    category: "Advokátska kancelária",
    discipline: ["Web na mieru", "Dizajn", "Vývoj"],
    year: "2024",
    url: "https://www.advokatkanaba.sk",
    liveLabel: "advokatkanaba.sk",
    image: "/projects/advokatkanaba.jpg",
    accent: "#5b82b0",
    accent2: "#9bb6d6",
    tagline: "Istota v každom kroku.",
    summary:
      "Web pre advokátsku kanceláriu s dôrazom na dôveryhodnosť, prehľadnosť služieb a jednoduchý prvý kontakt.",
    featured: false,
    industry: "Právo",
    role: "Dizajn, vývoj",
    stack: ["Web na mieru", "Responzívny dizajn", "SEO"],
    deliverables: ["UX/UI dizajn", "Vývoj", "SEO základ"],
    next: "sunpool",
  },
  {
    slug: "sunpool",
    title: "SunPool",
    client: "SunPool — bazény",
    category: "Stavba bazénov",
    discipline: ["Web na mieru", "Dizajn", "Vývoj"],
    year: "2024",
    url: "https://sunpool.sk",
    liveLabel: "sunpool.sk",
    image: "/projects/sunpool-v2.jpg",
    accent: "#06b6d4",
    accent2: "#67e8f9",
    tagline: "Leto na vašom dvore.",
    summary:
      "Web pre firmu, ktorá stavia bazény — predáva zážitok z vody a vedie zákazníka od inšpirácie k dopytu.",
    featured: false,
    industry: "Stavebníctvo",
    role: "Dizajn, vývoj",
    stack: ["Web na mieru", "Responzívny dizajn", "SEO"],
    deliverables: ["UX/UI dizajn", "Vývoj", "Galéria realizácií", "Dopytový formulár"],
    next: "profinam",
  },
  {
    slug: "profinam",
    title: "Profinam",
    client: "Profinam — účtovníctvo",
    category: "Účtovníctvo",
    discipline: ["Web na mieru", "Dizajn", "Vývoj"],
    year: "2024",
    url: "http://profinam.sk",
    liveLabel: "profinam.sk",
    image: "/projects/profinam.jpg",
    accent: "#3b9e6b",
    accent2: "#86d6ab",
    tagline: "Čísla v poriadku, hlava v pokoji.",
    summary:
      "Web pre účtovnícku firmu — dôveryhodný a prehľadný, ktorý jasne komunikuje služby a uľahčuje prvý kontakt.",
    featured: false,
    industry: "Financie",
    role: "Dizajn, vývoj",
    stack: ["Web na mieru", "Responzívny dizajn", "SEO"],
    deliverables: ["UX/UI dizajn", "Vývoj", "SEO základ"],
    next: "fyzioterapia",
  },
  {
    slug: "fyzioterapia",
    title: "Fyzioterapia pre každého",
    client: "Fyzioterapia pre každého",
    category: "Fyzioterapia",
    discipline: ["Web na mieru", "Dizajn", "SEO"],
    year: "2024",
    url: "https://www.fyzioterapiaprekazdeho.sk",
    liveLabel: "fyzioterapiaprekazdeho.sk",
    image: "/projects/fyzioterapia-v2.jpg",
    accent: "#2dd4bf",
    accent2: "#99f6e4",
    tagline: "Pohyb bez bolesti.",
    summary:
      "Web pre fyzioterapiu s dôrazom na dôveru, prehľadnú ponuku služieb a jednoduché objednanie.",
    featured: false,
    industry: "Zdravie",
    role: "Dizajn, vývoj, SEO",
    stack: ["Web na mieru", "Responzívny dizajn", "SEO"],
    deliverables: ["UX/UI dizajn", "Vývoj", "SEO základ"],
    next: "upratujeme-nr",
  },
  {
    slug: "upratujeme-nr",
    title: "Upratujeme NR",
    client: "Upratujeme NR",
    category: "Upratovacie služby",
    discipline: ["Web na mieru", "Dizajn", "Vývoj"],
    year: "2024",
    url: "https://www.upratujemenr.sk",
    liveLabel: "upratujemenr.sk",
    image: "/projects/upratujeme.jpg",
    accent: "#38bdf8",
    accent2: "#bae6fd",
    tagline: "Čistota, na ktorú sa spoľahnete.",
    summary:
      "Web pre upratovaciu firmu — sviežy a dôveryhodný, ktorý jasne predstaví služby a privedie dopyty.",
    featured: false,
    industry: "Služby",
    role: "Dizajn, vývoj",
    stack: ["Web na mieru", "Responzívny dizajn", "SEO"],
    deliverables: ["UX/UI dizajn", "Vývoj", "Dopytový formulár"],
    next: "zakladanie-firiem",
  },
  {
    slug: "zakladanie-firiem",
    title: "Zakladanie firiem",
    client: "Zakladanie-firiem.sk",
    category: "Firemné služby",
    discipline: ["Web na mieru", "Dizajn", "Vývoj"],
    year: "2024",
    url: "https://zakladanie-firiem.sk",
    liveLabel: "zakladanie-firiem.sk",
    image: "/projects/zakladaniefiriem.jpg",
    accent: "#6366f1",
    accent2: "#a5b4fc",
    tagline: "Vaša firma, vybavená za vás.",
    summary:
      "Web pre službu zakladania firiem — jasný, dôveryhodný a zameraný na konverziu, ktorý prevedie klienta procesom.",
    featured: false,
    industry: "Firemné služby",
    role: "Dizajn, vývoj",
    stack: ["Web na mieru", "Responzívny dizajn", "SEO"],
    deliverables: ["UX/UI dizajn", "Vývoj", "Konverzný copywriting"],
    next: "lubica-bibenova",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs() {
  return projects.map((p) => p.slug);
}
