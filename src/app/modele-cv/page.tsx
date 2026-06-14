import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Sparkles, BookOpen } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Container, SectionHeading } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { METIERS } from "@/lib/metiers";

export const metadata: Metadata = {
  title: "Modèles de CV gratuits et exemples par métier (2026) | Postulo",
  description:
    "Des modèles de CV gratuits et des exemples concrets par métier : aide-soignante, vendeur, cariste, comptable et bien plus. Créez votre CV en quelques minutes avec Postulo.",
};

function groupByCategorie() {
  const map = new Map<string, typeof METIERS>();
  for (const m of METIERS) {
    const list = map.get(m.categorie) ?? [];
    list.push(m);
    map.set(m.categorie, list);
  }
  return [...map.entries()];
}

export default function ModeleCvPage() {
  const groupes = groupByCategorie();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-bg-subtle">
          <Container className="py-16 sm:py-24">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
              <Badge variant="accent">
                <Sparkles className="size-3.5" /> {METIERS.length} métiers couverts
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                Modèles de CV gratuits et exemples par métier
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                Inspirez-vous d&apos;exemples de CV réels, rédigés par métier, et créez le vôtre en
                quelques minutes. Mise en page lisible, optimisée pour les recruteurs et les filtres
                ATS.
              </p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/inscription">
                    Créer mon CV gratuitement <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/conseils">Lire nos conseils</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Grille des métiers par catégorie */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Exemples par métier"
              title="Trouvez votre métier"
              description="Chaque page propose un exemple de CV complet, les compétences à valoriser et les erreurs à éviter."
            />
            <div className="mt-12 flex flex-col gap-12">
              {groupes.map(([categorie, metiers]) => (
                <div key={categorie}>
                  <div className="mb-5 flex items-center gap-3">
                    <h2 className="text-xl font-semibold">{categorie}</h2>
                    <span className="h-px flex-1 bg-border" />
                    <Badge variant="muted">{metiers.length}</Badge>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {metiers.map((m) => (
                      <Link
                        key={m.slug}
                        href={`/exemple-cv/${m.slug}`}
                        className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-2.5 font-medium">
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                              <FileText className="size-4" />
                            </span>
                            {m.label}
                          </span>
                          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Lien vers les conseils */}
        <section className="border-y border-border bg-bg-subtle py-16">
          <Container>
            <Card className="overflow-hidden">
              <CardContent className="flex flex-col items-center gap-5 p-8 text-center sm:flex-row sm:p-10 sm:text-left">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent-500/12 text-accent-600">
                  <BookOpen className="size-7" />
                </span>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold">
                    Besoin de conseils pour votre candidature&nbsp;?
                  </h2>
                  <p className="mt-1.5 text-muted-foreground text-balance">
                    Découvrez nos guides pour rédiger un CV efficace, réussir votre lettre de
                    motivation et préparer vos entretiens.
                  </p>
                </div>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/conseils">
                    Voir les conseils <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </Container>
        </section>

        {/* CTA final */}
        <section className="py-20">
          <Container>
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Prêt à créer un CV qui décroche des entretiens&nbsp;?
              </h2>
              <p className="text-lg text-muted-foreground text-balance">
                Choisissez un modèle, partez d&apos;un exemple, personnalisez. Sans abonnement piège,
                données hébergées en France.
              </p>
              <Button size="lg" asChild>
                <Link href="/inscription">
                  Créer mon CV gratuitement <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
