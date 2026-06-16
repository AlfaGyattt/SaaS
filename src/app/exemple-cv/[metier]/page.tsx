import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Briefcase,
  Wallet,
  GraduationCap,
  FileText,
  Mail,
} from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Container } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResumeCanvas } from "@/components/resume/resume-canvas";
import { METIERS, getMetier } from "@/lib/metiers";

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
  const title = `Exemple de CV ${m.label} (2026) — modèle gratuit | Postulo`;
  const url = `/exemple-cv/${m.slug}`;
  return {
    title,
    description: m.intro,
    keywords: [`CV ${m.label}`, `exemple CV ${m.label}`, `modèle CV ${m.label}`, ...m.competences.slice(0, 4)],
    alternates: { canonical: url },
    openGraph: { title, description: m.intro, url, type: "article" },
  };
}

function erreursCommunes(label: string): string[] {
  return [
    `Lister les missions sans montrer de résultats concrets — chiffrez vos réussites de ${label.toLowerCase()}.`,
    "Oublier le titre du poste et l'accroche en haut du CV.",
    "Utiliser une mise en page à deux colonnes mal lue par les logiciels ATS.",
    "Négliger l'orthographe : une seule faute peut suffire à être écarté.",
  ];
}

export default async function ExempleCvMetierPage({
  params,
}: {
  params: Promise<{ metier: string }>;
}) {
  const { metier } = await params;
  const m = getMetier(metier);
  if (!m) notFound();

  const data = {
    prenom: "Camille",
    nom: "Martin",
    titre: m.label,
    email: "camille.martin@email.fr",
    telephone: "06 12 34 56 78",
    ville: "Lyon",
    permis: true,
    accroche: m.accroche,
    experiences: [
      {
        id: "1",
        poste: m.label,
        entreprise: "Entreprise Exemple",
        debut: "2021",
        fin: "Aujourd'hui",
        ville: "Lyon",
        description: m.missions.slice(0, 3).join(". ") + ".",
      },
      {
        id: "2",
        poste: `${m.label} (junior)`,
        entreprise: "Société Modèle",
        debut: "2019",
        fin: "2021",
        ville: "Villeurbanne",
        description: m.missions.slice(3, 5).join(". ") + ".",
      },
    ],
    formations: [{ id: "1", diplome: m.formation, ecole: "Établissement", annee: "2020" }],
    competences: m.competences,
    langues: [{ id: "1", langue: "Anglais", niveau: "B1" }],
    interets: m.interets,
  };

  const faq = [
    {
      q: `Quelles compétences mettre sur un CV de ${m.label.toLowerCase()} ?`,
      a: `Mettez en avant un mélange de savoir-faire techniques et de savoir-être : ${m.competences
        .slice(0, 4)
        .join(", ")}. Adaptez-les ensuite aux mots-clés de l'offre que vous visez.`,
    },
    {
      q: `Quel est le salaire d'un ${m.label.toLowerCase()} ?`,
      a: `La rémunération se situe généralement autour de ${m.salaire}, selon l'expérience, la région et l'employeur.`,
    },
    {
      q: `Faut-il une lettre de motivation pour un poste de ${m.label.toLowerCase()} ?`,
      a: "Oui, dans la plupart des cas. Une lettre personnalisée, structurée avec la méthode Vous-Moi-Nous, augmente nettement vos chances d'obtenir un entretien.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "/" },
          { "@type": "ListItem", position: 2, name: "Modèles de CV", item: "/modele-cv" },
          { "@type": "ListItem", position: 3, name: `CV ${m.label}`, item: `/exemple-cv/${m.slug}` },
        ],
      },
    ],
  };

  const memeCategorie = METIERS.filter(
    (x) => x.categorie === m.categorie && x.slug !== m.slug,
  ).slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        {/* Hero + aperçu CV */}
        <section className="border-b border-border bg-bg-subtle">
          <Container className="py-12 sm:py-16">
            <div className="grid items-start gap-10 lg:grid-cols-2">
              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="default">{m.categorie}</Badge>
                  <Badge variant="muted">Exemple gratuit 2026</Badge>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                  {m.h1}
                </h1>
                <p className="text-lg text-muted-foreground text-balance">{m.intro}</p>
                <div className="flex flex-wrap gap-2.5 text-sm">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5">
                    <Wallet className="size-4 text-primary" /> {m.salaire}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5">
                    <GraduationCap className="size-4 text-primary" /> {m.formation}
                  </span>
                </div>
                <div className="mt-1 flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/inscription">
                      Créer mon CV {m.label.toLowerCase()} gratuitement{" "}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href={`/lettre-de-motivation/${m.slug}`}>Voir la lettre type</Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-4 shadow-lg sm:p-6">
                <ResumeCanvas data={data} templateId="moderne" />
              </div>
            </div>
          </Container>
        </section>

        {/* Contenu éditorial */}
        <section className="py-14 sm:py-20">
          <Container className="grid gap-12 lg:grid-cols-[1fr_300px]">
            <div className="flex flex-col gap-12">
              {/* Compétences */}
              <div>
                <h2 className="flex items-center gap-2.5 text-2xl font-semibold">
                  <CheckCircle2 className="size-6 text-primary" />
                  Compétences à mettre en avant
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Sur un CV de {m.label.toLowerCase()}, les recruteurs cherchent un équilibre entre
                  savoir-faire technique et qualités humaines. Voici les compétences les plus
                  valorisées.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {m.competences.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-sm"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missions */}
              <div>
                <h2 className="flex items-center gap-2.5 text-2xl font-semibold">
                  <Briefcase className="size-6 text-primary" />
                  Les missions du poste
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Reprenez ces missions pour décrire vos expériences, en les illustrant par des
                  résultats concrets.
                </p>
                <ul className="mt-5 flex flex-col gap-3">
                  {m.missions.map((mission) => (
                    <li key={mission} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
                      <span>{mission}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Erreurs à éviter */}
              <div>
                <h2 className="flex items-center gap-2.5 text-2xl font-semibold">
                  <XCircle className="size-6 text-danger" />
                  Erreurs à éviter
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {erreursCommunes(m.label).map((e) => (
                    <li key={e} className="flex gap-3">
                      <XCircle className="mt-0.5 size-5 shrink-0 text-danger" />
                      <span>{e}</span>
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
              <div className="rounded-2xl border border-border bg-bg-subtle p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Salaire indicatif
                </p>
                <p className="mt-1 text-xl font-semibold">{m.salaire}</p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Formation
                </p>
                <p className="mt-1 text-base">{m.formation}</p>
                <Button className="mt-6 w-full" asChild>
                  <Link href="/inscription">
                    <FileText className="size-4" /> Créer mon CV
                  </Link>
                </Button>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="flex items-center gap-2 font-semibold">
                  <Mail className="size-4 text-accent-600" /> Lettre de motivation
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Un exemple de lettre prêt à personnaliser pour ce métier.
                </p>
                <Button variant="outline" className="mt-4 w-full" asChild>
                  <Link href={`/lettre-de-motivation/${m.slug}`}>
                    Voir l&apos;exemple <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>

              {memeCategorie.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6">
                  <p className="font-semibold">Autres métiers : {m.categorie}</p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {memeCategorie.map((x) => (
                      <li key={x.slug}>
                        <Link
                          href={`/exemple-cv/${x.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          <ArrowRight className="size-3.5" /> CV {x.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </Container>
        </section>

        {/* CTA final */}
        <section className="border-t border-border bg-bg-subtle py-16">
          <Container>
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Créez votre CV {m.label.toLowerCase()} en quelques minutes
              </h2>
              <p className="text-lg text-muted-foreground text-balance">
                Partez de cet exemple, personnalisez-le et téléchargez un CV au format PDF, prêt à
                envoyer.
              </p>
              <Button size="lg" asChild>
                <Link href="/inscription">
                  Créer mon CV {m.label.toLowerCase()} gratuitement{" "}
                  <ArrowRight className="size-4" />
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
