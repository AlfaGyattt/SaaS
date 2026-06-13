# Postulo

> Le copilote de candidature français. Collez une offre → CV, lettre et mail adaptés, en français, en 10 minutes. Sans abonnement piège.

MVP web construit à partir du dossier de conception (voir [`docs/`](./docs)). Ce dépôt contient la base produit : landing page orientée conversion/SEO, espace application (dashboard, flux « Postuler à une offre », suivi de candidatures), design system Postulo et fondation de données.

## Stack

- **Next.js 16** (App Router, React 19) + **TypeScript**
- **Tailwind CSS v4** (tokens CSS-first) + composants maison façon shadcn/Radix
- **next-themes** (clair/sombre), **lucide-react** (icônes), **class-variance-authority**
- **Prisma / PostgreSQL** (schéma de fondation dans [`prisma/schema.prisma`](./prisma/schema.prisma) — pgvector pour le matching offre↔CV)
- Polices : Manrope (titres), Inter (corps), JetBrains Mono (chiffres)

## Démarrer

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Autres commandes : `pnpm build` (build de production), `pnpm start` (serveur de prod), `pnpm lint`.

## Structure

```
src/
  app/
    page.tsx              Landing page (Hero, démo, features, pricing, FAQ…)
    connexion / inscription   Authentification (magic link + Google)
    app/                  Espace connecté
      page.tsx            Dashboard (action primaire unique, widgets, pipeline)
      postuler/           Flux offre → CV+lettre+mail (assistant 3 étapes)
      candidatures/       Suivi kanban des candidatures
      cv/ modeles/ lettres/ entretien/ parametres/
  components/
    ui/                   Design system (button, card, badge, input, score-ring…)
    marketing/            Sections de la landing
    app/                  Sidebar, topbar, navigation mobile
    auth/  brand/
  lib/                    utils (cn), constantes (contenu, nav, pricing)
prisma/schema.prisma      Modèle de données (User, Resume, Application, Org…)
docs/                     Analyse de marché, blueprint et dossier de conception
```

## Design system (extrait)

- **Primaire** « Encre électrique » indigo `#3D5AFE` · **Accent** « Signal » corail `#FF6B4A` (réservé à la conversion et aux moments de succès).
- Tokens sémantiques en variables CSS (`--primary`, `--muted-foreground`…), thème sombre inclus, focus visible accessible (WCAG AA).
- Principes UX : action primaire unique (loi de Hick), cibles tactiles généreuses (Fitts), résultat avant inscription, < 2 clics pour les actions clés.

## État

MVP front fonctionnel et buildable (toutes les routes en statique). Prochaines étapes : câblage de l'authentification (Auth.js), des paiements (Stripe), de la base de données (Prisma + Postgres) et des appels IA (génération CV/lettres, scoring ATS). Voir le plan complet dans `docs/postulo-conception-produit-design-system.md`.
