import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  FileText,
  Clock,
  Send,
  Bell,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScoreRing } from "@/components/ui/score-ring";
import { PIPELINE, FOLLOW_UPS } from "@/lib/constants";

export default function DashboardPage() {
  const total = PIPELINE.reduce((s, p) => s + p.count, 0);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bonjour Karim 👋</h1>
        <p className="text-sm text-muted-foreground">
          Voici où en est votre recherche d&apos;emploi.
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

      <div className="grid gap-5 md:grid-cols-3">
        {/* Reprendre */}
        <Card className="flex flex-col p-5">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <FileText className="size-4" /> Reprendre
          </div>
          <p className="mt-3 font-semibold">CV — Aide-soignante</p>
          <p className="text-xs text-muted-foreground">Modifié il y a 2 h</p>
          <Button variant="outline" size="sm" className="mt-4" asChild>
            <Link href="/app/cv">Continuer</Link>
          </Button>
        </Card>

        {/* À relancer (rétention) */}
        <Card className="flex flex-col p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Clock className="size-4" /> À relancer
            </div>
            <Badge variant="accent">{FOLLOW_UPS.length}</Badge>
          </div>
          <ul className="mt-3 space-y-2">
            {FOLLOW_UPS.slice(0, 2).map((f) => (
              <li key={f.company} className="text-sm">
                <span className="font-medium">{f.company}</span>
                <span className="block text-xs text-muted-foreground">
                  Sans réponse depuis {f.days} j
                </span>
              </li>
            ))}
          </ul>
          <Button variant="outline" size="sm" className="mt-4" asChild>
            <Link href="/app/candidatures">Relancer</Link>
          </Button>
        </Card>

        {/* Score ATS moyen */}
        <Card className="flex flex-col items-center justify-center gap-2 p-5 text-center">
          <span className="text-sm font-medium text-muted-foreground">Score ATS moyen</span>
          <ScoreRing value={86} />
          <p className="text-xs text-muted-foreground">Très bon — au-dessus de la moyenne.</p>
        </Card>
      </div>

      {/* Pipeline */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Send className="size-4 text-muted-foreground" />
            <h2 className="font-semibold">Mes candidatures</h2>
            <span className="text-sm text-muted-foreground">· {total} au total</span>
          </div>
          <Link href="/app/candidatures" className="text-sm font-medium text-primary hover:underline">
            Tout voir
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {PIPELINE.map((p) => (
            <div key={p.stage} className="rounded-xl border border-border bg-bg-subtle p-4">
              <p className="font-mono text-2xl font-semibold tabular-nums">{p.count}</p>
              <p className="text-xs text-muted-foreground">{p.stage}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-bg-subtle p-4 text-sm text-muted-foreground">
        <Bell className="size-4 shrink-0" />
        Activez les rappels pour ne jamais oublier une relance.
      </div>
    </div>
  );
}
