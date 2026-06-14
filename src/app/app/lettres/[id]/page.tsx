import { notFound } from "next/navigation";
import { requireUser } from "@/server/auth";
import { db } from "@/server/db";
import { LettersDetail } from "@/components/app/letters-detail";

export default async function LetterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireUser();
  const letter = await db.letter.findFirst({ where: { id, userId: user.id } });
  if (!letter) notFound();

  return (
    <LettersDetail
      letter={{ id: letter.id, title: letter.title, body: letter.body }}
    />
  );
}
