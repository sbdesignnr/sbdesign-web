// ════════════════════════════════════════════════════════════════════════════
//  Markdown → BlogSection[] converter.
//  The website renders structured sections ({ h, p[], list[], quote }), while the
//  dashboard stores Markdown. This maps one to the other:
//   - "## Nadpis"      → { h: "Nadpis" } (any #..###### starts a new section)
//   - paragraphs       → grouped into the current section's p: string[]
//   - "- item" lists   → { list: [...] }
//   - "> citát"        → { quote: "..." }
//   - no headings      → everything in a single section without `h`
// ════════════════════════════════════════════════════════════════════════════

import type { BlogSection } from "./blog";

const HEADING = /^#{1,6}\s+/;
const LIST_ITEM = /^\s*([-*+]|\d+\.)\s+/;
const QUOTE = /^\s*>\s?/;
// A GitHub-style table: a header row of pipes, then a --- separator row.
const TABLE_SEP = /^\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/;

function splitTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());
}

function isTableBlock(block: string[]): boolean {
  return (
    block.length >= 2 &&
    block[0].includes("|") &&
    TABLE_SEP.test(block[1]) &&
    block[1].includes("|")
  );
}

/** Strip inline Markdown (bold/italic/code/links/images) down to plain text. */
function stripInline(s: string): string {
  return s
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

// The renderer always outputs h → p → list → quote within a section, so to keep
// document order we start a fresh section when the next block would render before
// content already placed in the current one.
function needsNewSection(s: BlogSection, type: "p" | "list" | "quote"): boolean {
  if (type === "p") return Boolean(s.list || s.quote);
  if (type === "list") return Boolean(s.quote);
  return Boolean(s.quote); // only one quote per section
}

export function markdownToSections(markdown: string): BlogSection[] {
  const text = (markdown ?? "").replace(/\r\n/g, "\n").trim();
  if (!text) return [];

  // Group lines into blocks separated by blank lines; headings are their own block.
  const blocks: string[][] = [];
  let current: string[] = [];
  const flush = () => {
    if (current.length) {
      blocks.push(current);
      current = [];
    }
  };
  for (const raw of text.split("\n")) {
    const line = raw.replace(/\s+$/, "");
    if (line.trim() === "") {
      flush();
      continue;
    }
    if (HEADING.test(line)) {
      flush();
      blocks.push([line]);
      continue;
    }
    current.push(line);
  }
  flush();

  const sections: BlogSection[] = [];
  let section: BlogSection | null = null;
  const ensure = (): BlogSection => {
    if (!section) {
      section = {};
      sections.push(section);
    }
    return section;
  };

  for (const block of blocks) {
    if (HEADING.test(block[0])) {
      // Preserve the heading level: H1/H2 → 2, H3+ → 3 (sub-section).
      const hashes = block[0].match(/^#{1,6}/)?.[0].length ?? 2;
      section = { h: stripInline(block[0].replace(HEADING, "")), hLevel: hashes >= 3 ? 3 : 2 };
      sections.push(section);
      continue;
    }

    if (isTableBlock(block)) {
      const headers = splitTableRow(block[0]).map(stripInline);
      const rows = block.slice(2).map((l) => splitTableRow(l).map(stripInline));
      let s = ensure();
      if (s.table || s.list || s.quote) {
        s = {};
        sections.push(s);
        section = s;
      }
      s.table = { headers, rows };
      continue;
    }

    if (block.every((l) => LIST_ITEM.test(l))) {
      const items = block.map((l) => stripInline(l.replace(LIST_ITEM, "")));
      let s = ensure();
      if (needsNewSection(s, "list")) {
        s = {};
        sections.push(s);
        section = s;
      }
      (s.list ??= []).push(...items);
      continue;
    }

    if (block.every((l) => QUOTE.test(l))) {
      const quote = stripInline(block.map((l) => l.replace(QUOTE, "")).join(" "));
      let s = ensure();
      if (needsNewSection(s, "quote")) {
        s = {};
        sections.push(s);
        section = s;
      }
      s.quote = quote;
      continue;
    }

    const para = stripInline(block.join(" "));
    if (!para) continue;
    let s = ensure();
    if (needsNewSection(s, "p")) {
      s = {};
      sections.push(s);
      section = s;
    }
    (s.p ??= []).push(para);
  }

  return sections.filter((s) => s.h || s.p?.length || s.list?.length || s.quote || s.table);
}
