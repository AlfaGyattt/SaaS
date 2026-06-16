"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "../db";
import { requireUser } from "../auth";
import {
  emptyResumeData,
  parseResumeData,
  resumeDataSchema,
  type ResumeData,
} from "../types";
import { generateAccroche, improveBullet, scoreAts } from "../ai";
import { CV_TEMPLATE_IDS, DEFAULT_TEMPLATE } from "@/lib/cv-templates";

const TEMPLATES = CV_TEMPLATE_IDS;

export async function createResume(formData?: FormData): Promise<void> {
  const user = await requireUser();
  const title = (formData?.get("title") as string) || "Nouveau CV";
  const templateRaw = formData?.get("templateId") as string | null;
  const templateId =
    templateRaw && TEMPLATES.includes(templateRaw) ? templateRaw : DEFAULT_TEMPLATE;
  const data = emptyResumeData();
  data.prenom = user.name?.split(" ")[0] ?? "";
  data.email = user.email;
  const resume = await db.resume.create({
    data: {
      userId: user.id,
      title,
      templateId,
      data: JSON.stringify(data),
      atsScore: scoreAts(data).score,
    },
  });
  revalidatePath("/app/cv");
  redirect(`/app/cv/${resume.id}`);
}

export async function saveResume(
  id: string,
  data: ResumeData,
  title?: string,
  templateId?: string,
) {
  const user = await requireUser();
  const parsed = resumeDataSchema.parse(data);
  const { score } = scoreAts(parsed);
  await db.resume.update({
    where: { id, userId: user.id },
    data: {
      data: JSON.stringify(parsed),
      atsScore: score,
      ...(title ? { title } : {}),
      ...(templateId && TEMPLATES.includes(templateId) ? { templateId } : {}),
    },
  });
  revalidatePath(`/app/cv/${id}`);
  revalidatePath("/app/cv");
  return { ok: true, score };
}

export async function deleteResume(id: string) {
  const user = await requireUser();
  await db.resume.delete({ where: { id, userId: user.id } });
  revalidatePath("/app/cv");
}

export async function suggestAccroche(id: string) {
  const user = await requireUser();
  const resume = await db.resume.findFirst({ where: { id, userId: user.id } });
  if (!resume) return { text: "" };
  const text = await generateAccroche(parseResumeData(resume.data));
  return { text };
}

export async function improveText(text: string) {
  await requireUser();
  if (!text.trim()) return { text: "" };
  return { text: await improveBullet(text) };
}
