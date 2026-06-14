"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "../db";
import { requireUser, destroySession } from "../auth";

const PLANS = ["FREE", "PASS", "PRO", "CARRIERE"] as const;

export async function updateProfile(formData: FormData) {
  const user = await requireUser();
  const name = z.string().min(1).max(80).safeParse(formData.get("name"));
  if (!name.success) return;
  await db.user.update({ where: { id: user.id }, data: { name: name.data } });
  revalidatePath("/app/parametres");
  revalidatePath("/app");
}

/** Changement de plan simulé (démo — pas de paiement réel). */
export async function upgradePlan(plan: string) {
  const user = await requireUser();
  if (!PLANS.includes(plan as (typeof PLANS)[number])) return;
  const until =
    plan === "PASS"
      ? new Date(Date.now() + 30 * 864e5)
      : plan === "FREE"
        ? null
        : new Date(Date.now() + 365 * 864e5);
  await db.user.update({ where: { id: user.id }, data: { plan, planUntil: until } });
  revalidatePath("/app/parametres");
  revalidatePath("/app");
}

/** Portabilité RGPD : export complet des données de l'utilisateur en JSON. */
export async function exportUserData(): Promise<string> {
  const user = await requireUser();
  const [resumes, letters, applications, offers] = await Promise.all([
    db.resume.findMany({ where: { userId: user.id } }),
    db.letter.findMany({ where: { userId: user.id } }),
    db.application.findMany({ where: { userId: user.id } }),
    db.jobOffer.findMany({ where: { userId: user.id } }),
  ]);
  const { passwordHash: _omit, ...safeUser } = user;
  void _omit;
  return JSON.stringify(
    { exportedAt: new Date().toISOString(), user: safeUser, resumes, letters, applications, offers },
    null,
    2,
  );
}

/** Droit à l'effacement (RGPD) : suppression définitive du compte. */
export async function deleteAccount() {
  const user = await requireUser();
  await db.user.delete({ where: { id: user.id } });
  await destroySession();
  redirect("/");
}
