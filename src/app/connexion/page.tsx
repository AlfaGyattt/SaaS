import Link from "next/link";
import type { Metadata } from "next";
import { AuthShell, GoogleButton } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/auth-forms";

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
          <span className="text-xs text-muted-foreground">ou par email</span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <LoginForm />
      </div>
    </AuthShell>
  );
}
