"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Reveal } from "@/components/ui/reveal";
import { PLANS, ANNUAL_PRICING } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [annual, setAnnual] = React.useState(false);

  return (
    <section id="tarifs" className="bg-bg-subtle py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Tarifs"
            title="Un prix clair, sans engagement"
            description="Commencez gratuitement. Payez uniquement le temps de votre recherche."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-xs">
              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  annual ? "text-muted-foreground" : "text-foreground",
                )}
              >
                Mensuel
              </span>
              <Switch
                checked={annual}
                onCheckedChange={setAnnual}
                aria-label="Basculer entre tarif mensuel et annuel"
              />
              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  annual ? "text-foreground" : "text-muted-foreground",
                )}
              >
                Annuel
              </span>
            </div>
            <Badge variant="success" className="gap-1">
              <Sparkles className="size-3.5" aria-hidden /> 2 mois offerts · -20 %
            </Badge>
          </div>
        </Reveal>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => {
            const annualInfo = ANNUAL_PRICING[plan.id];
            const showAnnual = annual && annualInfo;
            const price = showAnnual ? annualInfo.monthlyEquivalent : plan.price;
            const period = showAnnual ? annualInfo.period : plan.period;

            return (
              <Reveal key={plan.id} delay={i * 80} className="h-full">
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-2xl border bg-card p-7 transition-all duration-200",
                    plan.highlight
                      ? "border-primary shadow-glow ring-1 ring-primary lg:-translate-y-3 lg:scale-[1.02]"
                      : "border-border shadow-sm hover:-translate-y-0.5 hover:shadow-md",
                  )}
                >
                  {plan.badge && (
                    <Badge
                      variant="accent"
                      className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-sm"
                    >
                      {plan.badge}
                    </Badge>
                  )}
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold tabular-nums">{price}</span>
                    <span className="text-sm text-muted-foreground">{period}</span>
                  </div>
                  {showAnnual && (
                    <p className="mt-1.5 text-xs font-medium text-success">
                      Économisez 2 mois sur l&apos;année
                    </p>
                  )}
                  <Button
                    className="mt-6 w-full"
                    size="lg"
                    variant={plan.highlight ? "accent" : "outline"}
                    asChild
                  >
                    <Link href="/inscription">{plan.cta}</Link>
                  </Button>
                  <ul className="mt-6 space-y-3 border-t border-border pt-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={120}>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Sans engagement, résiliable en 1 clic · données hébergées en France · garantie 7 jours.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
