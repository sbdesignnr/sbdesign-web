import type { Metadata } from "next";
import LegalLayout from "@/components/sections/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Zásady používania cookies",
  description: "Informácie o používaní súborov cookies na webe SB Design.",
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalLayout
      eyebrow="Právne informácie"
      title="Zásady cookies"
      updated="jún 2026"
      sections={[
        {
          h: "Čo sú cookies",
          p: [
            "Cookies sú malé textové súbory, ktoré sa pri návšteve webu ukladajú vo vašom prehliadači. Pomáhajú webu správne fungovať a umožňujú nám rozumieť, ako sa stránka používa.",
          ],
        },
        {
          h: "Aké cookies používame",
          sub: [
            {
              t: "Nevyhnutné cookies",
              d: "Zabezpečujú základné fungovanie webu (napr. zobrazenie stránky a odoslanie formulára). Nedajú sa vypnúť a nevyžadujú súhlas.",
            },
            {
              t: "Analytické cookies — Google Analytics",
              d: "Pomáhajú nám anonymizovane merať návštevnosť a správanie na webe, aby sme mohli zlepšovať obsah. Používame ich len s vaším súhlasom.",
            },
            {
              t: "Marketingové cookies — Facebook Pixel",
              d: "Umožňujú remarketing a relevantnejšie cielenie reklamy. Používame ich len s vaším súhlasom.",
            },
          ],
        },
        {
          h: "Doba uchovávania",
          p: [
            "Cookies sa uchovávajú po dobu nevyhnutnú na daný účel alebo do ich vymazania v prehliadači. Súhlas s používaním cookies môžete kedykoľvek odvolať.",
          ],
        },
        {
          h: "Správa cookies",
          p: [
            "Používanie cookies môžete kedykoľvek upraviť alebo zakázať v nastaveniach svojho prehliadača. Obmedzenie niektorých cookies však môže ovplyvniť funkčnosť webu.",
          ],
        },
        {
          h: "Súvisiace dokumenty",
          p: [
            `Podrobnosti o spracovaní osobných údajov nájdete v dokumente Ochrana osobných údajov. V prípade otázok ohľadom cookies nás kontaktujte na ${site.email}.`,
          ],
        },
      ]}
    />
  );
}
