import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requireUser } from "@/server/auth";
import { db } from "@/server/db";
import { parseResumeData } from "@/server/types";
import { ResumeCanvas } from "@/components/resume/resume-canvas";
import { AutoPrint } from "@/components/resume/auto-print";

export const metadata: Metadata = { title: "Export du CV", robots: { index: false } };

export default async function PrintResumePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireUser();
  const resume = await db.resume.findFirst({ where: { id, userId: user.id } });
  if (!resume) notFound();

  return (
    <div className="print-root min-h-screen bg-slate-100 py-8 print:bg-white print:py-0">
      <AutoPrint />
      <ResumeCanvas
        data={parseResumeData(resume.data)}
        templateId={resume.templateId}
        className="print:max-w-none print:shadow-none"
      />
      <p className="mt-4 text-center text-xs text-slate-500 print:hidden">
        La fenêtre d&apos;impression s&apos;ouvre automatiquement. Choisissez « Enregistrer au
        format PDF ».
      </p>
    </div>
  );
}
