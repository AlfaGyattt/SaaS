"use server";

import { requireUser } from "../auth";
import { interviewTurn, type InterviewMessage } from "../ai";

export async function interviewReply(input: {
  metier: string;
  messages: InterviewMessage[];
}): Promise<{ reply: string; feedback?: string; done: boolean }> {
  await requireUser();
  const metier = (input.metier || "le poste visé").slice(0, 120);
  const messages = input.messages.slice(-12); // borne le contexte
  return interviewTurn({ metier, messages });
}
