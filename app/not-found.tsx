import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center gutter text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1]"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(47,107,255,0.18), transparent 70%)" }}
      />
      <span className="label mb-6">Chyba 404</span>
      <h1 className="display-xl text-gradient">404</h1>
      <p className="mt-6 max-w-md text-lg text-marble-dim">
        Táto stránka neexistuje — alebo sme ju ešte nestihli postaviť. Vráťme vás späť na správnu cestu.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button href="/" size="lg" cursorLabel="Domov">
          Späť na domov
        </Button>
        <Link href="/projekty" className="link-underline font-display text-sm font-medium text-marble-dim hover:text-marble">
          alebo si pozrite projekty
        </Link>
      </div>
    </main>
  );
}
