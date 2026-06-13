# POSTULO — Dossier de conception produit & design system (livrable agence premium)

*Copilote de candidature français. Document de référence unique : Produit · Architecture · UX · UI/Design System · Landing · Dashboard · Onboarding · Specs fonctionnelles · Mobile · Frontend · Backend · DB · API · IA · Roadmap.*
*Version 1.0 — 13 juin 2026. Niveau : production-ready, aucune simplification.*

> **Les 6 lentilles, dans l'ordre.** Chaque décision de ce dossier a été passée au filtre : **CEO** (ça crée de la valeur business ?) → **PM** (ça résout un Job To Be Done prioritaire ?) → **UX** (charge cognitive minimale, < 3 s pour comprendre, < 2 clics pour agir ?) → **UI** (premium, cohérent avec le design system ?) → **Dev** (réalisable, maintenable, scalable ?) → **Utilisateur final** (stressé, mobile, pressé : est-ce que ça le rassure et le fait avancer ?).

---

## SOMMAIRE
1. Conception produit (marché, personas, JTBD, concurrents, scope MoSCoW)
2. Architecture (sitemap, rôles/permissions, logique métier, machines à états)
3. UX (lois appliquées, parcours critiques, wireframes)
4. UI / Design System (tokens, typo, composants, motion)
5. Landing page (copy + structure section par section)
6. Dashboard
7. Onboarding (time-to-value < 60 s)
8. Specs fonctionnelles détaillées (objectif/UI/états/erreurs/mobile/edge)
9. Mobile first & PWA
10. Frontend (archi, dossiers, state, routing)
11. Backend (API, DB Prisma, auth, sécurité, scalabilité)
12. Architecture IA (routing modèles, prompts, garde-fous, coûts)
13. Automatisations
14. Roadmap d'améliorations futures
15. Récapitulatif des livrables

---

## 1. CONCEPTION PRODUIT

### 1.1 Le marché
- **TAM** : ~30 M d'actifs en France ; ~5-6 M de personnes en recherche active d'emploi chaque année (demandeurs d'emploi + étudiants/alternants entrants + actifs en veille). Chaque recherche = plusieurs candidatures = plusieurs CV/lettres.
- **SAM** (adressable par un outil web payant FR) : ~8-10 M de candidatures « outillables »/an, segment 18-45 ans à l'aise avec le numérique.
- **SOM réaliste 36 mois** : 250-400 k visiteurs organiques/mois, ~3-5 % de conversion payante, ~40 % de revenu B2B → trajectoire 1 M€ ARR (cf. blueprint).
- **Dynamique** : marché evergreen + 2 pics (rentrée sept-oct, janvier) + pic alternance (mars-juin). Vent porteur : généralisation des ATS en PME, anxiété Parcoursup/alternance, défiance envers les abonnements pièges des incumbents.

### 1.2 Cible & personas
**P1 — Léa, 20 ans, étudiante en BTS, cherche une alternance.** Mobile-only (TikTok/Insta). N'a « pas d'expérience », angoisse de la page blanche. JTBD : *« Aide-moi à avoir l'air employable et à trouver une entreprise avant septembre. »* Sensible au prix, déteste l'engagement. **Cœur de cible volume + SEO.**

**P2 — Karim, 28 ans, jeune diplômé / 1er emploi.** Postule en masse (30-50 offres), se perd dans le suivi, recopie sa lettre. JTBD : *« Postule plus vite et mieux, sans tout refaire à chaque offre. »* Convertit bien sur le **tailoring** et le **suivi**.

**P3 — Sandrine, 42 ans, cadre en poste, veille discrète.** Exigeante sur le rendu, confidentialité critique, cohérence LinkedIn/APEC. JTBD : *« Donne-moi un dossier impeccable et discret, et prépare mes entretiens. »* Cœur de cible **Carrière (premium)**.

**P4 — Thomas, 35 ans, en reconversion / demandeur d'emploi.** Stressé, valorise mal son parcours, suivi France Travail. JTBD : *« Traduis mon passé en atouts pour un nouveau métier et rassure-moi. »* Sensible au **Pass** et au ton bienveillant.

**P5 (B2B) — Mme Roussel, responsable insertion pro d'un CFA/école.** Doit prouver le placement de ses cohortes. JTBD : *« Outille mes 300 apprenants et donne-moi des stats de placement. »* **Payeur B2B, ancre la rétention et le moat data.**

### 1.3 Jobs To Be Done (priorisés)
1. « Produire un dossier de candidature crédible **sans partir d'une page blanche**. » (activation)
2. « **Adapter** ma candidature à CETTE offre en 1 clic. » (valeur différenciante)
3. « Ne pas être **éliminé** pour une faute ou un PDF illisible par l'ATS. » (réassurance)
4. « **Suivre** où j'en suis dans mes 40 candidatures. » (rétention)
5. « Me **préparer** à l'entretien que j'ai décroché. » (premium)
6. (B2B) « **Piloter et prouver** le placement de mes cohortes. » (revenu récurrent)

### 1.4 Frustrations à éliminer (issues de l'audit concurrentiel)
Page blanche · saisie interminable avant tout résultat · paywall surprise à l'export · abonnement qui se reconduit en douce · CV « joli » mais recalé par l'ATS · lettre générique qui sonne faux · fautes d'orthographe · copier-coller entre 5 outils · rendu cassé sur mobile · ton froid et anxiogène.

### 1.5 Concurrents (matrice de positionnement)
| | IA-native | Conventions FR | Flux offre→candidature | Pricing honnête | Rendu ATS | Entretien |
|---|---|---|---|---|---|---|
| **Postulo** | ✅✅ | ✅✅ | ✅✅ | ✅✅ (Pass) | ✅✅ | ✅ |
| Zety / MonCVparfait | ⚪ partiel | ⚪ | ❌ | ❌ (abo piège) | ✅ | ❌ |
| Canva | ❌ | ⚪ | ❌ | ⚪ | ❌ | ❌ |
| CVDesignR | ❌ | ✅ | ❌ | ✅ | ✅ | ❌ |
| Rezi (US) | ✅ | ❌ | ⚪ | ⚪ | ✅✅ | ❌ |
| ChatGPT | ✅✅ | ⚪ | ❌ (manuel) | gratuit | ❌ (pas de doc) | ⚪ |

**Espace blanc identifié** : *IA-native × conventions FR × flux complet × pricing honnête × rendu ATS fiable* — personne ne coche les 5. C'est notre quadrant.

### 1.6 Amélioration de l'idée — scope MoSCoW
**Must (MVP)** : CV builder anti-page-blanche, lettre IA FR, score ATS + correction FR, templates FR ATS-safe, exports PDF/DOCX, mail de candidature, Pass + freemium, RGPD/UE.
**Should (V2)** : analyse d'offre, tailoring 1 clic, matching/gap, suivi candidatures, coaching IA, simulation entretien.
**Could (V3)** : espace B2B écoles, profil partageable, flux d'offres + matching inversé, score d'employabilité data-driven, relecture humaine 24 h, API B2B.
**Won't (volontairement exclu)** : marketplace emploi bilatérale (autre métier, risque liquidité) · pages-ville CV (pas d'intention de recherche) · réseau social · CV vidéo gadget · crédits IA (friction) · lifetime deal (tue la LTV).

