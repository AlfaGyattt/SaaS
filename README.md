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
cp .env.example .env         # renseignez DATABASE_URL (Postgres) et AUTH_SECRET
pnpm prisma db push          # crée les tables dans votre base Postgres
pnpm dev                     # http://localhost:3000
```

> Besoin d'un Postgres gratuit en local ? Créez une base sur [Neon](https://neon.tech) et collez sa chaîne de connexion dans `DATABASE_URL`.

Créez un compte sur `/inscription`, puis créez un CV, adaptez-le à une offre et suivez vos candidatures.

### Variables d'environnement

| Variable | Rôle |
|---|---|
| `DATABASE_URL` | Connexion PostgreSQL (Neon, Vercel Postgres, Supabase…) |
| `AUTH_SECRET` | Secret de signature des sessions (valeur aléatoire forte) |
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

## Déployer sur Vercel

Le projet est prêt pour Vercel. `vercel.json` lance `prisma db push` au build pour créer les tables automatiquement.

1. **Base de données** — créez un Postgres gratuit sur [Neon](https://neon.tech) (ou via l'onglet *Storage* de Vercel) et copiez la chaîne de connexion `postgresql://…`.
2. **Importer le repo** — sur [vercel.com/new](https://vercel.com/new), importez `AlfaGyattt/SaaS`.
3. **Variables d'environnement** (avant de déployer) :
   - `DATABASE_URL` = la chaîne Postgres de l'étape 1
   - `AUTH_SECRET` = une valeur aléatoire (`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
   - `ANTHROPIC_API_KEY` = (optionnel) votre clé Claude pour la génération IA réelle
4. **Deploy.** Le build crée les tables et publie l'app. Créez un compte sur `/inscription`.

> Sans `ANTHROPIC_API_KEY`, l'app fonctionne en mode démo (IA déterministe).
> Pour le matching sémantique offre↔CV en production, activer `pgvector` (cf. dossier de conception §11).

## Scripts

`pnpm dev` · `pnpm build` · `pnpm start` · `pnpm lint` · `pnpm db:push` · `pnpm db:studio` · `pnpm db:reset`
