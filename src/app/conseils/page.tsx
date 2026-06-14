import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Container } from "@/components/ui/layout";
import { Badge } from "@/components/ui/badge";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Conseils carrière, CV et entretien | Postulo",
  description:
    "Guides pratiques pour réussir votre CV, votre lettre de motivation et vos entretiens. Des conseils concrets et à jour pour décrocher plus d'entretiens.",
};

export default function ConseilsPage() {
  const articles = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border bg-bg-subtle">
          <Container className="py-12 sm:py-16">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
              <Badge variant="default">Conseils carrière</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                Décrochez plus d&apos;entretiens
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                Nos guides pratiques pour réussir votre CV, votre lettre de motivation et vos
                entretiens — sans bla-bla, droit au but.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-20">
          <Container>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/conseils/${a.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="muted">{a.categorie}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(a.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold leading-snug group-hover:text-primary">
                    {a.titre}
                  </h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                    {a.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Lire l&apos;article <ArrowRight className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
