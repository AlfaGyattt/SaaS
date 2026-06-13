import Link from "next/link";
import type { Metadata } from "next";
import { AuthShell, GoogleButton } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/auth-forms";

export const metadata: Metadata = { title: "Créer un compte" };

export default function InscriptionPage() {
  return (
    <AuthShell
      title="Créez votre CV gratuitement"
      subtitle="Aucune carte bancaire requise. Votre premier CV en moins de 2 minutes."
      footer={
        <>
          Déjà un compte ?{" "}
          <Link href="/connexion" className="font-medium text-primary hover:underline">
            Se connecter
          </Link>
        </>
      }
    >
      <div className="space-y-3">
        <GoogleButton />
        <div className="flex items-center gap-3 py-1">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">ou par email</span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <RegisterForm />
      </div>
    </AuthShell>
  );
}
