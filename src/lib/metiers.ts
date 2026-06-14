/**
 * Référentiel des métiers couverts par les pages SEO programmatiques
 * (exemples de CV et lettres de motivation par métier).
 * Contenu rédigé, spécifique et réaliste — pas de texte générique.
 */

export type Metier = {
  slug: string;
  label: string;
  categorie: string;
  h1: string;
  intro: string;
  missions: string[];
  competences: string[];
  accroche: string;
  salaire: string;
  formation: string;
  interets: string[];
};

export const METIERS: Metier[] = [
  // ───────────────────────── Santé & social ─────────────────────────
  {
    slug: "aide-soignante",
    label: "Aide-soignante",
    categorie: "Santé & social",
    h1: "Exemple de CV Aide-soignante",
    intro:
      "L'aide-soignante accompagne les patients dans les gestes du quotidien et veille à leur confort et à leur hygiène. Au plus près des personnes fragiles, elle travaille en lien étroit avec les infirmiers et l'équipe médicale. Un CV d'aide-soignante doit mettre en avant la rigueur, le sens du soin et la bienveillance.",
    missions: [
      "Assurer les soins d'hygiène et de confort des patients (toilette, change, aide aux repas)",
      "Surveiller l'état général et signaler tout changement à l'équipe soignante",
      "Aider à la mobilité et aux déplacements des personnes dépendantes",
      "Installer et entretenir l'environnement immédiat du patient",
      "Transmettre les informations à l'oral et à l'écrit (dossier de soins)",
      "Participer à l'accueil et à l'écoute des patients et de leurs familles",
    ],
    competences: [
      "Soins d'hygiène et de nursing",
      "Aide à la mobilisation (transferts, lève-malade)",
      "Surveillance des constantes",
      "Connaissance des règles d'hygiène et d'asepsie",
      "Empathie et écoute",
      "Travail en équipe pluridisciplinaire",
      "Gestion du stress et des situations d'urgence",
      "Discrétion et secret professionnel",
    ],
    accroche:
      "Aide-soignante diplômée avec 4 ans d'expérience en EHPAD, je place le confort et la dignité des patients au cœur de ma pratique. Reconnue pour mon calme et ma capacité à rassurer les personnes fragilisées, je recherche un poste au sein d'une équipe soudée.",
    salaire: "1 800 – 2 200 € brut/mois",
    formation: "Diplôme d'État d'aide-soignant (DEAS)",
    interets: ["Bénévolat associatif", "Randonnée", "Cuisine"],
  },
  {
    slug: "infirmier",
    label: "Infirmier",
    categorie: "Santé & social",
    h1: "Exemple de CV Infirmier",
    intro:
      "L'infirmier dispense les soins prescrits, surveille l'état de santé des patients et coordonne le parcours de soins. Métier exigeant et polyvalent, il demande des compétences techniques solides et un fort sens des responsabilités. Le CV doit refléter l'expertise clinique et la capacité d'adaptation.",
    missions: [
      "Réaliser les soins infirmiers prescrits (pansements, injections, perfusions)",
      "Surveiller l'évolution de l'état de santé et adapter la prise en charge",
      "Préparer et administrer les traitements en respectant les protocoles",
      "Tenir à jour le dossier de soins et assurer les transmissions",
      "Encadrer les aides-soignants et coordonner les soins",
      "Informer et accompagner les patients et leurs proches",
    ],
    competences: [
      "Soins techniques (perfusion, prélèvement, pansement)",
      "Évaluation clinique du patient",
      "Maîtrise des protocoles et de la traçabilité",
      "Gestion de l'urgence",
      "Sens de l'organisation et des priorités",
      "Pédagogie et communication",
      "Rigueur et fiabilité",
      "Travail en équipe pluridisciplinaire",
    ],
    accroche:
      "Infirmier diplômé d'État, j'ai exercé 5 ans en service de médecine puis aux urgences, où j'ai développé une grande capacité à gérer la pression. À l'aise dans la technique comme dans la relation au patient, je cherche à rejoindre un établissement où la qualité des soins est une priorité.",
    salaire: "2 100 – 2 800 € brut/mois",
    formation: "Diplôme d'État d'infirmier (Bac+3)",
    interets: ["Course à pied", "Lecture médicale", "Voyages"],
  },
  {
    slug: "auxiliaire-de-puericulture",
    label: "Auxiliaire de puériculture",
    categorie: "Santé & social",
    h1: "Exemple de CV Auxiliaire de puériculture",
    intro:
      "L'auxiliaire de puériculture prend soin des nourrissons et jeunes enfants en crèche, maternité ou PMI. Elle veille à leur éveil, leur hygiène et leur sécurité au quotidien. Le CV doit valoriser la douceur, la patience et le sens de l'observation.",
    missions: [
      "Assurer les soins quotidiens des enfants (change, repas, sommeil)",
      "Veiller à la sécurité physique et affective des tout-petits",
      "Proposer des activités d'éveil adaptées à chaque âge",
      "Observer le développement de l'enfant et alerter si besoin",
      "Échanger avec les parents sur la journée de leur enfant",
      "Entretenir le matériel et respecter les protocoles d'hygiène",
    ],
    competences: [
      "Soins du nourrisson et du jeune enfant",
      "Éveil et activités psychomotrices",
      "Règles d'hygiène et de sécurité",
      "Observation du développement de l'enfant",
      "Patience et douceur",
      "Communication avec les familles",
      "Travail en équipe",
      "Capacité d'adaptation",
    ],
    accroche:
      "Auxiliaire de puériculture passionnée par la petite enfance, j'accompagne depuis 3 ans l'éveil et le bien-être des enfants en crèche collective. Attentive et bienveillante, je sais créer un climat de confiance avec les enfants comme avec leurs parents.",
    salaire: "1 800 – 2 100 € brut/mois",
    formation: "Diplôme d'État d'auxiliaire de puériculture",
    interets: ["Activités manuelles", "Lecture jeunesse", "Natation"],
  },
  {
    slug: "secretaire-medicale",
    label: "Secrétaire médicale",
    categorie: "Santé & social",
    h1: "Exemple de CV Secrétaire médicale",
    intro:
      "La secrétaire médicale est le pivot administratif d'un cabinet, d'une clinique ou d'un hôpital. Elle accueille les patients, gère les rendez-vous et assure le suivi des dossiers médicaux. Le CV doit mettre en avant l'organisation, la discrétion et la maîtrise du vocabulaire médical.",
    missions: [
      "Accueillir physiquement et par téléphone les patients",
      "Planifier et confirmer les rendez-vous et consultations",
      "Saisir les comptes rendus et courriers médicaux",
      "Gérer et classer les dossiers patients",
      "Assurer la facturation et la télétransmission (FSE)",
      "Coordonner les échanges avec laboratoires et confrères",
    ],
    competences: [
      "Maîtrise du vocabulaire médical",
      "Frappe rapide et qualité rédactionnelle",
      "Logiciels de gestion de cabinet (Doctolib, etc.)",
      "Organisation et gestion des priorités",
      "Accueil et sens du service",
      "Confidentialité et secret professionnel",
      "Gestion du standard téléphonique",
      "Rigueur administrative",
    ],
    accroche:
      "Secrétaire médicale expérimentée, j'assure depuis 6 ans la coordination administrative d'un cabinet de spécialistes. Organisée et discrète, je gère un flux soutenu de patients tout en maintenant un accueil chaleureux et un suivi rigoureux des dossiers.",
    salaire: "1 700 – 2 000 € brut/mois",
    formation: "Titre de secrétaire médicale (Bac à Bac+2)",
    interets: ["Lecture", "Yoga", "Jardinage"],
  },

  // ───────────────────────── Commerce & vente ─────────────────────────
  {
    slug: "vendeur",
    label: "Vendeur",
    categorie: "Commerce & vente",
    h1: "Exemple de CV Vendeur",
    intro:
      "Le vendeur conseille les clients, met en valeur les produits et contribue directement au chiffre d'affaires du magasin. C'est un métier de contact qui demande le sens du commerce et une bonne présentation. Le CV doit prouver la fibre commerciale et la connaissance produit.",
    missions: [
      "Accueillir, conseiller et fidéliser la clientèle",
      "Mettre en rayon et assurer le merchandising",
      "Réaliser les ventes et l'encaissement",
      "Gérer le réassort et le suivi des stocks",
      "Atteindre les objectifs de vente fixés",
      "Veiller à la bonne tenue de l'espace de vente",
    ],
    competences: [
      "Techniques de vente et d'argumentation",
      "Connaissance produit",
      "Encaissement et tenue de caisse",
      "Merchandising et mise en rayon",
      "Sens du contact et écoute client",
      "Présentation soignée",
      "Esprit d'équipe",
      "Résistance au rythme du commerce",
    ],
    accroche:
      "Vendeur dynamique avec 3 ans d'expérience en prêt-à-porter, j'aime transformer chaque visite en une expérience d'achat agréable. Orienté résultats, j'ai régulièrement dépassé mes objectifs grâce à un conseil sincère et personnalisé.",
    salaire: "1 750 – 2 100 € brut/mois",
    formation: "CAP/Bac pro commerce ou vente",
    interets: ["Mode", "Football", "Voyages"],
  },
  {
    slug: "commercial",
    label: "Commercial",
    categorie: "Commerce & vente",
    h1: "Exemple de CV Commercial",
    intro:
      "Le commercial développe le portefeuille clients d'une entreprise et négocie les ventes pour atteindre ses objectifs. Métier de challenge, il combine prospection, négociation et suivi de la relation client. Le CV doit chiffrer les résultats et démontrer la capacité à convaincre.",
    missions: [
      "Prospecter de nouveaux clients (téléphone, terrain, réseaux)",
      "Identifier les besoins et présenter des offres adaptées",
      "Négocier les conditions commerciales et conclure les ventes",
      "Assurer le suivi et la fidélisation du portefeuille",
      "Atteindre et dépasser les objectifs de chiffre d'affaires",
      "Réaliser un reporting régulier de l'activité (CRM)",
    ],
    competences: [
      "Prospection et développement commercial",
      "Techniques de négociation",
      "Maîtrise d'un CRM",
      "Sens du résultat et goût du challenge",
      "Aisance relationnelle",
      "Écoute et reformulation",
      "Autonomie et organisation",
      "Résilience face au refus",
    ],
    accroche:
      "Commercial B2B avec 5 ans d'expérience, j'ai développé un portefeuille de plus de 80 comptes actifs et dépassé mes objectifs trois années consécutives. Chasseur dans l'âme et fin négociateur, je cherche un nouveau défi dans une entreprise ambitieuse.",
    salaire: "2 200 – 3 500 € brut/mois (+ variable)",
    formation: "Bac+2/3 commerce ou négociation",
    interets: ["Sport collectif", "Investissement", "Podcasts business"],
  },
  {
    slug: "conseiller-clientele",
    label: "Conseiller clientèle",
    categorie: "Commerce & vente",
    h1: "Exemple de CV Conseiller clientèle",
    intro:
      "Le conseiller clientèle accompagne les clients dans leurs démarches, répond à leurs demandes et propose des solutions adaptées. En agence ou à distance, il est le visage de l'entreprise. Le CV doit valoriser le sens du service, la rigueur et la capacité de rebond commercial.",
    missions: [
      "Répondre aux demandes des clients par téléphone, e-mail ou en agence",
      "Conseiller et proposer des produits ou services adaptés",
      "Traiter les réclamations et trouver des solutions",
      "Mettre à jour les dossiers et les informations clients",
      "Contribuer aux objectifs de satisfaction et de vente",
      "Assurer le suivi des dossiers en cours",
    ],
    competences: [
      "Relation client multicanal",
      "Écoute active et reformulation",
      "Gestion des réclamations",
      "Rebond et vente additionnelle",
      "Maîtrise des outils CRM",
      "Patience et maîtrise de soi",
      "Esprit de service",
      "Capacité à expliquer simplement",
    ],
    accroche:
      "Conseiller clientèle au sens du service développé, j'accompagne depuis 4 ans une clientèle exigeante avec patience et réactivité. Reconnu pour mon taux de satisfaction élevé, je sais transformer une réclamation en opportunité de fidélisation.",
    salaire: "1 850 – 2 300 € brut/mois",
    formation: "Bac à Bac+2 (relation client, commerce)",
    interets: ["Théâtre d'improvisation", "Vélo", "Cinéma"],
  },
  {
    slug: "hote-de-caisse",
    label: "Hôte de caisse",
    categorie: "Commerce & vente",
    h1: "Exemple de CV Hôte de caisse",
    intro:
      "L'hôte de caisse enregistre les achats, encaisse les paiements et accueille les clients en fin de parcours d'achat. Poste de première ligne, il exige rigueur, rapidité et sourire. Le CV doit mettre en avant la fiabilité et le sens de l'accueil.",
    missions: [
      "Accueillir les clients et procéder à l'enregistrement des articles",
      "Encaisser les paiements (espèces, carte, titres)",
      "Gérer son fonds de caisse et contrôler les écarts",
      "Renseigner et orienter les clients en magasin",
      "Participer à la fidélisation (cartes, promotions)",
      "Maintenir la propreté et l'ordre de son poste",
    ],
    competences: [
      "Tenue de caisse et encaissement",
      "Rapidité et précision",
      "Gestion des moyens de paiement",
      "Accueil et amabilité",
      "Gestion des litiges simples",
      "Rigueur et honnêteté",
      "Résistance à la station debout",
      "Esprit d'équipe",
    ],
    accroche:
      "Hôte de caisse fiable et souriant, je gère un poste à fort flux dans la grande distribution depuis 2 ans, sans écart de caisse. Toujours à l'écoute, je veille à ce que chaque client reparte avec une bonne dernière impression.",
    salaire: "1 700 – 1 900 € brut/mois",
    formation: "CAP/Bac pro commerce (ou sans diplôme)",
    interets: ["Musique", "Sport", "Bénévolat"],
  },

  // ───────────────────────── Restauration ─────────────────────────
  {
    slug: "serveur",
    label: "Serveur",
    categorie: "Restauration",
    h1: "Exemple de CV Serveur",
    intro:
      "Le serveur accueille les clients en salle, prend les commandes et assure un service fluide et agréable. Rythme soutenu et sens du contact sont au cœur du métier. Le CV doit refléter la rapidité, le savoir-être et la résistance à la pression.",
    missions: [
      "Accueillir et installer les clients",
      "Prendre les commandes et conseiller sur la carte",
      "Assurer le service des plats et des boissons",
      "Encaisser et gérer les additions",
      "Dresser et débarrasser les tables",
      "Veiller à la satisfaction des clients tout au long du repas",
    ],
    competences: [
      "Service en salle",
      "Prise de commande et conseil",
      "Encaissement",
      "Connaissance des règles d'hygiène (HACCP)",
      "Rapidité et endurance",
      "Sens du contact et sourire",
      "Gestion du stress en coup de feu",
      "Esprit d'équipe",
    ],
    accroche:
      "Serveur expérimenté en brasserie et restauration traditionnelle, je gère sereinement un rang complet même en plein coup de feu. Dynamique et avenant, je sais créer une ambiance conviviale qui fidélise la clientèle.",
    salaire: "1 750 – 2 100 € brut/mois (+ pourboires)",
    formation: "CAP/Bac pro restauration (ou sans diplôme)",
    interets: ["Œnologie", "Voyages", "Sport"],
  },
  {
    slug: "cuisinier",
    label: "Cuisinier",
    categorie: "Restauration",
    h1: "Exemple de CV Cuisinier",
    intro:
      "Le cuisinier prépare les plats dans le respect des recettes, des règles d'hygiène et des délais du service. Créativité, organisation et résistance au rythme sont essentielles. Le CV doit valoriser la maîtrise technique et l'expérience en cuisine.",
    missions: [
      "Préparer et dresser les plats de la carte",
      "Gérer les cuissons et l'envoi pendant le service",
      "Réceptionner et contrôler les marchandises",
      "Respecter les normes d'hygiène HACCP",
      "Participer à l'élaboration des menus",
      "Entretenir le poste de travail et le matériel",
    ],
    competences: [
      "Techniques culinaires et de cuisson",
      "Dressage et présentation",
      "Normes d'hygiène HACCP",
      "Gestion des stocks et des denrées",
      "Organisation du poste (mise en place)",
      "Rapidité et sang-froid",
      "Créativité",
      "Travail en équipe (brigade)",
    ],
    accroche:
      "Cuisinier passionné formé en cuisine traditionnelle française, je maîtrise l'ensemble des postes, du chaud à l'entremets. Rigoureux sur l'hygiène et créatif sur l'assiette, je cherche à apporter ma technique à une équipe ambitieuse.",
    salaire: "1 900 – 2 500 € brut/mois",
    formation: "CAP cuisine / Bac pro cuisine",
    interets: ["Pâtisserie", "Produits du terroir", "Course à pied"],
  },
  {
    slug: "employe-de-restauration",
    label: "Employé de restauration",
    categorie: "Restauration",
    h1: "Exemple de CV Employé de restauration",
    intro:
      "L'employé de restauration participe à la préparation, au service et à l'entretien dans la restauration collective ou rapide. Polyvalence et respect des règles d'hygiène sont au cœur du poste. Le CV doit mettre en avant la fiabilité et l'esprit d'équipe.",
    missions: [
      "Préparer les entrées, sandwichs et plats simples",
      "Assurer le service au comptoir ou en self",
      "Réapprovisionner les vitrines et le buffet",
      "Encaisser et orienter les clients",
      "Nettoyer et désinfecter les espaces et le matériel",
      "Appliquer strictement les règles d'hygiène HACCP",
    ],
    competences: [
      "Préparation de denrées simples",
      "Service au comptoir / self",
      "Normes d'hygiène HACCP",
      "Encaissement",
      "Polyvalence",
      "Rapidité d'exécution",
      "Esprit d'équipe",
      "Sens du service",
    ],
    accroche:
      "Employé de restauration polyvalent, j'interviens aussi bien en préparation qu'au service et au nettoyage, dans le respect strict des normes d'hygiène. Fiable et toujours disponible, je m'intègre rapidement dans une équipe.",
    salaire: "1 700 – 1 900 € brut/mois",
    formation: "CAP (ou sans diplôme, formation interne)",
    interets: ["Cuisine", "Football", "Musique"],
  },

  // ─────────────────── Logistique & transport ───────────────────
  {
    slug: "cariste",
    label: "Cariste",
    categorie: "Logistique & transport",
    h1: "Exemple de CV Cariste",
    intro:
      "Le cariste conduit des chariots élévateurs pour déplacer, charger et stocker les marchandises en entrepôt. Sécurité, précision et titulaire des CACES sont indispensables. Le CV doit afficher clairement les CACES détenus et l'expérience en entrepôt.",
    missions: [
      "Charger et décharger les camions à l'aide du chariot élévateur",
      "Stocker et déstocker les marchandises dans les racks",
      "Vérifier la conformité des produits réceptionnés",
      "Respecter les règles de sécurité et de circulation en entrepôt",
      "Préparer les commandes et les zones d'expédition",
      "Effectuer l'entretien de premier niveau du chariot",
    ],
    competences: [
      "Conduite de chariots (CACES 1, 3, 5)",
      "Gerbage et stockage en hauteur",
      "Lecture de bons de commande",
      "Règles de sécurité en entrepôt",
      "Rigueur et précision",
      "Utilisation de scan/terminal",
      "Endurance physique",
      "Autonomie",
    ],
    accroche:
      "Cariste titulaire des CACES 1, 3 et 5 avec 6 ans d'expérience en logistique, je manœuvre avec précision même dans des allées étroites. Soucieux de la sécurité, je n'ai connu aucun incident et je tiens des cadences soutenues.",
    salaire: "1 850 – 2 200 € brut/mois",
    formation: "CACES R489 (cat. 1-3-5)",
    interets: ["Mécanique", "VTT", "Bricolage"],
  },
  {
    slug: "preparateur-de-commandes",
    label: "Préparateur de commandes",
    categorie: "Logistique & transport",
    h1: "Exemple de CV Préparateur de commandes",
    intro:
      "Le préparateur de commandes rassemble, contrôle et conditionne les produits avant expédition. Cadence, fiabilité et rigueur sont les maîtres-mots. Le CV doit mettre en avant la productivité et le respect des process logistiques.",
    missions: [
      "Prélever les articles selon les bons de commande",
      "Contrôler la quantité et la qualité des produits",
      "Conditionner, emballer et étiqueter les colis",
      "Utiliser le système de gestion d'entrepôt (scan, vocal)",
      "Préparer les palettes et zones d'expédition",
      "Respecter les cadences et les délais",
    ],
    competences: [
      "Picking et préparation de commandes",
      "Utilisation de scan / commande vocale",
      "Conditionnement et palettisation",
      "Respect des cadences",
      "Rigueur et fiabilité",
      "Gestes et postures",
      "Esprit d'équipe",
      "Sens de l'organisation",
    ],
    accroche:
      "Préparateur de commandes fiable et productif, je tiens des cadences élevées tout en maintenant un taux d'erreur quasi nul. Habitué au travail en équipe et aux outils de scan, je m'adapte rapidement à tout environnement logistique.",
    salaire: "1 750 – 2 000 € brut/mois",
    formation: "CAP logistique (ou sans diplôme)",
    interets: ["Sport en salle", "Jeux vidéo", "Musique"],
  },
  {
    slug: "chauffeur-livreur",
    label: "Chauffeur-livreur",
    categorie: "Logistique & transport",
    h1: "Exemple de CV Chauffeur-livreur",
    intro:
      "Le chauffeur-livreur assure le transport et la remise des marchandises aux clients dans le respect des délais. Bonne connaissance du secteur, ponctualité et relationnel sont essentiels. Le CV doit valoriser le permis, le sérieux et le sens du service.",
    missions: [
      "Charger et organiser le véhicule selon la tournée",
      "Livrer les colis chez les clients dans les délais",
      "Faire signer les bons de livraison et encaisser si besoin",
      "Optimiser les itinéraires de tournée",
      "Vérifier l'état et l'entretien du véhicule",
      "Assurer une relation client courtoise lors des livraisons",
    ],
    competences: [
      "Conduite et permis B (voire C)",
      "Organisation de tournée",
      "Connaissance géographique du secteur",
      "Manutention et chargement",
      "Sens du service et ponctualité",
      "Gestion des bons de livraison",
      "Autonomie",
      "Calme au volant",
    ],
    accroche:
      "Chauffeur-livreur ponctuel et autonome, j'effectue jusqu'à 80 livraisons par jour avec un excellent taux de satisfaction client. Bon connaisseur de l'agglomération lyonnaise, j'optimise mes tournées pour respecter chaque créneau.",
    salaire: "1 800 – 2 200 € brut/mois",
    formation: "Permis B (CACES un plus)",
    interets: ["Automobile", "Football", "Voyages"],
  },
  {
    slug: "magasinier",
    label: "Magasinier",
    categorie: "Logistique & transport",
    h1: "Exemple de CV Magasinier",
    intro:
      "Le magasinier réceptionne, stocke et gère les flux de marchandises au sein d'un magasin ou d'un entrepôt. Il assure la disponibilité des produits et la fiabilité des stocks. Le CV doit mettre en avant la rigueur, l'organisation et la maîtrise des outils de gestion.",
    missions: [
      "Réceptionner et contrôler les livraisons",
      "Ranger et organiser les zones de stockage",
      "Gérer les entrées et sorties de stock (informatique)",
      "Réaliser les inventaires et suivre les écarts",
      "Préparer les marchandises pour les ateliers ou clients",
      "Maintenir la propreté et la sécurité du magasin",
    ],
    competences: [
      "Gestion des stocks et inventaires",
      "Réception et contrôle qualité",
      "Logiciels de gestion (ERP/WMS)",
      "Conduite de chariot (CACES un plus)",
      "Organisation et méthode",
      "Rigueur et fiabilité",
      "Manutention",
      "Travail en équipe",
    ],
    accroche:
      "Magasinier organisé et méthodique, je gère depuis 5 ans le stock d'un entrepôt de pièces détachées avec un taux de fiabilité supérieur à 99 %. À l'aise avec les outils ERP, je sais anticiper les ruptures et optimiser le rangement.",
    salaire: "1 800 – 2 100 € brut/mois",
    formation: "CAP/Bac pro logistique",
    interets: ["Bricolage", "Randonnée", "Mécanique"],
  },

  // ──────────────────── Administratif & gestion ────────────────────
  {
    slug: "secretaire",
    label: "Secrétaire",
    categorie: "Administratif & gestion",
    h1: "Exemple de CV Secrétaire",
    intro:
      "La secrétaire assure le support administratif d'un service ou d'une direction : accueil, courriers, agendas et classement. Polyvalence, organisation et discrétion sont au cœur du métier. Le CV doit valoriser la maîtrise bureautique et le sens de l'organisation.",
    missions: [
      "Gérer le standard téléphonique et l'accueil",
      "Rédiger courriers, comptes rendus et e-mails",
      "Tenir les agendas et organiser les rendez-vous",
      "Classer et archiver les documents",
      "Préparer et suivre les dossiers administratifs",
      "Assurer le lien entre les services",
    ],
    competences: [
      "Maîtrise du Pack Office (Word, Excel, Outlook)",
      "Rédaction et orthographe irréprochables",
      "Gestion d'agenda et planification",
      "Classement et archivage",
      "Accueil physique et téléphonique",
      "Organisation et autonomie",
      "Discrétion",
      "Gestion des priorités",
    ],
    accroche:
      "Secrétaire polyvalente avec 7 ans d'expérience, j'assure le bon fonctionnement administratif d'un service grâce à une organisation sans faille. Rigoureuse et réactive, je suis le point d'appui fiable des équipes et de la direction.",
    salaire: "1 750 – 2 100 € brut/mois",
    formation: "Bac à BTS support à l'action managériale",
    interets: ["Lecture", "Scrapbooking", "Marche"],
  },
  {
    slug: "assistant-administratif",
    label: "Assistant administratif",
    categorie: "Administratif & gestion",
    h1: "Exemple de CV Assistant administratif",
    intro:
      "L'assistant administratif appuie une équipe ou une direction dans la gestion des tâches administratives et le suivi des dossiers. Fiabilité, polyvalence et maîtrise des outils sont indispensables. Le CV doit démontrer l'autonomie et la rigueur.",
    missions: [
      "Traiter le courrier et les e-mails entrants",
      "Saisir et mettre à jour les bases de données",
      "Suivre les dossiers et relancer si nécessaire",
      "Préparer les documents et reportings",
      "Organiser réunions et déplacements",
      "Assurer le classement et l'archivage",
    ],
    competences: [
      "Bureautique avancée (Excel, Word)",
      "Saisie et gestion de données",
      "Suivi de dossiers",
      "Rédaction administrative",
      "Organisation et méthode",
      "Autonomie et fiabilité",
      "Gestion des priorités",
      "Sens de la confidentialité",
    ],
    accroche:
      "Assistant administratif rigoureux, j'apporte un soutien fiable au quotidien grâce à ma maîtrise des outils bureautiques et mon sens de l'organisation. Autonome et polyvalent, je sais jongler entre les priorités sans rien laisser de côté.",
    salaire: "1 800 – 2 200 € brut/mois",
    formation: "Bac+2 (gestion, administration)",
    interets: ["Informatique", "Échecs", "Vélo"],
  },
  {
    slug: "comptable",
    label: "Comptable",
    categorie: "Administratif & gestion",
    h1: "Exemple de CV Comptable",
    intro:
      "Le comptable enregistre les opérations, établit les déclarations et participe à la production des comptes. Précision, méthode et maîtrise des outils comptables sont essentielles. Le CV doit valoriser l'expertise technique et la fiabilité des chiffres.",
    missions: [
      "Saisir et contrôler les écritures comptables",
      "Gérer les factures clients et fournisseurs",
      "Réaliser les rapprochements bancaires",
      "Préparer les déclarations de TVA et sociales",
      "Participer à la clôture mensuelle et annuelle",
      "Suivre la trésorerie et les relances",
    ],
    competences: [
      "Comptabilité générale et analytique",
      "Logiciels comptables (Sage, Cegid, EBP)",
      "Déclarations fiscales (TVA, IS)",
      "Rapprochements et lettrage",
      "Maîtrise d'Excel (TCD, formules)",
      "Rigueur et précision",
      "Respect des délais",
      "Discrétion",
    ],
    accroche:
      "Comptable rigoureux avec 6 ans d'expérience en PME, je tiens une comptabilité fiable du saisie à la préparation du bilan. À l'aise avec Sage et Excel, je respecte scrupuleusement les échéances fiscales et sociales.",
    salaire: "2 000 – 2 600 € brut/mois",
    formation: "BTS/DCG comptabilité (Bac+2/3)",
    interets: ["Finance personnelle", "Course à pied", "Lecture"],
  },
  {
    slug: "assistant-rh",
    label: "Assistant RH",
    categorie: "Administratif & gestion",
    h1: "Exemple de CV Assistant RH",
    intro:
      "L'assistant RH appuie le service des ressources humaines sur l'administration du personnel, le recrutement et la paie. Discrétion, rigueur et sens du relationnel sont indispensables. Le CV doit valoriser la polyvalence et la connaissance du droit social.",
    missions: [
      "Gérer l'administration du personnel (contrats, absences)",
      "Préparer les éléments variables de paie",
      "Participer au recrutement (tri de CV, entretiens)",
      "Suivre les formations et les entretiens annuels",
      "Mettre à jour les dossiers du personnel",
      "Répondre aux questions des salariés",
    ],
    competences: [
      "Administration du personnel",
      "Notions de droit du travail",
      "Préparation de la paie",
      "Sourcing et tri de candidatures",
      "SIRH et bureautique",
      "Discrétion et confidentialité",
      "Sens du relationnel",
      "Organisation",
    ],
    accroche:
      "Assistant RH polyvalent, j'accompagne le service ressources humaines sur l'ensemble du cycle de vie du salarié, du recrutement à la paie. Discret et organisé, je suis l'interlocuteur de confiance des collaborateurs au quotidien.",
    salaire: "1 900 – 2 300 € brut/mois",
    formation: "Bac+2/3 ressources humaines",
    interets: ["Psychologie", "Bénévolat", "Randonnée"],
  },

  // ───────────────────────── Bâtiment ─────────────────────────
  {
    slug: "electricien",
    label: "Électricien",
    categorie: "Bâtiment",
    h1: "Exemple de CV Électricien",
    intro:
      "L'électricien installe, raccorde et entretient les réseaux électriques dans le neuf comme en rénovation. Précision, respect des normes et habilitations sont essentiels. Le CV doit afficher clairement les habilitations électriques et l'expérience chantier.",
    missions: [
      "Lire les plans et schémas électriques",
      "Tirer les câbles et poser les équipements",
      "Raccorder les tableaux et appareillages",
      "Mettre en service et contrôler les installations",
      "Diagnostiquer et réparer les pannes",
      "Respecter la norme NF C 15-100 et les règles de sécurité",
    ],
    competences: [
      "Pose et raccordement électrique",
      "Lecture de plans et schémas",
      "Norme NF C 15-100",
      "Habilitations électriques (B1V, BR, B2V)",
      "Diagnostic de pannes",
      "Précision et minutie",
      "Autonomie sur chantier",
      "Sécurité",
    ],
    accroche:
      "Électricien du bâtiment habilité avec 8 ans d'expérience en neuf et rénovation, je réalise des installations conformes et soignées dans le respect des délais. Méthodique et autonome, j'interviens du tirage de câbles à la mise en service.",
    salaire: "1 900 – 2 600 € brut/mois",
    formation: "CAP/Bac pro électrotechnique",
    interets: ["Domotique", "VTT", "Bricolage"],
  },
  {
    slug: "plombier",
    label: "Plombier",
    categorie: "Bâtiment",
    h1: "Exemple de CV Plombier",
    intro:
      "Le plombier installe et entretient les réseaux d'eau, de gaz et les équipements sanitaires. Habileté manuelle, sens du diagnostic et relation client sont essentiels. Le CV doit valoriser la polyvalence et la qualité des finitions.",
    missions: [
      "Installer les réseaux d'eau et les évacuations",
      "Poser sanitaires, robinetterie et chauffe-eau",
      "Souder et raccorder les tuyauteries",
      "Diagnostiquer et réparer fuites et pannes",
      "Réaliser la mise en service et les tests d'étanchéité",
      "Conseiller le client sur l'entretien",
    ],
    competences: [
      "Installation sanitaire et chauffage",
      "Soudure et raccordement",
      "Lecture de plans",
      "Diagnostic de fuites",
      "Connaissance des normes (DTU)",
      "Habileté manuelle",
      "Sens du service client",
      "Autonomie",
    ],
    accroche:
      "Plombier chauffagiste avec 7 ans d'expérience, j'interviens aussi bien en installation qu'en dépannage, avec un vrai souci de la finition. Autonome et réactif, je sais diagnostiquer rapidement une panne et rassurer le client.",
    salaire: "1 900 – 2 600 € brut/mois",
    formation: "CAP/Bac pro installateur sanitaire",
    interets: ["Bricolage", "Pêche", "Football"],
  },
  {
    slug: "macon",
    label: "Maçon",
    categorie: "Bâtiment",
    h1: "Exemple de CV Maçon",
    intro:
      "Le maçon réalise les fondations, murs et structures qui constituent le gros œuvre d'un bâtiment. Endurance, précision et lecture de plans sont indispensables. Le CV doit mettre en avant la maîtrise des techniques et la fiabilité sur chantier.",
    missions: [
      "Lire les plans et implanter les ouvrages",
      "Couler les fondations et dalles béton",
      "Monter les murs en parpaings, briques ou pierres",
      "Réaliser les enduits et finitions",
      "Poser les éléments préfabriqués (linteaux, poutres)",
      "Respecter les consignes de sécurité du chantier",
    ],
    competences: [
      "Montage de murs et cloisons",
      "Coffrage et coulage de béton",
      "Lecture de plans",
      "Enduits et finitions",
      "Maîtrise des outils du gros œuvre",
      "Endurance physique",
      "Précision et soin",
      "Travail en équipe",
    ],
    accroche:
      "Maçon expérimenté en gros œuvre, je maîtrise l'ensemble des étapes, des fondations aux finitions, avec un véritable souci de la précision. Endurant et fiable, je m'investis pleinement sur chaque chantier dans le respect des délais et de la sécurité.",
    salaire: "1 850 – 2 400 € brut/mois",
    formation: "CAP/Bac pro maçonnerie",
    interets: ["Rugby", "Bricolage", "Pétanque"],
  },
  {
    slug: "peintre-en-batiment",
    label: "Peintre en bâtiment",
    categorie: "Bâtiment",
    h1: "Exemple de CV Peintre en bâtiment",
    intro:
      "Le peintre en bâtiment prépare les surfaces et applique peintures et revêtements pour embellir et protéger les ouvrages. Minutie, sens des finitions et propreté sont au cœur du métier. Le CV doit valoriser la qualité de réalisation et la fiabilité.",
    missions: [
      "Préparer les supports (ponçage, enduit, rebouchage)",
      "Protéger les surfaces et le mobilier",
      "Appliquer peintures, vernis et revêtements",
      "Poser papiers peints et toiles",
      "Réaliser les finitions et raccords",
      "Nettoyer le chantier et le matériel",
    ],
    competences: [
      "Préparation des supports",
      "Application de peinture (rouleau, pistolet)",
      "Pose de revêtements muraux",
      "Sens des finitions",
      "Connaissance des produits",
      "Minutie et propreté",
      "Autonomie",
      "Respect des délais",
    ],
    accroche:
      "Peintre en bâtiment soigneux, je réalise des finitions impeccables aussi bien chez les particuliers que sur des chantiers tertiaires. Minutieux et organisé, je veille à un travail propre et à un chantier livré dans les temps.",
    salaire: "1 800 – 2 300 € brut/mois",
    formation: "CAP peintre applicateur de revêtements",
    interets: ["Dessin", "Décoration", "Vélo"],
  },

  // ───────────────────────── Informatique ─────────────────────────
  {
    slug: "developpeur-web",
    label: "Développeur web",
    categorie: "Informatique",
    h1: "Exemple de CV Développeur web",
    intro:
      "Le développeur web conçoit, code et maintient des sites et applications web performants. Maîtrise technique, rigueur et curiosité sont indispensables dans un métier en évolution constante. Le CV doit mettre en avant les technologies maîtrisées et les projets réalisés.",
    missions: [
      "Développer des interfaces et fonctionnalités web",
      "Écrire un code propre, testé et documenté",
      "Intégrer des API et bases de données",
      "Corriger les bugs et optimiser les performances",
      "Participer aux revues de code et aux rituels agiles",
      "Assurer la maintenance et les évolutions des applications",
    ],
    competences: [
      "JavaScript / TypeScript",
      "Frameworks front (React, Next.js)",
      "HTML / CSS",
      "Back-end et API REST",
      "Bases de données (SQL/NoSQL)",
      "Git et intégration continue",
      "Rigueur et résolution de problèmes",
      "Travail en méthode agile",
    ],
    accroche:
      "Développeur web full-stack avec 4 ans d'expérience, je conçois des applications performantes en React et Node.js, du maquettage à la mise en production. Curieux et rigoureux, j'aime écrire un code propre et collaborer en équipe agile.",
    salaire: "2 600 – 3 800 € brut/mois",
    formation: "Bac+2 à Bac+5 (informatique)",
    interets: ["Open source", "Jeux vidéo", "Veille technologique"],
  },
];

export function getMetier(slug: string): Metier | undefined {
  return METIERS.find((m) => m.slug === slug);
}