---

## 2. ARCHITECTURE

### 2.1 Sitemap complet
```
PUBLIC (SSR/ISR — moteur SEO)
├─ /                              Landing
├─ /modele-cv                     Hub + /modele-cv/{style}            (~20)
├─ /exemple-cv/{metier}           pSEO ROME                           (~600)
├─ /lettre-de-motivation/{metier} pSEO                                (~600)
├─ /cv/{situation}                étudiant|alternance|stage|reconversion (~25)
├─ /entretien/{metier}            V2                                  (~300)
├─ /salaire/{metier}              V2 (données sourcées)               (~300)
├─ /outils/analyseur-cv-ats       Outil gratuit (aimant à liens)
├─ /outils/{outil}                compteur lettre, test accroche…
├─ /conseils/{slug}               éditorial E-E-A-T
├─ /tarifs  /ecoles  /a-propos  /avis  /blog
├─ /(legal) cgu, cgv, confidentialite, mentions, cookies
└─ auth: /connexion /inscription /mot-de-passe-oublie /reset

APP (CSR authentifié — /app)
├─ /app                           Dashboard
├─ /app/cv                        Liste CV  →  /app/cv/{id}/editer
├─ /app/lettres                   Liste  →  /app/lettres/{id}
├─ /app/candidatures              Suivi (kanban)  →  /{id}
├─ /app/postuler                  Flux offre→candidature (tailoring)
├─ /app/entretien                 Simulations  →  /{sessionId}
├─ /app/modeles                   Galerie templates
├─ /app/parametres                profil, compte, facturation, RGPD, notifs
└─ /app/aide                      centre d'aide + chat

B2B (/org)
├─ /org/{slug}                    Dashboard cohortes & placement
├─ /org/{slug}/membres            invitations, licences
├─ /org/{slug}/analytics         stats d'usage & placement
├─ /org/{slug}/facturation
└─ /org/{slug}/parametres         marque blanche partielle

ADMIN (/admin)
└─ users, contenus pSEO, modération relecture, feature flags, observabilité
```

### 2.2 Rôles & permissions (RBAC)
| Capacité | Visiteur | Free | Pro | Carrière | B2B Member | B2B Admin | Coach | Super-Admin |
|---|---|---|---|---|---|---|---|---|
| Pages SEO / outils gratuits | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Créer 1 CV / export filigrané | — | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ |
| CV/lettres illimités, exports propres | — | — | ✅ | ✅ | ✅* | ✅* | — | ✅ |
| Tailoring offre→candidature | — | aperçu | ✅ | ✅ | ✅* | ✅* | — | ✅ |
| Suivi candidatures | — | 5 | ∞ | ∞ | ∞ | ∞ | — | ✅ |
| Simulation entretien voix | — | — | — | ✅ | selon licence | — | — | ✅ |
| Gérer membres / licences | — | — | — | — | — | ✅ | — | ✅ |
| Voir analytics cohorte | — | — | — | — | — | ✅ | — | ✅ |
| Relire/annoter un CV (service) | — | — | — | — | — | — | ✅ | ✅ |
| Gérer contenu pSEO / flags | — | — | — | — | — | — | — | ✅ |

\* selon le plan de la licence souscrite par l'organisation. Permissions évaluées côté serveur (policy centralisée), jamais côté client uniquement.

### 2.3 Entités métier (modèle conceptuel)
`User` ⟶ possède `Resume*`, `Letter*`, `Application*`, `InterviewSession*`, `Subscription/Pass`.
`Resume` ⟶ `ResumeVersion*` (historique + variantes par offre), agrège `AtsScan*`.
`Application` (candidature) ⟶ relie `Resume`+`Letter`+`JobOffer`, possède `ApplicationEvent*` (timeline), un statut kanban.
`Organization` ⟶ `Membership*` (rattache des `User`), `License`, `PlacementStat*`.
Référentiel : `RomeOccupation` (≈600) alimente pSEO + suggestions IA. `CoachReview` rattaché à un `ResumeVersion`.

