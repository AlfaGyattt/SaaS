# Postulo

> Le copilote de candidature français. Collez une offre → CV, lettre et mail adaptés, en français, en 10 minutes. Sans abonnement piège.

Application full-stack **fonctionnelle de bout en bout** : authentification, base de données, génération IA, CV éditable persistant, flux d'adaptation à l'offre et suivi de candidatures. Construite à partir du dossier de conception (voir [`docs/`](./docs)).

## Stack

- **Next.js 16** (App Router, React 19, Server Actions) + **TypeScript**
- **Tailwind CSS v4** + composants maison (design system Postulo)
- **Prisma 6** + **SQLite** en dev (portable vers PostgreSQL en prod)
- **Auth maison** : email/mot de passe (bcrypt) + session JWT signée (jose), cookie httpOnly
- **IA** : SDK Anthropic (Claude **Sonnet** pour la génération, **Haiku** pour l'extraction/scoring) avec **fallback démo déterministe** si aucune clé n'est fournie
- **zod** (validation), **next-themes** (clair/sombre), **lucide-react** (icônes)

## Démarrer

```bash
pnpm install                 # génère aussi le client Prisma (postinstall)
cp .env.example .env         # puis ajustez si besoin
pnpm prisma migrate dev      # crée la base SQLite (prisma/dev.db)
pnpm dev                     # http://localhost:3000
```

Créez un compte sur `/inscription`, puis créez un CV, adaptez-le à une offre et suivez vos candidatures.

### Variables d'environnement

| Variable | Rôle |
|---|---|
| `DATABASE_URL` | Connexion DB (dev : `file:./dev.db`) |
| `AUTH_SECRET` | Secret de signature des sessions (valeur forte en prod) |
| `ANTHROPIC_API_KEY` | **Optionnel.** Si absent, l'IA tourne en **mode démo** (résultats déterministes, l'app reste pleinement utilisable). Si présent, génération réelle via Claude. |

## Ce qui fonctionne (vertical complet)

- **Auth réelle** : inscription, connexion, déconnexion, sessions signées, protection de `/app/*`, anti-énumération.
- **CV** : création, **éditeur live** (aperçu A4 fidèle, autosave), assistance IA (accroche, amélioration de puces), **score ATS** recalculé en direct, **export PDF** (impression navigateur), suppression.
- **Postuler** : analyse d'offre + compatibilité (IA ou démo) → génération CV/lettre/mail → **candidature créée automatiquement** dans le suivi.
- **Suivi** : kanban des candidatures, **changement de statut** persistant, relances.
- **Dashboard** : compteurs réels, CV récent, relances, score ATS moyen, états vides soignés.

## Structure

```
src/
  app/
    page.tsx                 Landing (Hero, démo, features, pricing, FAQ + JSON-LD)
    connexion / inscription  Auth (Server Actions + useActionState)
    imprimer/cv/[id]         Vue d'impression A4 (export PDF)
    app/                     Espace connecté (protégé)
      page.tsx               Dashboard
      cv/ , cv/[id]          Liste + éditeur de CV
      postuler/              Flux offre → candidature
      candidatures/          Suivi kanban
      modeles/ lettres/ entretien/ parametres/
  components/  ui/ marketing/ app/ auth/ brand/ resume/
  server/
    db.ts                    Client Prisma (singleton)
    auth.ts                  Sessions, hashing, requireUser()
    types.ts                 Schémas zod (ResumeData…) partagés
    ai/index.ts              Couche IA (Claude + fallback démo)
    actions/                 Server Actions (auth, resume, application, tailor)
prisma/schema.prisma         Modèle de données
docs/                        Analyse de marché, blueprint, dossier de conception
```

## Production (PostgreSQL)

Basculer `datasource.provider` sur `postgresql` dans `prisma/schema.prisma`, pointer `DATABASE_URL` vers un Postgres (Neon/RDS), `pnpm prisma migrate deploy`. Les payloads structurés sont déjà stockés en `String` (JSON), donc portables. Pour le matching sémantique offre↔CV, activer `pgvector` (cf. dossier de conception §11).

## Scripts

`pnpm dev` · `pnpm build` · `pnpm start` · `pnpm lint` · `pnpm db:push` · `pnpm db:studio` · `pnpm db:reset`
