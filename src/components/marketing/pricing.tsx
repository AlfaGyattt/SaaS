import Link from "next/link";
import { Check } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLANS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="tarifs" className="bg-bg-subtle py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Tarifs"
          title="Un prix clair, sans engagement"
          description="Commencez gratuitement. Payez uniquement le temps de votre recherche."
        />
        <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-7 shadow-sm",
                plan.highlight
                  ? "border-primary shadow-glow ring-1 ring-primary lg:-translate-y-3 lg:scale-[1.02]"
                  : "border-border",
              )}
            >
              {plan.badge && (
                <Badge variant="accent" className="absolute -top-3 left-1/2 -translate-x-1/2">
                  {plan.badge}
                </Badge>
              )}
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <Button
                className="mt-6"
                variant={plan.highlight ? "accent" : "outline"}
                asChild
              >
                <Link href="/inscription">{plan.cta}</Link>
              </Button>
              <ul className="mt-6 space-y-3 border-t border-border pt-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Tous les plans : résiliables en 1 clic · données hébergées en France · garantie 7 jours.
        </p>
      </Container>
    </section>
  );
}
