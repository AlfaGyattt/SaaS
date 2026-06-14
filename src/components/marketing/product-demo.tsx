import { Wand2, ShieldCheck, MessageSquare, Check } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { ScoreRing } from "@/components/ui/score-ring";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const TABS = [
  { id: "adapter", label: "Adapter à une offre", icon: Wand2 },
  { id: "ats", label: "Score ATS & correction", icon: ShieldCheck },
  { id: "entretien", label: "Préparer l'entretien", icon: MessageSquare },
];

export function ProductDemo() {
  return (
    <section id="demo" className="bg-bg-subtle py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Démonstration"
            title="Voyez le produit en action"
            description="Trois moments qui changent tout dans une recherche d'emploi."
          />
        </Reveal>

        <Tabs defaultValue="adapter" className="mt-10 flex flex-col items-center">
          <Reveal delay={80}>
            <TabsList className="flex-wrap justify-center">
              {TABS.map((t) => (
                <TabsTrigger key={t.id} value={t.id}>
                  <t.icon className="size-4" aria-hidden /> {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Reveal>

          <Reveal delay={160} className="mt-8 w-full">
            <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
              <TabsContent value="adapter">
                <DemoAdapter />
              </TabsContent>
              <TabsContent value="ats">
                <DemoAts />
              </TabsContent>
              <TabsContent value="entretien">
                <DemoEntretien />
              </TabsContent>
            </div>
          </Reveal>
        </Tabs>
      </Container>
    </section>
  );
}

function DemoAdapter() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <p className="text-sm font-semibold">1. Collez l&apos;offre</p>
        <div className="mt-2 rounded-lg border border-border bg-bg-subtle p-3 text-xs text-muted-foreground">
          https://candidat.francetravail.fr/offres/...
        </div>
        <p className="mt-4 text-sm font-semibold">2. Exigences détectées</p>
        <ul className="mt-2 space-y-1.5 text-sm">
          {["Diplôme DEAS", "Travail de nuit", "Manutention patients"].map((r) => (
            <li key={r} className="flex items-center gap-2">
              <Check className="size-4 text-success" aria-hidden /> {r}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-border bg-bg-subtle p-4">
        <p className="text-sm font-semibold">3. CV + lettre + mail adaptés</p>
        <div className="mt-3 space-y-2">
          <div className="h-2.5 w-1/2 rounded bg-primary/25" />
          <div className="h-2 w-3/4 rounded bg-border" />
          <div className="h-2 w-2/3 rounded bg-border" />
          <div className="h-2 w-full rounded bg-border" />
          <div className="mt-3 inline-flex rounded-md bg-accent/12 px-2 py-1 text-[10px] font-medium text-accent-600">
            Réécrit pour cette offre
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoAts() {
  return (
    <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
      <ScoreRing value={86} size={120} stroke={10} />
      <div>
        <p className="text-sm font-semibold">Votre CV passe les filtres — presque parfait.</p>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <Check className="size-4 text-success" aria-hidden /> Structure lisible par les ATS
          </li>
          <li className="flex items-center gap-2">
            <Check className="size-4 text-success" aria-hidden /> Aucune faute détectée
            (correcteur FR)
          </li>
          <li className="flex items-center gap-2 text-muted-foreground">
            <span
              className="grid size-4 place-items-center rounded-full bg-warning/15 text-[10px] font-bold text-warning"
              aria-hidden
            >
              !
            </span>
            Ajoutez « gestes d&apos;urgence » pour +6 points
          </li>
        </ul>
      </div>
    </div>
  );
}

function DemoEntretien() {
  return (
    <div className="space-y-3">
      <div className="max-w-md rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5 text-sm">
        Présentez-vous en une minute.
      </div>
      <div className="ml-auto max-w-md rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
        Aide-soignante depuis 5 ans, j&apos;ai accompagné...
      </div>
      <div className="max-w-lg rounded-xl border border-border bg-bg-subtle p-3 text-sm">
        <p className="font-semibold text-success">Bon réflexe</p>
        <p className="mt-1 text-muted-foreground">
          Ajoutez un exemple chiffré (méthode STAR) pour gagner en impact.
        </p>
      </div>
    </div>
  );
}
