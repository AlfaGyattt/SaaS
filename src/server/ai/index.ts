import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import type {
  InterviewKit,
  InterviewMessage,
  InterviewQuestion,
  InterviewReport,
  InterviewResult,
  OfferAnalysis,
  Requirement,
  ResumeData,
} from "../types";

export type { InterviewMessage, InterviewReport, InterviewResult };

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
    maxTokens: 900,
    prompt:
      `Offre : """${rawText.slice(0, 3000)}""". Profil : ${JSON.stringify(data ?? {})}. ` +
      `Réponds en JSON : {"title": string, "company": string, "requirements": ` +
      `[{"label": string, "status": "ok"|"warn"|"missing"}], "matchScore": number(0-100), ` +
      `"keywords": string[] (8-12 mots-clés ATS de l'offre à reprendre dans le CV), ` +
      `"cvTips": string[] (3 conseils concrets pour adapter le CV à CETTE offre)}. ` +
      `status = ok si le profil couvre l'exigence, warn si partiel, missing si absent.`,
  });
  try {
    const json = JSON.parse(raw.replace(/```json|```/g, "").trim());
    return {
      title: String(json.title ?? "Poste"),
      company: String(json.company ?? ""),
      requirements: Array.isArray(json.requirements) ? json.requirements.slice(0, 8) : [],
      matchScore: Math.max(0, Math.min(100, Number(json.matchScore) || 0)),
      keywords: Array.isArray(json.keywords) ? json.keywords.map(String).slice(0, 12) : [],
      cvTips: Array.isArray(json.cvTips) ? json.cvTips.map(String).slice(0, 4) : [],
    };
  } catch {
    return mockAnalyze(rawText, data);
  }
}

// Dictionnaire d'exigences fréquentes (FR) → libellé normalisé.
const REQUIREMENT_DICO = [
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
  "organisation",
  "communication",
  "management",
  "gestion",
  "vente",
  "sécurité",
  "qualité",
  "reporting",
  "polyvalence",
  "réactivité",
];

function mockAnalyze(rawText: string, data?: ResumeData): OfferAnalysis {
  const text = rawText.toLowerCase();
  const skills = (data?.competences ?? []).map((s) => s.toLowerCase());
  const found = REQUIREMENT_DICO.filter((k) => text.includes(k)).slice(0, 6);
  const base = found.length ? found : ["expérience", "autonomie", "travail en équipe"];
  // Couverture déterministe (pas de Math.random : un même profil/offre = même résultat).
  const requirements: Requirement[] = base.map((label) => {
    const covered = skills.some((s) => label.includes(s) || s.includes(label));
    const partial =
      !covered && (data?.accroche ?? "").toLowerCase().includes(label.split(" ")[0]);
    return {
      label: label.charAt(0).toUpperCase() + label.slice(1),
      status: covered ? "ok" : partial ? "warn" : "missing",
    };
  });
  const ok = requirements.filter((r) => r.status === "ok").length;
  const matchScore = Math.min(95, 55 + ok * 8 + (data?.experiences.length ?? 0) * 3);
  const firstLine = rawText.split("\n").map((l) => l.trim()).find(Boolean) ?? "Poste";
  // Sépare l'intitulé du poste de l'entreprise (« Poste — Entreprise », « Poste | X »…).
  const parts = firstLine.split(/\s*[—–|·•:]\s*|\s+-\s+/).map((p) => p.trim()).filter(Boolean);
  const title = (parts[0] || "Poste").slice(0, 60);
  const company = extractCompany(rawText) || (parts[1] ? parts[1].slice(0, 60) : "");
  const keywords = extractKeywords(rawText);
  const missing = requirements.filter((r) => r.status !== "ok").map((r) => r.label.toLowerCase());
  const cvTips = [
    keywords.length
      ? `Reprenez les mots-clés de l'offre dans votre CV : ${keywords.slice(0, 5).join(", ")}.`
      : "Reprenez le vocabulaire exact de l'offre dans votre titre et votre accroche.",
    missing.length
      ? `Mettez en avant des preuves concrètes sur : ${missing.slice(0, 3).join(", ")}.`
      : "Ajoutez un résultat chiffré à chacune de vos expériences clés.",
    `Adaptez le titre de votre CV à l'intitulé exact : « ${title} ».`,
  ];
  return { title, company, requirements, matchScore, keywords, cvTips };
}

