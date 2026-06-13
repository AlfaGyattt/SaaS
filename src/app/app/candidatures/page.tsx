import { Clock, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type App = { company: string; role: string; city: string; followUp?: number };

const BOARD: { stage: string; tone: string; items: App[] }[] = [
  {
    stage: "Brouillon",
    tone: "muted",
    items: [{ company: "Korian", role: "Aide-soignante", city: "Lyon" }],
  },
  {
    stage: "Envoyée",
    tone: "default",
    items: [
      { company: "Clinique Saint-Jean", role: "Aide-soignante", city: "Lyon", followUp: 7 },
      { company: "EHPAD Les Tilleuls", role: "AS — CDI", city: "Villeurbanne", followUp: 12 },
    ],
  },
  {
    stage: "Relancée",
    tone: "accent",
    items: [{ company: "Groupe Bastide", role: "AS de nuit", city: "Bron" }],
  },
  {
    stage: "Entretien",
    tone: "success",
    items: [{ company: "Hôpital privé", role: "Aide-soignante", city: "Lyon 3e" }],
  },
  { stage: "Offre", tone: "success", items: [] },
];

export default function CandidaturesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mes candidatures</h1>
          <p className="text-sm text-muted-foreground">
            Suivez chaque candidature et relancez au bon moment.
          </p>
        </div>
        <Button variant="outline">Relancer les candidatures sans réponse</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
        {BOARD.map((col) => (
          <div key={col.stage} className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-sm font-semibold">{col.stage}</span>
              <Badge variant="muted">{col.items.length}</Badge>
            </div>
            <div className="flex flex-col gap-3">
              {col.items.map((a) => (
                <Card key={a.company} className="p-4">
                  <p className="font-medium leading-tight">{a.role}</p>
                  <p className="text-sm text-muted-foreground">{a.company}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5" /> {a.city}
                    </span>
                    {a.followUp && (
                      <span className="inline-flex items-center gap-1 text-warning">
                        <Clock className="size-3.5" /> Relancer J+{a.followUp}
                      </span>
                    )}
                  </div>
                </Card>
              ))}
              {col.items.length === 0 && (
                <div className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                  Rien ici pour l&apos;instant
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
