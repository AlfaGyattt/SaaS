import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const base = SITE.url.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/app", "/imprimer", "/connexion", "/inscription"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
