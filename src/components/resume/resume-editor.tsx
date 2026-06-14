"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Plus,
  Trash2,
  Check,
  Loader2,
  Download,
  Wand2,
  Eye,
  Pencil,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { ScoreRing } from "@/components/ui/score-ring";
import { ResumeCanvas } from "@/components/resume/resume-canvas";
import { saveResume, suggestAccroche, improveText } from "@/server/actions/resume";
import type { Experience, Formation, Langue, ResumeData } from "@/server/types";
import { cn } from "@/lib/utils";

const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const TEMPLATES: { id: string; label: string; color: string }[] = [
  { id: "sobre", label: "Sobre", color: "#334155" },
  { id: "moderne", label: "Moderne", color: "#3d5afe" },
  { id: "elegant", label: "Élégant", color: "#059669" },
  { id: "compact", label: "Compact", color: "#b45309" },
  { id: "creatif", label: "Créatif", color: "#ff6b4a" },
  { id: "classique", label: "Classique", color: "#3f3f46" },
];

type SaveStatus = "idle" | "saving" | "saved";

export function ResumeEditor({
  id,
  initialTitle,
  initialData,
  initialScore,
  templateId,
}: {
  id: string;
  initialTitle: string;
  initialData: ResumeData;
  initialScore: number;
  templateId: string;
}) {
  const [title, setTitle] = React.useState(initialTitle);
  const [data, setData] = React.useState<ResumeData>(initialData);
  const [template, setTemplate] = React.useState(templateId);
  const [score, setScore] = React.useState(initialScore);
  const [status, setStatus] = React.useState<SaveStatus>("idle");
  const [aiAccroche, setAiAccroche] = React.useState(false);
  const [tab, setTab] = React.useState<"edit" | "preview">("edit");
  const firstRender = React.useRef(true);

  // Autosave (debounce 900 ms)
  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setStatus("saving");
    const t = setTimeout(async () => {
      try {
        const res = await saveResume(id, data, title, template);
        setScore(res.score);
        setStatus("saved");
      } catch {
        setStatus("idle");
        toast.error("Échec de l'enregistrement. Vérifiez votre connexion.");
      }
    }, 900);
    return () => clearTimeout(t);
  }, [data, title, template, id]);

  const set = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  async function onSuggestAccroche() {
    setAiAccroche(true);
    try {
      await saveResume(id, data, title, template); // profil à jour avant suggestion
      const { text } = await suggestAccroche(id);
      if (text) {
        set("accroche", text);
        toast.success("Accroche générée par l'IA.");
      }
    } catch {
      toast.error("La génération a échoué. Réessayez.");
    } finally {
      setAiAccroche(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Barre d'action contextuelle */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" size="sm" asChild className="shrink-0">
          <Link href="/app/cv">
            <ArrowLeft className="size-4" /> Mes CV
          </Link>
        </Button>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-9 max-w-xs font-medium"
          aria-label="Titre du CV"
        />
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {status === "saving" && (
            <>
              <Loader2 className="size-3.5 animate-spin" /> Enregistrement…
            </>
          )}
          {status === "saved" && (
            <>
              <Check className="size-3.5 text-success" /> Enregistré
            </>
          )}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <ScoreRing value={score} size={40} stroke={4} label="" />
            <span className="text-xs text-muted-foreground">
              Score
              <br />
              ATS
            </span>
          </div>
          <div className="hidden items-center gap-1 rounded-lg border border-border p-1 md:flex">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                title={t.label}
                aria-label={`Modèle ${t.label}`}
                aria-pressed={template === t.id}
                className={cn(
                  "size-5 rounded-full ring-offset-2 ring-offset-background transition-all",
                  template === t.id ? "ring-2 ring-primary" : "hover:scale-110",
                )}
                style={{ backgroundColor: t.color }}
              />
            ))}
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={`/imprimer/cv/${id}`} target="_blank" rel="noopener noreferrer">
              <Download className="size-4" /> PDF
            </a>
          </Button>
          <Button variant="accent" size="sm" asChild>
            <Link href="/app/postuler">
              <Wand2 className="size-4" /> Adapter à une offre
            </Link>
          </Button>
        </div>
      </div>

      {/* Onglets mobile */}
      <div className="flex gap-2 lg:hidden">
        <TabButton active={tab === "edit"} onClick={() => setTab("edit")} icon={Pencil}>
          Édition
        </TabButton>
        <TabButton active={tab === "preview"} onClick={() => setTab("preview")} icon={Eye}>
          Aperçu
        </TabButton>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        {/* Édition */}
        <div className={cn("space-y-5", tab === "preview" && "hidden lg:block")}>
          <Block title="Identité">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Prénom">
                <Input value={data.prenom} onChange={(e) => set("prenom", e.target.value)} />
              </Field>
              <Field label="Nom">
                <Input value={data.nom} onChange={(e) => set("nom", e.target.value)} />
              </Field>
            </div>
            <Field label="Titre du CV (poste visé)">
              <Input
                value={data.titre}
                onChange={(e) => set("titre", e.target.value)}
                placeholder="ex. Aide-soignante diplômée"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Email">
                <Input value={data.email} onChange={(e) => set("email", e.target.value)} />
              </Field>
              <Field label="Téléphone">
                <Input value={data.telephone} onChange={(e) => set("telephone", e.target.value)} />
              </Field>
            </div>
            <div className="grid grid-cols-2 items-end gap-3">
              <Field label="Ville">
                <Input value={data.ville} onChange={(e) => set("ville", e.target.value)} />
              </Field>
              <label className="flex h-11 items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={data.permis}
                  onChange={(e) => set("permis", e.target.checked)}
                  className="size-4 accent-[var(--primary)]"
                />
                Permis B
              </label>
            </div>
          </Block>

          <Block
            title="Accroche"
            action={
              <Button variant="ghost" size="sm" onClick={onSuggestAccroche} disabled={aiAccroche}>
                {aiAccroche ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Sparkles className="size-3.5" />
                )}
                Suggérer
              </Button>
            }
          >
            <Textarea
              value={data.accroche}
              onChange={(e) => set("accroche", e.target.value)}
              placeholder="2-3 phrases qui résument votre profil et votre objectif."
              className="min-h-20"
            />
          </Block>

          <ExperiencesBlock
            items={data.experiences}
            onChange={(experiences) => set("experiences", experiences)}
          />

          <FormationsBlock
            items={data.formations}
            onChange={(formations) => set("formations", formations)}
          />

          <Block title="Compétences">
            <TagInput
              values={data.competences}
              onChange={(competences) => set("competences", competences)}
              placeholder="Ajouter une compétence et appuyer sur Entrée"
            />
          </Block>

          <LanguesBlock items={data.langues} onChange={(langues) => set("langues", langues)} />

          <Block title="Centres d'intérêt">
            <TagInput
              values={data.interets}
              onChange={(interets) => set("interets", interets)}
              placeholder="ex. Course à pied, bénévolat…"
            />
          </Block>
        </div>

        {/* Aperçu live */}
        <div className={cn(tab === "edit" && "hidden lg:block")}>
          <div className="lg:sticky lg:top-20">
            <div className="rounded-xl border border-border bg-bg-subtle p-4">
              <ResumeCanvas data={data} templateId={template} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Sous-blocs ---------- */

