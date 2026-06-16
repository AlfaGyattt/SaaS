import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";

const COOKIE = "postulo_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 jours

function secret() {
  // En production, AUTH_SECRET est obligatoire. En développement local, on
  // retombe sur une valeur par défaut pour que l'app fonctionne sans configuration.
  const s =
    process.env.AUTH_SECRET ||
    (process.env.NODE_ENV !== "production"
      ? "postulo-dev-secret-insecure-change-in-production"
      : undefined);
  if (!s) throw new Error("AUTH_SECRET manquant en production");
  return new TextEncoder().encode(s);
}

export function hashPassword(pw: string) {
  return bcrypt.hash(pw, 10);
}
export function verifyPassword(pw: string, hash: string) {
  return bcrypt.compare(pw, hash);
}

export async function createSession(userId: string) {
  const token = await new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret());

  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

/** Identifiant de l'utilisateur courant (ou null) — vérifie la signature du cookie. */
export async function getSessionUserId(): Promise<string | null> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return (payload.sub as string) ?? null;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const id = await getSessionUserId();
  if (!id) return null;
  return db.user.findUnique({ where: { id } });
}

/** À utiliser dans les pages protégées : redirige vers /connexion si non connecté. */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion");
  return user;
}
