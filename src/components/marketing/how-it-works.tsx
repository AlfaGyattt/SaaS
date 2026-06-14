import { Container, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { HOW_IT_WORKS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Comment ça marche"
            title="De l'offre à l'entretien, en 3 étapes"
            description="Pas de logiciel à apprendre. Vous collez, l'IA travaille, vous postulez."
          />
        </Reveal>

        <div className="relative mt-16">
          {/* Connecteur horizontal (desktop) */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
          />
          <ol className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <Reveal key={step.title} delay={i * 120} as="li" className="relative">
                <div className="flex flex-col items-start gap-4 text-left lg:items-center lg:text-center">
                  <div className="relative inline-flex">
                    <span className="grid size-14 place-items-center rounded-2xl border border-border bg-card text-primary shadow-sm">
                      <step.icon className="size-6" />
                    </span>
                    <span className="absolute -right-2 -top-2 grid size-7 place-items-center rounded-full bg-primary font-mono text-sm font-bold text-primary-foreground shadow-glow">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
