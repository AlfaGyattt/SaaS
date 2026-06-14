import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import type { OfferAnalysis, Requirement, ResumeData } from "../types";

// Routing des modèles (cf. blueprint) : Sonnet pour la génération, Haiku pour
// l'extraction et le scoring (moins coûteux). Fallback démo si pas de clé.
const MODEL_GEN = "claude-sonnet-4-6";
const MODEL_FAST = "claude-haiku-4-5-20251001";

export function hasAI() {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

let _client: Anthropic | null = null;
function client() {
  if (!_client) _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return _client;
}

async function callClaude(opts: {
  system: string;
  prompt: string;
  model?: string;
  maxTokens?: number;
}): Promise<string> {
  const msg = await client().messages.create({
    model: opts.model ?? MODEL_GEN,
    max_tokens: opts.maxTokens ?? 1024,
    system: opts.system,
    messages: [{ role: "user", content: opts.prompt }],
  });
  const block = msg.content.find((b) => b.type === "text");
  return block && block.type === "text" ? block.text.trim() : "";
}

const SYSTEM_FR =
  "Tu es un expert du recrutement et du CV français. Tu écris un français impeccable, " +
  "concret et professionnel, aux conventions françaises. Tu n'inventes jamais d'expérience, " +
  "de diplôme ou de chiffre : tu reformules uniquement ce qui t'est fourni. Pas de clichés.";

// ---------------------------------------------------------------------------
// 1. Accroche de CV
// ---------------------------------------------------------------------------
export async function generateAccroche(data: ResumeData): Promise<string> {
  if (!hasAI()) {
    const metier = data.titre || "professionnel";
    const exp = data.experiences[0]?.poste;
    const annees = data.experiences.length;
    return (
      `${metier} ${annees > 1 ? `avec ${annees} expériences` : "motivé(e)"}` +
      `${exp ? `, notamment en tant que ${exp.toLowerCase()}` : ""}. ` +
      `Reconnu(e) pour mon sérieux et mon sens du collectif, je recherche un poste où mettre ` +
      `mes compétences au service d'une équipe exigeante.`
    );
  }
  return callClaude({
    system: SYSTEM_FR,
    model: MODEL_GEN,
    maxTokens: 220,
    prompt:
      "Rédige une accroche de CV de 2 à 3 phrases (à la première personne, sans « Je suis »), " +
      `pour ce profil. Données : ${JSON.stringify(data)}`,
  });
}

// ---------------------------------------------------------------------------
// 2. Amélioration d'une puce d'expérience (quantifier / reformuler)
// ---------------------------------------------------------------------------
export async function improveBullet(text: string): Promise<string> {
  if (!hasAI()) {
    const t = text.trim().replace(/\.$/, "");
    return `${t.charAt(0).toUpperCase()}${t.slice(1)}, avec un impact mesurable sur la qualité et les délais.`;
  }
  return callClaude({
    system: SYSTEM_FR,
    model: MODEL_FAST,
    maxTokens: 160,
    prompt:
      "Reformule cette tâche de CV en une puce percutante (verbe d'action, résultat concret). " +
      `Ne pas inventer de chiffre absent. Texte : "${text}"`,
  });
}

// ---------------------------------------------------------------------------
// 3. Lettre de motivation (structure Vous-Moi-Nous)
// ---------------------------------------------------------------------------
export async function generateLetter(opts: {
  data: ResumeData;
  offerText?: string;
  company?: string;
  tone?: string;
}): Promise<string> {
  const { data, offerText, company, tone = "sobre" } = opts;
  if (!hasAI()) {
    const poste = data.titre || "le poste proposé";
    const ent = company || "votre entreprise";
    return [
      `Madame, Monsieur,`,
      ``,
      `Votre ${offerText ? "offre" : "entreprise"} a retenu toute mon attention : ${ent} ` +
        `incarne des valeurs d'exigence et de service dans lesquelles je me reconnais.`,
      ``,
      `Fort(e) de mon parcours${data.experiences[0] ? ` de ${data.experiences[0].poste.toLowerCase()}` : ""}, ` +
        `j'ai développé des compétences directement utiles à ${poste.toLowerCase()} : ` +
        `${data.competences.slice(0, 3).join(", ") || "rigueur, autonomie et sens du collectif"}.`,
      ``,
      `Rejoindre ${ent}, c'est pour moi l'occasion de contribuer concrètement à vos objectifs ` +
        `tout en continuant à progresser. Je serais ravi(e) d'en échanger lors d'un entretien.`,
      ``,
      `Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.`,
      ``,
      `${data.prenom} ${data.nom}`.trim(),
    ].join("\n");
  }
  return callClaude({
    system: SYSTEM_FR,
    model: MODEL_GEN,
    maxTokens: 700,
    prompt:
      `Rédige une lettre de motivation française structurée Vous-Moi-Nous, ton « ${tone} », ` +
      `formules de politesse correctes, 250-320 mots. ` +
      `Profil : ${JSON.stringify(data)}. ` +
      (offerText ? `Offre visée : """${offerText.slice(0, 2000)}""".` : `Candidature spontanée.`),
  });
}

// ---------------------------------------------------------------------------
// 3 bis. Mail de candidature
// ---------------------------------------------------------------------------
export async function generateMail(opts: {
  data: ResumeData;
  poste?: string;
  company?: string;
}): Promise<{ subject: string; body: string }> {
  const { data, poste, company } = opts;
  const fullName = `${data.prenom} ${data.nom}`.trim() || "Votre candidat";
  const role = poste || data.titre || "votre offre";
  if (!hasAI()) {
    return {
      subject: `Candidature — ${role}${company ? ` chez ${company}` : ""}`,
      body: [
        `Bonjour,`,
        ``,
        `Je me permets de vous adresser ma candidature au poste de ${role.toLowerCase()}${
          company ? ` au sein de ${company}` : ""
        }.`,
        `Vous trouverez ci-joint mon CV et ma lettre de motivation.`,
        ``,
        `Je reste à votre disposition pour un entretien et vous remercie de l'attention portée à ma candidature.`,
        ``,
        `Bien cordialement,`,
        fullName,
        data.telephone || "",
      ]
        .filter((l) => l !== undefined)
        .join("\n"),
    };
  }
  const raw = await callClaude({
    system: SYSTEM_FR,
    model: MODEL_FAST,
    maxTokens: 320,
    prompt:
      `Rédige un email de candidature court et professionnel (4-6 lignes) en français. ` +
      `Réponds en JSON {"subject": string, "body": string}. ` +
      `Poste : ${role}. Entreprise : ${company ?? "—"}. Candidat : ${fullName}.`,
  });
  try {
    const json = JSON.parse(raw.replace(/```json|```/g, "").trim());
    return { subject: String(json.subject), body: String(json.body) };
  } catch {
    return {
      subject: `Candidature — ${role}`,
      body: raw || `Bonjour,\n\nJe vous adresse ma candidature au poste de ${role}.\n\nCordialement,\n${fullName}`,
    };
  }
}

// ---------------------------------------------------------------------------
// 4. Analyse d'offre + matching (extraction structurée)
// ---------------------------------------------------------------------------
export async function analyzeOffer(rawText: string, data?: ResumeData): Promise<OfferAnalysis> {
  if (!hasAI()) {
    return mockAnalyze(rawText, data);
  }
  const raw = await callClaude({
    system:
      "Tu extrais les informations clés d'une offre d'emploi française et tu évalues " +
      "la compatibilité avec un profil. Tu réponds UNIQUEMENT en JSON valide.",
    model: MODEL_FAST,
    maxTokens: 700,
    prompt:
      `Offre : """${rawText.slice(0, 3000)}""". Profil : ${JSON.stringify(data ?? {})}. ` +
      `Réponds en JSON : {"title": string, "company": string, "requirements": ` +
      `[{"label": string, "status": "ok"|"warn"|"missing"}], "matchScore": number(0-100)}. ` +
      `status = ok si le profil couvre l'exigence, warn si partiel, missing si absent.`,
  });
  try {
    const json = JSON.parse(raw.replace(/```json|```/g, "").trim());
    return {
      title: String(json.title ?? "Poste"),
      company: String(json.company ?? ""),
      requirements: Array.isArray(json.requirements) ? json.requirements.slice(0, 8) : [],
      matchScore: Math.max(0, Math.min(100, Number(json.matchScore) || 0)),
    };
  } catch {
    return mockAnalyze(rawText, data);
  }
}

function mockAnalyze(rawText: string, data?: ResumeData): OfferAnalysis {
  const text = rawText.toLowerCase();
  const skills = (data?.competences ?? []).map((s) => s.toLowerCase());
  // Quelques exigences fréquentes détectées par mots-clés.
  const dico = [
    "diplôme",
    "expérience",
    "permis",
    "équipe",
    "autonomie",
    "anglais",
    "nuit",
    "logiciel",
    "relation client",
    "rigueur",
  ];
  const found = dico.filter((k) => text.includes(k)).slice(0, 6);
  const base = found.length ? found : ["expérience", "autonomie", "travail en équipe"];
  const requirements: Requirement[] = base.map((label) => {
    const covered = skills.some((s) => label.includes(s) || s.includes(label));
    return {
      label: label.charAt(0).toUpperCase() + label.slice(1),
      status: covered ? "ok" : Math.random() > 0.5 ? "warn" : "missing",
    };
  });
  // Score déterministe basé sur la couverture.
  const ok = requirements.filter((r) => r.status === "ok").length;
  const matchScore = Math.min(95, 55 + ok * 8 + (data?.experiences.length ?? 0) * 3);
  // Titre/entreprise heuristiques (1re ligne non vide).
  const firstLine = rawText.split("\n").map((l) => l.trim()).find(Boolean) ?? "Poste";
  return {
    title: firstLine.slice(0, 60),
    company: extractCompany(rawText),
    requirements,
    matchScore,
  };
}

function extractCompany(text: string): string {
  const m = text.match(/(?:chez|entreprise|société|groupe)\s+([A-ZÀ-Ÿ][\w&'’-]+(?:\s[A-ZÀ-Ÿ][\w&'’-]+)?)/);
  return m?.[1] ?? "";
}