// Extraction de mots-clés ATS : termes métier fréquents + tokens significatifs de l'offre.
function extractKeywords(rawText: string): string[] {
  const text = rawText.toLowerCase();
  const fromDico = REQUIREMENT_DICO.filter((k) => text.includes(k));
  const STOP = new Set([
    "pour","avec","dans","vous","nous","votre","notre","poste","offre","emploi","candidat",
    "candidature","entreprise","société","mission","missions","profil","recherche","recherchons",
    "type","contrat","temps","plein","sont","cette","être","aux","des","les","une","est","sur",
    "par","plus","ans","cdd","cdi","france","travail","équipe","ainsi","afin","selon","chez",
  ]);
  const freq = new Map<string, number>();
  for (const tok of text.split(/[^a-zàâäéèêëïîôöùûüç]+/)) {
    if (tok.length < 4 || STOP.has(tok)) continue;
    freq.set(tok, (freq.get(tok) ?? 0) + 1);
  }
  const top = [...freq.entries()]
    .filter(([, n]) => n >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([w]) => w.charAt(0).toUpperCase() + w.slice(1))
    .slice(0, 8);
  const dico = fromDico.map((w) => w.charAt(0).toUpperCase() + w.slice(1));
  return [...new Set([...dico, ...top])].slice(0, 10);
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
// 5 bis. Kit de préparation à l'entretien (questions attendues + réponses)
// ---------------------------------------------------------------------------
export async function generateInterviewKit(opts: {
  data: ResumeData;
  role: string;
  company?: string;
  requirements?: Requirement[];
  offerText?: string;
}): Promise<InterviewKit> {
  const { data, role, company, requirements = [], offerText } = opts;
  if (!hasAI()) {
    return mockInterviewKit({ data, role, company, requirements });
  }
  const raw = await callClaude({
    system:
      "Tu es un coach d'entretien d'embauche français expérimenté. Pour un poste donné, tu " +
      "anticipes les questions que le recruteur va RÉELLEMENT poser et tu aides le candidat à " +
      "préparer des réponses solides à partir de SON profil (sans rien inventer). " +
      "Tu réponds UNIQUEMENT en JSON valide.",
    model: MODEL_GEN,
    maxTokens: 1800,
    prompt:
      `Poste visé : ${role}. Entreprise : ${company ?? "—"}. ` +
      `Profil du candidat : ${JSON.stringify(data)}. ` +
      (requirements.length
        ? `Exigences de l'offre : ${requirements.map((r) => r.label).join(", ")}. `
        : "") +
      (offerText ? `Extrait de l'offre : """${offerText.slice(0, 1500)}""". ` : "") +
      `Génère un kit d'entretien en JSON : {"questions": [{"question": string, ` +
      `"category": "Présentation"|"Motivation"|"Compétences"|"Comportementale"|"Pièges"|"Vos questions", ` +
      `"intent": string (ce que le recruteur évalue, 1 phrase), ` +
      `"suggestion": string (angle de réponse personnalisé pour CE candidat, méthode STAR, 2-3 phrases)}], ` +
      `"conseils": string[] (4 conseils transverses pour cet entretien)}. ` +
      `8 questions au total, couvrant toutes les catégories. Français impeccable, concret.`,
  });
  try {
    const json = JSON.parse(raw.replace(/```json|```/g, "").trim());
    const questions: InterviewQuestion[] = Array.isArray(json.questions)
      ? json.questions
          .filter((q: unknown) => q && typeof (q as InterviewQuestion).question === "string")
          .slice(0, 10)
      : [];
    if (!questions.length) return mockInterviewKit({ data, role, company, requirements });
    return {
      questions,
      conseils: Array.isArray(json.conseils) ? json.conseils.map(String).slice(0, 5) : [],
    };
  } catch {
    return mockInterviewKit({ data, role, company, requirements });
  }
}

// Génération déterministe d'un kit d'entretien réellement utile, sans IA.
function mockInterviewKit(opts: {
  data: ResumeData;
  role: string;
  company?: string;
  requirements?: Requirement[];
}): InterviewKit {
  const { data, role, requirements = [] } = opts;
  const company = opts.company || "l'entreprise";
  const roleLc = role.toLowerCase();
  const lastExp = data.experiences[0];
  const expRef = lastExp
    ? `votre expérience de ${lastExp.poste.toLowerCase()}${lastExp.entreprise ? ` chez ${lastExp.entreprise}` : ""}`
    : "un projet ou un stage marquant";
  const topSkills = data.competences.slice(0, 3);

  const questions: InterviewQuestion[] = [];

  questions.push({
    question: `Présentez-vous en quelques minutes : votre parcours et ce qui vous amène à postuler pour ce poste de ${roleLc}.`,
    category: "Présentation",
    intent: "Évaluer votre clarté, la cohérence de votre parcours et votre capacité à aller à l'essentiel.",
    suggestion: `Déroulez votre parcours en 3 temps (formation → ${expRef} → ce que vous visez), puis reliez-le explicitement au poste de ${roleLc}. Tenez la réponse en 1 min 30, terminez sur votre motivation pour ${company}.`,
  });

  questions.push({
    question: `Pourquoi avoir postulé chez ${company}, et pourquoi ce poste en particulier ?`,
    category: "Motivation",
    intent: "Vérifier que vous vous êtes renseigné(e) et que votre motivation est sincère et précise.",
    suggestion: `Citez un élément concret sur ${company} (activité, valeur, actualité) qui vous attire, puis montrez en quoi le poste de ${roleLc} prolonge logiquement votre parcours et vos objectifs. Évitez les généralités du type « j'aime les défis ».`,
  });

  // Une question par exigence clé de l'offre (compétences).
  const reqLabels = (requirements.length
    ? requirements.map((r) => r.label)
    : topSkills.length
      ? topSkills
      : ["votre rigueur", "votre autonomie"]
  ).slice(0, 3);
  for (const label of reqLabels) {
    questions.push({
      question: `Pouvez-vous me donner un exemple concret où vous avez mobilisé : ${label.toLowerCase()} ?`,
      category: "Compétences",
      intent: `Confirmer que « ${label.toLowerCase()} » est une compétence réelle et opérationnelle, pas seulement déclarée.`,
      suggestion: `Racontez une situation précise (méthode STAR) tirée de ${expRef} : la Situation, votre Tâche, l'Action menée, et le Résultat — chiffré si possible. Reliez le résultat aux besoins du poste de ${roleLc}.`,
    });
  }

  questions.push({
    question: "Parlez-moi d'une difficulté ou d'un conflit que vous avez rencontré au travail. Comment l'avez-vous géré ?",
    category: "Comportementale",
    intent: "Mesurer votre intelligence relationnelle, votre sang-froid et votre capacité à résoudre les problèmes.",
    suggestion: `Choisissez une vraie situation, restez factuel(le) et sans accuser personne. Mettez en avant l'écoute, le dialogue et la solution trouvée. Concluez sur ce que vous en avez appris.`,
  });

  questions.push({
    question: "Quelle est votre plus grande qualité, et un défaut sur lequel vous travaillez ?",
    category: "Pièges",
    intent: "Tester votre lucidité et votre honnêteté — un défaut « déguisé en qualité » sonne faux.",
    suggestion: `Pour la qualité, prenez-en une utile au poste (ex. ${topSkills[0] ?? "la rigueur"}) avec un exemple. Pour le défaut, citez-en un réel mais non rédhibitoire, et surtout expliquez comment vous le corrigez activement.`,
  });

  questions.push({
    question: "Quelles sont vos prétentions salariales ?",
    category: "Pièges",
    intent: "Vérifier que vos attentes sont réalistes et alignées avec le marché et le poste.",
    suggestion: `Donnez une fourchette (pas un chiffre unique), justifiée par le marché du métier de ${roleLc} et votre expérience. Montrez-vous ouvert(e) à la discussion en fonction de l'ensemble du package.`,
  });

  questions.push({
    question: "Avez-vous des questions à me poser ?",
    category: "Vos questions",
    intent: "Les meilleurs candidats posent des questions : cela prouve l'intérêt et la projection dans le poste.",
    suggestion:
      "Préparez-en au moins trois, par exemple : « Comment se compose l'équipe ? », « Quels seraient mes premiers objectifs sur les 3 premiers mois ? », « Quelles sont les prochaines étapes du recrutement ? ». Ne demandez jamais « vous faites quoi exactement ? ».",
  });

  const conseils = [
    `Renseignez-vous sur ${company} : activité, actualités récentes, valeurs affichées — un détail bien placé fait la différence.`,
    "Préparez 2 à 3 réussites chiffrées (méthode STAR) que vous pourrez réutiliser sur plusieurs questions.",
    "Soignez les premières secondes : ponctualité, posture, sourire, poignée de main — la première impression se joue vite.",
    "Entraînez-vous à voix haute : connaître ses réponses ne suffit pas, il faut les dire avec aisance.",
  ];

  return { questions: questions.slice(0, 9), conseils };
}

// ---------------------------------------------------------------------------
// 6. Simulation d'entretien (l'IA joue le recruteur)
// ---------------------------------------------------------------------------
const MOCK_QUESTIONS = [
  "Présentez-vous en une minute : votre parcours et ce qui vous amène ici.",
  "Pourquoi ce poste et notre entreprise en particulier ?",
  "Parlez-moi d'une réussite dont vous êtes fier(e). Quel a été votre rôle précis ?",
  "Quelle est votre plus grande qualité, et un axe de progrès sur lequel vous travaillez ?",
  "Décrivez une situation difficile au travail et comment vous l'avez gérée.",
  "Où vous voyez-vous dans 3 ans, et avez-vous des questions à me poser ?",
];

// Score heuristique d'une réponse (longueur, exemples, chiffres, méthode STAR).
function rateAnswer(text: string): number {
  const t = text.toLowerCase();
  let s = 0;
  const words = t.split(/\s+/).filter(Boolean).length;
  if (words >= 25) s += 40;
  else if (words >= 12) s += 25;
  else s += 10;
  if (/\d/.test(t)) s += 20; // un chiffre = un résultat concret
  if (/(par exemple|lorsque|quand|j'ai|nous avons|situation|projet|mission)/.test(t)) s += 20;
  if (/(résultat|augment|réduit|amélior|économ|%|gagné|obtenu)/.test(t)) s += 20;
  return Math.min(100, s);
}

function buildMockReport(messages: InterviewMessage[]): InterviewReport {
  const answers = messages.filter((m) => m.from === "user").map((m) => m.text);
  if (!answers.length) {
    return {
      score: 0,
      pointsForts: [],
      axes: ["Reprenez la simulation et répondez à chaque question."],
      synthese: "Pas assez d'éléments pour évaluer cet entretien.",
    };
  }
  const scores = answers.map(rateAnswer);
  const score = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const avgWords =
    answers.reduce((a, b) => a + b.split(/\s+/).filter(Boolean).length, 0) / answers.length;
  const hasNumbers = answers.some((a) => /\d/.test(a));
  const pointsForts: string[] = [];
  const axes: string[] = [];
  if (avgWords >= 25) pointsForts.push("Réponses développées et structurées.");
  else axes.push("Développez davantage : visez 4-6 phrases avec un exemple concret par réponse.");
  if (hasNumbers) pointsForts.push("Vous appuyez vos réponses par des éléments chiffrés.");
  else axes.push("Ajoutez des résultats chiffrés (chiffres, %, délais) pour gagner en crédibilité.");
  if (scores.some((s) => s >= 70)) pointsForts.push("Au moins une réponse vraiment convaincante.");
  if (answers.some((a) => /(par exemple|situation|projet|mission)/i.test(a)))
    pointsForts.push("Vous illustrez par des situations réelles (méthode STAR).");
  else axes.push("Structurez avec la méthode STAR : Situation, Tâche, Action, Résultat.");
  if (!pointsForts.length) pointsForts.push("Vous êtes allé(e) au bout de l'exercice — c'est déjà un acquis.");
  const synthese =
    score >= 80
      ? "Entretien très solide : vous êtes prêt(e). Continuez à soigner vos exemples chiffrés."
      : score >= 60
        ? "Bon entretien dans l'ensemble. En travaillant les axes ci-dessous, vous passerez un cap."
        : "Bon début. Reprenez la simulation en appliquant les axes d'amélioration : la régularité paie.";
  return { score, pointsForts: pointsForts.slice(0, 4), axes: axes.slice(0, 4), synthese };
}

export async function interviewTurn(opts: {
  metier: string;
  messages: InterviewMessage[];
  /** Plan de questions attendues (issu du kit de l'offre). Facultatif. */
  questions?: string[];
}): Promise<InterviewResult> {
  const { metier, messages, questions } = opts;
  const plan = questions && questions.length ? questions : MOCK_QUESTIONS;
  const answers = messages.filter((m) => m.from === "user").length;

  if (!hasAI()) {
    const lastAnswer = [...messages].reverse().find((m) => m.from === "user")?.text ?? "";
    const feedback =
      answers === 0
        ? undefined
        : rateAnswer(lastAnswer) >= 60
          ? "Bonne réponse — structurée et concrète. Pensez à terminer par un résultat chiffré quand c'est possible."
          : "Développez avec un exemple précis (méthode STAR : Situation, Tâche, Action, Résultat) et un résultat mesurable.";
    const done = answers >= plan.length - 1 && answers > 0;
    if (done) {
      return {
        reply:
          "Merci, l'entretien est terminé. Voici votre bilan — relisez-le, puis recommencez pour gagner en aisance.",
        feedback,
        done: true,
        report: buildMockReport(messages),
      };
    }
    return { reply: plan[Math.min(answers, plan.length - 1)], feedback, done: false };
  }

  const transcript = messages
    .map((m) => `${m.from === "ai" ? "Recruteur" : "Candidat"}: ${m.text}`)
    .join("\n");
  const planText = plan.map((q, i) => `${i + 1}. ${q}`).join("\n");
  const raw = await callClaude({
    system:
      "Tu es un recruteur français bienveillant et exigeant qui mène un entretien pour un poste de " +
      `${metier}. Tu donnes un retour bref et constructif sur la dernière réponse, puis tu poses ` +
      "UNE nouvelle question en suivant globalement le plan fourni. " +
      'Réponds en JSON {"feedback": string|null, "reply": string, "done": boolean, ' +
      '"report": null | {"score": number(0-100), "pointsForts": string[], "axes": string[], "synthese": string}}. ' +
      "done=true après avoir couvert le plan (5-7 questions). Quand done=true, remplis report ; sinon report=null.",
    model: MODEL_GEN,
    maxTokens: 600,
    prompt:
      `Métier : ${metier}.\nPlan de questions :\n${planText}\n\n` +
      `Échange jusqu'ici :\n${transcript || "(début de l'entretien)"}`,
  });
  try {
    const json = JSON.parse(raw.replace(/```json|```/g, "").trim());
    const done = Boolean(json.done);
    return {
      reply: String(json.reply),
      feedback: json.feedback ? String(json.feedback) : undefined,
      done,
      report:
        done && json.report
          ? {
              score: Math.max(0, Math.min(100, Number(json.report.score) || 0)),
              pointsForts: Array.isArray(json.report.pointsForts)
                ? json.report.pointsForts.map(String)
                : [],
              axes: Array.isArray(json.report.axes) ? json.report.axes.map(String) : [],
              synthese: String(json.report.synthese ?? ""),
            }
          : done
            ? buildMockReport(messages)
            : undefined,
    };
  } catch {
    const done = answers >= plan.length;
    return {
      reply: raw || plan[Math.min(answers, plan.length - 1)],
      done,
      report: done ? buildMockReport(messages) : undefined,
    };
  }
}
