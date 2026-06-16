"use client";

import Link from "next/link";
import { Mail, FileText, MessageSquare, Lightbulb, Tag, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InterviewKitView } from "@/components/app/interview-kit";
import type { InterviewKit } from "@/server/types";

function CopyButton({ text, label }: { text: string; label: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          toast.success(`${label} copié dans le presse-papier.`);
        } catch {
          toast.error("Impossible de copier.");
        }
      }}
    >
      <Copy className="size-4" /> Copier
    </Button>
  );
}

export type DossierData = {
  letterBody: string | null;
  mailSubject: string | null;
  mailBody: string | null;
  kit: InterviewKit | null;
  cvTips: string[];
  keywords: string[];
};

export function DossierTabs({ data }: { data: DossierData }) {
  return (
    <Tabs defaultValue={data.kit ? "entretien" : "lettre"}>
      <TabsList className="flex w-full flex-wrap">
        {data.kit && (
          <TabsTrigger value="entretien">
            <MessageSquare className="size-4" /> Entretien
          </TabsTrigger>
        )}
        <TabsTrigger value="lettre">
          <Mail className="size-4" /> Lettre
        </TabsTrigger>
        <TabsTrigger value="mail">
          <FileText className="size-4" /> Mail
        </TabsTrigger>
        <TabsTrigger value="cv">
          <Lightbulb className="size-4" /> CV
        </TabsTrigger>
      </TabsList>

      {data.kit && (
        <TabsContent value="entretien" className="mt-4">
          <InterviewKitView kit={data.kit} />
        </TabsContent>
      )}

      <TabsContent value="lettre" className="mt-4">
        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <span className="flex items-center gap-2 text-sm font-medium">
              <Mail className="size-4 text-primary" /> Lettre de motivation
            </span>
            {data.letterBody && <CopyButton text={data.letterBody} label="Lettre" />}
          </div>
          <pre className="max-h-96 overflow-auto whitespace-pre-wrap px-4 py-3.5 font-sans text-sm leading-relaxed">
            {data.letterBody || "Aucune lettre enregistrée pour cette candidature."}
          </pre>
        </Card>
      </TabsContent>

      <TabsContent value="mail" className="mt-4">
        <Card className="overflow-hidden p-0">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <span className="flex items-center gap-2 text-sm font-medium">
              <FileText className="size-4 text-primary" /> Mail de candidature
            </span>
            {data.mailBody && (
              <CopyButton
                text={`Objet : ${data.mailSubject ?? ""}\n\n${data.mailBody}`}
                label="Mail"
              />
            )}
          </div>
          <div className="px-4 py-3.5 text-sm">
            {data.mailSubject && <p className="font-medium">Objet : {data.mailSubject}</p>}
            <pre className="mt-1.5 whitespace-pre-wrap font-sans leading-relaxed text-muted-foreground">
              {data.mailBody || "Aucun mail enregistré pour cette candidature."}
            </pre>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="cv" className="mt-4">
        <Card className="p-5">
          <p className="flex items-center gap-2 font-semibold">
            <Lightbulb className="size-4.5 text-accent-600" /> Adaptez votre CV à cette offre
          </p>
          {data.cvTips.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {data.cvTips.map((t, i) => (
                <li key={i} className="flex gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Reprenez le vocabulaire exact de l&apos;offre dans votre titre et votre accroche.
            </p>
          )}
          {data.keywords.length > 0 && (
            <>
              <p className="mt-4 flex items-center gap-2 text-sm font-medium">
                <Tag className="size-4 text-primary" /> Mots-clés ATS
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {data.keywords.map((k) => (
                  <span
                    key={k}
                    className="rounded-full border border-border bg-bg-subtle px-2.5 py-1 text-xs"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </>
          )}
          <Button variant="outline" size="sm" className="mt-5" asChild>
            <Link href="/app/cv">
              <FileText className="size-4" /> Modifier mon CV
            </Link>
          </Button>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
