import { Check } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { USE_CASES } from "@/lib/constants";

export function UseCases() {
  return (
    <section id="cas-usage" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Pour qui ?"
            title="Un copilote pour chaque moment de carrière"
            description="Étudiant, premier emploi, cadre ou reconversion : le produit s'adapte à votre situation."
          />
        </Reveal>

        <Tabs
          defaultValue={USE_CASES[0].id}
          className="mt-12 flex flex-col items-center"
        >
          <Reveal delay={80}>
            <TabsList className="flex-wrap justify-center">
              {USE_CASES.map((u) => (
                <TabsTrigger key={u.id} value={u.id}>
                  <u.icon className="size-4" aria-hidden /> {u.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Reveal>

          <Reveal delay={160} className="mt-8 w-full">
            {USE_CASES.map((u) => (
              <TabsContent key={u.id} value={u.id}>
                <div className="mx-auto grid max-w-4xl gap-8 rounded-2xl border border-border bg-card p-7 shadow-sm sm:grid-cols-[auto_1fr] sm:p-10">
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                    <u.icon className="size-8" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-balance">{u.headline}</h3>
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {u.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-sm">
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success/12 text-success">
                            <Check className="size-3.5" aria-hidden />
                          </span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Reveal>
        </Tabs>
      </Container>
    </section>
  );
}
