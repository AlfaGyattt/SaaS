import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getArticle } from "@/lib/articles";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Conseils carrière — Postulo";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  return renderOgImage({
    eyebrow: a?.categorie ?? "Conseils carrière",
    title: a ? a.titre : "Conseils carrière",
  });
}
