import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { METIERS } from "@/lib/metiers";
import { ARTICLES } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = ["", "/modele-cv", "/conseils", "/inscription", "/connexion"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const metierRoutes = METIERS.flatMap((m) => [
    {
      url: `${base}/exemple-cv/${m.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${base}/lettre-de-motivation/${m.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]);

  const articleRoutes = ARTICLES.map((a) => ({
    url: `${base}/conseils/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...metierRoutes, ...articleRoutes];
}
