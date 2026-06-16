import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getMetier } from "@/lib/metiers";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Exemple de CV — Postulo";

export default async function Image({ params }: { params: Promise<{ metier: string }> }) {
  const { metier } = await params;
  const m = getMetier(metier);
  return renderOgImage({
    eyebrow: "Exemple de CV gratuit",
    title: m ? `CV ${m.label}` : "Exemple de CV",
  });
}
