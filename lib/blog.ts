// ════════════════════════════════════════════════════════════════════════════
//  SB DESIGN — Blog. Články v slovenčine (neskôr pripraviteľné na ďalšie jazyky).
// ════════════════════════════════════════════════════════════════════════════

export interface BlogSection {
  h?: string;
  p?: string[];
  list?: string[];
  quote?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO dátum publikácie (yyyy-mm-dd) */
  date: string;
  readMinutes: number;
  /** Akcentová farba ilustrácie (hex). */
  accent: string;
  /** Motív generovanej ilustrácie: "speed" | "blocks" | "ads". */
  motif: string;
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "preco-je-rychlost-webu-klucova",
    title: "Prečo je rýchlosť webu kľúčová pre váš biznis",
    excerpt:
      "Každá sekunda navyše pri načítaní vás stojí zákazníkov. Pozrime sa, prečo rýchlosť rozhoduje o predaji aj o pozícii v Google a ako ju reálne dosiahnuť.",
    category: "Weby",
    date: "2026-05-20",
    readMinutes: 5,
    accent: "#2f6bff",
    motif: "speed",
    sections: [
      {
        p: [
          "Predstavte si, že vojdete do obchodu a pri dverách čakáte tri sekundy, kým sa vôbec rozsvietia svetlá. Väčšina ľudí by odišla. Na webe sa to deje neustále — len o tom neviete, lebo návštevník zmizne ešte predtým, než sa stránka načíta.",
          "Rýchlosť nie je technický detail pre vývojárov. Je to priamy obchodný faktor, ktorý rozhoduje o tom, či návštevník zostane, alebo odíde ku konkurencii.",
        ],
      },
      {
        h: "Koľko vás pomalý web reálne stojí",
        p: [
          "Štúdie konzistentne ukazujú jednu vec: čím dlhšie sa web načítava, tým viac ľudí ho opustí ešte pred prvým klikom. Rozdiel medzi webom, ktorý nabehne za sekundu, a webom, ktorý sa ťahá štyri, môže znamenať aj polovicu stratených návštevníkov.",
        ],
        list: [
          "Pomalšie načítanie = vyššia miera okamžitého odchodu (bounce rate).",
          "Každá sekunda omeškania znižuje konverzný pomer.",
          "Na mobile, kde je pripojenie slabšie, je dopad ešte výraznejší.",
        ],
      },
      {
        h: "Google odmeňuje rýchle weby",
        p: [
          "Rýchlosť je oficiálnym faktorom hodnotenia v Google. Cez metriky Core Web Vitals sa meria, ako rýchlo sa web zobrazí, ako rýchlo reaguje a či pri načítaní „neposkakuje“. Pomalý web sa jednoducho ťažšie dostane na popredné pozície — a to bez ohľadu na to, aký kvalitný máte obsah.",
        ],
        quote: "Najlepší web je ten, ktorý zákazník vôbec nestihne vnímať ako „načítavajúci sa“.",
      },
      {
        h: "Ako rýchlosť dosiahnuť",
        p: ["Rýchly web nie je náhoda — je to výsledok desiatok rozhodnutí počas návrhu a vývoja:"],
        list: [
          "Čistý kód bez zbytočných knižníc a balastu.",
          "Optimalizované obrázky v moderných formátoch a správnych veľkostiach.",
          "Minimum ťažkých skriptov, ktoré blokujú vykreslenie.",
          "Kvalitný hosting a moderný framework (napr. Next.js).",
        ],
      },
      {
        h: "Záver",
        p: [
          "Rýchlosť webu nie je luxus ani „nice to have“. Je to základ, na ktorom stojí všetko ostatné — dizajn, obsah aj reklama. Ak váš web nie je bleskový, prichádzate o zákazníkov skôr, než vôbec uvidia, čo ponúkate.",
        ],
      },
    ],
  },
  {
    slug: "web-na-mieru-vs-sablona",
    title: "Web na mieru vs. šablóna: čo sa vám naozaj oplatí",
    excerpt:
      "Šablóna je lacná a rýchla — kým nezistíte jej limity. Porovnanie, ktoré vám pomôže rozhodnúť sa správne podľa toho, kam chce vaša firma smerovať.",
    category: "Weby",
    date: "2026-04-28",
    readMinutes: 6,
    accent: "#18d6ff",
    motif: "blocks",
    sections: [
      {
        p: [
          "Pri tvorbe webu stojíte na začiatku pred zásadným rozhodnutím: hotová šablóna, alebo riešenie postavené na mieru? Obe cesty majú svoje miesto — kľúčové je vedieť, kedy sa ktorá oplatí.",
        ],
      },
      {
        h: "Kedy stačí šablóna",
        p: [
          "Šablóna dáva zmysel, keď potrebujete byť online rýchlo, máte obmedzený rozpočet a váš web má slúžiť skôr ako vizitka než ako predajný nástroj. Za pár dní máte funkčnú stránku a to je v určitej fáze úplne v poriadku.",
        ],
        list: [
          "Nízke vstupné náklady.",
          "Rýchle spustenie.",
          "Vhodné pre jednoduché, statické prezentácie.",
        ],
      },
      {
        h: "Kde šablóna začne brzdiť",
        p: [
          "Problém prichádza vo chvíli, keď chcete rásť. Šablóna je navrhnutá tak, aby vyhovovala tisícom firiem naraz — čo znamená, že nevyhovuje naplno žiadnej. Vaša značka splynie s davom a každá netriviálna úprava sa mení na boj so systémom.",
        ],
        list: [
          "Vyzeráte ako stovky ďalších firiem s rovnakou šablónou.",
          "Často zbytočný kód navyše, ktorý spomaľuje načítanie.",
          "Obmedzené možnosti pri špecifických funkciách a integráciách.",
          "Ťažšia optimalizácia pre konverzie a SEO.",
        ],
      },
      {
        h: "Čo dostávate s webom na mieru",
        p: [
          "Web na mieru je postavený okolo vášho biznisu, vašich zákazníkov a vašich cieľov. Každý prvok má dôvod — od štruktúry stránok cez texty až po umiestnenie tlačidla, ktoré vedie k dopytu.",
        ],
        quote: "Šablóna rieši otázku „ako byť online“. Web na mieru rieši otázku „ako predávať“.",
      },
      {
        h: "Ako sa rozhodnúť",
        p: [
          "Ak je web pre vás len formalita, šablóna postačí. Ak má byť web nástrojom, ktorý buduje dôveru a privádza zákazníkov, investícia do riešenia na mieru sa vráti — v rýchlosti, v odlíšení od konkurencie aj v počte dopytov.",
        ],
      },
    ],
  },
  {
    slug: "ako-meta-a-google-ads-privedu-zakaznikov",
    title: "Ako Meta a Google Ads privedú zákazníkov na váš web",
    excerpt:
      "Skvelý web bez návštevníkov nepredáva. Vysvetlenie, ako fungujú platené kampane, kedy siahnuť po Google a kedy po Meta — a ako z reklamy vyťažiť maximum.",
    category: "Marketing",
    date: "2026-03-30",
    readMinutes: 6,
    accent: "#5a8bff",
    motif: "ads",
    sections: [
      {
        p: [
          "Postaviť krásny a rýchly web je polovica práce. Tá druhá je priviesť naň správnych ľudí. A práve tu prichádzajú na rad platené kampane na Google a Meta — najrýchlejší spôsob, ako sa dostať pred zákazníkov.",
        ],
      },
      {
        h: "Google Ads — zachytíte dopyt",
        p: [
          "Google Ads funguje na princípe zámeru. Človek už niečo aktívne hľadá — „tvorba webu Nitra“, „obkladač Bratislava“ — a vy sa zobrazíte presne v tom momente. Je to ako mať otvorené dvere práve vtedy, keď okolo prechádza niekto, kto vás potrebuje.",
        ],
        list: [
          "Ideálne pre služby a produkty, ktoré ľudia priamo vyhľadávajú.",
          "Platíte väčšinou až za klik.",
          "Rýchle výsledky — kampaň môže priniesť dopyty už v prvých dňoch.",
        ],
      },
      {
        h: "Meta Ads — vytvoríte dopyt",
        p: [
          "Meta (Facebook a Instagram) funguje inak. Tu zákazník aktívne nehľadá — vy ho zaujmete vizuálom a ponukou počas toho, ako scrolluje. Je to ideálne na budovanie značky, oslovenie nových ľudí a produkty, ktoré „predáva“ obraz.",
        ],
        list: [
          "Silné cielenie podľa záujmov, správania a lokality.",
          "Výborné na vizuálne produkty a budovanie povedomia.",
          "Priestor na remarketing — oslovíte ľudí, ktorí už váš web navštívili.",
        ],
      },
      {
        h: "Reklama je len taká dobrá ako web za ňou",
        p: [
          "Aj tá najlepšie nastavená kampaň zlyhá, ak privedie ľudí na pomalý alebo neprehľadný web. Reklama a web musia fungovať ako jeden celok: kampaň privedie návštevníka, web ho premení na zákazníka.",
        ],
        quote: "Platená reklama neopraví zlý web — len rýchlejšie ukáže, že nefunguje.",
      },
      {
        h: "Záver",
        p: [
          "Google a Meta nie sú konkurenti, ale doplnky. Google zachytí existujúci dopyt, Meta vytvára nový. Keď ich spojíte s webom postaveným na konverziu, vznikne systém, ktorý privádza zákazníkov deň čo deň.",
        ],
      },
    ],
  },
];

export const getBlogSlugs = (): string[] => blogPosts.map((p) => p.slug);

export const getPost = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

/** Príspevky zoradené od najnovšieho. */
export const sortedPosts = (): BlogPost[] =>
  [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

const MONTHS_SK = [
  "januára", "februára", "marca", "apríla", "mája", "júna",
  "júla", "augusta", "septembra", "októbra", "novembra", "decembra",
];

/** Naformátuje ISO dátum do slovenského formátu, napr. „20. mája 2026“. */
export const formatDateSk = (iso: string): string => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}. ${MONTHS_SK[m - 1]} ${y}`;
};
