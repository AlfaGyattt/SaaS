import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TEMPLATES = [
  { name: "Sobre", color: "bg-slate-500", selected: true },
  { name: "Moderne", color: "bg-primary" },
  { name: "Élégant", color: "bg-emerald-600" },
  { name: "Compact", color: "bg-amber-600" },
  { name: "Créatif", color: "bg-accent" },
  { name: "Classique", color: "bg-zinc-700" },
];

export default function ModelesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Modèles</h1>
        <p className="text-sm text-muted-foreground">
          Tous nos modèles sont compatibles avec les robots recruteurs (ATS) et aux normes
          françaises.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((t) => (
          <div key={t.name} className="group cursor-pointer">
            <div
              className={cn(
                "relative aspect-[3/4] overflow-hidden rounded-xl border bg-surface p-4 shadow-sm transition-all group-hover:-translate-y-1 group-hover:shadow-lg",
                t.selected ? "border-primary ring-2 ring-primary" : "border-border",
              )}
            >
              {t.selected && (
                <span className="absolute right-3 top-3 grid size-6 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3.5" />
                </span>
              )}
              <div className={cn("h-2 w-1/2 rounded", t.color)} />
              <div className="mt-2 h-1.5 w-1/3 rounded bg-border" />
              <div className="mt-4 space-y-1.5">
                <div className="h-1.5 w-1/4 rounded bg-foreground/20" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-1.5 w-full rounded bg-border" />
                ))}
              </div>
              <div className="mt-4 space-y-1.5">
                <div className="h-1.5 w-1/4 rounded bg-foreground/20" />
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-1.5 w-5/6 rounded bg-border" />
                ))}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-medium">{t.name}</span>
              {t.selected && <Badge variant="default">Sélectionné</Badge>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
