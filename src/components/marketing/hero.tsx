import Link from "next/link";
import { Star, ShieldCheck, ArrowRight, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { Badge } from "@/components/ui/badge";
import { ScoreRing } from "@/components/ui/score-ring";
import { SITE } from "@/lib/constants";
import { formatFr } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-hero-glow" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <Badge variant="accent">
            <Sparkles className="size-3.5" /> Nouveau · Adaptation à l&apos;offre par IA
          </Badge>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl text-balance">
            Décrochez plus <span className="text-primary">d&apos;entretiens.</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground text-balance">
            Collez une offre d&apos;emploi : obtenez un CV, une lettre et un mail adaptés, en
            français irréprochable, en 10 minutes. <strong className="text-foreground">Sans abonnement piège.</strong>
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/inscription">
                Créer mon CV gratuitement <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#demo">Voir une démo</Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-5">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-accent text-accent" />
                ))}
              </span>
              {SITE.trustpilot.toString().replace(".", ",")}/5 sur Trustpilot
            </span>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <span>+{formatFr(SITE.applicationsSent)} candidatures envoyées</span>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-success" /> RGPD, hébergé en France
            </span>
          </div>
        </div>

        <HeroMock />
      </Container>
    </section>
  );
}

function HeroMock() {
  const requirements = [
    { label: "Diplôme DEAS", ok: true },
    { label: "Manutention patients", ok: true },
    { label: "Travail de nuit", ok: true },
    { label: "Logiciel Osiris", ok: false },
  ];
  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary/5 blur-2xl" />
      <div className="rounded-2xl border border-border bg-card shadow-xl">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="size-2.5 rounded-full bg-danger/60" />
          <span className="size-2.5 rounded-full bg-warning/60" />
          <span className="size-2.5 rounded-full bg-success/60" />
          <span className="ml-2 text-xs text-muted-foreground">
            Postuler — Aide-soignante · Clinique Saint-Jean
          </span>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Compatibilité avec l&apos;offre
            </p>
            <div className="flex items-center gap-4">
              <ScoreRing value={86} />
              <div className="space-y-1.5">
                <p className="text-sm font-semibold">Vous matchez sur 7 critères / 9</p>
                <p className="text-xs text-muted-foreground">
                  CV, lettre et mail réécrits pour cette offre.
                </p>
              </div>
            </div>
            <ul className="space-y-1.5 pt-1">
              {requirements.map((r) => (
                <li key={r.label} className="flex items-center gap-2 text-sm">
                  {r.ok ? (
                    <Check className="size-4 text-success" />
                  ) : (
                    <span className="grid size-4 place-items-center rounded-full bg-warning/15 text-[10px] font-bold text-warning">
                      !
                    </span>
                  )}
                  <span className={r.ok ? "" : "text-muted-foreground"}>{r.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-bg-subtle p-3">
            <div className="space-y-2">
              <div className="h-2.5 w-1/2 rounded bg-primary/25" />
              <div className="h-2 w-3/4 rounded bg-border" />
              <div className="h-2 w-2/3 rounded bg-border" />
              <div className="mt-3 h-2 w-1/3 rounded bg-foreground/20" />
              <div className="h-2 w-full rounded bg-border" />
              <div className="h-2 w-full rounded bg-border" />
              <div className="h-2 w-4/5 rounded bg-border" />
              <div className="mt-3 inline-flex items-center gap-1 rounded-md bg-accent/12 px-2 py-1 text-[10px] font-medium text-accent-600">
                <Sparkles className="size-3" /> Adapté à l&apos;offre
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
