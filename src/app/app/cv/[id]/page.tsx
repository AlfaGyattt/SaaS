import { notFound } from "next/navigation";
import { requireUser } from "@/server/auth";
import { db } from "@/server/db";
import { parseResumeData } from "@/server/types";
import { ResumeEditor } from "@/components/resume/resume-editor";

export default async function ResumeEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireUser();
  const resume = await db.resume.findFirst({ where: { id, userId: user.id } });
  if (!resume) notFound();

  return (
    <ResumeEditor
      id={resume.id}
      initialTitle={resume.title}
      initialData={parseResumeData(resume.data)}
      initialScore={resume.atsScore ?? 0}
      templateId={resume.templateId}
    />
  );
}
