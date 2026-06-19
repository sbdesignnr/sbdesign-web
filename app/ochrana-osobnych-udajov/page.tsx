import type { Metadata } from "next";
import LegalLayout from "@/components/sections/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov",
  description: "Zásady ochrany osobných údajov (GDPR) — SB Design, Samuel Bibeň.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Právne informácie"
      title="Ochrana osobných údajov"
      updated="jún 2026"
      sections={[
        {
          h: "Prevádzkovateľ",
          p: [
            `${site.legalName}, IČO: ${site.ico}, DIČ: ${site.dic}, so sídlom ${site.address}.`,
            `E-mail: ${site.email} · Telefón: ${site.phone} · Web: ${site.domain} (ďalej len „Prevádzkovateľ“).`,
            "Prevádzkovateľ postupuje pri spracovaní osobných údajov v súlade s Nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR) a zákonom č. 18/2018 Z. z. o ochrane osobných údajov.",
          ],
        },
        {
          h: "Dotknutá osoba",
          p: ["Dotknutou osobou je každá fyzická osoba, ktorej osobné údaje Prevádzkovateľ spracúva, najmä:"],
          list: [
            `návštevník webovej stránky ${site.domain},`,
            "klient, ktorý si objednal služby Prevádzkovateľa,",
            "fyzická osoba, ktorá vyplní kontaktný formulár, odošle e-mail alebo inak poskytne svoje osobné údaje Prevádzkovateľovi.",
          ],
        },
        {
          h: "Osobné údaje",
          p: [
            "Osobné údaje sú akékoľvek informácie, ktoré identifikujú fyzickú osobu alebo umožňujú jej identifikáciu — napríklad meno, priezvisko, e-mail, telefónne číslo, IP adresa, cookies a ďalšie údaje.",
          ],
        },
        {
          h: "Účel a právny základ spracovania",
          p: ["Prevádzkovateľ spracúva osobné údaje na nasledujúce účely:"],
          sub: [
            {
              t: "Komunikácia s klientom",
              d: "Účel: odpovedanie na otázky, konzultácie, vypracovanie cenovej ponuky. Rozsah: meno, e-mail, telefónne číslo. Právny základ: oprávnený záujem Prevádzkovateľa podľa čl. 6 ods. 1 písm. f) GDPR.",
            },
            {
              t: "Uzatvorenie a plnenie zmluvy",
              d: "Účel: poskytovanie služieb (tvorba webstránok, online reklama, správa sociálnych sietí), vystavenie faktúr, dodanie služieb. Rozsah: meno, priezvisko, e-mail, telefónne číslo, fakturačné údaje. Právny základ: plnenie zmluvy podľa čl. 6 ods. 1 písm. b) GDPR.",
            },
            {
              t: "Marketing",
              d: "Účel: zasielanie obchodných oznámení (novinky, akcie, tipy). Rozsah: meno, e-mail. Právny základ: súhlas dotknutej osoby podľa čl. 6 ods. 1 písm. a) GDPR. Súhlas je možné kedykoľvek odvolať.",
            },
            {
              t: "Cookies",
              d: "Účel: zlepšenie fungovania webu a analytika návštevnosti. Rozsah: IP adresa, informácie o zariadení, anonymizované údaje o správaní na webe. Právny základ: súhlas dotknutej osoby podľa čl. 6 ods. 1 písm. a) GDPR.",
            },
          ],
        },
        {
          h: "Doba uchovávania údajov",
          list: [
            "Údaje na účely komunikácie: 1 rok.",
            "Údaje na účely plnenia zmluvy: 10 rokov (v súlade so zákonom o účtovníctve).",
            "Údaje na marketingové účely: do odvolania súhlasu.",
            "Údaje získané cez cookies: podľa nastavení prehliadača.",
          ],
        },
        {
          h: "Práva dotknutej osoby",
          p: ["Dotknutá osoba má podľa GDPR nasledujúce práva:"],
          list: [
            "Právo na prístup k údajom — vedieť, aké údaje sa spracúvajú.",
            "Právo na opravu nesprávnych údajov.",
            "Právo na vymazanie údajov („právo byť zabudnutý“).",
            "Právo na obmedzenie spracovania.",
            "Právo na prenosnosť údajov.",
            "Právo namietať spracovanie (pri oprávnenom záujme).",
            "Právo kedykoľvek odvolať súhlas.",
          ],
        },
        {
          h: "Poskytovanie údajov tretím stranám",
          p: ["Prevádzkovateľ neposkytuje osobné údaje tretím stranám s výnimkou:"],
          list: [
            "účtovnej firmy (fakturácia),",
            "poskytovateľov platobných služieb (pri online platbe),",
            "poskytovateľov analytických nástrojov (Google Analytics).",
          ],
        },
        {
          h: "Cookies",
          p: [
            "Webová stránka využíva súbory cookies na zlepšenie používateľského zážitku a analytiku. Cookies je možné kedykoľvek vypnúť v nastaveniach prehliadača.",
          ],
          list: [
            "Google Analytics — anonymizovaná analytika návštevnosti.",
            "Facebook Pixel — remarketing a cielenie reklamy.",
          ],
        },
        {
          h: "Zabezpečenie údajov",
          p: [
            "Prevádzkovateľ prijal primerané technické a organizačné opatrenia na zabezpečenie osobných údajov proti zneužitiu, strate alebo neoprávnenému prístupu. Osobné údaje sa neposkytujú mimo krajín EÚ.",
          ],
        },
        {
          h: "Dozorný orgán",
          p: [
            "Ak má dotknutá osoba pochybnosti o zákonnosti spracovania, môže sa obrátiť na Úrad na ochranu osobných údajov SR, Hraničná 12, 820 07 Bratislava 27, dataprotection.gov.sk.",
            `Žiadosti týkajúce sa osobných údajov je možné poslať na ${site.email}.`,
          ],
        },
        {
          h: "Záverečné ustanovenia",
          p: [
            "Tieto zásady nadobúdajú účinnosť dňom zverejnenia na webovej stránke. Prevádzkovateľ si vyhradzuje právo na ich zmenu, pričom aktuálna verzia je vždy dostupná na webe.",
          ],
        },
      ]}
    />
  );
}
