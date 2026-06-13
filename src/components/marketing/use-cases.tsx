"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/layout";
import { USE_CASES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function UseCases() {
  const [active, setActive] = React.useState(USE_CASES[0].id);
  const current = USE_CASES.find((u) => u.id === active)!;

  return (
    <section id="cas-usage" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Pour qui ?"
          title="Un copilote pour chaque moment de carrière"
          description="Étudiant, premier emploi, cadre ou reconversion : le produit s'adapte à votre situation."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[260px_1fr]">
          <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {USE_CASES.map((u) => (
              <button
                key={u.id}
                onClick={() => setActive(u.id)}
                className={cn(
                  "flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors lg:shrink",
                  active === u.id
                    ? "border-primary bg-primary-50 text-primary-700"
                    : "border-border bg-surface text-muted-foreground hover:text-foreground",
                )}
              >
                <u.icon className="size-5 shrink-0" />
                {u.label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-9">
            <h3 className="text-2xl font-bold text-balance">{current.headline}</h3>
            <ul className="mt-6 space-y-3">
              {current.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success/12 text-success">
                    <Check className="size-3.5" />
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
