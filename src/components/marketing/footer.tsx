import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/layout";

const COLUMNS = [
  {
    title: "Produit",
    links: [
      { label: "Fonctionnalités", href: "#fonctionnalites" },
      { label: "Tarifs", href: "#tarifs" },
      { label: "Modèles de CV", href: "/modele-cv" },
      { label: "Pour les écoles", href: "/ecoles" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Exemples de CV par métier", href: "/exemple-cv" },
      { label: "Lettres de motivation", href: "/lettre-de-motivation" },
      { label: "Analyseur de CV gratuit", href: "/outils/analyseur-cv-ats" },
      { label: "Conseils carrière", href: "/conseils" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Avis clients", href: "/avis" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "CGU", href: "/cgu" },
      { label: "Confidentialité (RGPD)", href: "/confidentialite" },
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-subtle">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-3">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">
              Le copilote de candidature français. Décrochez plus d&apos;entretiens, sans
              abonnement piège.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Postulo. Tous droits réservés.</p>
          <p className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-success" /> Données hébergées en France 🇫🇷
          </p>
        </div>
      </Container>
    </footer>
  );
}
