import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center sm:px-12">
          <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl text-balance">
              Votre prochain entretien commence ici.
            </h2>
            <p className="mt-4 text-base text-primary-foreground/80 text-balance">
              Créez votre CV gratuitement en 2 minutes. Aucune carte bancaire requise.
            </p>
            <div className="mt-8 flex justify-center">
              <Button size="lg" variant="accent" asChild>
                <Link href="/inscription">
                  Créer mon CV gratuitement <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
