import { requireUser } from "@/server/auth";
import { db } from "@/server/db";
import { PostulerWizard } from "@/components/app/postuler-wizard";

export default async function PostulerPage() {
  const user = await requireUser();
  const resumes = await db.resume.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true },
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Postuler à une offre</h1>
        <p className="text-sm text-muted-foreground">
          On adapte votre CV, votre lettre et votre mail à l&apos;annonce.
        </p>
      </div>
      <PostulerWizard resumes={resumes} />
    </div>
  );
}
