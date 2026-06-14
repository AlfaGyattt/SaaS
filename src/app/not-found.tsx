import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo />
      <p className="font-mono text-6xl font-bold text-primary">404</p>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Page introuvable</h1>
        <p className="max-w-md text-muted-foreground">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/">
            <Home className="size-4" /> Retour à l&apos;accueil
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/modele-cv">
            <Search className="size-4" /> Voir les modèles de CV
          </Link>
        </Button>
      </div>
    </div>
  );
}
