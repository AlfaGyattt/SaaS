"use server";

import { requireUser } from "../auth";
import { interviewTurn, type InterviewMessage, type InterviewResult } from "../ai";

export async function interviewReply(input: {
  metier: string;
  messages: InterviewMessage[];
  /** Plan de questions attendues (issu du kit d'une candidature). Facultatif. */
  questions?: string[];
}): Promise<InterviewResult> {
  await requireUser();
  const metier = (input.metier || "le poste visé").slice(0, 120);
  const messages = input.messages.slice(-12); // borne le contexte
  const questions = input.questions?.slice(0, 10);
  return interviewTurn({ metier, messages, questions });
}
