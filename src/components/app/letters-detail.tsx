"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Copy, Save, Trash2, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { updateLetter, deleteLetter } from "@/server/actions/letter";

type Letter = { id: string; title: string; body: string };

export function LettersDetail({ letter }: { letter: Letter }) {
  const router = useRouter();
  const [title, setTitle] = React.useState(letter.title);
  const [body, setBody] = React.useState(letter.body);
  const [saved, setSaved] = React.useState(true);
  const [isSaving, startSave] = React.useTransition();
  const [isDeleting, startDelete] = React.useTransition();

  function onChangeTitle(value: string) {
    setTitle(value);
    setSaved(false);
  }
  function onChangeBody(value: string) {
    setBody(value);
    setSaved(false);
  }

  function save() {
    startSave(async () => {
      const res = await updateLetter(letter.id, body, title.trim() || undefined);
      if (res.ok) {
        setSaved(true);
        toast.success("Lettre enregistrée.");
      } else {
        toast.error("L'enregistrement a échoué. Réessayez.");
      }
    });
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(body);
      toast.success("Lettre copiée dans le presse-papier.");
    } catch {
      toast.error("Impossible de copier.");
    }
  }

  function remove() {
    startDelete(async () => {
      await deleteLetter(letter.id);
      toast.success("Lettre supprimée.");
      router.push("/app/lettres");
    });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Link
          href="/app/lettres"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Mes lettres
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <Input
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
            placeholder="Titre de la lettre"
            aria-label="Titre de la lettre"
            className="h-12 flex-1 text-lg font-semibold"
          />
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            {isSaving ? (
              <>
                <Loader2 className="size-3.5 animate-spin" /> Enregistrement…
              </>
            ) : saved ? (
              <>
                <Check className="size-3.5 text-success" /> Enregistré
              </>
            ) : (
              "Modifications non enregistrées"
            )}
          </span>
        </div>
      </div>

      <Textarea
        value={body}
        onChange={(e) => onChangeBody(e.target.value)}
        aria-label="Corps de la lettre"
        className="min-h-96 font-sans leading-relaxed"
      />

      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={save} disabled={isSaving || saved}>
          {isSaving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          Enregistrer
        </Button>
        <Button variant="outline" onClick={copy}>
          <Copy className="size-4" /> Copier
        </Button>
        <div className="ml-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="size-4" /> Supprimer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Supprimer cette lettre ?</DialogTitle>
                <DialogDescription>
                  Cette action est définitive. La lettre &quot;{title}&quot;
                  sera supprimée et ne pourra pas être récupérée.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Annuler</Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={remove}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Trash2 className="size-4" />
                  )}
                  Supprimer définitivement
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
