import Link from "next/link";
import { Plus, FileText, MoreVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CVS = [
  { title: "Aide-soignante", updated: "il y a 2 h", score: 86 },
  { title: "Aide-soignante — Clinique Saint-Jean", updated: "hier", score: 91, tag: "Adapté" },
  { title: "AS de nuit", updated: "il y a 3 jours", score: 74 },
];

export default function CvListPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mes CV</h1>
          <p className="text-sm text-muted-foreground">{CVS.length} CV enregistrés</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/app/cv/nouveau"
          className="group grid min-h-44 place-items-center rounded-xl border-2 border-dashed border-border bg-bg-subtle transition-colors hover:border-primary/50 hover:bg-primary-50/40"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary">
            <div className="grid size-11 place-items-center rounded-full bg-surface shadow-sm">
              <Plus className="size-5" />
            </div>
            <span className="text-sm font-medium">Créer un CV</span>
          </div>
        </Link>

        {CVS.map((cv) => (
          <Card key={cv.title} className="flex flex-col p-5 transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="grid size-10 place-items-center rounded-lg bg-primary-50 text-primary">
                <FileText className="size-5" />
              </div>
              <button className="text-muted-foreground hover:text-foreground" aria-label="Options">
                <MoreVertical className="size-4" />
              </button>
            </div>
            <p className="mt-3 line-clamp-2 font-medium">{cv.title}</p>
            <p className="text-xs text-muted-foreground">Modifié {cv.updated}</p>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant={cv.score >= 80 ? "success" : "muted"}>ATS {cv.score}</Badge>
              {cv.tag && <Badge variant="accent">{cv.tag}</Badge>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
