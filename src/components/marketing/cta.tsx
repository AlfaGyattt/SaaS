import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function Cta() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center shadow-glow sm:px-12">
            <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />
            <div
              className="absolute -right-16 -top-16 size-64 rounded-full bg-accent/20 blur-3xl"
              aria-hidden
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl text-balance">
                Votre prochain entretien commence ici.
              </h2>
              <p className="mt-4 text-base text-primary-foreground/80 text-balance">
                Créez votre CV gratuitement en 2 minutes. Aucune carte bancaire requise.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="accent" asChild>
                  <Link href="/inscription">
                    Créer mon CV gratuitement <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link href="#tarifs">Voir les tarifs</Link>
                </Button>
              </div>
              <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-primary-foreground/75">
                <ShieldCheck className="size-4" aria-hidden /> Sans engagement · RGPD, hébergé en
                France
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
