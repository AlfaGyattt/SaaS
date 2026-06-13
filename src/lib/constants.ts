import type { LucideIcon } from "lucide-react";
import {
  FileText,
  Mail,
  Wand2,
  ShieldCheck,
  SpellCheck,
  KanbanSquare,
  GraduationCap,
  Briefcase,
  Repeat,
  LayoutDashboard,
  FileStack,
  Send,
  MessageSquare,
  LayoutTemplate,
  Settings,
} from "lucide-react";

export const SITE = {
  name: "Postulo",
  tagline: "Décrochez plus d'entretiens.",
  description:
    "Collez une offre d'emploi : obtenez un CV, une lettre et un mail adaptés, en français, en 10 minutes. Sans abonnement piège.",
  url: "https://postulo.fr",
  trustpilot: 4.7,
  applicationsSent: 50000,
};

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const FEATURES: Feature[] = [
  {
    icon: FileText,
    title: "CV par IA, aux normes françaises",
    description:
      "Importez votre LinkedIn ou répondez à 4 questions. Jamais de page blanche : votre CV apparaît en quelques secondes.",
  },
  {
    icon: Mail,
    title: "Lettre de motivation Vous-Moi-Nous",
    description:
      "Une lettre structurée à la française, au ton réglable, sans formules creuses ni clichés.",
  },
  {
    icon: Wand2,
    title: "Adaptation à l'offre en 1 clic",
    description:
      "Collez une annonce : CV, lettre et mail sont réécrits pour CETTE offre, avec un score de compatibilité transparent.",
  },
  {
    icon: ShieldCheck,
    title: "Score ATS & compatibilité robots",
    description:
      "On vérifie que votre CV passe les filtres automatiques des recruteurs et on vous dit précisément quoi corriger.",
  },
  {
    icon: SpellCheck,
    title: "Correcteur français d'élite",
    description:
      "Accords, homophones, typographie : zéro faute. Parce qu'une seule suffit à vous faire éliminer.",
  },
  {
    icon: KanbanSquare,
    title: "Suivi de candidatures",
    description:
      "Toutes vos candidatures au même endroit, avec rappels de relance au bon moment.",
  },
];

export type UseCase = {
  id: string;
  label: string;
  icon: LucideIcon;
  headline: string;
  points: string[];
};

export const USE_CASES: UseCase[] = [
  {
    id: "alternance",
    label: "Étudiant & alternance",
    icon: GraduationCap,
    headline: "Un premier CV crédible, même sans expérience.",
    points: [
      "Valorise tes projets, stages et engagements associatifs",
      "Mode alternance : rythme, dates et double lecteur école/entreprise",
      "Prêt avant la rentrée, sur ton téléphone",
    ],
  },
  {
    id: "premier-emploi",
    label: "Premier emploi",
    icon: Briefcase,
    headline: "Postulez plus vite, sans tout refaire à chaque offre.",
    points: [
      "Adaptation automatique du CV et de la lettre à chaque annonce",
      "Suivi de toutes vos candidatures et relances",
      "Score ATS pour ne pas être recalé par les robots",
    ],
  },
  {
    id: "cadre",
    label: "Cadre & reconversion",
    icon: Repeat,
    headline: "Un dossier impeccable, discret, et l'entretien préparé.",
    points: [
      "Rendu premium 2 pages, cohérent avec votre LinkedIn",
      "Traduction de votre parcours en atouts pour un nouveau métier",
      "Simulation d'entretien par IA, par métier",
    ],
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "J'ai adapté mon CV à 12 offres en une soirée. Trois entretiens décrochés en deux semaines.",
    name: "Karim B.",
    role: "Développeur web, Lyon",
    initials: "KB",
  },
  {
    quote:
      "Enfin un outil qui comprend le CV français. La lettre de motivation était parfaite du premier coup.",
    name: "Léa M.",
    role: "Étudiante BTS, en recherche d'alternance",
    initials: "LM",
  },
  {
    quote:
      "Discret, rapide, et le score ATS m'a fait corriger deux erreurs que je n'aurais jamais vues.",
    name: "Sandrine R.",
    role: "Responsable marketing, Nantes",
    initials: "SR",
  },
];

export type Plan = {
  id: string;
  name: string;
  price: string;
  period: string;
  highlight?: boolean;
  badge?: string;
  description: string;
  features: string[];
  cta: string;
};

