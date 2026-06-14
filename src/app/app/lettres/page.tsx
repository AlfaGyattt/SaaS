import Link from "next/link";
import { Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/server/auth";
import { db } from "@/server/db";

export default async function LettresPage() {
  const user = await requireUser();
  const letters = await db.letter.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mes lettres</h1>
          <p className="text-sm text-muted-foreground">
            {letters.length} lettre{letters.length > 1 ? "s" : ""} de motivation
          </p>
        </div>
        {letters.length > 0 && (
          <Button asChild>
            <Link href="/app/postuler">
              <Mail className="size-4" /> Générer une lettre
            </Link>
          </Button>
        )}
      </div>

      {letters.length === 0 ? (
        <Card className="grid place-items-center border-2 border-dashed border-border bg-bg-subtle px-6 py-16 text-center shadow-none">
          <div className="grid size-14 place-items-center rounded-full bg-primary-50 text-primary">
            <Mail className="size-6" />
          </div>
          <p className="mt-4 text-lg font-semibold">Aucune lettre pour l&apos;instant</p>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Générez une lettre de motivation structurée à la française
            (Vous-Moi-Nous) à partir d&apos;une offre, en quelques secondes.
          </p>
          <Button asChild className="mt-6">
            <Link href="/app/postuler">
              <Mail className="size-4" /> Générer une lettre depuis une offre
            </Link>
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {letters.map((letter) => (
            <Link key={letter.id} href={`/app/lettres/${letter.id}`}>
              <Card className="flex h-full flex-col p-5 transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary-50 text-primary">
                    <Mail className="size-5" />
                  </div>
                  <Badge variant="muted">
                    {letter.tone}
                  </Badge>
                </div>
                <p className="mt-3 line-clamp-2 font-medium">{letter.title}</p>
                <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
                  {letter.body}
                </p>
                <p className="mt-auto pt-3 text-xs text-muted-foreground">
                  {letter.createdAt.toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