// ---------------------------------------------------------------------------
// 5. Score ATS (heuristique de complétude — utile même sans IA)
// ---------------------------------------------------------------------------
export function scoreAts(data: ResumeData): { score: number; tips: string[] } {
  let score = 40;
  const tips: string[] = [];

  if (data.titre) score += 8;
  else tips.push("Ajoutez un titre de CV clair (l'intitulé du poste visé).");

  if (data.accroche && data.accroche.length > 40) score += 10;
  else tips.push("Rédigez une accroche de 2-3 phrases.");

  if (data.experiences.length >= 1) score += 12;
  if (data.experiences.length >= 2) score += 6;
  else tips.push("Détaillez au moins deux expériences avec des résultats concrets.");

  if (data.competences.length >= 4) score += 8;
  else tips.push("Listez au moins 4 compétences en lien avec l'offre.");

  if (data.formations.length >= 1) score += 6;
  else tips.push("Renseignez votre formation (diplôme, école, année).");

  if (data.langues.length >= 1) score += 4;
  if (data.email && data.telephone) score += 6;
  else tips.push("Vérifiez vos coordonnées (email et téléphone).");

  return { score: Math.min(98, score), tips: tips.slice(0, 4) };
}

// ---------------------------------------------------------------------------
// 6. Simulation d'entretien (l'IA joue le recruteur)
// ---------------------------------------------------------------------------
export type InterviewMessage = { from: "ai" | "user"; text: string };

