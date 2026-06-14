import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { requireUser } from "@/server/auth";
import { createResume } from "@/server/actions/resume";
import { cn } from "@/lib/utils";

const TEMPLATES = [
  { id: "sobre", name: "Sobre", color: "#334155", desc: "Lisible, passe-partout, idéal candidatures classiques." },
  { id: "moderne", name: "Moderne", color: "#3d5afe", desc: "Touche de couleur, parfait pour la tech et le marketing." },
  { id: "elegant", name: "Élégant", color: "#059669", desc: "Raffiné, pour les profils expérimentés." },
  { id: "compact", name: "Compact", color: "#b45309", desc: "Dense, pour faire tenir un parcours riche sur une page." },
  { id: "creatif", name: "Créatif", color: "#ff6b4a", desc: "Pour les métiers créatifs et la communication." },
  { id: "classique", name: "Classique", color: "#3f3f46", desc: "Format traditionnel, secteur public et grands groupes." },
];

export default async function ModelesPage() {
  await requireUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Modèles</h1>
        <p className="text-sm text-muted-foreground">
          Tous nos modèles sont compatibles avec les robots recruteurs (ATS) et aux normes
          françaises. Choisissez-en un pour créer votre CV.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((t) => (
          <div key={t.id} className="group flex flex-col">
            <div
              className={cn(
                "relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-white p-4 shadow-sm transition-all group-hover:-translate-y-1 group-hover:shadow-lg",
              )}
            >
              <div className="h-2 w-1/2 rounded" style={{ backgroundColor: t.color }} />
              <div className="mt-2 h-1.5 w-1/3 rounded bg-slate-200" />
              <div className="mt-4 space-y-1.5">
                <div className="h-1.5 w-1/4 rounded" style={{ backgroundColor: t.color }} />
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-1.5 w-full rounded bg-slate-200" />
                ))}
              </div>
              <div className="mt-4 space-y-1.5">
                <div className="h-1.5 w-1/4 rounded" style={{ backgroundColor: t.color }} />
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-1.5 w-5/6 rounded bg-slate-200" />
                ))}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-medium">{t.name}</span>
              <Badge variant="muted">ATS</Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
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
