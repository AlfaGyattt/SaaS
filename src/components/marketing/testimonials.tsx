import { Star } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/layout";
import { Card } from "@/components/ui/card";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section id="avis" className="bg-bg-subtle py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Ils ont décroché"
          title="Des candidats, de vrais entretiens"
          description="Note moyenne 4,7/5 sur Trustpilot."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="flex flex-col gap-4 p-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed">“{t.quote}”</p>
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
          ))}
        </div>
      </Container>
    </section>
  );
}
