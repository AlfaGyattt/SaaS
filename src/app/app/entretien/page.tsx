import { requireUser } from "@/server/auth";
import { db } from "@/server/db";
import { InterviewChat } from "@/components/app/interview-chat";

export default async function EntretienPage() {
  const user = await requireUser();
  const last = await db.resume.findFirst({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Préparer l&apos;entretien</h1>
        <p className="text-sm text-muted-foreground">
          Entraînez-vous avec une simulation d&apos;entretien par IA, adaptée à
          votre métier.
        </p>
      </div>
      <InterviewChat defaultMetier={last?.title ?? ""} />
    </div>
  );
}