function ExperiencesBlock({
  items,
  onChange,
}: {
  items: Experience[];
  onChange: (v: Experience[]) => void;
}) {
  const [busy, setBusy] = React.useState<string | null>(null);
  const add = () =>
    onChange([
      ...items,
      { id: uid(), poste: "", entreprise: "", debut: "", fin: "", ville: "", description: "" },
    ]);
  const update = (id: string, patch: Partial<Experience>) =>
    onChange(items.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  const remove = (id: string) => onChange(items.filter((e) => e.id !== id));

  async function improve(e: Experience) {
    if (!e.description.trim()) {
      toast.info("Écrivez d'abord une description à améliorer.");
      return;
    }
    setBusy(e.id);
    try {
      const { text } = await improveText(e.description);
      if (text) {
        update(e.id, { description: text });
        toast.success("Description améliorée.");
      }
    } catch {
      toast.error("L'amélioration a échoué. Réessayez.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <Block
      title="Expériences professionnelles"
      action={
        <Button variant="ghost" size="sm" onClick={add}>
          <Plus className="size-3.5" /> Ajouter
        </Button>
      }
    >
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Aucune expérience. Cliquez sur « Ajouter ».
        </p>
      )}
      <div className="space-y-4">
        {items.map((e) => (
          <div key={e.id} className="rounded-lg border border-border p-3">
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={e.poste}
                onChange={(ev) => update(e.id, { poste: ev.target.value })}
                placeholder="Poste"
              />
              <Input
                value={e.entreprise}
                onChange={(ev) => update(e.id, { entreprise: ev.target.value })}
                placeholder="Entreprise"
              />
              <Input
                value={e.debut}
                onChange={(ev) => update(e.id, { debut: ev.target.value })}
                placeholder="Début (ex. 2022)"
              />
              <Input
                value={e.fin}
                onChange={(ev) => update(e.id, { fin: ev.target.value })}
                placeholder="Fin (ou « Aujourd'hui »)"
              />
            </div>
            <Textarea
              value={e.description}
              onChange={(ev) => update(e.id, { description: ev.target.value })}
              placeholder="Vos missions et résultats concrets…"
              className="mt-2 min-h-16"
            />
            <div className="mt-2 flex justify-between">
              <Button variant="ghost" size="sm" onClick={() => improve(e)} disabled={busy === e.id}>
                {busy === e.id ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Sparkles className="size-3.5" />
                )}
                Améliorer
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => remove(e.id)}
                className="text-danger hover:text-danger"
              >
                <Trash2 className="size-3.5" /> Supprimer
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Block>
  );
}

function FormationsBlock({
  items,
  onChange,
}: {
  items: Formation[];
  onChange: (v: Formation[]) => void;
}) {
  const add = () => onChange([...items, { id: uid(), diplome: "", ecole: "", annee: "" }]);
  const update = (id: string, patch: Partial<Formation>) =>
    onChange(items.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  const remove = (id: string) => onChange(items.filter((f) => f.id !== id));

  return (
    <Block
      title="Formation"
      action={
        <Button variant="ghost" size="sm" onClick={add}>
          <Plus className="size-3.5" /> Ajouter
        </Button>
      }
    >
      <div className="space-y-2">
        {items.map((f) => (
          <div key={f.id} className="flex items-center gap-2">
            <Input
              value={f.diplome}
              onChange={(e) => update(f.id, { diplome: e.target.value })}
              placeholder="Diplôme"
            />
            <Input
              value={f.ecole}
              onChange={(e) => update(f.id, { ecole: e.target.value })}
              placeholder="École"
            />
            <Input
              value={f.annee}
              onChange={(e) => update(f.id, { annee: e.target.value })}
              placeholder="Année"
              className="max-w-24"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => remove(f.id)}
              className="shrink-0 text-danger hover:text-danger"
              aria-label="Supprimer"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </Block>
  );
}

function LanguesBlock({
  items,
  onChange,
}: {
  items: Langue[];
  onChange: (v: Langue[]) => void;
}) {
  const niveaux = ["A1", "A2", "B1", "B2", "C1", "C2", "Natif"];
  const add = () => onChange([...items, { id: uid(), langue: "", niveau: "B2" }]);
  const update = (id: string, patch: Partial<Langue>) =>
    onChange(items.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  const remove = (id: string) => onChange(items.filter((l) => l.id !== id));

  return (
    <Block
      title="Langues (CECRL)"
      action={
        <Button variant="ghost" size="sm" onClick={add}>
          <Plus className="size-3.5" /> Ajouter
        </Button>
      }
    >
      <div className="space-y-2">
        {items.map((l) => (
          <div key={l.id} className="flex items-center gap-2">
            <Input
              value={l.langue}
              onChange={(e) => update(l.id, { langue: e.target.value })}
              placeholder="Langue"
            />
            <select
              value={l.niveau}
              onChange={(e) => update(l.id, { niveau: e.target.value })}
              className="h-11 rounded-md border border-input bg-surface px-3 text-sm"
            >
              {niveaux.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => remove(l.id)}
              className="shrink-0 text-danger hover:text-danger"
              aria-label="Supprimer"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </Block>
  );
}

/* ---------- Primitives d'édition ---------- */

function Block({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        {action}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function TagInput({
  values,
  onChange,
  placeholder,
}: {
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = React.useState("");
  const add = () => {
    const v = input.trim();
    if (v && !values.includes(v)) onChange([...values, v]);
    setInput("");
  };
  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-1.5">
        {values.map((v) => (
          <span
            key={v}
            className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-1 text-xs text-primary-700"
          >
            {v}
            <button
              onClick={() => onChange(values.filter((x) => x !== v))}
              className="hover:text-danger"
              aria-label={`Retirer ${v}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add();
          }
        }}
        onBlur={add}
        placeholder={placeholder}
      />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium",
        active ? "border-primary bg-primary-50 text-primary-700" : "border-border text-muted-foreground",
      )}
    >
      <Icon className="size-4" /> {children}
    </button>
  );
}
