"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";
import { requireUser } from "../auth";
import {
  parseResumeData,
  type InterviewKit,
  type OfferAnalysis,
  type Requirement,
} from "../types";
import {
  analyzeOffer,
  generateInterviewKit,
  generateLetter,
  generateMail,
} from "../ai";

/** Étape 1→2 : analyse l'offre et calcule la compatibilité (sans persister). */
export async function analyzeOfferAction(
  offerText: string,
  resumeId?: string,
): Promise<OfferAnalysis> {
  const user = await requireUser();
  let data;
  if (resumeId) {
    const r = await db.resume.findFirst({ where: { id: resumeId, userId: user.id } });
    if (r) data = parseResumeData(r.data);
  }
  return analyzeOffer(offerText, data);
}

export type TailorResult = {
  applicationId: string;
  letterId: string;
  letterBody: string;
  mailSubject: string;
  mailBody: string;
  kit: InterviewKit;
  cvTips: string[];
  keywords: string[];
};

/**
 * Étape 2→3 : produit le DOSSIER DE CANDIDATURE COMPLET et le persiste.
 * En une génération : lettre adaptée + mail + kit d'entretien (questions
 * attendues) + conseils CV + mots-clés ATS, le tout rattaché à la candidature.
 */
export async function createTailoredApplication(input: {
  offerText: string;
  resumeId?: string;
  analysis: OfferAnalysis;
}): Promise<TailorResult> {
  const user = await requireUser();

  const data = await (async () => {
    if (!input.resumeId) return parseResumeData("{}");
    const r = await db.resume.findFirst({ where: { id: input.resumeId, userId: user.id } });
    return r ? parseResumeData(r.data) : parseResumeData("{}");
  })();

  const { title, company, requirements, matchScore } = input.analysis;

  const offer = await db.jobOffer.create({
    data: {
      userId: user.id,
      rawText: input.offerText,
      title,
      company,
      requirements: JSON.stringify(requirements satisfies Requirement[]),
    },
  });

  // Lettre + mail + kit d'entretien générés en parallèle (une seule attente).
  const [letterBody, mail, kit] = await Promise.all([
    generateLetter({ data, offerText: input.offerText, company }),
    generateMail({ data, poste: title, company }),
    generateInterviewKit({ data, role: title, company, requirements, offerText: input.offerText }),
  ]);

  const cvTips = input.analysis.cvTips ?? [];
  const keywords = input.analysis.keywords ?? [];

  const letter = await db.letter.create({
    data: { userId: user.id, title: `Lettre — ${title}`, body: letterBody },
  });
  await db.letter.create({
    data: {
      userId: user.id,
      title: `Mail — ${title}`,
      body: `${mail.subject}\n\n${mail.body}`,
    },
  });

  const application = await db.application.create({
    data: {
      userId: user.id,
      offerId: offer.id,
      resumeId: input.resumeId ?? null,
      company: company || "Entreprise",
      role: title,
      status: "BROUILLON",
      matchScore,
      letterBody,
      mailSubject: mail.subject,
      mailBody: mail.body,
      prepKit: JSON.stringify(kit),
      cvTips: JSON.stringify(cvTips),
      keywords: JSON.stringify(keywords),
    },
  });

  revalidatePath("/app/candidatures");
  revalidatePath("/app/lettres");
  revalidatePath("/app");
  return {
    applicationId: application.id,
    letterId: letter.id,
    letterBody,
    mailSubject: mail.subject,
    mailBody: mail.body,
    kit,
    cvTips,
    keywords,
  };
}
