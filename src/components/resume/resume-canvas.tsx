import { Mail, Phone, MapPin, Car } from "lucide-react";
import type { ResumeData } from "@/server/types";
import { getCvTemplate, type CvTemplate } from "@/lib/cv-templates";
import { cn } from "@/lib/utils";

const SERIF = "Georgia, 'Times New Roman', serif";

/**
 * Rendu fidèle du CV (aperçu écran + export PDF).
 * Trois dispositions réellement différentes selon le modèle :
 *  - single : une colonne (optimisé robots recruteurs / ATS)
 *  - band   : bandeau coloré en-tête
 *  - sidebar: deux colonnes avec bandeau latéral
 */
export function ResumeCanvas({
  data,
  templateId,
  className,
}: {
  data: ResumeData;
  templateId?: string;
  className?: string;
}) {
  const tpl = getCvTemplate(templateId);
  const fontFamily = tpl.font === "serif" ? SERIF : "var(--font-inter)";

  return (
    <div
      className={cn(
        "mx-auto aspect-[210/297] w-full max-w-[640px] overflow-hidden bg-white text-[11px] leading-relaxed text-slate-800 shadow-sm print:shadow-none",
        className,
      )}
      style={{ fontFamily, printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }}
    >
      {tpl.layout === "sidebar" ? (
        <SidebarLayout data={data} tpl={tpl} />
      ) : tpl.layout === "band" ? (
        <BandLayout data={data} tpl={tpl} />
      ) : (
        <SingleLayout data={data} tpl={tpl} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Disposition 1 — une colonne (ATS)                                   */
/* ------------------------------------------------------------------ */
function SingleLayout({ data, tpl }: { data: ResumeData; tpl: CvTemplate }) {
  const { accent } = tpl;
  const dense = tpl.id === "compact";
  const fullName = `${data.prenom} ${data.nom}`.trim() || "Votre Nom";
  const centered = tpl.headerAlign === "center";

  return (
    <div className={cn("p-8", dense && "p-6 text-[10px]")}>
      <header
        className={cn("border-b-2 pb-3", centered && "text-center")}
        style={{ borderColor: accent }}
      >
        <h1
          className="text-2xl font-bold tracking-tight text-slate-900"
          style={tpl.font === "serif" ? { fontFamily: SERIF } : undefined}
        >
          {fullName}
        </h1>
        {data.titre && (
          <p className="mt-0.5 text-sm font-medium" style={{ color: accent }}>
            {data.titre}
          </p>
        )}
        <ContactRow data={data} className={cn("mt-2", centered && "justify-center")} />
      </header>

      {data.accroche && <p className="mt-3 italic text-slate-700">{data.accroche}</p>}

      <Experiences data={data} accent={accent} centeredTitle={centered} font={tpl.font} />
      <Educations data={data} accent={accent} centeredTitle={centered} font={tpl.font} />
      <Skills data={data} accent={accent} centeredTitle={centered} font={tpl.font} />

      <div className={cn("grid gap-4", dense ? "grid-cols-2" : "grid-cols-2")}>
        <Langues data={data} accent={accent} centeredTitle={centered} font={tpl.font} />
        <Interets data={data} accent={accent} centeredTitle={centered} font={tpl.font} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Disposition 2 — bandeau coloré en-tête                              */
/* ------------------------------------------------------------------ */
function BandLayout({ data, tpl }: { data: ResumeData; tpl: CvTemplate }) {
  const { accent } = tpl;
  const fullName = `${data.prenom} ${data.nom}`.trim() || "Votre Nom";

  return (
    <div>
      <header
        className="px-8 py-6 text-white"
        style={{ backgroundColor: accent, printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }}
      >
        <h1 className="text-2xl font-bold tracking-tight">{fullName}</h1>
        {data.titre && <p className="mt-0.5 text-sm font-medium text-white/90">{data.titre}</p>}
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-white/90">
          {data.email && <Item icon={Mail} text={data.email} />}
          {data.telephone && <Item icon={Phone} text={data.telephone} />}
          {data.ville && <Item icon={MapPin} text={data.ville} />}
          {data.permis && <Item icon={Car} text="Permis B" />}
        </div>
      </header>

      <div className="px-8 py-5">
        {data.accroche && <p className="italic text-slate-700">{data.accroche}</p>}
        <Experiences data={data} accent={accent} font={tpl.font} />
        <Educations data={data} accent={accent} font={tpl.font} />
        <Skills data={data} accent={accent} font={tpl.font} />
        <div className="grid grid-cols-2 gap-4">
          <Langues data={data} accent={accent} font={tpl.font} />
          <Interets data={data} accent={accent} font={tpl.font} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Disposition 3 — deux colonnes (bandeau latéral)                     */
/* ------------------------------------------------------------------ */
function SidebarLayout({ data, tpl }: { data: ResumeData; tpl: CvTemplate }) {
  const { accent } = tpl;
  const dark = tpl.id === "pro";
  const sideBg = dark ? "#0f172a" : `${accent}14`; // tint léger (alpha hex) si clair
  const sideText = dark ? "text-slate-200" : "text-slate-700";
  const sideTitle = dark ? "#cbd5e1" : accent;

  return (
    <div className="flex min-h-full">
      {/* Colonne latérale */}
      <aside
        className={cn("w-[36%] shrink-0 px-5 py-7", sideText)}
        style={{ backgroundColor: sideBg, printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }}
      >
        <h1 className={cn("text-xl font-bold leading-tight", dark ? "text-white" : "text-slate-900")}>
          {data.prenom || "Votre"}
          <br />
          {data.nom || "Nom"}
        </h1>
        {data.titre && (
          <p className="mt-1 text-[11px] font-medium" style={{ color: dark ? "#93c5fd" : accent }}>
            {data.titre}
          </p>
        )}

        <SideSection title="Contact" color={sideTitle}>
          <div className="space-y-1">
            {data.email && <Item icon={Mail} text={data.email} />}
            {data.telephone && <Item icon={Phone} text={data.telephone} />}
            {data.ville && <Item icon={MapPin} text={data.ville} />}
            {data.permis && <Item icon={Car} text="Permis B" />}
          </div>
        </SideSection>

        {data.competences.length > 0 && (
          <SideSection title="Compétences" color={sideTitle}>
            <ul className="space-y-1">
              {data.competences.map((c) => (
                <li key={c} className="flex items-center gap-1.5">
                  <span
                    className="size-1 rounded-full"
                    style={{ backgroundColor: dark ? "#93c5fd" : accent }}
                  />
                  {c}
                </li>
              ))}
            </ul>
          </SideSection>
        )}

        {data.langues.length > 0 && (
          <SideSection title="Langues" color={sideTitle}>
            {data.langues.map((l) => (
              <p key={l.id}>
                <span className="font-medium">{l.langue}</span> — {l.niveau}
              </p>
            ))}
          </SideSection>
        )}

        {data.interets.length > 0 && (
          <SideSection title="Centres d'intérêt" color={sideTitle}>
            <p>{data.interets.join(", ")}</p>
          </SideSection>
        )}
      </aside>

      {/* Colonne principale */}
      <div className="flex-1 px-6 py-7">
        {data.accroche && <p className="italic text-slate-700">{data.accroche}</p>}
        <Experiences data={data} accent={accent} font={tpl.font} />
        <Educations data={data} accent={accent} font={tpl.font} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Briques partagées                                                   */
/* ------------------------------------------------------------------ */
function ContactRow({ data, className }: { data: ResumeData; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-600", className)}>
      {data.email && <Item icon={Mail} text={data.email} />}
      {data.telephone && <Item icon={Phone} text={data.telephone} />}
      {data.ville && <Item icon={MapPin} text={data.ville} />}
      {data.permis && <Item icon={Car} text="Permis B" />}
    </div>
  );
}

function Item({ icon: Icon, text }: { icon: typeof Mail; text: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <Icon className="size-3" /> {text}
    </span>
  );
}

function Section({
  title,
  accent,
  centeredTitle,
  font,
  children,
}: {
  title: string;
  accent: string;
  centeredTitle?: boolean;
  font: "sans" | "serif";
  children: React.ReactNode;
}) {
  return (
    <section className="mt-3">
      <h2
        className={cn(
          "mb-1.5 text-[11px] font-bold uppercase tracking-wide",
          centeredTitle && "text-center",
        )}
        style={{ color: accent, fontFamily: font === "serif" ? SERIF : undefined }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function SideSection({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5">
      <h2 className="mb-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color }}>
        {title}
      </h2>
      <div className="text-[10px] leading-relaxed">{children}</div>
    </section>
  );
}

function Experiences({
  data,
  accent,
  centeredTitle,
  font,
}: {
  data: ResumeData;
  accent: string;
  centeredTitle?: boolean;
  font: "sans" | "serif";
}) {
  if (data.experiences.length === 0) return null;
  return (
    <Section title="Expériences professionnelles" accent={accent} centeredTitle={centeredTitle} font={font}>
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
  );
}

function Educations({
  data,
  accent,
  centeredTitle,
  font,
}: {
  data: ResumeData;
  accent: string;
  centeredTitle?: boolean;
  font: "sans" | "serif";
}) {
  if (data.formations.length === 0) return null;
  return (
    <Section title="Formation" accent={accent} centeredTitle={centeredTitle} font={font}>
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
  );
}

function Skills({
  data,
  accent,
  centeredTitle,
  font,
}: {
  data: ResumeData;
  accent: string;
  centeredTitle?: boolean;
  font: "sans" | "serif";
}) {
  if (data.competences.length === 0) return null;
  return (
    <Section title="Compétences" accent={accent} centeredTitle={centeredTitle} font={font}>
      <div className={cn("flex flex-wrap gap-1.5", centeredTitle && "justify-center")}>
        {data.competences.map((c) => (
          <span key={c} className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700">
            {c}
          </span>
        ))}
      </div>
    </Section>
  );
}

function Langues({
  data,
  accent,
  centeredTitle,
  font,
}: {
  data: ResumeData;
  accent: string;
  centeredTitle?: boolean;
  font: "sans" | "serif";
}) {
  if (data.langues.length === 0) return null;
  return (
    <Section title="Langues" accent={accent} centeredTitle={centeredTitle} font={font}>
      {data.langues.map((l) => (
        <p key={l.id} className="text-slate-700">
          <span className="font-medium">{l.langue}</span> — {l.niveau}
        </p>
      ))}
    </Section>
  );
}

function Interets({
  data,
  accent,
  centeredTitle,
  font,
}: {
  data: ResumeData;
  accent: string;
  centeredTitle?: boolean;
  font: "sans" | "serif";
}) {
  if (data.interets.length === 0) return null;
  return (
    <Section title="Centres d'intérêt" accent={accent} centeredTitle={centeredTitle} font={font}>
      <p className={cn("text-slate-700", centeredTitle && "text-center")}>
        {data.interets.join(", ")}
      </p>
    </Section>
  );
}
