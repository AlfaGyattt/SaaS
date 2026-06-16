import { requireUser } from "@/server/auth";
import { db } from "@/server/db";
import { parseInterviewKit } from "@/server/types";
import { InterviewChat } from "@/components/app/interview-chat";

export default async function EntretienPage({
  searchParams,
}: {
  searchParams: Promise<{ app?: string }>;
}) {
  const user = await requireUser();
  const { app } = await searchParams;

  // Si une candidature est précisée, on charge son kit pour suivre les
  // questions attendues et pré-remplir le métier.
  let plan: string[] | undefined;
  let contextLabel: string | undefined;
  let metier: string | undefined;
  if (app) {
    const application = await db.application.findFirst({
      where: { id: app, userId: user.id },
    });
    if (application) {
      const kit = parseInterviewKit(application.prepKit);
      plan = kit?.questions.map((q) => q.question);
      metier = application.role;
      contextLabel = `${application.role}${application.company ? ` — ${application.company}` : ""}`;
    }
  }

  if (!metier) {
    const last = await db.resume.findFirst({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
    });
    metier = last?.title ?? "";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Préparer l&apos;entretien</h1>
        <p className="text-sm text-muted-foreground">
          {plan && plan.length
            ? "Entraînez-vous sur les questions attendues pour cette offre, puis recevez votre bilan."
            : "Entraînez-vous avec une simulation d'entretien par IA, adaptée à votre métier."}
        </p>
      </div>
      <InterviewChat defaultMetier={metier} plan={plan} contextLabel={contextLabel} />
    </div>
  );
}
