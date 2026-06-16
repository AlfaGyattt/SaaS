"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  Send,
  Loader2,
  Bot,
  Lightbulb,
  RotateCcw,
  Briefcase,
  ListChecks,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScoreRing } from "@/components/ui/score-ring";
import { interviewReply } from "@/server/actions/interview";
import type { InterviewMessage, InterviewReport } from "@/server/types";

type Msg = InterviewMessage;
type Entry = { msg: Msg; feedback?: string };

export function InterviewChat({
  defaultMetier,
  plan,
  contextLabel,
}: {
  defaultMetier: string;
  /** Questions attendues (issu du kit d'une candidature). */
  plan?: string[];
  /** Libellé de contexte (ex. entreprise) affiché à l'utilisateur. */
  contextLabel?: string;
}) {
  const [metier, setMetier] = React.useState(defaultMetier);
  const [started, setStarted] = React.useState(false);
  const [entries, setEntries] = React.useState<Entry[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [report, setReport] = React.useState<InterviewReport | null>(null);

  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [entries, loading, done, report]);

  const history: Msg[] = React.useMemo(() => entries.map((e) => e.msg), [entries]);

  async function start() {
    const trimmed = metier.trim();
    if (!trimmed) {
      toast.error("Précisez le métier ou le poste visé.");
      return;
    }
    setStarted(true);
    setLoading(true);
    try {
      const res = await interviewReply({ metier: trimmed, messages: [], questions: plan });
      setEntries([{ msg: { from: "ai", text: res.reply }, feedback: res.feedback }]);
      setDone(res.done);
      if (res.report) setReport(res.report);
    } catch {
      toast.error("Le simulateur est indisponible. Réessayez.");
      setStarted(false);
    } finally {
      setLoading(false);
    }
  }

  async function send() {
    const text = input.trim();
    if (!text || loading || done) return;

    const userEntry: Entry = { msg: { from: "user", text } };
    const nextHistory: Msg[] = [...history, userEntry.msg];
    setEntries((prev) => [...prev, userEntry]);
    setInput("");
    setLoading(true);
    try {
      const res = await interviewReply({
        metier: metier.trim(),
        messages: nextHistory,
        questions: plan,
      });
      setEntries((prev) => [
        ...prev,
        { msg: { from: "ai", text: res.reply }, feedback: res.feedback },
      ]);
      setDone(res.done);
      if (res.report) setReport(res.report);
    } catch {
      toast.error("La réponse n'a pas pu être générée. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  function restart() {
    setStarted(false);
    setEntries([]);
    setInput("");
    setLoading(false);
    setDone(false);
    setReport(null);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  }

  // Écran de départ
  if (!started) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card className="overflow-hidden p-0">
          <div className="border-b border-border bg-bg-subtle px-6 py-8 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <Sparkles className="size-7" />
            </div>
            <h2 className="mt-4 text-xl font-bold">
              {plan && plan.length ? "Entretien blanc pour cette offre" : "Préparez votre entretien"}
            </h2>
            <p className="mx-auto mt-1.5 max-w-md text-sm text-muted-foreground">
              {plan && plan.length
                ? "Un recruteur IA vous pose les questions attendues pour ce poste. À la fin, vous recevez un bilan noté avec vos points forts et vos axes de progrès."
                : "Un recruteur IA vous pose des questions réalistes et vous donne un conseil après chaque réponse. À la fin, un bilan noté."}
            </p>
          </div>
          <div className="space-y-4 p-6">
            <div className="space-y-1.5">
              <label htmlFor="metier" className="text-sm font-medium">
                Métier ou poste visé
              </label>
              <div className="relative">
                <Briefcase className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="metier"
                  value={metier}
                  onChange={(e) => setMetier(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      void start();
                    }
                  }}
                  placeholder="Ex. Développeur web, Chargé de communication…"
                  className="pl-9"
                />
              </div>
              {contextLabel ? (
                <p className="text-xs text-muted-foreground">
                  Préparé pour votre candidature : {contextLabel}.
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Pré-rempli à partir de votre dernier CV — modifiable.
                </p>
              )}
            </div>

            {plan && plan.length > 0 && (
              <div className="rounded-xl border border-border bg-bg-subtle p-3.5">
                <p className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <ListChecks className="size-3.5" /> {plan.length} questions au programme
                </p>
                <ul className="mt-2 space-y-1">
                  {plan.slice(0, 3).map((q, i) => (
                    <li key={i} className="line-clamp-1 text-xs text-muted-foreground">
                      • {q}
                    </li>
                  ))}
                  {plan.length > 3 && (
                    <li className="text-xs text-muted-foreground">
                      …et {plan.length - 3} autres.
                    </li>
                  )}
                </ul>
              </div>
            )}

            <Button
              variant="accent"
              size="lg"
              className="w-full"
              onClick={start}
              disabled={loading}
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              Commencer l&apos;entretien
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Écran de chat
  return (
    <div className="mx-auto max-w-2xl">
      <Card className="flex h-[calc(100vh-13rem)] min-h-[28rem] flex-col overflow-hidden p-0">
        <div className="flex items-center gap-3 border-b border-border bg-bg-subtle px-5 py-3.5">
          <div className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <Bot className="size-4.5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Recruteur IA</p>
            <p className="truncate text-xs text-muted-foreground">
              Entretien · {metier.trim() || "poste visé"}
            </p>
          </div>
          <Button variant="ghost" size="sm" className="ml-auto" onClick={restart}>
            <RotateCcw className="size-4" /> Recommencer
          </Button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-5">
          {entries.map((entry, i) => (
            <div key={i} className="space-y-2.5">
              <div
                className={cn(
                  "flex items-end gap-2.5",
                  entry.msg.from === "user" ? "justify-end" : "justify-start",
                )}
              >
                {entry.msg.from === "ai" && (
                  <div className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Bot className="size-4" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[82%] whitespace-pre-wrap px-4 py-2.5 text-sm leading-relaxed shadow-xs",
                    entry.msg.from === "ai"
                      ? "rounded-2xl rounded-tl-sm bg-muted text-foreground"
                      : "rounded-2xl rounded-tr-sm bg-primary text-primary-foreground",
                  )}
                >
                  {entry.msg.text}
                </div>
              </div>

              {entry.feedback && (
                <div className="ml-9 max-w-[82%] rounded-xl border border-border bg-bg-subtle px-3.5 py-2.5">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <Lightbulb className="size-3.5 text-accent" /> Conseil
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {entry.feedback}
                  </p>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-end gap-2.5">
              <div className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                <Bot className="size-4" />
              </div>
              <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" /> Le recruteur réfléchit…
              </div>
            </div>
          )}

          {done && !loading && report && (
            <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary-50 to-surface p-5">
              <div className="flex items-center gap-4">
                <ScoreRing value={report.score} size={88} stroke={8} label="Score" />
                <div>
                  <p className="font-semibold">Bilan de l&apos;entretien</p>
                  <p className="text-sm text-muted-foreground">{report.synthese}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {report.pointsForts.length > 0 && (
                  <div className="rounded-xl border border-success/30 bg-success/5 p-3.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-success">
                      Points forts
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {report.pointsForts.map((p, i) => (
                        <li key={i} className="text-sm text-foreground">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {report.axes.length > 0 && (
                  <div className="rounded-xl border border-warning/30 bg-warning/5 p-3.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-warning">
                      Axes de progrès
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {report.axes.map((p, i) => (
                        <li key={i} className="text-sm text-foreground">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="accent" size="sm" onClick={restart}>
                  <RotateCcw className="size-4" /> Refaire l&apos;entretien
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/app/candidatures">Voir mes candidatures</Link>
                </Button>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="border-t border-border bg-card p-3 sm:p-4">
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={
                done ? "L'entretien est terminé. Recommencez pour vous entraîner." : "Rédigez votre réponse…"
              }
              aria-label="Votre réponse"
              disabled={loading || done}
              className="max-h-40 min-h-12 flex-1 resize-none"
              rows={1}
            />
            <Button
              size="icon"
              aria-label="Envoyer la réponse"
              onClick={send}
              disabled={loading || done || input.trim().length === 0}
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            </Button>
          </div>
          <p className="mt-2 px-1 text-[11px] text-muted-foreground">
            Entrée pour envoyer · Maj+Entrée pour un retour à la ligne.
          </p>
        </div>
      </Card>
    </div>
  );
}
