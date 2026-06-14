"use client";

import * as React from "react";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // En production, brancher un service d'observabilité (Sentry…).
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="font-mono text-5xl font-bold text-danger">Oups</p>
      <div className="space-y-1">
        <h1 className="text-xl font-bold">Une erreur est survenue</h1>
        <p className="max-w-md text-muted-foreground">
          Quelque chose s&apos;est mal passé de notre côté. Réessayez dans un instant.
        </p>
      </div>
      <Button onClick={reset}>
        <RotateCw className="size-4" /> Réessayer
      </Button>
    </div>
  );
}