export const PLANS: Plan[] = [
  {
    id: "gratuit",
    name: "Gratuit",
    price: "0 €",
    period: "pour toujours",
    description: "Pour créer un premier CV et tester.",
    features: [
      "1 CV et 3 modèles",
      "Export PDF",
      "Score ATS de base",
      "Aucune carte requise",
    ],
    cta: "Créer mon CV",
  },
  {
    id: "pass",
    name: "Pass Campagne",
    price: "14,90 €",
    period: "une fois · 30 jours",
    highlight: true,
    badge: "Le plus choisi",
    description: "Tout illimité le temps de votre recherche. Sans reconduction.",
    features: [
      "CV, lettres et mails illimités",
      "Adaptation à l'offre en 1 clic",
      "Tous les modèles + correcteur d'élite",
      "Suivi de candidatures illimité",
      "Aucune reconduction automatique",
    ],
    cta: "Démarrer ma campagne",
  },
  {
    id: "carriere",
    name: "Carrière",
    price: "19,90 €",
    period: "/ mois · sans engagement",
    description: "Pour aller jusqu'à l'entretien et au-delà.",
    features: [
      "Tout le Pass Campagne",
      "Simulation d'entretien par IA (voix)",
      "Coaching IA avancé",
      "Traduction du CV en anglais",
      "Résiliable en 1 clic",
    ],
    cta: "Passer Carrière",
  },
];

export type FaqItem = { q: string; a: string };

export const FAQ: FaqItem[] = [
  {
    q: "C'est vraiment sans engagement ?",
    a: "Oui. Le Pass Campagne est un paiement unique de 30 jours qui ne se reconduit jamais. Les abonnements Pro et Carrière sont résiliables en un clic, à tout moment. Pas de piège, c'est notre engagement.",
  },
  {
    q: "En quoi est-ce différent de ChatGPT ?",
    a: "ChatGPT écrit du texte. Postulo produit un document final : mise en page compatible avec les robots recruteurs (ATS), exports PDF et Word impeccables, adaptation à l'offre, correction du français et suivi de vos candidatures. Tout le flux, au même endroit.",
  },
  {
    q: "Mon CV passera-t-il les filtres ATS ?",
    a: "C'est exactement notre rôle. Chaque modèle est conçu pour être lu par les ATS utilisés en France, et un score vous indique précisément quoi améliorer pour chaque offre.",
  },
  {
    q: "Mes données sont-elles en sécurité ?",
    a: "Vos données sont hébergées en Union européenne, chiffrées, jamais revendues. Vous pouvez les exporter ou tout supprimer en un clic, conformément au RGPD.",
  },
  {
    q: "Et la lettre de motivation ?",
    a: "Elle est incluse. Postulo génère une lettre structurée à la française (Vous-Moi-Nous), au ton réglable, ainsi que le mail de candidature qui l'accompagne.",
  },
  {
    q: "Ça marche sur mobile ?",
    a: "Entièrement. Postulo est pensé mobile d'abord : vous pouvez créer, adapter et exporter votre CV depuis votre téléphone.",
  },
];

export const COMPARISON = {
  columns: ["Postulo", "Sites à abonnement", "Outils généralistes"],
  rows: [
    { label: "Conçu pour le CV français", values: [true, "partiel", "partiel"] },
    { label: "Adaptation à l'offre en 1 clic", values: [true, false, false] },
    { label: "Sans reconduction cachée", values: [true, false, true] },
    { label: "Compatible robots recruteurs (ATS)", values: [true, true, false] },
    { label: "Suivi des candidatures", values: [true, "partiel", false] },
    { label: "Hébergé en France (RGPD)", values: [true, false, "variable"] },
  ] as { label: string; values: (boolean | string)[] }[],
};

// ---------- App (espace connecté) ----------

export type NavItem = { label: string; href: string; icon: LucideIcon };

export const APP_NAV: NavItem[] = [
  { label: "Accueil", href: "/app", icon: LayoutDashboard },
  { label: "Mes CV", href: "/app/cv", icon: FileStack },
  { label: "Lettres", href: "/app/lettres", icon: Mail },
  { label: "Candidatures", href: "/app/candidatures", icon: KanbanSquare },
  { label: "Postuler", href: "/app/postuler", icon: Send },
  { label: "Entretien", href: "/app/entretien", icon: MessageSquare },
  { label: "Modèles", href: "/app/modeles", icon: LayoutTemplate },
];

export const APP_NAV_SECONDARY: NavItem[] = [
  { label: "Paramètres", href: "/app/parametres", icon: Settings },
];

export const PIPELINE = [
  { stage: "Brouillon", count: 2 },
  { stage: "Envoyée", count: 14 },
  { stage: "Relancée", count: 4 },
  { stage: "Entretien", count: 3 },
  { stage: "Offre", count: 1 },
];

export const FOLLOW_UPS = [
  { company: "Clinique Saint-Jean", role: "Aide-soignante", days: 7 },
  { company: "Groupe Bastide", role: "Aide-soignante de nuit", days: 9 },
  { company: "EHPAD Les Tilleuls", role: "AS — CDI", days: 12 },
];
