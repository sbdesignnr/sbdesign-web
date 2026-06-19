// ════════════════════════════════════════════════════════════════════════════
//  SB DESIGN — Single source of truth for brand, nav, contact.
// ════════════════════════════════════════════════════════════════════════════

export const site = {
  name: "SB Design",
  legalName: "Samuel Bibeň",
  founder: "Samuel Bibeň",
  domain: "sbdesign.sk",
  url: "https://www.sbdesign.sk",
  tagline: "Weby a marketing, ktoré predávajú.",
  shortPitch:
    "Navrhujem a programujem prémiové weby na mieru a vediem výkonnostné kampane, ktoré z návštevníkov robia zákazníkov.",
  email: "biben@sbdesign.sk",
  phone: "+421 911 183 131",
  phoneHref: "tel:+421911183131",
  address: "Mostná 42, 949 01 Nitra",
  ico: "55 671 349",
  dic: "1129242004",
  mapsQuery: "Mostná 42, 949 01 Nitra",
  geo: { lat: 48.30693, lng: 18.08894 },
  yearFounded: 2023,
  logo: "/SB-Design-Logo-1-5.png",
} as const;

export const nav: { label: string; href: string }[] = [
  { label: "Projekty", href: "/projekty" },
  { label: "Služby", href: "/sluzby" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
];

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com", handle: "@sbdesign", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com", handle: "SB Design", icon: "facebook" },
  { label: "LinkedIn", href: "https://www.linkedin.com", handle: "Samuel Bibeň", icon: "linkedin" },
] as const;

export const legalLinks = [
  { label: "Obchodné podmienky", href: "/obchodne-podmienky" },
  { label: "Ochrana osobných údajov", href: "/ochrana-osobnych-udajov" },
  { label: "Cookies", href: "/cookies" },
] as const;
