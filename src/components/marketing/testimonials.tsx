import { Star } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/layout";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section id="avis" className="bg-bg-subtle py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Ils ont décroché"
            title="Des candidats, de vrais entretiens"
            description="Note moyenne 4,7/5 sur Trustpilot."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 80} className="h-full">
              <Card className="flex h-full flex-col gap-4 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="size-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
