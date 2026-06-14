"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";
import { requireUser } from "../auth";
import { parseResumeData, type OfferAnalysis, type Requirement } from "../types";
import { analyzeOffer, generateLetter, generateMail } from "../ai";

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

/** Étape 2→3 : crée l'offre, la lettre adaptée et la candidature dans le suivi. */
export async function createTailoredApplication(input: {
  offerText: string;
  resumeId?: string;
  analysis: OfferAnalysis;
}): Promise<{
  applicationId: string;
  letterId: string;
  letterBody: string;
  mailSubject: string;
  mailBody: string;
}> {
  const user = await requireUser();

  const data = await (async () => {
    if (!input.resumeId) return parseResumeData("{}");
    const r = await db.resume.findFirst({ where: { id: input.resumeId, userId: user.id } });
    return r ? parseResumeData(r.data) : parseResumeData("{}");
  })();

  const offer = await db.jobOffer.create({
    data: {
      userId: user.id,
      rawText: input.offerText,
      title: input.analysis.title,
      company: input.analysis.company,
      requirements: JSON.stringify(input.analysis.requirements satisfies Requirement[]),
    },
  });

  // Lettre + mail générés en parallèle.
  const [letterBody, mail] = await Promise.all([
    generateLetter({ data, offerText: input.offerText, company: input.analysis.company }),
    generateMail({ data, poste: input.analysis.title, company: input.analysis.company }),
  ]);

  const letter = await db.letter.create({
    data: { userId: user.id, title: `Lettre — ${input.analysis.title}`, body: letterBody },
  });
  await db.letter.create({
    data: { userId: user.id, title: `Mail — ${input.analysis.title}`, body: `${mail.subject}\n\n${mail.body}` },
  });

  const application = await db.application.create({
    data: {
      userId: user.id,
      offerId: offer.id,
      resumeId: input.resumeId ?? null,
      company: input.analysis.company || "Entreprise",
      role: input.analysis.title,
      status: "BROUILLON",
      matchScore: input.analysis.matchScore,
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
  };
}
