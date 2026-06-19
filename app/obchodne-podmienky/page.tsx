import type { Metadata } from "next";
import LegalLayout from "@/components/sections/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Obchodné podmienky",
  description: "Všeobecné obchodné podmienky — SB Design, Samuel Bibeň.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Právne informácie"
      title="Obchodné podmienky"
      updated="jún 2026"
      sections={[
        {
          h: "Všeobecné ustanovenia",
          p: [
            `Tieto obchodné podmienky upravujú vzťahy medzi poskytovateľom služieb ${site.legalName} (IČO: ${site.ico}) so sídlom ${site.address}, e-mail: ${site.email}, telefón: ${site.phone}, prevádzkujúcim webovú stránku ${site.domain} (ďalej len „Poskytovateľ“), a fyzickými alebo právnickými osobami, ktoré využívajú jeho služby (ďalej len „Klient“).`,
            "Vzťahujú sa na poskytovanie služieb tvorby webstránok, online reklamy a správy sociálnych sietí, ktoré Poskytovateľ ponúka na diaľku.",
          ],
        },
        {
          h: "Objednávka a uzatvorenie zmluvy",
          list: [
            "Klient si môže objednať služby e-mailom, telefonicky alebo prostredníctvom objednávkového formulára na webovej stránke.",
            "Pred začatím práce je Klient povinný podpísať objednávku projektu, čím potvrdzuje svoj záujem o služby.",
            "Po potvrdení objednávky a úhrade zálohy sa zmluva považuje za záväznú.",
          ],
        },
        {
          h: "Cena služieb a platobné podmienky",
          list: [
            "Cena za služby sa stanovuje individuálne na základe konkrétnych požiadaviek klienta — každý projekt je jedinečný, cena je prispôsobená rozsahu, náročnosti a požadovaným funkciám.",
            "Po konzultácii a analýze požiadaviek poskytne Poskytovateľ cenový odhad; presná suma je určená po vzájomnej dohode.",
            "Pri tvorbe webstránok je požadovaná 30 % záloha po odsúhlasení návrhu, zvyšná suma sa uhrádza po dokončení projektu.",
            "Pri online reklame sa platba realizuje podľa individuálnej dohody, pričom reklamný rozpočet si Klient hradí sám priamo na reklamných platformách (napr. Google Ads, Facebook Ads).",
            "Splatnosť faktúr je 14 dní od vystavenia, ak nie je dohodnuté inak.",
            "Pri omeškaní platby si Poskytovateľ vyhradzuje právo pozastaviť poskytovanie služieb alebo podniknúť kroky na vymáhanie pohľadávky.",
          ],
        },
        {
          h: "Dodacie podmienky a realizácia",
          list: [
            "Dĺžka realizácie webstránok je 2–8 týždňov, v závislosti od rozsahu projektu a priebehu spolupráce.",
            "Ak Klient mešká s dodaním podkladov, termín dokončenia sa primerane predlžuje.",
            "Všetky úpravy počas realizácie v súlade s pôvodným zadaním sú zahrnuté v cene.",
          ],
        },
        {
          h: "Reklamácie a úpravy",
          list: [
            "Klient uhradí doplatok za projekt až po schválení a spokojnosti s výsledkom.",
            "Ak sa po odovzdaní objaví technická chyba spôsobená Poskytovateľom, je povinný ju bezplatne opraviť do 14 dní.",
            "Reklamácie sa nevzťahujú na zmeny, ktoré Klient vykoná na projekte sám alebo prostredníctvom tretích strán.",
          ],
        },
        {
          h: "Storno podmienky a ukončenie spolupráce",
          list: [
            "Klient nemôže jednostranne zrušiť objednávku počas realizácie; ak tak urobí, záloha sa nevracia.",
            "Ak Klient prestane komunikovať alebo platiť, Poskytovateľ má právo ukončiť spoluprácu a podniknúť právne kroky na vymáhanie pohľadávok.",
            "Poskytovateľ si vyhradzuje právo odmietnuť alebo ukončiť spoluprácu, ak Klient porušuje dohodnuté podmienky.",
          ],
        },
        {
          h: "Práva na hotové projekty a duševné vlastníctvo",
          list: [
            "Po uhradení celej sumy prechádzajú na Klienta všetky práva k webstránke, grafike alebo reklamám.",
            "Poskytovateľ si vyhradzuje právo použiť hotové projekty vo svojom portfóliu, pokiaľ Klient výslovne nepožiada o výnimku.",
          ],
        },
        {
          h: "Ochrana osobných údajov",
          list: [
            "Poskytovateľ spracúva osobné údaje Klienta (meno, e-mail, telefón, správu) len za účelom komunikácie a poskytovania služieb.",
            "Na webe sa používajú cookies a Google Analytics na analýzu návštevnosti.",
            "Osobné údaje nie sú poskytované tretím stranám s výnimkou účtovných alebo právnych služieb v nevyhnutnom rozsahu.",
          ],
        },
        {
          h: "Právo na odstúpenie od zmluvy",
          list: [
            "Klient má právo odstúpiť od zmluvy do 14 dní od jej uzavretia, pokiaľ ešte neboli zahájené práce na projekte.",
            "Ak sa na projekte už začalo pracovať, záloha sa nevracia a Klient je povinný uhradiť náklady vynaložené do momentu odstúpenia.",
          ],
        },
        {
          h: "Zodpovednosť za vady a záruka",
          list: [
            "Poskytovateľ zodpovedá za technické chyby, ktoré vzniknú jeho pričinením, a je povinný ich odstrániť do 14 dní.",
            "Za zmeny vykonané Klientom alebo tretími stranami Poskytovateľ nezodpovedá.",
          ],
        },
        {
          h: "Alternatívne riešenie sporov",
          list: [
            "Klient má právo riešiť prípadné spory mimosúdne prostredníctvom alternatívneho riešenia sporov.",
            "Viac informácií nájdete na oficiálnej platforme EÚ: ec.europa.eu/consumers/odr.",
          ],
        },
        {
          h: "Záverečné ustanovenia",
          list: [
            "Tieto obchodné podmienky sú platné od dátumu zverejnenia na webovej stránke.",
            "Poskytovateľ si vyhradzuje právo na ich zmenu, pričom platná verzia je vždy dostupná na webe.",
            "Prípadné spory sa riešia podľa právneho poriadku Slovenskej republiky.",
          ],
        },
      ]}
    />
  );
}
