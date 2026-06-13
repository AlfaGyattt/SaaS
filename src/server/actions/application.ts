"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";
import { requireUser } from "../auth";
import { APP_STATUSES, type AppStatus } from "../types";

export async function updateApplicationStatus(id: string, status: AppStatus) {
  const user = await requireUser();
  if (!APP_STATUSES.includes(status)) return;
  await db.application.update({
    where: { id, userId: user.id },
    data: {
      status,
      // Relance programmée à J+7 quand on passe à "envoyée".
      nextFollowUpAt:
        status === "ENVOYEE" ? new Date(Date.now() + 7 * 864e5) : undefined,
    },
  });
  revalidatePath("/app/candidatures");
  revalidatePath("/app");
}

export async function createApplication(formData: FormData) {
  const user = await requireUser();
  await db.application.create({
    data: {
      userId: user.id,
      company: (formData.get("company") as string) || "Entreprise",
      role: (formData.get("role") as string) || "Poste",
      city: (formData.get("city") as string) || null,
      status: "BROUILLON",
    },
  });
  revalidatePath("/app/candidatures");
}

export async function deleteApplication(id: string) {
  const user = await requireUser();
  await db.application.delete({ where: { id, userId: user.id } });
  revalidatePath("/app/candidatures");
}
