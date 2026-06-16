import { z } from "zod";

/** Structure d'un CV (stockée sérialisée dans Resume.data). */
export const experienceSchema = z.object({
  id: z.string(),
  poste: z.string(),
  entreprise: z.string(),
  debut: z.string(),
  fin: z.string(),
  ville: z.string().optional(),
  description: z.string(),
});
export type Experience = z.infer<typeof experienceSchema>;

export const formationSchema = z.object({
  id: z.string(),
  diplome: z.string(),
  ecole: z.string(),
  annee: z.string(),
});
export type Formation = z.infer<typeof formationSchema>;

export const langueSchema = z.object({
  id: z.string(),
  langue: z.string(),
  niveau: z.string(), // CECRL : A1..C2 / Natif
});
export type Langue = z.infer<typeof langueSchema>;

export const resumeDataSchema = z.object({
  prenom: z.string().default(""),
  nom: z.string().default(""),
  titre: z.string().default(""),
  email: z.string().default(""),
  telephone: z.string().default(""),
  ville: z.string().default(""),
  permis: z.boolean().default(false),
  accroche: z.string().default(""),
  experiences: z.array(experienceSchema).default([]),
  formations: z.array(formationSchema).default([]),
  competences: z.array(z.string()).default([]),
  langues: z.array(langueSchema).default([]),
  interets: z.array(z.string()).default([]),
});
export type ResumeData = z.infer<typeof resumeDataSchema>;

export function emptyResumeData(): ResumeData {
  return resumeDataSchema.parse({});
}

export function parseResumeData(raw: string): ResumeData {
  try {
    return resumeDataSchema.parse(JSON.parse(raw));
  } catch {
    return emptyResumeData();
  }
}

/** Exigence extraite d'une offre d'emploi. */
export type RequirementStatus = "ok" | "warn" | "missing";
export type Requirement = { label: string; status: RequirementStatus };

/** Résultat de l'analyse d'une offre. */
export type OfferAnalysis = {
  title: string;
  company: string;
  requirements: Requirement[];
  matchScore: number;
  /** Mots-clés ATS détectés dans l'offre (à reprendre dans le CV). */
  keywords?: string[];
  /** Conseils d'optimisation du CV spécifiques à cette offre. */
  cvTips?: string[];
};

/** Catégories de questions d'entretien. */
export const INTERVIEW_CATEGORIES = [
  "Présentation",
  "Motivation",
  "Compétences",
  "Comportementale",
  "Pièges",
  "Vos questions",
] as const;
export type InterviewCategory = (typeof INTERVIEW_CATEGORIES)[number];

/** Une question d'entretien attendue, avec l'intention du recruteur et un angle de réponse. */
export type InterviewQuestion = {
  question: string;
  category: InterviewCategory;
  /** Ce que le recruteur cherche vraiment à évaluer. */
  intent: string;
  /** Angle de réponse personnalisé (méthode STAR) basé sur le profil. */
  suggestion: string;
};

/** Kit de préparation à l'entretien généré pour une offre précise. */
export type InterviewKit = {
  questions: InterviewQuestion[];
  /** Conseils transverses pour cet entretien. */
  conseils: string[];
};

export function parseInterviewKit(raw: string | null | undefined): InterviewKit | null {
  if (!raw) return null;
  try {
    const json = JSON.parse(raw);
    if (!json || !Array.isArray(json.questions)) return null;
    return {
      questions: json.questions.filter(
        (q: unknown): q is InterviewQuestion =>
          !!q && typeof (q as InterviewQuestion).question === "string",
      ),
      conseils: Array.isArray(json.conseils) ? json.conseils.map(String) : [],
    };
  } catch {
    return null;
  }
}

export function parseStringArray(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const json = JSON.parse(raw);
    return Array.isArray(json) ? json.map(String) : [];
  } catch {
    return [];
  }
}

/** Un tour de simulation d'entretien (types partagés client/serveur). */
export type InterviewMessage = { from: "ai" | "user"; text: string };

/** Bilan de fin d'entretien. */
export type InterviewReport = {
  score: number;
  pointsForts: string[];
  axes: string[];
  synthese: string;
};

export type InterviewResult = {
  reply: string;
  feedback?: string;
  done: boolean;
  report?: InterviewReport;
};

export const APP_STATUSES = [
  "BROUILLON",
  "ENVOYEE",
  "RELANCEE",
  "ENTRETIEN",
  "OFFRE",
  "REFUSEE",
] as const;
export type AppStatus = (typeof APP_STATUSES)[number];

export const STATUS_LABELS: Record<AppStatus, string> = {
  BROUILLON: "Brouillon",
  ENVOYEE: "Envoyée",
  RELANCEE: "Relancée",
  ENTRETIEN: "Entretien",
  OFFRE: "Offre",
  REFUSEE: "Refusée",
};
