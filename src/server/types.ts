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
