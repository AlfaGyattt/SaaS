import Link from "next/link";
import { Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ApplicationCard } from "@/components/app/application-card";
import { requireUser } from "@/server/auth";
import { db } from "@/server/db";
import { STATUS_LABELS, type AppStatus } from "@/server/types";

const COLUMNS: AppStatus[] = ["BROUILLON", "ENVOYEE", "RELANCEE", "ENTRETIEN", "OFFRE"];

export default async function CandidaturesPage() {
  const user = await requireUser();
  const applications = await db.application.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });

  const byStatus = (status: AppStatus) =>
    applications
      .filter((a) => a.status === status)
      .map((a) => ({
        id: a.id,
        company: a.company,
        role: a.role,
        city: a.city,
        status: a.status,
        matchScore: a.matchScore,
        followUp: ["ENVOYEE", "RELANCEE"].includes(a.status),
        hasKit: Boolean(a.prepKit),
      }));

  if (applications.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Mes candidatures</h1>
        <div className="grid min-h-[50vh] place-items-center rounded-2xl border border-dashed border-border bg-bg-subtle">
          <div className="flex max-w-sm flex-col items-center gap-3 px-6 text-center">
            <div className="grid size-14 place-items-center rounded-2xl bg-primary-50 text-primary">
              <Send className="size-7" />
            </div>
            <p className="text-lg font-semibold">Aucune candidature pour l&apos;instant</p>
            <p className="text-sm text-muted-foreground">
              Adaptez votre CV à une offre : la candidature sera ajoutée ici automatiquement.
            </p>
            <Button className="mt-2" asChild>
              <Link href="/app/postuler">Postuler à une offre</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mes candidatures</h1>
          <p className="text-sm text-muted-foreground">
            {applications.length} candidature{applications.length > 1 ? "s" : ""} · suivez et
            relancez au bon moment.
          </p>
        </div>
        <Button asChild>
          <Link href="/app/postuler">Nouvelle candidature</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
        {COLUMNS.map((status) => {
          const items = byStatus(status);
          return (
            <div key={status} className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-sm font-semibold">{STATUS_LABELS[status]}</span>
                <Badge variant="muted">{items.length}</Badge>
              </div>
              <div className="flex flex-col gap-3">
                {items.map((a) => (
                  <ApplicationCard key={a.id} app={a} />
                ))}
                {items.length === 0 && (
                  <div className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                    —
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
