import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, FileText, Lightbulb, PenLine } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Container } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { METIERS, getMetier, type Metier } from "@/lib/metiers";

export function generateStaticParams() {
  return METIERS.map((m) => ({ metier: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ metier: string }>;
}): Promise<Metadata> {
  const { metier } = await params;
  const m = getMetier(metier);
  if (!m) return {};
  return {
    title: `Lettre de motivation ${m.label} — exemple et modèle gratuit | Postulo`,
    description: `Exemple de lettre de motivation ${m.label.toLowerCase()} structurée (méthode Vous-Moi-Nous), prête à personnaliser. Conseils et modèle gratuit 2026.`,
  };
}

function exempleLettre(m: Metier): string[] {
  const metier = m.label.toLowerCase();
  return [
    "Madame, Monsieur,",
    `Votre établissement est reconnu pour la qualité de son accompagnement et l'exigence de ses équipes. C'est précisément cet engagement qui motive ma candidature au poste de ${metier} : je souhaite mettre mon savoir-faire au service d'une structure qui partage mes valeurs.`,
    `Au cours de mon parcours, j'ai développé des compétences directement utiles à ce poste : ${m.competences
      .slice(0, 3)
      .join(", ")
      .toLowerCase()}. ${m.accroche}`,
    `Rejoindre votre équipe, ce serait l'occasion de contribuer concrètement à vos objectifs tout en continuant à progresser. Je suis convaincu(e) que mon sérieux et mon implication seraient un véritable atout au quotidien.`,
    "Je me tiens à votre disposition pour un entretien afin de vous exposer mes motivations de vive voix. Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.",
  ];
}

export default async function LettreMetierPage({
  params,
}: {
  params: Promise<{ metier: string }>;
}) {
  const { metier } = await params;
  const m = getMetier(metier);
  if (!m) notFound();

  const lettre = exempleLettre(m);

  const faq = [
    {
      q: `Comment commencer une lettre de motivation pour un poste de ${m.label.toLowerCase()} ?`,
      a: "Commencez par parler de l'entreprise (le « Vous ») et non de vous. Montrez que vous avez compris ses besoins et son contexte avant d'enchaîner sur ce que vous pouvez lui apporter.",
    },
    {
      q: "Quelle longueur pour une lettre de motivation ?",
      a: "Une seule page, soit environ 250 à 350 mots. Trois à quatre paragraphes structurés suffisent : un recruteur doit pouvoir la lire en moins d'une minute.",
    },
    {
      q: "Faut-il personnaliser la lettre pour chaque offre ?",
      a: "Oui, absolument. Une lettre générique se repère immédiatement. Reprenez les mots-clés de l'offre et citez un élément précis sur l'entreprise pour montrer votre intérêt sincère.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border bg-bg-subtle">
          <Container className="py-12 sm:py-16">
            <div className="mx-auto flex max-w-3xl flex-col items-start gap-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default">{m.categorie}</Badge>
                <Badge variant="muted">Modèle gratuit 2026</Badge>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                Lettre de motivation {m.label}
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                Un exemple de lettre de motivation {m.label.toLowerCase()}, structuré selon la
                méthode <strong className="text-foreground">Vous-Moi-Nous</strong> et prêt à
                personnaliser pour décrocher un entretien.
              </p>
              <Button size="lg" asChild>
                <Link href="/inscription">
                  Générer ma lettre avec l&apos;IA <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-20">
          <Container className="grid gap-12 lg:grid-cols-[1fr_300px]">
            <div className="flex flex-col gap-12">
              {/* La méthode */}
              <div>
                <h2 className="flex items-center gap-2.5 text-2xl font-semibold">
                  <Lightbulb className="size-6 text-primary" /> La structure Vous-Moi-Nous
                </h2>
                <p className="mt-2 text-muted-foreground">
                  C&apos;est la structure attendue en France. Elle inverse l&apos;ordre intuitif
                  pour mettre l&apos;entreprise au centre :
                </p>
                <ul className="mt-5 flex flex-col gap-3">
                  <li className="flex gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-50 text-xs font-bold text-primary-700">
                      1
                    </span>
                    <span>
                      <strong>Vous</strong> — parlez de l&apos;entreprise et de ses besoins.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-50 text-xs font-bold text-primary-700">
                      2
                    </span>
                    <span>
                      <strong>Moi</strong> — montrez en quoi votre profil répond à ces besoins.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-50 text-xs font-bold text-primary-700">
                      3
                    </span>
                    <span>
                      <strong>Nous</strong> — projetez la collaboration et ce que vous accomplirez
                      ensemble.
                    </span>
                  </li>
                </ul>
              </div>

              {/* L'exemple */}
              <div>
                <h2 className="flex items-center gap-2.5 text-2xl font-semibold">
                  <PenLine className="size-6 text-primary" /> Exemple de lettre — {m.label}
                </h2>
                <article className="mt-5 rounded-2xl border border-border bg-card p-6 leading-relaxed shadow-sm sm:p-8">
                  <div className="mb-6 text-sm text-muted-foreground">
                    <p>Prénom Nom</p>
                    <p>Adresse · Téléphone · Email</p>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Objet : candidature au poste de {m.label.toLowerCase()}
                  </p>
                  <div className="flex flex-col gap-4 text-[15px]">
                    {lettre.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-muted-foreground">Prénom Nom</p>
                </article>
                <p className="mt-3 text-sm text-muted-foreground">
                  Personnalisez le nom de l&apos;entreprise et un détail concret sur le poste pour
                  rendre cette lettre unique.
                </p>
              </div>

              {/* Conseils */}
              <div>
                <h2 className="text-2xl font-semibold">Nos conseils</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {[
                    "Citez le nom de l'entreprise et un élément précis qui vous attire chez elle.",
                    "Reprenez les mots-clés de l'offre : ils prouvent que vous l'avez lue attentivement.",
                    "Terminez par une demande claire d'entretien et une formule de politesse soignée.",
                    "Relisez-vous : une faute d'orthographe dans une lettre est éliminatoire.",
                  ].map((c) => (
                    <li key={c} className="flex gap-3">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success/12 text-success">
                        ✓
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-semibold">Questions fréquentes</h2>
                <div className="mt-5 flex flex-col gap-4">
                  {faq.map((f) => (
                    <div key={f.q} className="rounded-xl border border-border bg-card p-5">
                      <p className="font-semibold">{f.q}</p>
                      <p className="mt-1.5 text-muted-foreground">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-primary/30 bg-primary-50/60 p-6">
                <p className="font-semibold">Générez votre lettre en 30 secondes</p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  L&apos;IA rédige une lettre {m.label.toLowerCase()} adaptée à l&apos;offre que
                  vous visez.
                </p>
                <Button className="mt-4 w-full" asChild>
                  <Link href="/inscription">
                    Essayer gratuitement <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="flex items-center gap-2 font-semibold">
                  <FileText className="size-4 text-primary" /> CV {m.label}
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Découvrez aussi l&apos;exemple de CV pour ce métier.
                </p>
                <Button variant="outline" className="mt-4 w-full" asChild>
                  <Link href={`/exemple-cv/${m.slug}`}>
                    Voir l&apos;exemple de CV <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </aside>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
