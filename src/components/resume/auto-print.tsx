"use client";

import * as React from "react";

/** Déclenche l'impression du navigateur (export PDF) au chargement de la page. */
export function AutoPrint() {
  React.useEffect(() => {
    const t = setTimeout(() => window.print(), 400);
    return () => clearTimeout(t);
  }, []);
  return null;
}
