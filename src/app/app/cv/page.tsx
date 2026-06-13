import Link from "next/link";
import { Plus, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/server/auth";
import { db } from "@/server/db";
import { createResume } from "@/server/actions/resume";

export default async function CvListPage() {
  const user = await requireUser();
  const resumes = await db.resume.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mes CV</h1>
          <p className="text-sm text-muted-foreground">
            {resumes.length} CV enregistré{resumes.length > 1 ? "s" : ""}
          </p>
        </div>
        <form action={createResume}>
          <Button type="submit">
            <Plus className="size-4" /> Créer un CV
          </Button>
        </form>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <form action={createResume} className="contents">
          <button
            type="submit"
            className="group grid min-h-44 place-items-center rounded-xl border-2 border-dashed border-border bg-bg-subtle transition-colors hover:border-primary/50 hover:bg-primary-50/40"
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary">
              <div className="grid size-11 place-items-center rounded-full bg-surface shadow-sm">
                <Plus className="size-5" />
              </div>
              <span className="text-sm font-medium">Créer un CV</span>
            </div>
          </button>
        </form>

        {resumes.map((cv) => (
          <Link key={cv.id} href={`/app/cv/${cv.id}`}>
            <Card className="flex h-full flex-col p-5 transition-shadow hover:shadow-md">
              <div className="grid size-10 place-items-center rounded-lg bg-primary-50 text-primary">
                <FileText className="size-5" />
              </div>
              <p className="mt-3 line-clamp-2 font-medium">{cv.title}</p>
              <p className="text-xs text-muted-foreground">
                Modifié le {cv.updatedAt.toLocaleDateString("fr-FR")}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Badge variant={(cv.atsScore ?? 0) >= 80 ? "success" : "muted"}>
                  ATS {cv.atsScore ?? "—"}
                </Badge>
                {cv.tag && <Badge variant="accent">{cv.tag}</Badge>}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
