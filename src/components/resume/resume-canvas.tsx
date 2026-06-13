import { Mail, Phone, MapPin, Car } from "lucide-react";
import type { ResumeData } from "@/server/types";
import { cn } from "@/lib/utils";

const ACCENTS: Record<string, string> = {
  sobre: "#334155",
  moderne: "#3d5afe",
  elegant: "#059669",
  compact: "#b45309",
  creatif: "#ff6b4a",
  classique: "#3f3f46",
};

/** Rendu fidèle du CV (aperçu écran + export PDF). Mise en page ATS-safe (1 colonne). */
export function ResumeCanvas({
  data,
  templateId = "sobre",
  className,
}: {
  data: ResumeData;
  templateId?: string;
  className?: string;
}) {
  const accent = ACCENTS[templateId] ?? ACCENTS.sobre;
  const fullName = `${data.prenom} ${data.nom}`.trim() || "Votre Nom";

  return (
    <div
      className={cn(
        "mx-auto aspect-[210/297] w-full max-w-[640px] overflow-hidden bg-white p-8 text-[11px] leading-relaxed text-slate-800 shadow-sm",
        className,
      )}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {/* En-tête */}
      <header className="border-b-2 pb-3" style={{ borderColor: accent }}>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{fullName}</h1>
        {data.titre && (
          <p className="mt-0.5 text-sm font-medium" style={{ color: accent }}>
            {data.titre}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-600">
          {data.email && (
            <span className="inline-flex items-center gap-1">
              <Mail className="size-3" /> {data.email}
            </span>
          )}
          {data.telephone && (
            <span className="inline-flex items-center gap-1">
              <Phone className="size-3" /> {data.telephone}
            </span>
          )}
          {data.ville && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3" /> {data.ville}
            </span>
          )}
          {data.permis && (
            <span className="inline-flex items-center gap-1">
              <Car className="size-3" /> Permis B
            </span>
          )}
        </div>
      </header>

      {data.accroche && <p className="mt-3 text-[11px] italic text-slate-700">{data.accroche}</p>}

      {data.experiences.length > 0 && (
        <Section title="Expériences professionnelles" accent={accent}>
          {data.experiences.map((e) => (
            <div key={e.id} className="mb-2.5">
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-semibold text-slate-900">
                  {e.poste}
                  {e.entreprise && <span className="font-normal text-slate-600"> — {e.entreprise}</span>}
                </p>
                <span className="shrink-0 text-[10px] text-slate-500">
                  {e.debut}
                  {e.fin && ` – ${e.fin}`}
                </span>
              </div>
              {e.description && (
                <p className="mt-0.5 whitespace-pre-line text-slate-700">{e.description}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {data.formations.length > 0 && (
        <Section title="Formation" accent={accent}>
          {data.formations.map((f) => (
            <div key={f.id} className="mb-1.5 flex items-baseline justify-between gap-2">
              <p className="text-slate-800">
                <span className="font-semibold">{f.diplome}</span>
                {f.ecole && <span className="text-slate-600"> — {f.ecole}</span>}
              </p>
              <span className="shrink-0 text-[10px] text-slate-500">{f.annee}</span>
            </div>
          ))}
        </Section>
      )}

      {data.competences.length > 0 && (
        <Section title="Compétences" accent={accent}>
          <div className="flex flex-wrap gap-1.5">
            {data.competences.map((c) => (
              <span
                key={c}
                className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700"
              >
                {c}
              </span>
            ))}
          </div>
        </Section>
      )}

      <div className="grid grid-cols-2 gap-4">
        {data.langues.length > 0 && (
          <Section title="Langues" accent={accent}>
            {data.langues.map((l) => (
              <p key={l.id} className="text-slate-700">
                <span className="font-medium">{l.langue}</span> — {l.niveau}
              </p>
            ))}
          </Section>
        )}
        {data.interets.length > 0 && (
          <Section title="Centres d'intérêt" accent={accent}>
            <p className="text-slate-700">{data.interets.join(", ")}</p>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-3">
      <h2
        className="mb-1.5 text-[11px] font-bold uppercase tracking-wide"
        style={{ color: accent }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
