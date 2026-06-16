"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { db } from "../db";
import { createSession, destroySession, hashPassword, verifyPassword } from "../auth";

const credsSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
  name: z.string().optional(),
});

export type AuthState = { error?: string };

export async function registerAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = credsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }
  const { email, password, name } = parsed.data;

  // Les opérations base de données sont isolées : en cas d'échec (base
  // indisponible…), on renvoie un message clair plutôt que de planter.
  // redirect() est appelé HORS du try (il lève volontairement une exception).
  try {
    const existing = await db.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) {
      return { error: "Un compte existe déjà avec cette adresse. Connectez-vous." };
    }
    const user = await db.user.create({
      data: {
        email: email.toLowerCase(),
        name: name?.trim() || email.split("@")[0],
        passwordHash: await hashPassword(password),
      },
    });
    await createSession(user.id);
  } catch (err) {
    console.error("registerAction:", err);
    return { error: "Service momentanément indisponible. Réessayez dans un instant." };
  }
  redirect("/app");
}

export async function loginAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = credsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Données invalides" };
  }
  const { email, password } = parsed.data;

  try {
    const user = await db.user.findUnique({ where: { email: email.toLowerCase() } });
    // Message identique que l'email existe ou non (anti-énumération).
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return { error: "Email ou mot de passe incorrect." };
    }
    await createSession(user.id);
  } catch (err) {
    console.error("loginAction:", err);
    return { error: "Service momentanément indisponible. Réessayez dans un instant." };
  }
  redirect("/app");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
