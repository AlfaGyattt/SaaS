/**
 * Articles éditoriaux (conseils carrière, CV, lettres, entretien).
 * Contenu rédactionnel réel et utile, support de la stratégie SEO.
 */

export type Article = {
  slug: string;
  titre: string;
  description: string;
  date: string;
  categorie: string;
  chapeau: string;
  sections: { h2: string; paragraphes: string[] }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "comment-faire-un-cv-efficace-en-2026",
    titre: "Comment faire un CV efficace en 2026",
    description:
      "Structure, contenu, design : la méthode complète pour rédiger un CV clair, percutant et adapté aux attentes des recruteurs en 2026.",
    date: "2026-01-12",
    categorie: "CV",
    chapeau:
      "Un recruteur passe en moyenne moins de 10 secondes sur un CV lors du premier tri. En 2026, faire un CV efficace, ce n'est pas en faire plus, mais aller à l'essentiel : un document lisible, ciblé et orienté résultats. Voici la méthode, étape par étape.",
    sections: [
      {
        h2: "Choisir une structure claire et lisible",
        paragraphes: [
          "Un bon CV tient sur une page (deux maximum après dix ans d'expérience). Privilégiez une seule colonne, des titres de rubriques explicites et une hiérarchie visuelle évidente. L'œil du recruteur doit trouver immédiatement votre poste actuel, vos compétences clés et votre formation.",
          "L'ordre classique reste le plus efficace : titre du poste visé, accroche, expériences (de la plus récente à la plus ancienne), formation, compétences, puis langues et centres d'intérêt. Évitez les mises en page trop graphiques à deux colonnes qui désorientent autant les recruteurs que les logiciels de tri automatique.",
        ],
      },
      {
        h2: "Rédiger une accroche qui donne envie de lire",
        paragraphes: [
          "L'accroche est la première chose lue après votre nom. En deux ou trois phrases, elle résume qui vous êtes, votre expérience et ce que vous recherchez. Elle doit être personnalisée pour chaque candidature : un copier-coller générique se repère immédiatement.",
          "Exemple : « Assistante commerciale avec 5 ans d'expérience en B2B, reconnue pour ma rigueur dans le suivi des dossiers et mon sens du service client. Je recherche un poste où mon organisation contribuera à la satisfaction des clients. »",
        ],
      },
      {
        h2: "Mettre en avant des résultats, pas seulement des tâches",
        paragraphes: [
          "La différence entre un CV moyen et un CV qui décroche des entretiens tient souvent à la formulation des expériences. Au lieu de lister des missions, montrez votre impact avec des chiffres : « augmentation de 15 % du chiffre d'affaires », « gestion d'un portefeuille de 200 clients », « réduction des délais de traitement de 3 jours à 1 jour ».",
          "Commencez chaque ligne par un verbe d'action (développé, géré, optimisé, formé, piloté) et restez concret. Un recruteur retient mieux un résultat tangible qu'une description de poste vague.",
        ],
      },
      {
        h2: "Adapter chaque CV à l'offre",
        paragraphes: [
          "Le CV universel n'existe plus. Reprenez les mots-clés de l'offre d'emploi et faites-les apparaître dans votre CV, en particulier dans le titre, l'accroche et les compétences. Cela améliore votre score auprès des logiciels ATS et montre au recruteur que vous avez compris le poste.",
          "Cela ne signifie pas réécrire tout votre parcours à chaque fois : il s'agit de mettre en avant les expériences et compétences les plus pertinentes pour l'offre visée, et de reléguer le reste au second plan.",
        ],
      },
      {
        h2: "Soigner la forme et relire",
        paragraphes: [
          "Une seule faute d'orthographe peut suffire à écarter une candidature. Relisez-vous, faites-vous relire, et utilisez des outils de correction. Vérifiez aussi la cohérence des dates, la lisibilité de la police (taille 10 à 12) et l'homogénéité des puces et des marges.",
          "Enregistrez toujours votre CV au format PDF pour préserver la mise en page, et nommez le fichier clairement : « CV-Prenom-Nom-Poste.pdf ». Un détail qui montre votre professionnalisme dès la réception du document.",
        ],
      },
    ],
  },
  {
    slug: "reussir-sa-lettre-de-motivation-methode-vous-moi-nous",
    titre: "Réussir sa lettre de motivation (méthode Vous-Moi-Nous)",
    description:
      "La méthode Vous-Moi-Nous pour structurer une lettre de motivation convaincante et centrée sur l'employeur, avec exemples concrets.",
    date: "2026-02-03",
    categorie: "Lettre de motivation",
    chapeau:
      "La plupart des lettres de motivation commencent par « Je me permets de vous écrire pour le poste de… » et parlent surtout du candidat. La méthode Vous-Moi-Nous inverse la logique : elle part de l'entreprise, fait le lien avec votre profil, puis se projette dans l'avenir commun. C'est la structure la plus efficace pour convaincre.",
    sections: [
      {
        h2: "Le principe : trois paragraphes, une logique",
        paragraphes: [
          "La méthode Vous-Moi-Nous repose sur trois temps. « Vous » : vous parlez de l'entreprise et du poste. « Moi » : vous montrez en quoi votre profil répond au besoin. « Nous » : vous vous projetez dans la collaboration. Cette progression évite le piège du « moi je » qui ennuie les recruteurs.",
          "L'idée est simple : montrer que vous vous êtes intéressé à l'entreprise avant de parler de vous. Cela vous distingue immédiatement des candidats qui envoient la même lettre partout.",
        ],
      },
      {
        h2: "« Vous » : montrer que vous connaissez l'entreprise",
        paragraphes: [
          "Le premier paragraphe doit prouver que vous avez fait vos recherches. Mentionnez un projet récent de l'entreprise, une valeur affichée, un produit, une actualité ou un défi du secteur. Reliez cet élément au poste pour lequel vous postulez.",
          "Exemple : « Votre récente ouverture d'une boutique dans le centre de Lyon et votre engagement pour un conseil client personnalisé correspondent exactement à la vision du métier de vendeur que je défends. »",
        ],
      },
      {
        h2: "« Moi » : faire le lien avec votre profil",
        paragraphes: [
          "Le deuxième paragraphe répond à la question du recruteur : « pourquoi vous ? ». Sélectionnez deux ou trois compétences ou expériences directement utiles au poste et illustrez-les par un résultat concret. Ne répétez pas votre CV : donnez-lui du relief.",
          "Exemple : « Au cours de mes trois années en prêt-à-porter, j'ai développé un vrai sens du conseil et fidélisé une clientèle exigeante, ce qui m'a permis de dépasser mes objectifs de vente deux années consécutives. »",
        ],
      },
      {
        h2: "« Nous » : se projeter dans la collaboration",
        paragraphes: [
          "Le dernier paragraphe ouvre sur l'avenir. Exprimez ce que vous comptez apporter et votre motivation à contribuer aux projets de l'entreprise. Terminez par une formule simple proposant un entretien, sans formule alambiquée.",
          "Exemple : « Je serais ravi de mettre mon énergie au service de votre équipe et de contribuer à offrir à vos clients une expérience d'achat à la hauteur de votre enseigne. Je reste à votre disposition pour en échanger lors d'un entretien. »",
        ],
      },
      {
        h2: "Les erreurs à éviter",
        paragraphes: [
          "Évitez les lettres trop longues : une demi-page à trois quarts de page suffit. Bannissez les formules creuses (« dynamique et motivé ») non illustrées, les fautes d'orthographe et le ton trop familier comme trop pompeux.",
          "Enfin, ne recyclez jamais une lettre sans l'adapter. Le nom de l'entreprise oublié dans le texte ou un secteur d'activité qui ne correspond pas sont des erreurs éliminatoires fréquentes.",
        ],
      },
    ],
  },
  {
    slug: "les-erreurs-qui-font-recaler-votre-cv",
    titre: "Les erreurs qui font recaler votre CV",
    description:
      "Fautes, photo, surcharge, mensonges : les erreurs les plus fréquentes qui font écarter un CV, et comment les corriger.",
    date: "2026-03-09",
    categorie: "CV",
    chapeau:
      "Vous postulez sans réponse ? Le problème vient parfois moins de votre parcours que de la façon dont il est présenté. Certaines erreurs entraînent un rejet quasi automatique. Voici les plus courantes, et comment les éviter.",
    sections: [
      {
        h2: "Les fautes d'orthographe et de frappe",
        paragraphes: [
          "C'est l'erreur la plus pénalisante et la plus simple à éviter. Pour de nombreux recruteurs, une faute d'orthographe sur un CV est rédhibitoire : elle est perçue comme un manque de sérieux et de relecture.",
          "Relisez votre CV à voix haute, faites-le relire par un proche et utilisez un correcteur. Vérifiez aussi les noms d'entreprises et d'écoles, souvent mal orthographiés.",
        ],
      },
      {
        h2: "Un CV surchargé ou illisible",
        paragraphes: [
          "Vouloir tout mettre est contre-productif. Un CV de deux pages bien remplies de paragraphes denses décourage la lecture. Le recruteur ne lira pas tout : il survolera et passera au suivant.",
          "Aérez votre mise en page, limitez-vous à l'essentiel et hiérarchisez l'information. Mieux vaut un CV d'une page percutant qu'un document exhaustif que personne ne lit.",
        ],
      },
      {
        h2: "Une accroche absente ou générique",
        paragraphes: [
          "Un CV sans titre ni accroche oblige le recruteur à deviner ce que vous cherchez. À l'inverse, une accroche du type « personne motivée et polyvalente » ne dit rien de vous et n'a aucun impact.",
          "Ajoutez un titre correspondant au poste visé et une accroche personnalisée qui résume votre valeur. C'est la première impression : ne la négligez pas.",
        ],
      },
      {
        h2: "Les mensonges et les zones d'ombre",
        paragraphes: [
          "Exagérer un niveau de langue, inventer une compétence ou masquer maladroitement un trou dans le parcours se retourne souvent contre le candidat. Les recruteurs vérifient, et la confiance, une fois rompue, ne se rattrape pas.",
          "Assumez votre parcours : un trou peut s'expliquer (formation, projet personnel, raisons familiales). La transparence inspire davantage confiance qu'un récit trop lisse et invérifiable.",
        ],
      },
      {
        h2: "Une adresse e-mail ou des coordonnées négligées",
        paragraphes: [
          "Une adresse e-mail fantaisiste créée à l'adolescence fait mauvaise impression. Créez une adresse sobre à base de votre prénom et de votre nom.",
          "Vérifiez aussi que votre numéro de téléphone est correct et que votre messagerie est accessible : un recruteur qui ne peut pas vous joindre passera au candidat suivant.",
        ],
      },
    ],
  },
  {
    slug: "reussir-son-entretien-d-embauche",
    titre: "Réussir son entretien d'embauche",
    description:
      "Préparation, questions clés, langage corporel, relance : tout ce qu'il faut pour réussir un entretien d'embauche et faire la différence.",
    date: "2026-04-15",
    categorie: "Entretien",
    chapeau:
      "Décrocher un entretien est une victoire, mais tout se joue ensuite. Un entretien réussi repose à 80 % sur la préparation. Voici comment aborder ce moment décisif avec confiance et marquer des points.",
    sections: [
      {
        h2: "Se préparer en amont",
        paragraphes: [
          "Renseignez-vous sur l'entreprise : son activité, ses valeurs, ses actualités, ses concurrents. Relisez l'offre et identifiez les compétences attendues pour préparer des exemples concrets de votre parcours qui y répondent.",
          "Préparez aussi votre logistique : itinéraire, tenue adaptée, copies de votre CV. Pour un entretien en visio, testez votre matériel, soignez votre arrière-plan et votre cadrage à l'avance.",
        ],
      },
      {
        h2: "Anticiper les questions classiques",
        paragraphes: [
          "Certaines questions reviennent presque toujours : « Parlez-moi de vous », « Pourquoi ce poste ? », « Quelles sont vos qualités et vos défauts ? », « Où vous voyez-vous dans cinq ans ? ». Préparez des réponses structurées sans les apprendre par cœur.",
          "Pour parler de vos réussites, utilisez la méthode STAR : Situation, Tâche, Action, Résultat. Elle vous aide à raconter une expérience de façon claire et démontrer concrètement votre valeur.",
        ],
      },
      {
        h2: "Soigner sa communication non verbale",
        paragraphes: [
          "Le langage du corps compte autant que les mots. Une poignée de main franche, un regard ouvert, une posture droite et un sourire sincère installent immédiatement un climat positif.",
          "Parlez posément, évitez les bras croisés et les gestes parasites. Écoutez attentivement les questions avant de répondre : un silence de réflexion vaut mieux qu'une réponse précipitée.",
        ],
      },
      {
        h2: "Poser des questions pertinentes",
        paragraphes: [
          "En fin d'entretien, le recruteur vous demandera presque toujours si vous avez des questions. Ne répondez jamais « non ». Préparez deux ou trois questions sur le poste, l'équipe, les missions ou les perspectives d'évolution.",
          "Cela montre votre intérêt et votre implication. Évitez en revanche de commencer par les questions de salaire ou de congés, à aborder plutôt en fin de processus.",
        ],
      },
      {
        h2: "Relancer après l'entretien",
        paragraphes: [
          "Un e-mail de remerciement envoyé dans les 24 heures laisse une bonne impression. Remerciez pour l'échange, réaffirmez brièvement votre motivation et rappelez un point fort de la discussion.",
          "Si vous restez sans nouvelles après le délai annoncé, une relance polie est légitime. Elle témoigne de votre intérêt sans paraître insistante, à condition de respecter le délai indiqué par le recruteur.",
        ],
      },
    ],
  },
  {
    slug: "cv-et-ats-passer-les-filtres-des-recruteurs",
    titre: "CV et ATS : passer les filtres des recruteurs",
    description:
      "Comment fonctionnent les logiciels ATS et comment optimiser son CV pour franchir le tri automatique des recruteurs.",
    date: "2026-05-20",
    categorie: "CV",
    chapeau:
      "Avant d'arriver sous les yeux d'un recruteur, votre CV passe souvent par un logiciel ATS (Applicant Tracking System) qui le lit, le classe et le filtre. Comprendre son fonctionnement permet d'éviter d'être écarté par une machine. Voici comment optimiser votre CV pour les ATS sans le dénaturer.",
    sections: [
      {
        h2: "Qu'est-ce qu'un ATS et pourquoi ça vous concerne",
        paragraphes: [
          "Un ATS est un logiciel utilisé par les entreprises et cabinets de recrutement pour gérer les candidatures. Il extrait automatiquement les informations de votre CV (expériences, compétences, mots-clés) et attribue parfois un score de correspondance avec l'offre.",
          "La conséquence est concrète : un CV mal structuré ou truffé d'éléments graphiques peut être mal lu, voire écarté, avant même qu'un humain ne le consulte. La majorité des grandes entreprises utilisent désormais ce type d'outil.",
        ],
      },
      {
        h2: "Utiliser les bons mots-clés",
        paragraphes: [
          "Les ATS recherchent les mots-clés de l'offre dans votre CV. Reprenez les termes exacts de l'annonce : intitulé de poste, compétences techniques, outils, certifications. Si l'offre parle de « gestion de la relation client », utilisez cette formulation plutôt qu'un synonyme.",
          "Placez ces mots-clés naturellement dans le titre, l'accroche, les expériences et la rubrique compétences. Évitez le bourrage de mots-clés artificiel : les ATS modernes le détectent et un recruteur le repérera aussi.",
        ],
      },
      {
        h2: "Adopter une mise en page compatible",
        paragraphes: [
          "Les mises en page complexes sont l'ennemi des ATS. Évitez les colonnes multiples, les tableaux, les zones de texte, les images et les en-têtes ou pieds de page contenant des informations importantes : beaucoup d'ATS ne les lisent pas correctement.",
          "Privilégiez une structure en une seule colonne, des titres de rubriques standards (« Expériences professionnelles », « Formation », « Compétences ») et une police lisible. C'est aussi plus agréable pour le recruteur humain qui lira votre CV ensuite.",
        ],
      },
      {
        h2: "Choisir le bon format de fichier",
        paragraphes: [
          "Le format PDF est généralement bien lu par les ATS récents et préserve votre mise en page. Si l'offre demande explicitement un format Word (.docx), respectez cette consigne. Évitez les images de CV (format .jpg ou .png) : elles sont illisibles pour la plupart des logiciels.",
          "Nommez votre fichier de façon claire, par exemple « CV-Prenom-Nom.pdf ». Évitez les caractères spéciaux et les versions de brouillon dans le nom du fichier.",
        ],
      },
      {
        h2: "Ne pas oublier l'humain",
        paragraphes: [
          "Optimiser pour l'ATS ne doit jamais se faire au détriment de la lisibilité humaine. Une fois le filtre passé, c'est un recruteur qui décide de vous convoquer. Votre CV doit donc rester clair, agréable et convaincant pour les deux lecteurs.",
          "Le bon réflexe : un CV simple, structuré, riche en mots-clés pertinents et orienté résultats. Cette approche satisfait la machine comme le recruteur, et maximise vos chances d'obtenir un entretien.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