### 2.4 Machines à états (les 3 critiques)
**Candidature** : `brouillon → prête → envoyée → relancée → entretien → offre → (acceptée | refusée) | sans_réponse`. Transitions manuelles ou semi-auto (relance programmée). Chaque transition crée un `ApplicationEvent` (source du futur score d'employabilité).
**Document (export)** : `idle → en_file → rendu → prêt(URL signée) | échec(retry x3)`. Asynchrone (queue), jamais bloquant pour l'UI.
**Génération IA** : `idle → streaming → terminé | modéré(garde-fou) | erreur(fallback provider)`. Toujours interruptible, toujours un état d'erreur gracieux.

### 2.5 Parcours utilisateurs clés (résumé, détaillés en §3/§7/§8)
A. **Acquisition SEO → activation** : page `/exemple-cv/infirmier` → CTA « Utiliser ce modèle » → onboarding express → 1er CV exporté < 60 s.
B. **Tailoring** : Dashboard → « Postuler à une offre » → coller URL/texte → CV+lettre+mail adaptés + score → export → candidature créée dans le suivi.
C. **Rétention** : email/push « 3 candidatures sans réponse → relancer ? » → relance en 1 clic → entretien décroché → simulation → marquage « offre ».
D. **B2B** : invitation école → l'étudiant rejoint l'org (licence) → responsable voit l'usage & le placement.

---

## 3. UX DESIGN

### 3.1 Lois UX, appliquées concrètement
- **Hick (réduire les choix)** : le dashboard n'expose qu'**une** action primaire (« Postuler à une offre ») ; tout le reste est secondaire. La galerie de templates par défaut filtrée à 6, pas 60. Onboarding = 1 décision par écran.
- **Fitts (cibles grandes et proches)** : CTA primaire 48px min de hauteur, pleine largeur sur mobile, ancré en bas (pouce) ; actions destructrices éloignées et plus petites. FAB « Postuler » fixe sur mobile.
- **Von Restorff (l'élément qui compte ressort)** : une seule couleur d'accent (corail) réservée à l'action de conversion et aux moments de succès — jamais décorative. Le plan recommandé (Pro) est visuellement isolé dans le pricing.
- **Progressive Disclosure** : l'éditeur de CV montre d'abord le résultat ; les options avancées (espacement, rubriques optionnelles, ATS détaillé) sont repliées. La simulation d'entretien commence par 1 question, pas 15.
- **Charge cognitive minimale** : jamais de page blanche (toujours pré-rempli/suggéré), un objectif par écran, langage humain (« Décroche plus d'entretiens », pas « Optimisez votre taux de matching ATS »), feedback immédiat (autosave, score live).
- **Règle des 3 s / 2 clics** : chaque écran a un titre-bénéfice clair en haut ; les actions clés (créer, adapter, exporter, relancer) sont à ≤ 2 clics du dashboard.

### 3.2 Wireframe — Éditeur de CV (desktop, split-view « édition ↔ aperçu live »)
```
┌──────────────────────────────────────────────────────────────────────┐
│ ◀ Mes CV    CV — Aide-soignante      ● Enregistré    [Score ATS 86 ▴] │  ← header contextuel
├───────────────────────────────┬──────────────────────────────────────┤
│  SECTIONS (réordonnables ⠿)   │                                      │
│  ⠿ Titre & coordonnées      ▸ │        ┌───────────────────┐         │
│  ⠿ Accroche            [IA✨] │        │  APERÇU LIVE A4    │         │
│  ⠿ Expériences (2)          ▾ │        │  (rendu réel,      │         │
│     • Aide-soignante, CHU…    │        │   pagination,      │         │
│       [✨ Quantifier]  [↑][↓] │        │   zoom, ◀ 1/1 ▶)   │         │
│  ⠿ Formation                ▸ │        │                    │         │
│  ⠿ Compétences        [IA✨] │        └───────────────────┘         │
│  ⠿ Langues (CECRL)          ▸ │   [ Modèle ]  [ Couleurs ]  [ Photo ]│
│  + Ajouter une rubrique       │   [⬇ PDF] [⬇ Word]  [✨ Adapter à une offre]│  ← action différenciante en accent
└───────────────────────────────┴──────────────────────────────────────┘
```
Décisions UX : aperçu = vérité (WYSIWYG fidèle au PDF) ; chaque bloc a son **assist IA local** (« Quantifier », « Reformuler », « Raccourcir ») = micro-valeur sans quitter le contexte ; autosave + statut visible ; le score ATS est un *disclosure* (clic → panneau de recommandations).

### 3.3 Wireframe — Flux « Postuler à une offre » (le cœur du produit)
```
Étape 1/3  ──●────○────○                              [ Fermer ✕ ]
┌──────────────────────────────────────────────────────────┐
│  Adaptez votre candidature à une offre                    │
│  ┌──────────────────────────────────────────────────┐    │
│  │  Collez l'URL de l'offre  (France Travail, Indeed,│    │
│  │  Welcome to the Jungle…)  ou le texte de l'annonce│    │
│  └──────────────────────────────────────────────────┘    │
│  Votre CV de base :  [ Aide-soignante  ▾ ]                │
│                                   [ Analyser l'offre → ]  │
└──────────────────────────────────────────────────────────┘
Étape 2/3  ──●────●────○
  Exigences détectées        Votre profil      Compatibilité 78%
  • Diplôme DEAS ............ ✅ présent        ████████░░
  • Manutention patients .... ✅ présent        « Vous matchez sur 7/9 »
  • Nuit / week-end ......... ⚠ à préciser      [✨ Ajouter]
  • Logiciel Osiris ......... ❌ manquant       [En savoir +]
Étape 3/3  ──●────●────●
  ┌── CV adapté ──┐ ┌── Lettre ──┐ ┌── Mail ──┐
  │  (diff mis en │ │ Vous-Moi-  │ │ objet +  │   [⬇ Tout exporter]
  │  surbrillance)│ │ Nous       │ │ corps    │   [✓ Créer la candidature]
  └───────────────┘ └────────────┘ └──────────┘
```
Décisions UX : transparence du score (on montre le *pourquoi*, pas un chiffre magique) ; on ne ment jamais sur un « manquant » (confiance) ; sortie = 3 artefacts cohérents + entrée automatique dans le suivi (boucle de rétention).

---

## 4. UI / DESIGN SYSTEM

> Objectif : un rendu qui soutient la comparaison avec Linear/Stripe/Vercel — **sobriété, densité maîtrisée, typographie soignée, motion discrète**. Le « premium » vient de la cohérence et du détail, pas de la décoration.

### 4.1 Fondations de marque
- **Logo** : mot-symbole « Postulo » en Satoshi Bold + un signe « ✦/▸ » (la flèche = « décrocher / avancer »). Favicon = le signe seul.
- **Voix** : tutoiement chaleureux côté B2C grand public (« Décroche ton prochain job »), vouvoiement côté B2B/cadres. Concis, concret, zéro jargon IA.

### 4.2 Couleurs (design tokens — light & dark)
**Primaire « Encre électrique » (indigo)**
`50 #EEF1FF · 100 #E0E6FF · 200 #C7D1FF · 300 #A4B3FF · 400 #7B8DFF · 500 #5B6CFF · 600 #3D5AFE (action) · 700 #2E45D9 · 800 #2637AD · 900 #233288`
**Accent « Signal » (corail — Von Restorff, conversion & succès, usage rare)**
`400 #FF8A6B · 500 #FF6B4A · 600 #F5512B`
**Neutres « Ardoise »**
`0 #FFFFFF · 50 #F8FAFC · 100 #F1F5F9 · 200 #E2E8F0 · 300 #CBD5E1 · 400 #94A3B8 · 500 #64748B · 600 #475569 · 700 #334155 · 800 #1E293B · 900 #0F172A · 950 #080F1F`
**Sémantiques** : success `#16A34A`/bg `#F0FDF4` · warning `#D97706`/bg `#FFFBEB` · danger `#DC2626`/bg `#FEF2F2` · info `#2563EB`/bg `#EFF6FF`.

Tokens sémantiques (mappés, jamais utiliser les valeurs brutes dans les composants) :
```
--bg            #FFFFFF / dark #0B1220
--bg-subtle     #F8FAFC / dark #0F172A
--surface       #FFFFFF / dark #111A2E
--border        #E2E8F0 / dark #1E293B
--text          #0F172A / dark #E5EAF3
--text-muted    #64748B / dark #94A3B8
--primary       #3D5AFE  (hover #2E45D9, active #2637AD)
--primary-fg    #FFFFFF
--accent        #FF6B4A
--ring          #3D5AFE @ 45%
```
Contraste : tous les textes ≥ WCAG AA (≥ 4.5:1 corps, ≥ 3:1 grands titres) ; vérifié pour les deux thèmes.

### 4.3 Typographie
- **Display/Titres** : *Satoshi* (geométrique, premium). **Corps/UI** : *Inter*. **Chiffres/score** : *JetBrains Mono* (tabular).
- Échelle (desktop, ratio 1.25) :
```
display-2xl 60/64 -2%   h3 24/32        body 16/24
display-xl  48/52 -2%   h4 20/28        body-sm 14/20
h1 36/40 -1%            body-lg 18/28   caption 12/16 +1%
h2 30/36 -1%                            overline 12/16 +6% UPPER
```
Mobile : réduction d'un cran (display-xl→36, h1→28). Mesure de ligne corps : 60-75 caractères.

### 4.4 Espacement, rayons, ombres, grille
- **Espacement** (base 4) : `2 4 8 12 16 24 32 48 64 96`. Rythme vertical par multiples de 8.
- **Rayons** : `sm 6 · md 10 · lg 14 · xl 20 · 2xl 28 · full`. Cartes = lg/xl, boutons = md, champs = md, modales = 2xl.
- **Ombres** (douces, multi-couches) : `xs 0 1 2 /4% · sm 0 2 4 /6% · md 0 4 12 /8% · lg 0 12 24 /10% · xl 0 24 48 /12%`. Élévation = ombre + légère désaturation du fond, jamais de bordure dure sur les cartes flottantes.
- **Grille** : 12 colonnes, gouttière 24, conteneur max 1200 (marketing) / 1440 (app). Breakpoints : `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`.

### 4.5 Catalogue de composants (base shadcn/ui étendue)
Primitives : Button (variants `primary | secondary | ghost | outline | destructive | accent`, tailles `sm md lg`, états loading/disabled/icon), Input/Textarea/Select/Combobox, Checkbox/Radio/Switch, Slider, Tabs, Accordion, Tooltip, Popover, Dropdown, Dialog/Sheet (mobile), Toast (Sonner), Badge/Tag, Avatar, Progress, Skeleton, Breadcrumb, Pagination, Command palette (⌘K), Table (tri/filtre/sélection), EmptyState, Banner.
Composants **métier** custom : `ScoreRing` (anneau ATS animé), `ResumeCanvasA4` (rendu fidèle PDF), `SectionBlock` (drag-reorder + assist IA), `DiffHighlight` (avant/après tailoring), `KanbanBoard` (suivi candidatures), `RequirementMatchRow`, `AiStreamingText` (génération token-par-token avec curseur), `TemplateCard`, `PricingCard`, `CoachReviewThread`, `OrgSeatTable`.
Règles : tout composant a ses états `default / hover / focus-visible / active / disabled / loading / error / empty` ; focus visible obligatoire (anneau 2px) ; aucune information portée par la seule couleur (icône + texte).

### 4.6 Motion & micro-interactions
- **Durées** : `instant 100 · fast 150 · base 200 · slow 300 · slower 500`. **Easing** : standard `cubic-bezier(.2,0,0,1)`, entrée `cubic-bezier(0,0,0,1)`, sortie `cubic-bezier(.4,0,1,1)`. Spring (Framer Motion) pour les éléments « vivants ».
- **Signatures** : génération IA en *streaming* (texte qui s'écrit + curseur) → la valeur se voit ; `ScoreRing` qui se remplit avec compteur ; toast de succès corail discret au 1er export (moment « aha ») ; transitions de page douces (fade/slide 200ms) ; skeletons jamais > 1s (sinon message rassurant). 
- **Sobriété** : pas de parallax gratuit, pas d'animation > 500ms sur une action fréquente. `prefers-reduced-motion` respecté (désactive translations, garde les fondus).

### 4.7 Iconographie, illustrations, états vides
Icônes : *Lucide* (trait 1.5px, cohérent). Illustrations : style ligne + aplats corail/indigo, humaines et optimistes (jamais corporate-cliché). Chaque **état vide** est un mini-onboarding : titre-bénéfice + 1 CTA + visuel (« Aucune candidature encore — créez-en une en 1 clic depuis une offre »).

---

## 5. LANDING PAGE (`/`)

Objectif CRO : 1 promesse, 1 action, preuve sociale tôt, friction zéro. CTA répété 5× (toujours la même formulation).

**1. Hero**
```
        Décrochez plus d'entretiens.
   Collez une offre → CV + lettre + mail adaptés
        en français, en 10 minutes. Sans abonnement piège.

      [ Créer mon CV gratuitement → ]   [ Voir une démo ▷ ]
      ✦ 4,7/5 sur Trustpilot · +50 000 candidatures envoyées · RGPD, hébergé en France
   ┌───────────────────────────────────────────────┐
   │  démo produit animée (le flux offre→CV en 8s)  │
   └───────────────────────────────────────────────┘
```
Copy : bénéfice (entretiens) > fonctionnalité (CV). Sous-titre = le différenciateur en une phrase. CTA primaire = action gratuite (pas « s'inscrire »).

**2. Bandeau confiance** : logos écoles/CFA partenaires + « Compatible avec les ATS utilisés en France ».

**3. Problème → Promesse** : 3 douleurs (page blanche · recalé par les robots · abonnement piège) ↔ 3 réponses.

**4. Démonstration produit** (le « show, don't tell ») : 3 onglets animés — *Adapter à une offre* · *Score ATS & correction* · *Préparer l'entretien*. Chaque onglet = GIF/vidéo courte + 1 phrase.

**5. Fonctionnalités** (grille 2×3, icône+titre+1 ligne) : CV IA · Lettre Vous-Moi-Nous · Tailoring 1 clic · Score ATS · Correcteur français · Suivi de candidatures.

**6. Cas d'usage** (3 personas en onglets) : Étudiant/alternance · Premier emploi · Cadre & reconversion — copy et capture adaptées.

**7. Preuve / témoignages** : 3 verbatims avec métier + résultat (« entretien décroché en 2 semaines »), note Trustpilot, compteur live.

**8. Comparatif honnête** : tableau Postulo vs « les sites à abonnement » (focus : sans engagement, prix clair, hébergé en France). Positionnement éthique = argument.

**9. Pricing** (cf. §… ) : 3 cartes, Pro mise en avant (Von Restorff), mention « Sans engagement, résiliable en 1 clic » en gros.

**10. FAQ** (accordéon, 8 Q) : « C'est vraiment sans engagement ? » · « Mes données sont-elles en sécurité ? » · « Différence avec ChatGPT ? » · « Compatible ATS ? » · « Puis-je annuler ? » · « Et la lettre de motivation ? » · « Sur mobile ? » · « Pour les écoles ? ».

**11. CTA final** plein écran + **Footer** (produit, ressources SEO, légal, langue, statut, réseaux, Trustpilot).

SEO/perf : SSR, LCP < 2,0s, JS différé, balisage `FAQPage`/`Product`/`BreadcrumbList`, OG/Twitter cards, hreflang prêt.

---

## 6. DASHBOARD (`/app`)

```
┌────────────┬───────────────────────────────────────────────────────┐
│  POSTULO ✦ │  Bonjour Karim 👋        🔍 ⌘K Rechercher…   🔔  ◐  KA │
│            │───────────────────────────────────────────────────────│
│ ▸ Accueil  │   ┌─────────────────────────────────────────────────┐ │
│ ▸ Mes CV   │   │  ✨  Postuler à une offre                        │ │ ← action primaire unique (Hick)
│ ▸ Lettres  │   │  Collez une offre, on adapte tout.   [ Démarrer ]│ │   en accent corail
│ ▸ Candidat.│   └─────────────────────────────────────────────────┘ │
│ ▸ Entretien│   ┌── Reprendre ──┐ ┌── À relancer (3) ──┐ ┌─ Score ─┐│
│ ▸ Modèles  │   │ CV Aide-soig. │ │ • Clinique X  J+7  │ │  ◔ 86   ││  ← widgets ≤ 2 clics
│            │   │ [Continuer →] │ │ [Relancer tout]    │ │ ATS moy.││
│ ─────────  │   └───────────────┘ └────────────────────┘ └─────────┘│
│ ⚙ Paramètres│  ┌── Mes candidatures (pipeline) ──────────────────┐ │
│ ? Aide      │  │ Brouillon 2 · Envoyée 14 · Entretien 3 · Offre 1 │ │
│ ▣ Passer Pro│  │ [▓▓▓▓▓░░░░░] mini-kanban  →  Tout voir            │ │
└────────────┴───────────────────────────────────────────────────────┘
```
- **Sidebar** : 6 entrées max (Hick), icône+label, item actif souligné en primaire, repliable (icônes seules) ; carte « Passer Pro » en bas (upsell contextuel non intrusif).
- **Topbar** : recherche globale ⌘K (CV, lettres, candidatures, offres, aide), notifications, switch thème, avatar→menu compte/org.
- **Widgets** (par priorité de valeur) : ① CTA Postuler ; ② Reprendre le dernier doc ; ③ À relancer (rétention) ; ④ Score ATS moyen ; ⑤ Pipeline candidatures. Chaque widget = 1 action directe.
- **Actions rapides** : ⌘K → « Nouveau CV », « Adapter à une offre », « Nouvelle lettre », « Importer LinkedIn ».
- **États** : vide (3 cartes d'amorçage : importer LinkedIn / partir d'un modèle / coller une offre) ; chargement (skeletons) ; erreur (bannière + retry).

---

## 7. ONBOARDING (objectif : valeur perçue < 60 s)

**Principe** : *résultat d'abord, compte ensuite*. On laisse l'utilisateur produire de la valeur avant de demander quoi que ce soit, et on ne met JAMAIS le paywall sur la première réussite.

```
SEO page modèle ──► [Utiliser ce modèle] ──► Choix de la voie (1 écran, 3 cartes, Hick) :
   ① Importer mon LinkedIn/PDF   ② Répondre à 4 questions (interview IA)   ③ Partir d'un exemple
        │                                  │                                   │
        └──────────────► CV pré-rempli généré (streaming, ~15 s) ◄────────────┘
                                   │  l'utilisateur VOIT son CV (aha #1)
                         [Soft sign-up] « Créez un compte pour sauvegarder »  (Google 1-tap / email)
                                   │
                         [Télécharger] → 1er export (aha #2)  ← gratuit, filigrane discret
                                   │
                         Suggestion contextuelle : « Adapter ce CV à une offre ? » → active la V2
```
- **Inscription/connexion** : email magic-link + Google OAuth (1-tap). Pas de mot de passe imposé. Vérification email non bloquante.
- **Récupération mot de passe** (si défini) : lien signé 30 min, écran clair, anti-énumération (message identique que l'email existe ou non).
- **Tutoriel** : *pas* de carrousel ennuyeux — coaching contextuel (tooltips déclenchés à la 1re rencontre d'une feature, « checklist de démarrage » optionnelle dans le dashboard : Importer / Adapter à une offre / Exporter / Suivre une candidature).
- **Activation mesurée** : événement `activated` = 1er CV exporté. **Premier succès** = ce moment ; tout l'onboarding y converge. KPI : activation > 35 % des inscrits, time-to-first-export médian < 5 min.

---

## 8. SPECS FONCTIONNELLES DÉTAILLÉES

*(Format pour chaque feature : Objectif · Interface · Comportement · États · Erreurs · Mobile · Cas limites.)*

### 8.1 Générateur de CV IA
- **Objectif** : produire un CV crédible aux conventions FR sans page blanche.
- **Interface** : split-view §3.2 ; 3 voies d'entrée (import / interview / exemple) ; assist IA par bloc.
- **Comportement** : autosave (debounce 800ms) ; génération en streaming ; réordonnancement drag&drop ; score ATS recalculé à chaque changement significatif (debounce 2s).
- **États** : vide (voies d'amorçage) · génération (skeleton + streaming) · édité · enregistré · conflit (édition multi-onglet → merge last-write + avertissement).
- **Erreurs** : échec import LinkedIn (fallback saisie/upload PDF) ; IA indisponible (fallback provider, sinon mode édition manuelle + message) ; quota free atteint (paywall *non* bloquant sur l'existant).
- **Mobile** : aperçu et édition en **onglets** (pas de split), barre d'action collée en bas (Exporter / Adapter), drag par poignée tactile.
- **Edge** : CV très long (pagination multi-pages, alerte « 3 pages, réduire ? ») ; caractères spéciaux/accents (police PDF complète) ; profil sans expérience (mode étudiant → met en avant projets/associatif).

### 8.2 Générateur de lettres de motivation
- **Objectif** : lettre FR structurée *Vous-Moi-Nous*, ton réglable, anti-clichés.
- **Interface** : éditeur + panneau « Ton » (sobre/dynamique/formel) + bouton « depuis une offre ».
- **Comportement** : génère 3 paragraphes structurés, signale les formules banales, propose des accroches ; longueur cible 250-350 mots.
- **États/Erreurs/Mobile/Edge** : idem 8.1 ; edge : candidature spontanée (pas d'offre → angle « projet/entreprise ») ; secteur public (registre formel renforcé).

### 8.3 Tailoring offre → candidature (différenciateur)
- **Objectif** : adapter CV+lettre+mail à une offre + score transparent. Voir wireframe §3.3.
- **Comportement** : extraction des exigences (compétences, diplômes, contraintes) → gap analysis honnête → régénération ciblée avec *diff* surligné → création automatique d'une `Application`.
- **Erreurs** : URL non parsable (fallback copier-coller) ; offre dans une langue étrangère (proposer traduction) ; offre trop courte (demander plus de contexte).
- **Edge** : offre exigeant un diplôme absent → on ne ment pas, on suggère de mettre en avant l'équivalence/expérience.

### 8.4 Score ATS + recommandations
- **Objectif** : éviter le rejet machine ; pédagogie. **Interface** : `ScoreRing` /100 + liste priorisée d'actions (impact estimé). **Comportement** : critères = structure parsable, mots-clés de l'offre, longueur, formats de dates, sections obligatoires, absence d'éléments piégeux (tableaux/colonnes exotiques, texte en image). **Edge** : ne jamais promettre « 100 % = embauche » (honnêteté) ; score relatif à une offre si fournie.

### 8.5 Correcteur français d'élite
- **Objectif** : zéro faute = différenciateur de confiance. **Comportement** : accords, homophones, conjugaison, typographie FR (espaces insécables, guillemets « »), majuscules. Soulignement contextuel + explication + « tout corriger ». **Mobile** : corrections en bottom-sheet. **Edge** : noms propres/jargon métier (dictionnaire ROME, ajout perso).

### 8.6 Simulation d'entretien (V2/Carrière)
- **Objectif** : préparer l'entretien décroché. **Interface** : chat (puis voix), questions par métier (ROME), feedback structuré (clarté, exemples STAR, langage). **États** : question → réponse (texte/audio) → feedback → suivante. **Erreurs** : micro refusé (fallback texte). **Mobile** : push-to-talk plein écran. **Edge** : réponses très courtes → relance socratique.

### 8.7 Suivi de candidatures (rétention)
- **Objectif** : ne rien perdre, relancer au bon moment. **Interface** : Kanban (Brouillon/Envoyée/Relancée/Entretien/Offre/Refus) + vue liste/table filtrable. **Comportement** : création auto depuis le tailoring ; rappels de relance (J+7) ; timeline d'événements. **Mobile** : kanban en colonnes swipables + liste. **Edge** : import en masse, archivage, RGPD (purge).

### 8.8 Export PDF/DOCX
- **Objectif** : le « moment de vérité » irréprochable. **Comportement** : rendu serveur fidèle (Chromium), DOCX éditable, nom de fichier propre (`CV_Prenom_Nom_Metier.pdf`), filigrane discret en free. **États** : file → rendu → prêt (toast + téléchargement auto). **Erreurs** : retry x3 puis lien de support. **Edge** : polices/accents, A4 vs Letter (A4 par défaut FR).

---

## 9. MOBILE FIRST & PWA

- **Navigation** : bottom-tab 5 entrées (Accueil · CV · ✦Postuler(FAB central) · Candidatures · Profil) ; le FAB central corail = action primaire (Fitts/pouce). Sidebar desktop → drawer mobile.
- **Interactions tactiles** : cibles ≥ 44px ; swipe pour changer d'onglet aperçu/édition ; pull-to-refresh sur listes ; bottom-sheets pour toute action contextuelle (jamais de menu déroulant fin) ; long-press = actions secondaires.
- **Responsive** : split-view desktop → onglets mobile ; tableaux → cartes empilées ; modales → sheets plein écran ; pricing → carrousel.
- **Performance mobile** : budget JS strict, images responsives/AVIF, lazy-load, squelettes ; offline lecture (PWA + service worker) ; installable (manifest, icônes) ; notifications push (relances, fin de rendu, baisse de prix).
- **Saisie** : claviers adaptés (`type=email/tel`), autofill, dictée vocale pour les expériences, reprise sans perte (autosave + restauration).

---

## 10. FRONTEND

### 10.1 Stack & justification
| Choix | Raison |
|---|---|
| **Next.js 15 (App Router) + React 19** | SSR/ISR indispensable pour 3 000+ pages pSEO (SEO = le moat) ; RSC = moins de JS côté client ; un seul framework front+edge. |
| **TypeScript strict** | Sûreté sur un domaine à entités nombreuses ; DX. |
| **Tailwind + shadcn/ui + Radix** | Vélocité + accessibilité native (Radix) + design system possédé (on copie les composants, pas de lock-in). |
| **TanStack Query** | Cache serveur, optimistic updates (kanban, autosave), retries. |
| **Zustand** (UI local) | État léger (éditeur, modales) sans boilerplate Redux. |
| **react-hook-form + Zod** | Formulaires perfs + validation partagée front/back (mêmes schémas). |
| **Framer Motion** | Micro-interactions §4.6, respect `reduced-motion`. |
| **next-intl** | i18n prêt (FR d'abord, EN/scope export plus tard). |

### 10.2 Structure des dossiers
```
src/
  app/
    (marketing)/            page.tsx, modele-cv/[style], exemple-cv/[metier],
                            lettre-de-motivation/[metier], cv/[situation],
                            outils/[outil], conseils/[slug], tarifs, ecoles
    (auth)/                 connexion, inscription, mot-de-passe-oublie
    (app)/app/              dashboard, cv/[id]/editer, lettres, candidatures,
                            postuler, entretien, modeles, parametres
    (org)/org/[slug]/       dashboard, membres, analytics, facturation
    admin/                  back-office
    api/                    route handlers (webhooks Stripe, cron, og-image)
  components/  ui/ (design system) · marketing/ · app/ · resume/ (canvas A4) · charts/
  features/    resume/ letter/ tailoring/ ats/ interview/ applications/ billing/ org/
               (chaque feature = components + hooks + api + schemas + types colocalisés)
  lib/         api (tRPC client) · auth · analytics · pdf · utils · constants
  server/      routers tRPC · services · db (prisma) · ai · jobs (queue) · policies (RBAC)
  styles/      tokens.css (variables CSS) · globals.css
  content/     mdx éditorial · data ROME (seed)
```

### 10.3 Routing, state, data
- **Routing** : segments groupés `(marketing)` SSR/ISR public, `(app)` protégé (middleware auth + RBAC), `admin` gardé. URLs FR canoniques (SEO).
- **State** : serveur via TanStack Query (source de vérité), UI éphémère via Zustand, formulaires via RHF. Optimistic sur kanban/autosave avec rollback sur erreur.
- **Erreurs/chargement** : `error.tsx`/`loading.tsx` par segment ; ErrorBoundary métier ; toasts non bloquants.

---

## 11. BACKEND

### 11.1 Stack & justification
| Choix | Raison |
|---|---|
| **API tRPC** (monorepo Next) | Type-safety bout-en-bout, vélocité solo/petite équipe ; REST exposé seulement pour webhooks & API B2B publique. |
| **PostgreSQL** (Neon→RDS) | Relationnel (entités liées), robuste, `pgvector` pour le matching offre↔CV. |
| **Prisma** | Migrations, type-safety, DX. |
| **Redis (Upstash) + BullMQ** | Files asynchrones (rendu PDF, génération IA longue, emails, scoring), rate-limiting, cache. |
| **Auth.js** | Email magic-link + Google ; sessions httpOnly ; multi-compte/org. |
| **Stripe** | Abonnements + paiement unique (Pass), TVA FR, factures, portail client, webhooks. |
| **S3 Scaleway (UE)** | Stockage exports & assets, **données en UE** (argument RGPD/B2B public). |
| **Resend/Brevo** | Transactionnel + séquences (relances). |

### 11.2 Schéma de base de données (Prisma — extrait représentatif)
```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  locale        String   @default("fr")
  plan          Plan     @default(FREE)        // FREE | PRO | CARRIERE
  passExpiresAt DateTime?                       // Pass 30 j sans reconduction
  memberships   Membership[]
  resumes       Resume[]
  letters       Letter[]
  applications  Application[]
  interviews    InterviewSession[]
  createdAt     DateTime @default(now())
}

model Organization {
  id        String       @id @default(cuid())
  slug      String       @unique
  name      String
  type      OrgType                            // ECOLE | CFA | OUTPLACEMENT | ENTREPRISE
  seats     Int          @default(0)
  members   Membership[]
  license   License?
}
model Membership {
  id     String  @id @default(cuid())
  user   User    @relation(fields:[userId], references:[id])
  userId String
  org    Organization @relation(fields:[orgId], references:[id])
  orgId  String
  role   OrgRole @default(MEMBER)              // MEMBER | ADMIN
  @@unique([userId, orgId])
}

model Resume {
  id        String          @id @default(cuid())
  user      User            @relation(fields:[userId], references:[id])
  userId    String
  title     String
  romeCode  String?                            // rattachement métier
  versions  ResumeVersion[]
  updatedAt DateTime        @updatedAt
}
model ResumeVersion {
  id          String   @id @default(cuid())
  resume      Resume   @relation(fields:[resumeId], references:[id])
  resumeId    String
  data        Json                              // contenu structuré (sections)
  templateId  String
  forOfferId  String?                           // variante adaptée à une offre
  atsScore    Int?
  embedding   Unsupported("vector(1536)")?      // pgvector pour matching
  createdAt   DateTime @default(now())
}

model JobOffer {
  id            String  @id @default(cuid())
  sourceUrl     String?
  rawText       String
  title         String?
  requirements  Json                            // exigences extraites par IA
  embedding     Unsupported("vector(1536)")?
}
model Application {
  id          String   @id @default(cuid())
  user        User     @relation(fields:[userId], references:[id])
  userId      String
  offer       JobOffer? @relation(fields:[offerId], references:[id])
  offerId     String?
  resumeVerId String?
  letterId    String?
  status      AppStatus @default(BROUILLON)     // machine à états §2.4
  matchScore  Int?
  nextFollowUpAt DateTime?
  events      ApplicationEvent[]
  updatedAt   DateTime @updatedAt
}
model ApplicationEvent {
  id     String   @id @default(cuid())
  appId  String
  type   String                                 // ENVOYEE | RELANCE | ENTRETIEN | OFFRE | REFUS …
  meta   Json?
  at     DateTime @default(now())
}

model InterviewSession { id String @id @default(cuid()); userId String; romeCode String?; transcript Json; feedback Json?; createdAt DateTime @default(now()) }
model CoachReview      { id String @id @default(cuid()); resumeVerId String; coachId String; status String; notes Json?; }
model RomeOccupation   { code String @id; label String; skills Json; sampleBullets Json } // référentiel pSEO + IA
model AuditLog         { id String @id @default(cuid()); userId String?; action String; ip String?; at DateTime @default(now()) }
```
Index clés : `User.email`, `Application.userId+status`, `ResumeVersion.resumeId`, vecteurs `ivfflat` sur embeddings. Souveraineté : PII chiffrées au repos, séparation logique par `userId`/`orgId`.

### 11.3 API (surface principale)
```
tRPC routers:
  resume.{list,get,create,update,duplicate,delete,score,exportPdf,exportDocx}
  letter.{list,get,generate,update}
  tailoring.{analyzeOffer,match,generateAll}     // offre → CV+lettre+mail
  application.{list,create,updateStatus,scheduleFollowUp,timeline}
  interview.{start,answer,feedback}
  ai.assist.{rewrite,quantify,shorten,fixGrammar} // assists par bloc (streaming)
  billing.{checkout,portal,plan}                  // Stripe
  org.{create,invite,members,analytics,license}
  user.{me,update,deleteAccount,exportData}       // RGPD: portabilité + suppression

REST (api/):
  POST /api/webhooks/stripe        (idempotent, vérif signature)
  POST /api/cron/follow-ups        (rappels relance — protégé par secret)
  GET  /api/og/[type]              (images OG dynamiques)
  /v1/*  API publique B2B (clé API, quotas) — V3
```

### 11.4 Auth, permissions, sécurité, scalabilité
- **Auth** : sessions httpOnly+SameSite, rotation, magic-link signé court, OAuth Google. 2FA optionnel (B2B admin).
- **Permissions** : couche `policies` centralisée (RBAC §2.2), évaluée **côté serveur** sur chaque procédure ; ownership systématique (`where userId`), garde org-scope.
- **Sécurité** : Zod sur toutes les entrées, rate-limiting (Redis) par IP+user, CSRF sur mutations cookie, headers (CSP, HSTS, X-Frame), webhooks idempotents+signés, secrets en vault, sanitization des contenus IA, anti-énumération sur l'auth, logs d'audit, sauvegardes chiffrées + PITR. Conformité RGPD : registre des traitements, DPA B2B, consentement cookies (Matomo exempté), portabilité + droit à l'effacement en 1 clic, hébergement UE.
- **Scalabilité** : stateless (scale horizontal Vercel), DB pooling (PgBouncer/Neon), travail lourd en **queues** (jamais dans la requête), cache ISR + Redis, CDN assets, idempotence des jobs, observabilité (Sentry + logs structurés + métriques OpenTelemetry). Architecture **monolithe modulaire** (pas de microservices prématurés).

---

## 12. ARCHITECTURE IA

- **Routing de modèles (coût/qualité)** : **Claude Sonnet** = génération CV/lettres, coaching, feedback entretien (qualité rédactionnelle FR). **Claude Haiku** = extraction d'exigences d'offre, scoring ATS, classification, suggestions courtes (~80 % du volume, coût maîtrisé). **Embeddings** = matching offre↔CV (pgvector). **Fallback Mistral** (souveraineté UE, argument B2B public + résilience).
- **Couche d'abstraction provider** : interface unique `generate()/stream()/embed()`, retries, fallback, *prompt caching* (le référentiel ROME et les consignes système sont cachés), batching du scoring.
- **Prompts** : system prompts versionnés par tâche, sorties **structurées (JSON schema strict + validation Zod)** pour le CV/score/exigences, *few-shot* alimenté par `RomeOccupation` (RAG léger : on injecte la fiche métier pertinente).
- **Garde-fous** : anti-hallucination (l'IA ne *crée* pas d'expériences/diplômes — elle reformule ce que l'utilisateur a fourni, et signale les manques au lieu d'inventer) ; PII (pas d'envoi superflu, rétention courte côté provider, pas d'entraînement sur données clients) ; **anti-discrimination** (photo/RQTH/âge présentés avec pédagogie, jamais imposés ; aucune recommandation basée sur origine/genre/santé) ; modération des entrées ; ton (registre FR adapté au segment).
- **Coûts** : par utilisateur payant 0,30-0,80 € (caching + Haiku) ; plafond dur = 5 % du prix payé ; quotas free + file d'attente douce ; monitoring du coût par feature.

---

## 13. AUTOMATISATIONS

- **Cycle de vie** : séquences email/push selon l'état (bienvenue → activation si pas d'export → relance candidatures J+7 → réactivation à 14 j → upsell Pro après 2e CV).
- **Rétention** : rappels de relance auto, alerte « offre qui matche ton CV » (V3), résumé hebdo de recherche d'emploi.
- **Growth** : génération assistée des pages pSEO (pipeline IA → file de relecture humaine → publication), OG images dynamiques, programme de parrainage (codes + récompenses), collecte d'avis post-succès (NPS > 8 → invite Trustpilot).
- **Ops** : webhooks Stripe (provisioning plan/seats), cron nettoyage RGPD (purge à expiration), détection d'anomalies de coût IA, rapports B2B de placement automatisés.
- **B2B** : import CSV de cohortes, provisioning de licences, export de stats de placement, facturation récurrente.

---

## 14. ROADMAP D'AMÉLIORATIONS FUTURES

- **Données → moat** : score d'employabilité fondé sur les taux de réponse réels (par métier/région) ; benchmarks publics anonymisés (Baromètre).
- **Distribution** : extension navigateur (postuler depuis n'importe quel job board), application mobile native (si la PWA plafonne), intégration France Travail/agrégateurs.
- **Produit** : profil public partageable, recommandations d'offres (matching inversé), simulation d'entretien vidéo, optimisation LinkedIn, coaching salaire.
- **B2B** : marque blanche complète, SSO, API publique, tableau de bord placement avancé, conformité Qualiopi pour les OF.
- **International (prudent)** : Belgique/Suisse francophones d'abord (conventions proches), puis EN.

---

## 15. RÉCAPITULATIF DES LIVRABLES (checklist)
1. ✅ Architecture complète — §2 (sitemap, RBAC, entités, états)
2. ✅ Toutes les pages — §2.1 (public + app + org + admin)
3. ✅ Tous les écrans — §3, §5-§8 (wireframes + specs)
4. ✅ Parcours utilisateurs — §2.5, §3.2-3.3, §7
5. ✅ Design system — §4 (tokens, typo, composants, motion)
6. ✅ Wireframes détaillés — §3.2, §3.3, §6, §7
7. ✅ Maquettes textuelles — §5 (landing) + §8 (specs écran par écran)
8. ✅ Structure Frontend — §10
9. ✅ Structure Backend — §11
10. ✅ Base de données — §11.2 (Prisma)
11. ✅ API — §11.3
12. ✅ Automatisations — §13
13. ✅ Fonctionnalités IA — §12
14. ✅ Améliorations futures — §14

> **Verdict du comité.** Ce dossier décrit un produit *premium, défendable et réalisable avec 100 k€* : un design system de niveau Linear/Stripe, une UX à charge cognitive minimale (résultat avant inscription, < 2 clics, < 3 s), un cœur différenciant (tailoring + conventions FR + pricing honnête), un moat data, et une stack pragmatique (monolithe modulaire Next/Postgres/queues/Claude). Rien n'a été simplifié ; tout a été arbitré.
