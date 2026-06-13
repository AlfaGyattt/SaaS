import Link from "next/link";
import { Sparkles, ArrowRight, FileText, Clock, Send, Wand2, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScoreRing } from "@/components/ui/score-ring";
import { requireUser } from "@/server/auth";
import { db } from "@/server/db";
import { STATUS_LABELS, type AppStatus } from "@/server/types";
import { createResume } from "@/server/actions/resume";

const PIPELINE_ORDER: AppStatus[] = [
  "BROUILLON",
  "ENVOYEE",
  "RELANCEE",
  "ENTRETIEN",
  "OFFRE",
];

export default async function DashboardPage() {
  const user = await requireUser();
  const [resumes, applications] = await Promise.all([
    db.resume.findMany({ where: { userId: user.id }, orderBy: { updatedAt: "desc" } }),
    db.application.findMany({ where: { userId: user.id }, orderBy: { updatedAt: "desc" } }),
  ]);

  const firstName = (user.name ?? user.email).split(/[\s@]/)[0];
  const isNew = resumes.length === 0 && applications.length === 0;

  const counts = Object.fromEntries(PIPELINE_ORDER.map((s) => [s, 0])) as Record<
    AppStatus,
    number
  >;
  for (const a of applications) {
    if (a.status in counts) counts[a.status as AppStatus]++;
  }
  const total = applications.length;
  const followUps = applications.filter((a) => ["ENVOYEE", "RELANCEE"].includes(a.status));
  const avgScore =
    resumes.length > 0
      ? Math.round(
          resumes.reduce((s, r) => s + (r.atsScore ?? 0), 0) / resumes.length,
        )
      : 0;
  const lastResume = resumes[0];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bonjour {firstName} 👋</h1>
        <p className="text-sm text-muted-foreground">
          {isNew
            ? "Bienvenue ! Créez votre premier CV ou adaptez-le à une offre."
            : "Voici où en est votre recherche d'emploi."}
        </p>
      </div>

      {/* Action primaire unique (loi de Hick) */}
      <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-primary-50 to-surface">
        <div className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid size-12 place-items-center rounded-xl bg-accent text-accent-foreground shadow-sm">
              <Sparkles className="size-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Postuler à une offre</h2>
              <p className="text-sm text-muted-foreground">
                Collez une annonce : on adapte votre CV, votre lettre et votre mail.
              </p>
            </div>
          </div>
          <Button size="lg" variant="accent" asChild className="w-full sm:w-auto">
            <Link href="/app/postuler">
              Démarrer <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Card>

      {isNew ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="flex flex-col items-start gap-3 p-6">
            <div className="grid size-11 place-items-center rounded-xl bg-primary-50 text-primary">
              <Plus className="size-5" />
            </div>
            <h3 className="font-semibold">Créer mon premier CV</h3>
            <p className="text-sm text-muted-foreground">
              Partez d&apos;un modèle français et laissez l&apos;IA vous aider.
            </p>
            <form action={createResume}>
              <Button variant="outline" size="sm" type="submit">
                Commencer
              </Button>
            </form>
          </Card>
          <Card className="flex flex-col items-start gap-3 p-6">
            <div className="grid size-11 place-items-center rounded-xl bg-accent/12 text-accent-600">
              <Wand2 className="size-5" />
            </div>
            <h3 className="font-semibold">Adapter à une offre</h3>
            <p className="text-sm text-muted-foreground">
              Collez une offre : CV, lettre et mail générés pour vous.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/app/postuler">Coller une offre</Link>
            </Button>
          </Card>
        </div>
      ) : (
        <>
          <div className="grid gap-5 md:grid-cols-3">
            <Card className="flex flex-col p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <FileText className="size-4" /> Reprendre
              </div>
              {lastResume ? (
                <>
                  <p className="mt-3 line-clamp-1 font-semibold">{lastResume.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Score ATS {lastResume.atsScore ?? "—"}
                  </p>
                  <Button variant="outline" size="sm" className="mt-4" asChild>
                    <Link href={`/app/cv/${lastResume.id}`}>Continuer</Link>
                  </Button>
                </>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">Aucun CV pour l&apos;instant.</p>
              )}
            </Card>

            <Card className="flex flex-col p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Clock className="size-4" /> À relancer
                </div>
                <Badge variant="accent">{followUps.length}</Badge>
              </div>
              <ul className="mt-3 flex-1 space-y-2">
                {followUps.slice(0, 2).map((f) => (
                  <li key={f.id} className="text-sm">
                    <span className="font-medium">{f.company}</span>
                    <span className="block text-xs text-muted-foreground">{f.role}</span>
                  </li>
                ))}
                {followUps.length === 0 && (
                  <li className="text-sm text-muted-foreground">Rien à relancer. 👌</li>
                )}
              </ul>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="/app/candidatures">Voir le suivi</Link>
              </Button>
            </Card>

            <Card className="flex flex-col items-center justify-center gap-2 p-5 text-center">
              <span className="text-sm font-medium text-muted-foreground">Score ATS moyen</span>
              <ScoreRing value={avgScore} />
              <p className="text-xs text-muted-foreground">
                {avgScore >= 80
                  ? "Très bon — au-dessus de la moyenne."
                  : "Améliorez vos CV pour gagner des points."}
              </p>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Send className="size-4 text-muted-foreground" />
                <h2 className="font-semibold">Mes candidatures</h2>
                <span className="text-sm text-muted-foreground">· {total} au total</span>
              </div>
              <Link
                href="/app/candidatures"
                className="text-sm font-medium text-primary hover:underline"
              >
                Tout voir
              </Link>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {PIPELINE_ORDER.map((stage) => (
                <div key={stage} className="rounded-xl border border-border bg-bg-subtle p-4">
                  <p className="font-mono text-2xl font-semibold tabular-nums">{counts[stage]}</p>
                  <p className="text-xs text-muted-foreground">{STATUS_LABELS[stage]}</p>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
