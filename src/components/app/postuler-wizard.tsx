"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Loader2,
  MessageSquare,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { ScoreRing } from "@/components/ui/score-ring";
import { DossierTabs } from "@/components/app/dossier-tabs";
import { analyzeOfferAction, createTailoredApplication, type TailorResult } from "@/server/actions/tailor";
import type { OfferAnalysis } from "@/server/types";
import { cn } from "@/lib/utils";

const STEPS = ["Coller l'offre", "Compatibilité", "Dossier complet"];

export function PostulerWizard({ resumes }: { resumes: { id: string; title: string }[] }) {
  const [step, setStep] = React.useState(0);
  const [offer, setOffer] = React.useState("");
  const [resumeId, setResumeId] = React.useState(resumes[0]?.id ?? "");
  const [analysis, setAnalysis] = React.useState<OfferAnalysis | null>(null);
  const [result, setResult] = React.useState<TailorResult | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function analyze() {
    setLoading(true);
    try {
      const res = await analyzeOfferAction(offer, resumeId || undefined);
      setAnalysis(res);
      setStep(1);
    } catch {
      toast.error("L'analyse a échoué. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  async function generate() {
    if (!analysis) return;
    setLoading(true);
    try {
      const res = await createTailoredApplication({
        offerText: offer,
        resumeId: resumeId || undefined,
        analysis,
      });
      setResult(res);
      setStep(2);
      toast.success("Dossier de candidature généré et ajouté à votre suivi.");
    } catch {
      toast.error("La génération a échoué. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep(0);
    setOffer("");
    setAnalysis(null);
    setResult(null);
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

      {/* Étape 0 — coller l'offre */}
      {step === 0 && (
        <Card className="mt-6 p-6">
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
        </Card>
      )}

      {/* Étape 1 — compatibilité */}
      {step === 1 && analysis && (
        <Card className="mt-6 p-6">
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

            {analysis.keywords && analysis.keywords.length > 0 && (
              <div className="rounded-xl border border-border bg-bg-subtle p-4">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <Tag className="size-4 text-primary" /> Mots-clés à intégrer dans votre CV
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {analysis.keywords.map((k) => (
                    <span
                      key={k}
                      className="rounded-full border border-border bg-card px-2.5 py-1 text-xs"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-xl border border-primary/25 bg-primary-50/50 p-4 text-sm">
              <p className="flex items-center gap-2 font-medium text-primary">
                <Sparkles className="size-4" /> En 1 clic, vous obtenez :
              </p>
              <p className="mt-1 text-muted-foreground">
                une lettre de motivation adaptée, le mail de candidature, les conseils pour votre CV,
                et surtout <strong className="text-foreground">les questions d&apos;entretien
                attendues avec vos réponses</strong>.
              </p>
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep(0)}>
                <ArrowLeft className="size-4" /> Retour
              </Button>
              <Button onClick={generate} disabled={loading}>
                {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                Générer mon dossier complet
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Étape 2 — dossier complet */}
      {step === 2 && result && (
        <div className="mt-6 space-y-5">
          <div className="rounded-xl border border-success/30 bg-success/5 p-4">
            <p className="flex items-center gap-2 font-semibold text-success">
              <Check className="size-5" /> Votre dossier de candidature est prêt 🎉
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Lettre, mail, conseils CV et préparation à l&apos;entretien — tout est adapté à cette
              offre et ajouté à votre suivi.
            </p>
          </div>

          {/* CTA entretien — la plus-value */}
          <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-primary-50 to-surface p-5">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3.5">
                <div className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <MessageSquare className="size-5.5" />
                </div>
                <div>
                  <h3 className="font-semibold">Passez l&apos;entretien blanc</h3>
                  <p className="text-sm text-muted-foreground">
                    Entraînez-vous sur les questions attendues, avec un bilan noté à la fin.
                  </p>
                </div>
              </div>
              <Button variant="accent" asChild className="w-full sm:w-auto">
                <Link href={`/app/entretien?app=${result.applicationId}`}>
                  Démarrer la simulation <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Card>

          <DossierTabs
            data={{
              letterBody: result.letterBody,
              mailSubject: result.mailSubject,
              mailBody: result.mailBody,
              kit: result.kit,
              cvTips: result.cvTips,
              keywords: result.keywords,
            }}
          />

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <Button variant="outline" asChild>
              <Link href="/app/candidatures">Voir mon suivi</Link>
            </Button>
            <Button variant="accent" onClick={reset}>
              Postuler à une autre offre
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
