"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  FileText,
  Mail,
  Send,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { ScoreRing } from "@/components/ui/score-ring";
import { analyzeOfferAction, createTailoredApplication } from "@/server/actions/tailor";
import type { OfferAnalysis } from "@/server/types";
import { cn } from "@/lib/utils";

const STEPS = ["Coller l'offre", "Compatibilité", "Candidature prête"];

export function PostulerWizard({ resumes }: { resumes: { id: string; title: string }[] }) {
  const [step, setStep] = React.useState(0);
  const [offer, setOffer] = React.useState("");
  const [resumeId, setResumeId] = React.useState(resumes[0]?.id ?? "");
  const [analysis, setAnalysis] = React.useState<OfferAnalysis | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function analyze() {
    setLoading(true);
    const res = await analyzeOfferAction(offer, resumeId || undefined);
    setAnalysis(res);
    setStep(1);
    setLoading(false);
  }

  async function generate() {
    if (!analysis) return;
    setLoading(true);
    await createTailoredApplication({ offerText: offer, resumeId: resumeId || undefined, analysis });
    setStep(2);
    setLoading(false);
  }

  return (
    <>
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

      <Card className="mt-6 p-6">
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">
                URL de l&apos;offre ou texte de l&apos;annonce
              </label>
              <Textarea
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="Collez ici le texte de l'offre (France Travail, Indeed, Welcome to the Jungle…)."
                className="mt-2 min-h-36"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground">CV de base :</span>
              {resumes.length > 0 ? (
                <select
                  value={resumeId}
                  onChange={(e) => setResumeId(e.target.value)}
                  className="h-9 rounded-md border border-input bg-surface px-2.5 text-sm"
                >
                  {resumes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="text-muted-foreground">
                  aucun CV —{" "}
                  <Link href="/app/cv" className="text-primary hover:underline">
                    en créer un
                  </Link>{" "}
                  (facultatif)
                </span>
              )}
            </div>
            <div className="flex justify-end">
              <Button onClick={analyze} disabled={offer.trim().length < 15 || loading}>
                {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                Analyser l&apos;offre <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 1 && analysis && (
          <div className="space-y-5">
            <div className="flex items-center gap-5">
              <ScoreRing value={analysis.matchScore} size={104} stroke={9} label="Match" />
              <div>
                <p className="font-semibold">
                  {analysis.title}
                  {analysis.company ? ` — ${analysis.company}` : ""}
                </p>
                <p className="text-sm text-muted-foreground">
                  Vous matchez sur{" "}
                  {analysis.requirements.filter((r) => r.status === "ok").length} /{" "}
                  {analysis.requirements.length} critères.
                </p>
              </div>
            </div>
            <ul className="space-y-2">
              {analysis.requirements.map((r, i) => (
                <li
                  key={i}
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
                  <span className="text-xs text-muted-foreground">
                    {r.status === "ok" ? "Présent" : r.status === "warn" ? "À préciser" : "Manquant"}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep(0)}>
                <ArrowLeft className="size-4" /> Retour
              </Button>
              <Button onClick={generate} disabled={loading}>
                {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                Générer ma candidature
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="rounded-xl border border-success/30 bg-success/5 p-4 text-sm">
              <p className="font-semibold text-success">Votre candidature est prête 🎉</p>
              <p className="mt-1 text-muted-foreground">
                CV, lettre et mail adaptés à l&apos;offre, et ajoutés à votre suivi.
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
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <Button variant="outline" asChild>
                <Link href="/app/candidatures">Voir mon suivi</Link>
              </Button>
              <Button
                variant="accent"
                onClick={() => {
                  setStep(0);
                  setOffer("");
                  setAnalysis(null);
                }}
              >
                Postuler à une autre offre
              </Button>
            </div>
          </div>
        )}
      </Card>
    </>
  );
}
