import Link from "next/link";
import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { AuthShell, GoogleButton } from "@/components/auth/auth-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Se connecter" };

export default function ConnexionPage() {
  return (
    <AuthShell
      title="Content de vous revoir"
      subtitle="Connectez-vous pour retrouver vos CV et vos candidatures."
      footer={
        <>
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-medium text-primary hover:underline">
            Créer un compte
          </Link>
        </>
      }
    >
      <div className="space-y-3">
        <GoogleButton />
        <div className="flex items-center gap-3 py-1">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">ou</span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <form className="space-y-3" action="/app">
          <Input type="email" placeholder="vous@email.com" aria-label="Adresse email" required />
          <Button type="submit" className="w-full" size="lg">
            <Mail className="size-4" /> Recevoir un lien de connexion
          </Button>
        </form>
        <p className="text-center text-xs text-muted-foreground">
          Nous vous envoyons un lien magique, sans mot de passe.
        </p>
      </div>
    </AuthShell>
  );
}
