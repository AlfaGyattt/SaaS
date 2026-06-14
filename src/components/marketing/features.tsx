import { Container, SectionHeading } from "@/components/ui/layout";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { FEATURES } from "@/lib/constants";

export function Features() {
  return (
    <section id="fonctionnalites" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Tout le dossier de candidature"
            title="Pas un créateur de CV. Un copilote de candidature."
            description="De l'offre à l'entretien, chaque étape est outillée — et pensée pour le marché français."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 80} className="h-full">
              <Card className="group h-full p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
