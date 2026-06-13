"use client";

import { useActionState } from "react";
import { Mail, AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerAction, loginAction, type AuthState } from "@/server/actions/auth";

function ErrorBanner({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-2 rounded-lg border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger">
      <AlertCircle className="size-4 shrink-0" /> {message}
    </p>
  );
}

export function RegisterForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(registerAction, {});
  return (
    <form action={action} className="space-y-3">
      <ErrorBanner message={state.error} />
      <Input name="name" placeholder="Votre prénom" aria-label="Prénom" autoComplete="given-name" />
      <Input
        name="email"
        type="email"
        placeholder="vous@email.com"
        aria-label="Adresse email"
        autoComplete="email"
        required
      />
      <Input
        name="password"
        type="password"
        placeholder="Mot de passe (6 caractères min.)"
        aria-label="Mot de passe"
        autoComplete="new-password"
        required
      />
      <Button type="submit" className="w-full" size="lg" disabled={pending}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Mail className="size-4" />}
        Créer mon compte gratuitement
      </Button>
    </form>
  );
}

export function LoginForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(loginAction, {});
  return (
    <form action={action} className="space-y-3">
      <ErrorBanner message={state.error} />
      <Input
        name="email"
        type="email"
        placeholder="vous@email.com"
        aria-label="Adresse email"
        autoComplete="email"
        required
      />
      <Input
        name="password"
        type="password"
        placeholder="Mot de passe"
        aria-label="Mot de passe"
        autoComplete="current-password"
        required
      />
      <Button type="submit" className="w-full" size="lg" disabled={pending}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Mail className="size-4" />}
        Se connecter
      </Button>
    </form>
  );
}
