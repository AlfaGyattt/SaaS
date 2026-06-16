import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Container } from "@/components/ui/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ARTICLES, getArticle } from "@/lib/articles";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const url = `/conseils/${a.slug}`;
  return {
    title: `${a.titre} | Postulo`,
    description: a.description,
    alternates: { canonical: url },
    openGraph: {
      title: a.titre,
      description: a.description,
      url,
      type: "article",
      publishedTime: a.date,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.titre,
    description: a.description,
    datePublished: a.date,
    author: { "@type": "Organization", name: "Postulo" },
  };

  const autres = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <article className="py-12 sm:py-16">
          <Container className="max-w-3xl">
            <Link
              href="/conseils"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> Tous les conseils
            </Link>

            <div className="mt-6 flex items-center gap-2">
              <Badge variant="default">{a.categorie}</Badge>
              <span className="text-sm text-muted-foreground">
                {new Date(a.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance">{a.titre}</h1>
            <p className="mt-4 text-lg text-muted-foreground text-balance">{a.chapeau}</p>

            <div className="mt-10 flex flex-col gap-10">
              {a.sections.map((s) => (
                <section key={s.h2}>
                  <h2 className="text-2xl font-semibold">{s.h2}</h2>
                  <div className="mt-3 flex flex-col gap-4 leading-relaxed text-muted-foreground">
                    {s.paragraphes.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-primary/30 bg-primary-50/60 p-7 text-center">
              <h2 className="text-xl font-bold">Passez de la théorie à la pratique</h2>
              <p className="mt-2 text-muted-foreground">
                Créez votre CV et générez vos lettres adaptées à chaque offre, gratuitement.
              </p>
              <Button className="mt-5" asChild>
                <Link href="/inscription">
                  Créer mon CV gratuitement <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Container>
        </article>

        {autres.length > 0 && (
          <section className="border-t border-border bg-bg-subtle py-14">
            <Container className="max-w-3xl">
              <h2 className="text-lg font-semibold">À lire aussi</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {autres.map((x) => (
                  <Link
                    key={x.slug}
                    href={`/conseils/${x.slug}`}
                    className="rounded-xl border border-border bg-card p-4 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {x.titre}
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