const MOCK_QUESTIONS = [
  "Présentez-vous en une minute : votre parcours et ce qui vous amène ici.",
  "Pourquoi ce poste et notre entreprise en particulier ?",
  "Parlez-moi d'une réussite dont vous êtes fier(e). Quel a été votre rôle précis ?",
  "Quelle est votre plus grande qualité, et un axe de progrès sur lequel vous travaillez ?",
  "Décrivez une situation difficile au travail et comment vous l'avez gérée.",
  "Où vous voyez-vous dans 3 ans, et avez-vous des questions à me poser ?",
];

export async function interviewTurn(opts: {
  metier: string;
  messages: InterviewMessage[];
}): Promise<{ reply: string; feedback?: string; done: boolean }> {
  const { metier, messages } = opts;
  const answers = messages.filter((m) => m.from === "user").length;

  if (!hasAI()) {
    const lastAnswer = [...messages].reverse().find((m) => m.from === "user")?.text ?? "";
    const feedback =
      answers === 0
        ? undefined
        : lastAnswer.length < 40
          ? "Réponse un peu courte : développez avec un exemple concret (méthode STAR : Situation, Tâche, Action, Résultat)."
          : "Bonne réponse — pensez à la terminer par un résultat chiffré quand c'est possible.";
    const done = answers >= MOCK_QUESTIONS.length - 1;
    const reply = done
      ? "Merci, l'entretien est terminé. Vous avez été clair(e) et structuré(e) — continuez à appuyer chaque réponse par des exemples concrets."
      : MOCK_QUESTIONS[Math.min(answers, MOCK_QUESTIONS.length - 1)];
    return { reply, feedback, done };
  }

  const transcript = messages
    .map((m) => `${m.from === "ai" ? "Recruteur" : "Candidat"}: ${m.text}`)
    .join("\n");
  const raw = await callClaude({
    system:
      "Tu es un recruteur français bienveillant et exigeant qui mène un entretien pour un poste de " +
      `${metier}. Tu donnes un retour bref et constructif sur la dernière réponse, puis tu poses ` +
      "UNE nouvelle question. Réponds en JSON {\"feedback\": string|null, \"reply\": string, \"done\": boolean}. " +
      "done=true seulement après 5-6 questions.",
    model: MODEL_GEN,
    maxTokens: 400,
    prompt: `Métier : ${metier}.\nÉchange jusqu'ici :\n${transcript || "(début de l'entretien)"}`,
  });
  try {
    const json = JSON.parse(raw.replace(/```json|```/g, "").trim());
    return {
      reply: String(json.reply),
      feedback: json.feedback ? String(json.feedback) : undefined,
      done: Boolean(json.done),
    };
  } catch {
    return { reply: raw || MOCK_QUESTIONS[Math.min(answers, 5)], done: answers >= 5 };
  }
}
