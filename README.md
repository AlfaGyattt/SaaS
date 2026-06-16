# Postulo

> Le copilote de candidature français. Collez une offre → CV, lettre et mail adaptés, en français, en 10 minutes. Sans abonnement piège.

Application full-stack **fonctionnelle de bout en bout** : authentification, base de données, génération IA, CV éditable persistant, flux d'adaptation à l'offre et suivi de candidatures. Construite à partir du dossier de conception (voir [`docs/`](./docs)).

## Stack

- **Next.js 16** (App Router, React 19, Server Actions) + **TypeScript**
- **Tailwind CSS v4** + composants maison (design system Postulo)
- **Prisma 6** — **SQLite** en local (zéro configuration) · **PostgreSQL** en production
- **Auth maison** : email/mot de passe (bcrypt) + session JWT signée (jose), cookie httpOnly
- **IA** : SDK Anthropic (Claude **Sonnet** pour la génération, **Haiku** pour l'extraction/scoring) avec **fallback démo déterministe** si aucune clé n'est fournie
- **zod** (validation), **next-themes** (clair/sombre), **lucide-react** (icônes)

## Démarrer (aucune configuration requise)

```bash
pnpm install   # génère le client Prisma
pnpm dev       # crée la base SQLite locale puis démarre http://localhost:3000
```

C'est tout : **aucune base à installer, aucune variable d'environnement à définir.**
En local, Postulo utilise une base **SQLite** (`prisma/dev.db`) créée automatiquement,
et l'IA tourne en **mode démo** déterministe. Créez un compte sur `/inscription`,
puis créez un CV, adaptez-le à une offre et préparez votre entretien.

> Pour activer la génération IA réelle en local, créez un fichier `.env.local`
> avec `ANTHROPIC_API_KEY="sk-ant-…"`.

### Variables d'environnement

| Variable | Rôle |
|---|---|
| `ANTHROPIC_API_KEY` | **Optionnel.** Si absent, l'IA tourne en **mode démo** (résultats déterministes, l'app reste pleinement utilisable). Si présent, génération réelle via Claude. |
| `DATABASE_URL` | **Production uniquement.** Connexion PostgreSQL (Neon, Vercel Postgres, Supabase…). Ignoré en local (SQLite). |
| `AUTH_SECRET` | **Production uniquement.** Secret de signature des sessions. En local, une valeur de dev est utilisée par défaut. |

## Ce qui fonctionne (vertical complet)

- **Auth réelle** : inscription, connexion, déconnexion, sessions signées, protection de `/app/*`, anti-énumération.
- **CV** : création, **éditeur live** (aperçu A4 fidèle, autosave), **8 modèles** sur 3 mises en page (une colonne ATS, bandeau latéral, en-tête coloré), assistance IA (accroche, amélioration de puces), **score ATS** en direct, **export PDF**.
- **Postuler — dossier complet en 1 clic** : analyse d'offre + compatibilité → **lettre adaptée + mail + conseils CV + kit d'entretien** (questions attendues, intention du recruteur, angle de réponse personnalisé). La candidature est créée automatiquement dans le suivi.
- **Entretien** : simulation par IA qui suit les **questions attendues de l'offre**, conseil après chaque réponse, et **bilan noté** (points forts + axes de progrès) à la fin.
- **Suivi** : kanban des candidatures, **changement de statut** persistant, accès au dossier complet de chaque candidature, relances.
- **Dashboard** : parcours de démarrage, compteurs réels, relances, préparation d'entretien, score ATS moyen.

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

## Déployer sur Vercel (PostgreSQL)

En production, Postulo bascule automatiquement sur **PostgreSQL** : `vercel.json`
utilise le schéma `prisma/schema.postgres.prisma` et crée les tables au build
(`prisma db push`). Le code applicatif est identique — seule la source de données change.

1. **Base de données** — créez un Postgres gratuit sur [Neon](https://neon.tech) (ou via l'onglet *Storage* de Vercel) et copiez la chaîne `postgresql://…`.
2. **Importer le repo** — sur [vercel.com/new](https://vercel.com/new), importez `AlfaGyattt/SaaS`.
3. **Variables d'environnement** (avant de déployer) :
   - `DATABASE_URL` = la chaîne Postgres de l'étape 1
   - `AUTH_SECRET` = une valeur aléatoire (`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
   - `ANTHROPIC_API_KEY` = (optionnel) votre clé Claude pour la génération IA réelle
4. **Deploy.** Le build crée les tables et publie l'app. Créez un compte sur `/inscription`.

> Les deux schémas (`prisma/schema.prisma` SQLite et `prisma/schema.postgres.prisma`
> PostgreSQL) sont identiques hormis la datasource : pensez à les garder synchronisés
> si vous modifiez un modèle.

> Sans `ANTHROPIC_API_KEY`, l'app fonctionne en mode démo (IA déterministe).
> Pour le matching sémantique offre↔CV en production, activer `pgvector` (cf. dossier de conception §11).

## Scripts

`pnpm dev` · `pnpm build` · `pnpm start` · `pnpm lint` · `pnpm db:push` · `pnpm db:studio` · `pnpm db:reset`
