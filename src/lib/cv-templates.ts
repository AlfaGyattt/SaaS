import type { ResumeData } from "@/server/types";

/** Disposition visuelle du CV. */
export type CvLayout = "single" | "sidebar" | "band";

export type CvTemplate = {
  id: string;
  name: string;
  /** Couleur d'accent (titres, filets). */
  accent: string;
  layout: CvLayout;
  font: "sans" | "serif";
  headerAlign: "left" | "center";
  /** Mise en page sur une colonne, lisible par les robots recruteurs. */
  ats: boolean;
  desc: string;
};

// 8 modèles couvrant 3 dispositions réellement différentes.
export const CV_TEMPLATES: CvTemplate[] = [
  {
    id: "moderne",
    name: "Moderne",
    accent: "#3d5afe",
    layout: "single",
    font: "sans",
    headerAlign: "left",
    ats: true,
    desc: "Une colonne, touche de couleur. Idéal tech, marketing, tertiaire.",
  },
  {
    id: "sobre",
    name: "Sobre",
    accent: "#334155",
    layout: "single",
    font: "sans",
    headerAlign: "left",
    ats: true,
    desc: "Neutre et passe-partout, parfait pour les candidatures classiques.",
  },
  {
    id: "classique",
    name: "Classique",
    accent: "#3f3f46",
    layout: "single",
    font: "serif",
    headerAlign: "center",
    ats: true,
    desc: "Format traditionnel centré, secteur public et grands groupes.",
  },
  {
    id: "elegant",
    name: "Élégant",
    accent: "#047857",
    layout: "single",
    font: "serif",
    headerAlign: "center",
    ats: true,
    desc: "Raffiné, titres en petites capitales. Pour profils expérimentés.",
  },
  {
    id: "compact",
    name: "Compact",
    accent: "#b45309",
    layout: "single",
    font: "sans",
    headerAlign: "left",
    ats: true,
    desc: "Dense, pour faire tenir un parcours riche sur une seule page.",
  },
  {
    id: "duo",
    name: "Duo",
    accent: "#3d5afe",
    layout: "sidebar",
    font: "sans",
    headerAlign: "left",
    ats: false,
    desc: "Deux colonnes avec bandeau latéral. Moderne et structuré.",
  },
  {
    id: "pro",
    name: "Pro",
    accent: "#0f172a",
    layout: "sidebar",
    font: "sans",
    headerAlign: "left",
    ats: false,
    desc: "Colonne latérale foncée, allure cadre et consultant.",
  },
  {
    id: "bandeau",
    name: "Bandeau",
    accent: "#ff6b4a",
    layout: "band",
    font: "sans",
    headerAlign: "left",
    ats: false,
    desc: "Bandeau coloré en-tête. Pour la communication et le créatif.",
  },
];

export const DEFAULT_TEMPLATE = "moderne";

export function getCvTemplate(id?: string): CvTemplate {
  return CV_TEMPLATES.find((t) => t.id === id) ?? CV_TEMPLATES[0];
}

export const CV_TEMPLATE_IDS = CV_TEMPLATES.map((t) => t.id);

/** CV de démonstration pour les aperçus de la galerie de modèles. */
export const SAMPLE_RESUME: ResumeData = {
  prenom: "Camille",
  nom: "Martin",
  titre: "Chargée de communication",
  email: "camille.martin@email.fr",
  telephone: "06 12 34 56 78",
  ville: "Lyon",
  permis: true,
  accroche:
    "Chargée de communication avec 5 ans d'expérience en agence et chez l'annonceur. Reconnue pour ma créativité et mon sens du résultat.",
  experiences: [
    {
      id: "1",
      poste: "Chargée de communication",
      entreprise: "Agence Lumen",
      debut: "2021",
      fin: "Aujourd'hui",
      ville: "Lyon",
      description:
        "Pilotage des réseaux sociaux (+45% d'engagement). Organisation de 12 événements par an. Coordination des prestataires.",
    },
    {
      id: "2",
      poste: "Assistante communication",
      entreprise: "Groupe Vivalto",
      debut: "2019",
      fin: "2021",
      ville: "Villeurbanne",
      description: "Rédaction de contenus, newsletters et relations presse.",
    },
  ],
  formations: [
    { id: "1", diplome: "Master Communication", ecole: "Sciences Po Lyon", annee: "2019" },
  ],
  competences: ["Réseaux sociaux", "Rédaction web", "Événementiel", "Adobe Suite", "SEO"],
  langues: [
    { id: "1", langue: "Anglais", niveau: "C1" },
    { id: "2", langue: "Espagnol", niveau: "B1" },
  ],
  interets: ["Photographie", "Course à pied", "Bénévolat"],
};
