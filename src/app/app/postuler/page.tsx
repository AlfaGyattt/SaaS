"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, Sparkles, FileText, Mail, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { ScoreRing } from "@/components/ui/score-ring";
import { cn } from "@/lib/utils";

const STEPS = ["Coller l'offre", "Compatibilité", "Candidature prête"];

const REQUIREMENTS = [
  { label: "Diplôme DEAS", status: "ok" as const },
  { label: "Manutention patients", status: "ok" as const },
  { label: "Expérience en gériatrie", status: "ok" as const },
  { label: "Travail de nuit / week-end", status: "warn" as const },
  { label: "Logiciel Osiris", status: "missing" as const },
];

export default function PostulerPage() {
  const [step, setStep] = React.useState(0);
  const [offer, setOffer] = React.useState("");

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Postuler à une offre</h1>
        <p className="text-sm text-muted-foreground">
          On adapte votre CV, votre lettre et votre mail à l&apos;annonce.
        </p>
      </div>

      {/* Stepper */}
      <ol className="flex items-center gap-2">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold transition-colors",
                i < step && "bg-success text-success-foreground",
                i === step && "bg-primary text-primary-foreground",
                i > step && "bg-muted text-muted-foreground",
              )}
            >
              {i < step ? <Check className="size-4" /> : i + 1}
            </span>
            <span
              className={cn(
                "hidden text-xs font-medium sm:block",
                i === step ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && <span className="h-px flex-1 bg-border" />}
          </li>
        ))}
      </ol>

      <Card className="p-6">
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">URL de l&apos;offre ou texte de l&apos;annonce</label>
              <Textarea
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="Collez ici l'URL France Travail / Indeed / Welcome to the Jungle, ou le texte complet de l'offre…"
                className="mt-2 min-h-32"
              />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">CV de base :</span>
              <span className="rounded-md border border-border bg-bg-subtle px-2.5 py-1 font-medium">
                Aide-soignante
              </span>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setStep(1)} disabled={offer.trim().length < 10}>
                Analyser l&apos;offre <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div className="flex items-center gap-5">
              <ScoreRing value={78} size={104} stroke={9} label="Match" />
              <div>
                <p className="font-semibold">Vous matchez sur 4 critères / 5</p>
                <p className="text-sm text-muted-foreground">
                  On va mettre en avant vos points forts et combler les écarts.
                </p>
              </div>
            </div>
            <ul className="space-y-2">
              {REQUIREMENTS.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-sm"
                >
                  <span className="flex items-center gap-2.5">
                    {r.status === "ok" && <Check className="size-4 text-success" />}
                    {r.status === "warn" && (
                      <span className="grid size-4 place-items-center rounded-full bg-warning/15 text-[10px] font-bold text-warning">
                        !
                      </span>
                    )}
                    {r.status === "missing" && (
                      <span className="grid size-4 place-items-center rounded-full bg-danger/15 text-[10px] font-bold text-danger">
                        ✕
                      </span>
                    )}
                    {r.label}
                  </span>
                  {r.status === "ok" ? (
                    <span className="text-xs text-success">Présent</span>
                  ) : (
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      <Sparkles className="size-3.5" /> Ajouter
                    </Button>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep(0)}>
                <ArrowLeft className="size-4" /> Retour
              </Button>
              <Button onClick={() => setStep(2)}>
                Générer ma candidature <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="rounded-xl border border-success/30 bg-success/5 p-4 text-sm">
              <p className="font-semibold text-success">Votre candidature est prête 🎉</p>
              <p className="mt-1 text-muted-foreground">
                CV, lettre et mail adaptés à l&apos;offre, en français vérifié.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: FileText, label: "CV adapté" },
                { icon: Mail, label: "Lettre de motivation" },
                { icon: Send, label: "Mail de candidature" },
              ].map((d) => (
                <div
                  key={d.label}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border bg-bg-subtle p-4 text-center"
                >
                  <d.icon className="size-5 text-primary" />
                  <span className="text-sm font-medium">{d.label}</span>
                  <button className="text-xs text-primary hover:underline">Aperçu</button>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button variant="outline" asChild>
                <Link href="/app/candidatures">
                  <Check className="size-4" /> Ajouté au suivi
                </Link>
              </Button>
              <Button variant="accent">Tout exporter (PDF + Word)</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
