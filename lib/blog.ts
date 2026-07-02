// ════════════════════════════════════════════════════════════════════════════
//  SB DESIGN — Blog. Články v slovenčine (neskôr pripraviteľné na ďalšie jazyky).
// ════════════════════════════════════════════════════════════════════════════

export interface BlogSection {
  h?: string;
  hLevel?: number; // 2 = H2 (default), 3 = H3 subsection — keeps heading hierarchy
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
  /** Voliteľný cover obrázok z dashboardu (inak sa použije generovaná ilustrácia). */
  imageUrl?: string;
  imageAlt?: string;
  sections: BlogSection[];
}

// Testovacie „seed" články boli odstránené — blog teraz zobrazuje výhradne
// reálne články spravované z dashboardu (cez /api/public/blog).
export const blogPosts: BlogPost[] = [];

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
