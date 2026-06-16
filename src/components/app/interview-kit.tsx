"use client";

import * as React from "react";
import {
  Target,
  Lightbulb,
  MessageCircleQuestion,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { InterviewKit, InterviewCategory } from "@/server/types";

const CATEGORY_STYLE: Record<InterviewCategory, string> = {
  Présentation: "bg-primary-50 text-primary-700",
  Motivation: "bg-accent-500/12 text-accent-600",
  Compétences: "bg-success/12 text-success",
  Comportementale: "bg-primary-100 text-primary-800",
  Pièges: "bg-warning/15 text-warning",
  "Vos questions": "bg-muted text-muted-foreground",
};

function QuestionCard({
  question,
  category,
  intent,
  suggestion,
  index,
  defaultOpen,
}: {
  question: string;
  category: InterviewCategory;
  intent: string;
  suggestion: string;
  index: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen ?? index === 0);
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-bg-subtle"
        aria-expanded={open}
      >
        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {index + 1}
        </span>
        <span className="flex-1">
          <span className="flex items-center gap-2">
            <Badge
              className={cn("border-transparent", CATEGORY_STYLE[category])}
            >
              {category}
            </Badge>
          </span>
          <span className="mt-1.5 block font-medium leading-snug">{question}</span>
        </span>
        <ChevronDown
          className={cn(
            "mt-1 size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div className="space-y-3 border-t border-border px-4 py-3.5 pl-13">
          <div className="flex gap-2.5">
            <Target className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Ce que le recruteur évalue : </span>
              {intent}
            </p>
          </div>
          <div className="flex gap-2.5 rounded-lg border border-accent/30 bg-accent-500/[0.06] p-3">
            <Lightbulb className="mt-0.5 size-4 shrink-0 text-accent-600" />
            <p className="text-sm leading-relaxed">
              <span className="font-semibold text-accent-600">Votre angle de réponse : </span>
              {suggestion}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function InterviewKitView({
  kit,
  className,
}: {
  kit: InterviewKit;
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-start gap-2.5 rounded-xl border border-primary/25 bg-primary-50/50 p-4">
        <MessageCircleQuestion className="mt-0.5 size-5 shrink-0 text-primary" />
        <div>
          <p className="text-sm font-semibold">
            {kit.questions.length} questions que ce recruteur va probablement vous poser
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Pour chacune : ce qu&apos;il cherche à évaluer, et un angle de réponse adapté à votre
            profil. Préparez-les, puis entraînez-vous en simulation.
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        {kit.questions.map((q, i) => (
          <QuestionCard key={i} index={i} {...q} />
        ))}
      </div>

      {kit.conseils.length > 0 && (
        <div className="rounded-xl border border-border bg-bg-subtle p-4">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="size-4 text-accent-600" /> Conseils pour réussir cet entretien
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {kit.conseils.map((c, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
