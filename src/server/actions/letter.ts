"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "../db";
import { requireUser } from "../auth";

export async function updateLetter(id: string, body: string, title?: string) {
  const user = await requireUser();
  const parsed = z.string().max(8000).safeParse(body);
  if (!parsed.success) return { ok: false };
  await db.letter.update({
    where: { id, userId: user.id },
    data: { body: parsed.data, ...(title ? { title } : {}) },
  });
  revalidatePath(`/app/lettres/${id}`);
  revalidatePath("/app/lettres");
  return { ok: true };
}

export async function deleteLetter(id: string) {
  const user = await requireUser();
  await db.letter.delete({ where: { id, userId: user.id } });
  revalidatePath("/app/lettres");
}
