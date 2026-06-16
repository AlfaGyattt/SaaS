import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageSquare, ArrowRight, Building2, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScoreRing } from "@/components/ui/score-ring";
import { DossierTabs } from "@/components/app/dossier-tabs";
import { requireUser } from "@/server/auth";
import { db } from "@/server/db";
import {
  parseInterviewKit,
  parseStringArray,
  STATUS_LABELS,
  type AppStatus,
} from "@/server/types";

export default async function CandidatureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;
  const application = await db.application.findFirst({
    where: { id, userId: user.id },
  });
  if (!application) notFound();

  const kit = parseInterviewKit(application.prepKit);
  const cvTips = parseStringArray(application.cvTips);
  const keywords = parseStringArray(application.keywords);
  const statusLabel = STATUS_LABELS[application.status as AppStatus] ?? application.status;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/app/candidatures"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Mes candidatures
      </Link>

      <Card className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {application.matchScore != null && (
              <ScoreRing value={application.matchScore} size={84} stroke={8} label="Match" />
            )}
            <div>
              <h1 className="text-xl font-bold leading-tight">{application.role}</h1>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Building2 className="size-4" /> {application.company}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant="muted">{statusLabel}</Badge>
                {application.city && <Badge variant="outline">{application.city}</Badge>}
              </div>
            </div>
          </div>
          {kit && (
            <Button variant="accent" asChild className="w-full sm:w-auto">
              <Link href={`/app/entretien?app=${application.id}`}>
                <MessageSquare className="size-4" /> Simuler l&apos;entretien
              </Link>
            </Button>
          )}
        </div>
      </Card>

      {!application.letterBody && !kit ? (
        <Card className="flex flex-col items-center gap-3 p-8 text-center">
          <div className="grid size-12 place-items-center rounded-xl bg-primary-50 text-primary">
            <Briefcase className="size-6" />
          </div>
          <p className="font-semibold">Cette candidature a été créée manuellement</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Générez le dossier complet (lettre, mail et préparation d&apos;entretien) en repartant de
            l&apos;offre.
          </p>
          <Button asChild className="mt-1">
            <Link href="/app/postuler">
              Générer le dossier <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Card>
      ) : (
        <DossierTabs
          data={{
            letterBody: application.letterBody,
            mailSubject: application.mailSubject,
            mailBody: application.mailBody,
            kit,
            cvTips,
            keywords,
          }}
        />
      )}
    </div>
  );
}
