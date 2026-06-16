import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResumeCanvas } from "@/components/resume/resume-canvas";
import { requireUser } from "@/server/auth";
import { createResume } from "@/server/actions/resume";
import { CV_TEMPLATES, SAMPLE_RESUME } from "@/lib/cv-templates";

export default async function ModelesPage() {
  await requireUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Modèles de CV</h1>
        <p className="text-sm text-muted-foreground">
          Huit modèles, trois mises en page différentes. Les modèles{" "}
          <Badge variant="muted">ATS</Badge> sont optimisés pour les robots recruteurs ; les modèles{" "}
          <Badge variant="muted">Design</Badge> misent sur l&apos;impact visuel. Choisissez, tout
          reste modifiable.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CV_TEMPLATES.map((t) => (
          <div key={t.id} className="group flex flex-col">
            <div className="relative aspect-[210/297] overflow-hidden rounded-xl border border-border shadow-sm transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
              {/* Aperçu réel du modèle (non interactif) */}
              <div className="pointer-events-none absolute inset-0">
                <ResumeCanvas data={SAMPLE_RESUME} templateId={t.id} className="shadow-none" />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-medium">{t.name}</span>
              <Badge variant={t.ats ? "success" : "muted"}>{t.ats ? "ATS" : "Design"}</Badge>
            </div>
            <p className="mt-1 flex-1 text-xs text-muted-foreground">{t.desc}</p>
            <form action={createResume} className="mt-3">
              <input type="hidden" name="templateId" value={t.id} />
              <input type="hidden" name="title" value={`CV ${t.name}`} />
              <Button type="submit" variant="outline" size="sm" className="w-full">
                <Check className="size-4" /> Utiliser ce modèle
              </Button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
