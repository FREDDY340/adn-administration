import { BlogPost, ContactOrQuoteRequest, Appointment, FaqItem, ServiceItem, SiteSettings, Testimonial } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'droit-etrangers',
    slug: 'droit-des-etrangers',
    title: 'Droit des Étrangers & Titres de Séjour',
    shortDescription: 'Assistance complète pour première demande, renouvellement, changement de statut et régularisation.',
    fullDescription: 'Notre cabinet vous accompagne avec rigueur dans la constitution, la vérification et le suivi de vos démarches administratives en préfecture. Nous analysons point par point vos justificatifs pour maximiser la conformité de votre dossier selon les critères officiels.',
    category: 'etrangers',
    priceEstimate: 'À partir de 120 €',
    processingTime: 'Analyse en 24h à 48h',
    badge: 'Forte demande',
    icon: 'FileText',
    requiredDocuments: [
      'Passeport en cours de validité (toutes les pages)',
      'Titre de séjour actuel ou visa d’entrée',
      'Justificatif de domicile de moins de 3 mois (quittance, facture, attestation)',
      '3 photos d’identité récentes aux normes e-photo ANTS',
      'Justificatifs de ressources (fiches de paie, avis d’imposition)',
      'Justificatifs d’état civil (acte de naissance plurilingue ou traduit)'
    ],
    steps: [
      { step: 1, title: 'Bilan initial de votre situation', description: 'Étude confidentielle de vos critères d’éligibilité et de votre parcours administratif.' },
      { step: 2, title: 'Établissement de la liste des pièces', description: 'Remise d’une checklist personnalisée et vérification minutieuse de chaque justificatif.' },
      { step: 3, title: 'Montage et relecture du dossier', description: 'Organisation méthodique du dossier au format préfectoral et préparation aux formulaires.' },
      { step: 4, title: 'Assistance au dépôt et suivi', description: 'Aide à la prise de rendez-vous ou dépôt dématérialisé (ANEF) et traitement des pièces complémentaires.' }
    ],
    highlights: [
      'Accompagnement ANEF & Préfectures d’Île-de-France',
      'Vérification anti-rejet avant soumission',
      'Préparation aux entretiens d’instruction',
      'Orientation vers nos avocats partenaires si besoin de contentieux'
    ],
    active: true,
    featured: true,
  },
  {
    id: 'nationalite-francaise',
    slug: 'nationalite-francaise',
    title: 'Nationalité Française & Naturalisation',
    shortDescription: 'Accompagnement sur-mesure pour demande par décret, par mariage ou filiation, et préparation à l’entretien.',
    fullDescription: 'Devenir citoyen français est une étape majeure nécessitant un dossier irréprochable et une préparation approfondie. Nous vérifions l’ensemble de vos attaches en France, vos déclarations fiscales, vos diplômes et nous vous entraînons à l’entretien d’assimilation républicaine.',
    category: 'nationalite',
    priceEstimate: 'À partir de 180 €',
    processingTime: 'Accompagnement sur la durée',
    badge: 'Spécialité',
    icon: 'Award',
    requiredDocuments: [
      'Copie intégrale de l’acte de naissance avec filiation (légalisé / apostillé + traduit)',
      'Titre de séjour en cours de validité',
      'Diplôme de langue française niveau B1 minimum (ou TCF / DELF)',
      'Avis d’imposition des 3 dernières années (bordereau P237)',
      'Contrat de travail et 3 derniers bulletins de paie',
      'Justificatif de domicile récent et contrat de bail / titre de propriété'
    ],
    steps: [
      { step: 1, title: 'Test de pré-qualification', description: 'Vérification de la durée de résidence (5 ans en règle générale), stabilité financière et casier judiciaire.' },
      { step: 2, title: 'Audit des actes d’état civil', description: 'Contrôle des traductions assermentées et de la conformité de l’orthographe des noms.' },
      { step: 3, title: 'Saisie dématérialisée NATALI', description: 'Numérisation haute définition et téléversement ordonné sur la plateforme officielle.' },
      { step: 4, title: 'Coaching entretien républicain', description: 'Questions types sur l’histoire, les valeurs de la République, les institutions et la culture.' }
    ],
    highlights: [
      'Simulateur d’éligibilité interactif',
      'Vérification rigoureuse des actes civils d’origine',
      'Guide complet de révision pour l’entretien',
      'Assistance réactive en cas de demande de pièces complémentaires'
    ],
    active: true,
    featured: true,
  },
  {
    id: 'domiciliation-entreprise',
    slug: 'domiciliation-entreprise',
    title: 'Domiciliation d’Entreprise & Siège Social',
    shortDescription: 'Adresse commerciale prestigieuse au Kremlin-Bicêtre avec gestion, numérisation et réexpédition du courrier.',
    fullDescription: 'Donnez une adresse professionnelle reconnue à votre micro-entreprise, SASU, SARL ou profession libérale aux portes de Paris. Notre service comprend la réception sécurisée de vos plis, la notification instantanée par email et des forfaits de réexpédition ou numérisation.',
    category: 'domiciliation',
    priceEstimate: 'Dès 29 € HT / mois',
    processingTime: 'Attestation en 24h',
    badge: 'Formule PRO',
    icon: 'Building2',
    requiredDocuments: [
      'Pièce d’identité du dirigeant en cours de validité',
      'Justificatif de domicile personnel de moins de 3 mois',
      'Projet de statuts ou extrait Kbis (si société déjà immatriculée)',
      'Déclaration de non-condamnation et filiation',
      'Relevé d’identité bancaire (RIB)'
    ],
    steps: [
      { step: 1, title: 'Sélection de la formule', description: 'Choix des options : gestion du courrier simple, numérisation quotidienne ou réexpédition hebdomadaire.' },
      { step: 2, title: 'Signature du contrat de domiciliation', description: 'Contrat commercial clair conforme aux dispositions légales (durée min. 3 mois).' },
      { step: 3, title: 'Remise de l’attestation de domiciliation', description: 'Délivrance immédiate de votre attestation pour le Greffe ou le Guichet Unique INPI.' },
      { step: 4, title: 'Accès aux services complémentaires', description: 'Location de salle de réunion et assistance aux formalités de modification statutaire.' }
    ],
    highlights: [
      'Adresse stratégique à 2 min du métro M7 Kremlin-Bicêtre',
      'Notification en temps réel par SMS / WhatsApp / Email',
      'Scan sécurisé de votre courrier officiel',
      'Contrat conforme et reconnu par le Greffe du Tribunal'
    ],
    active: true,
    featured: true,
  },
  {
    id: 'domiciliation-personnelle',
    slug: 'domiciliation-personnelle',
    title: 'Aide à l’Adresse & Suivi de Correspondance',
    shortDescription: 'Accompagnement dans la gestion de votre adresse administrative et vos démarches de correspondance.',
    fullDescription: 'Une adresse fiable et suivie est essentielle pour ne manquer aucune notification administrative, fiscale ou juridique. Nous vous aidons à structurer votre dossier de correspondance et à organiser le suivi méthodique de vos courriers officiels en toute légalité et discrétion.',
    category: 'domiciliation',
    priceEstimate: 'Sur devis',
    processingTime: 'Mise en place rapide',
    badge: 'Accompagnement',
    icon: 'Mail',
    requiredDocuments: [
      'Pièce d’identité ou titre de séjour',
      'Dernier justificatif d’hébergement ou situation de résidence',
      'Formulaire de recueil d’information confidentiel'
    ],
    steps: [
      { step: 1, title: 'Entretien d’évaluation', description: 'Identification précise de votre besoin et vérification de la compatibilité légale.' },
      { step: 2, title: 'Montage du dossier de correspondance', description: 'Organisation des pièces justificatives nécessaires pour les administrations.' },
      { step: 3, title: 'Mise en place du suivi', description: 'Tenue d’un registre des démarches et veille sur les échéances de réponse.' }
    ],
    highlights: [
      'Explication transparente du cadre légal',
      'Gestion préventive des délais de recours',
      'Discrétion absolue et respect de la vie privée'
    ],
    active: true,
    featured: false,
  },
  {
    id: 'carte-grise',
    slug: 'carte-grise-immatriculation',
    title: 'Carte Grise & Démarches d’Immatriculation',
    shortDescription: 'Changement de titulaire, duplicata, changement d’adresse et véhicules importés traités rapidement.',
    fullDescription: 'Évitez les blocages et les lenteurs des plateformes numériques. Nous prenons en charge la saisie de votre certificat d’immatriculation, le calcul exact des taxes régionales et l’obtention de votre Certificat Provisoire d’Immatriculation (CPI) en toute sérénité.',
    category: 'cartegrise',
    priceEstimate: 'Dès 35 € (hors taxes fiscales)',
    processingTime: 'Traitement en 24h - 48h',
    badge: 'Service Express',
    icon: 'Car',
    requiredDocuments: [
      'Ancienne carte grise barrée, datée et signée par le vendeur',
      'Certificat de cession (Cerfa 15776*02) dûment rempli',
      'Contrôle technique de moins de 6 mois (pour véhicules > 4 ans)',
      'Permis de conduire correspondant à la catégorie du véhicule',
      'Attestation d’assurance valide',
      'Justificatif de domicile de moins de 6 mois'
    ],
    steps: [
      { step: 1, title: 'Calcul instantané du coût', description: 'Estimation automatique de la taxe fiscale régionale et des frais de traitement.' },
      { step: 2, title: 'Dépôt des pièces numérisées', description: 'Contrôle de la conformité du certificat de cession et du contrôle technique.' },
      { step: 3, title: 'Validation et émission du CPI', description: 'Délivrance immédiate de votre Certificat Provisoire d’Immatriculation pour circuler légalement.' },
      { step: 4, title: 'Réception de la carte grise définitive', description: 'Livraison sécurisée par La Poste avec accusé de réception à votre domicile.' }
    ],
    highlights: [
      'Calculateur de taxe fiscale intégré',
      'Délivrance de CPI immédiate',
      'Gestion des véhicules français et importés d’Europe',
      'Assistance en cas de gage ou de blocage administratif'
    ],
    active: true,
    featured: true,
  },
  {
    id: 'traduction-assermentee',
    slug: 'traduction-assermentee',
    title: 'Traduction Assermentée & Documents Officiels',
    shortDescription: 'Traductions certifiées conformes pour préfectures, tribunaux, mairies et universités dans plus de 20 langues.',
    fullDescription: 'Vos actes d’état civil, jugements, diplômes et attestations doivent être traduits par un traducteur expert assermenté près une Cour d’appel pour être reconnus valables par les administrations françaises. Nous assurons une prise en charge rapide, tampon officiel et livraison sécurisée.',
    category: 'traduction',
    priceEstimate: 'À partir de 30 € / page',
    processingTime: 'Standard 48h / Express 24h',
    badge: 'Certifié Conforme',
    icon: 'Languages',
    requiredDocuments: [
      'Copie ou scan de haute qualité du document original (recto/verso)',
      'Précision de l’orthographe exacte des noms et prénoms en alphabet latin',
      'Indication de l’administration destinataire (Préfecture, Mairie, OFII, Tribunal)'
    ],
    steps: [
      { step: 1, title: 'Dépôt de votre document', description: 'Téléversez votre scan ou photo nette via notre formulaire sécurisé.' },
      { step: 2, title: 'Devis ferme et immédiat', description: 'Proposition tarifaire claire selon le volume, la langue et le délai souhaité.' },
      { step: 3, title: 'Traduction par un expert assermenté', description: 'Traduction fidèle avec apposition du cachet officiel et signature légale.' },
      { step: 4, title: 'Livraison PDF certifié & papier', description: 'Envoi du document numérique certifié et expédition de l’original papier si nécessaire.' }
    ],
    highlights: [
      'Langues : Arabe, Anglais, Espagnol, Turc, Russe, Portugais, Chinois, etc.',
      'Accepté à 100% par les Préfectures et Ministères',
      'Option express 24h disponible',
      'Respect strict du secret professionnel'
    ],
    active: true,
    featured: true,
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'guide-naturalisation-2025',
    slug: 'guide-demande-naturalisation-francaise-etapes-pieges',
    title: 'Naturalisation française : Les 5 étapes indispensables et les pièges à éviter',
    excerpt: 'Comment préparer un dossier solide pour la plateforme NATALI, valider son niveau de langue et réussir l’entretien d’assimilation.',
    content: `La demande de nationalité française par décret ou par mariage est un parcours exigeant qui demande rigueur et anticipation. 

### 1. La stabilité du séjour et l'insertion professionnelle
L’administration examine avec attention la continuité de vos revenus, vos déclarations d'impôts sur les trois dernières années et l’absence totale de dettes fiscales (bordereau P237 vierge de reliquat).

### 2. La conformité des actes d'état civil d'origine
Un simple écart d'une lettre dans l'orthographe d'un prénom ou la date de naissance entre votre passeport, votre acte de naissance étranger traduit et vos justificatifs français peut suspendre votre dossier pendant plusieurs mois.

### 3. La préparation à l'entretien en préfecture
L'entretien individuel ne se limite pas à des dates d'histoire : il évalue votre adhésion aux valeurs de la République, votre connaissance des droits et devoirs du citoyen et votre maîtrise pratique de la langue française.

ADN Conseils vous accompagne dans l'audit préalable de vos pièces avant tout dépôt officiel.`,
    category: 'Nationalité',
    readTime: '6 min de lecture',
    publishedAt: '2025-02-15',
    author: 'Équipe Juridique ADN Conseils',
    tags: ['Naturalisation', 'Décret', 'Préfecture', 'Conseils'],
    published: true
  },
  {
    id: 'renouvellement-titre-sejour-delais',
    slug: 'renouvellement-titre-de-sejour-anticiper-delais-anef',
    title: 'Renouvellement de titre de séjour : Quand et comment déposer sur l’ANEF ?',
    excerpt: 'Tout savoir sur le calendrier idéal de dépôt (entre 2 et 4 mois avant expiration) et les pièces justificatives indispensables.',
    content: `Pour éviter toute rupture de vos droits au séjour et au travail, il est impératif d'anticiper le renouvellement de votre titre de séjour.

### Le calendrier recommandé
Il est conseillé d'entamer les démarches entre **2 et 4 mois** avant la date d'expiration de votre carte ou récépissé. Sur la plateforme ANEF, un dépôt trop tardif peut générer des retards d'attestation de prolongation d'instruction.

### Les pièces pivots
- Passeport en cours de validité
- Justificatif de domicile récent avec mention claire de votre nom
- Justificatifs de la poursuite de votre motif de séjour (attestation employeur, bulletins de salaire, inscription scolaire, etc.)

Notre équipe au Kremlin-Bicêtre effectue un contrôle complet de la lisibilité et de la validité de vos documents avant téléversement.`,
    category: 'Titre de Séjour',
    readTime: '4 min de lecture',
    publishedAt: '2025-01-28',
    author: 'Service Démarches Étrangers',
    tags: ['ANEF', 'Titre de séjour', 'Préfecture', 'Renouvellement'],
    published: true
  },
  {
    id: 'pourquoi-domicilier-entreprise',
    slug: 'pourquoi-domicilier-entreprise-siege-social',
    title: 'Domicilier son entreprise au Kremlin-Bicêtre : Avantages fiscaux et praticité',
    excerpt: 'Pourquoi séparer son adresse personnelle de son activité professionnelle et bénéficier d’une adresse stratégique aux portes de Paris.',
    content: `Créer son entreprise sans exposer son adresse personnelle sur les registres publics offre des avantages majeurs en matière de sécurité, de crédibilité et d'organisation.

### Protéger sa vie privée
L'adresse du siège social figure obligatoirement sur les factures, le site internet et les avis d'imposition. Domicilier sa société chez un professionnel agréé protège le domicile du dirigeant.

### Gestion optimisée du courrier
Grâce à la numérisation quotidienne et à la réexpédition des courriers officiels (Greffe, Urssaf, Trésor Public), vous ne manquez aucune notification cruciale lors de vos déplacements.`,
    category: 'Entreprise',
    readTime: '5 min de lecture',
    publishedAt: '2025-01-10',
    author: 'Pôle Entreprises ADN Conseils',
    tags: ['Domiciliation', 'Création d’entreprise', 'Siège social', 'Micro-entreprise'],
    published: true
  }
];

export const INITIAL_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'ADN Conseils est-il une administration publique ou une préfecture ?',
    answer: 'Non. ADN Conseils est un cabinet privé et indépendant spécialisé dans le conseil et l’assistance aux démarches administratives. Nous ne délivrons pas directement les titres officiels, mais nous préparons, optimisons et sécurisons vos dossiers pour vous faire gagner du temps et éviter les erreurs.',
    category: 'Général',
    featured: true,
    order: 1
  },
  {
    id: 'faq-2',
    question: 'Vos démarches garantissent-elles à 100% l’accord de la Préfecture ?',
    answer: 'La décision finale appartient exclusivement à l’autorité administrative compétente (Préfecture, Ministère de l’Intérieur, ANTS). Cependant, un dossier complet, structuré selon les exigences officielles et scrupuleusement vérifié réduit drastiquement les risques de rejet, de classement sans suite ou de demandes de pièces répétées.',
    category: 'Général',
    featured: true,
    order: 2
  },
  {
    id: 'faq-3',
    question: 'Vos traductions sont-elles reconnues par les mairies et préfectures ?',
    answer: 'Oui, nos traductions sont réalisées par des traducteurs experts assermentés inscrits près les Cours d’appel françaises. Elles portent le tampon officiel, la signature du traducteur et la mention certifiée conforme, valables auprès de toutes les institutions françaises et consulats.',
    category: 'Traduction',
    featured: true,
    order: 3
  },
  {
    id: 'faq-4',
    question: 'Comment se déroule un premier rendez-vous avec ADN Conseils ?',
    answer: 'Vous pouvez choisir un rendez-vous en présentiel à notre cabinet au Kremlin-Bicêtre, par téléphone ou en visioconférence. Lors de cet entretien, nous faisons le point sur votre situation, vérifions vos documents existants et vous fournissons un plan d’action précis ainsi qu’un devis transparent.',
    category: 'Rendez-vous',
    featured: true,
    order: 4
  },
  {
    id: 'faq-5',
    question: 'Puis-je vous transmettre mes documents à distance en toute sécurité ?',
    answer: 'Oui. Notre site propose un espace de dépôt de devis sécurisé et confidentiel. Vous pouvez téléverser vos fichiers (PDF, JPG, PNG). Vos données personnelles sont traitées dans le strict respect de la confidentialité et du RGPD.',
    category: 'Sécurité & Données',
    featured: false,
    order: 5
  },
  {
    id: 'faq-6',
    question: 'Quels sont les délais d’obtention d’une carte grise ?',
    answer: 'Dès validation de vos pièces justificatives, nous effectuons la saisie officielle et vous délivrons votre Certificat Provisoire d’Immatriculation (CPI) sous 24h à 48h. La carte grise définitive est ensuite expédiée directement par l’Imprimerie Nationale sous pli sécurisé à votre domicile.',
    category: 'Carte Grise',
    featured: false,
    order: 6
  },
  {
    id: 'faq-7',
    question: 'Quelles sont les langues parlées à l’accueil du cabinet ?',
    answer: 'Notre équipe vous accueille et vous accompagne en Français, Arabe, Anglais, Espagnol et Turc pour vous garantir une parfaite compréhension de chaque étape de vos formalités.',
    category: 'Général',
    featured: true,
    order: 7
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    clientName: 'Karim B.',
    serviceCategory: 'Nationalité Française',
    rating: 5,
    comment: 'Un accompagnement exceptionnel pour mon dossier de naturalisation. L’équipe a corrigé les incohérences de mes actes d’état civil et m’a préparé à l’entretien. J’ai reçu mon décret il y a deux semaines !',
    date: '12 Janvier 2025',
    verified: true,
    approved: true
  },
  {
    id: 't-2',
    clientName: 'Elena M.',
    serviceCategory: 'Titre de Séjour',
    rating: 5,
    comment: 'Très professionnelle et réactive. Mon dossier de renouvellement salarié sur l’ANEF était bloqué depuis des mois. Grâce à leur intervention et la relecture de mes justificatifs, tout a été débloqué rapidement.',
    date: '28 Décembre 2024',
    verified: true,
    approved: true
  },
  {
    id: 't-3',
    clientName: 'Société TechNova (Amine S.)',
    serviceCategory: 'Domiciliation d’Entreprise',
    rating: 5,
    comment: 'Domiciliation rapide et efficace pour ma SASU. L’attestation a été délivrée en 24h et le service de numérisation du courrier me permet de gérer mon activité à distance en toute tranquillité.',
    date: '18 Février 2025',
    verified: true,
    approved: true
  },
  {
    id: 't-4',
    clientName: 'Fatoumata D.',
    serviceCategory: 'Traduction Assermentée',
    rating: 5,
    comment: 'Traduction de mon acte de naissance et de mon diplôme en moins de 48h. Traducteur assermenté très sérieux et documents parfaitement acceptés en mairie. Merci !',
    date: '04 Février 2025',
    verified: true,
    approved: true
  },
  {
    id: 't-5',
    clientName: 'Marc V.',
    serviceCategory: 'Carte Grise Express',
    rating: 5,
    comment: 'Achat d’un véhicule d’occasion le samedi matin, carte grise provisoire obtenue le lundi. Simple, clair et pas de perte de temps sur internet.',
    date: '20 Janvier 2025',
    verified: true,
    approved: true
  }
];

export const INITIAL_CONTACT_REQUESTS: ContactOrQuoteRequest[] = [
  {
    id: 'req-101',
    type: 'devis',
    createdAt: '2025-02-25 10:15',
    fullName: 'Yassine Mansouri',
    email: 'yassine.mansouri@email.com',
    phone: '06 12 34 56 78',
    preferredContact: 'whatsapp',
    serviceCategory: 'Droit des Étrangers',
    serviceDetail: 'Changement de statut étudiant vers salarié',
    message: 'Bonjour, j’ai trouvé un CDI et je souhaite déposer ma demande de changement de statut. Mon titre expire dans 2 mois et j’aimerais un accompagnement pour ne rien oublier.',
    status: 'nouveau',
    internalNotes: 'À rappeler via WhatsApp pour fixer un audit de pièces.',
    urgency: 'urgent',
    attachments: [
      { id: 'att-1', name: 'promesse_embauche_cdi.pdf', size: 245000, type: 'application/pdf' }
    ]
  },
  {
    id: 'req-102',
    type: 'devis',
    createdAt: '2025-02-24 16:40',
    fullName: 'Sara Alami',
    email: 'sara.alami@gmail.com',
    phone: '07 89 45 12 30',
    preferredContact: 'email',
    serviceCategory: 'Traduction Assermentée',
    serviceDetail: 'Traduction Arabe vers Français de 2 actes',
    message: 'Besoin d’un devis urgent pour la traduction d’un acte de naissance et d’un livret de famille pour un dépôt de nationalité.',
    status: 'en_cours',
    internalNotes: 'Devis envoyé par email (65 € TTC). En attente du retour client.',
    urgency: 'normal',
    attachments: [
      { id: 'att-2', name: 'acte_naissance_original.jpg', size: 520000, type: 'image/jpeg' }
    ]
  },
  {
    id: 'req-103',
    type: 'contact',
    createdAt: '2025-02-23 11:20',
    fullName: 'David Morel',
    email: 'contact@morel-transport.fr',
    phone: '01 42 55 60 70',
    preferredContact: 'phone',
    serviceCategory: 'Domiciliation d’Entreprise',
    serviceDetail: 'Création SASU Transport',
    message: 'Bonjour, je souhaite domicilier ma future société chez vous au Kremlin-Bicêtre et savoir si vous proposez la réception avec numérisation du courrier.',
    status: 'traite',
    internalNotes: 'Contrat envoyé et signé. Attestation de domiciliation remise.',
    urgency: 'normal',
    attachments: []
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-201',
    createdAt: '2025-02-25 09:30',
    fullName: 'Nadia Cherif',
    email: 'nadia.cherif@yahoo.fr',
    phone: '06 50 40 30 20',
    serviceId: 'nationalite-francaise',
    serviceTitle: 'Nationalité Française & Naturalisation',
    appointmentType: 'cabinet',
    date: '2025-02-27',
    timeSlot: '14:00 - 14:45',
    notes: 'Première demande de naturalisation par décret, 6 ans de résidence.',
    status: 'confirme',
    internalNotes: 'Préparer la grille d’évaluation P237 et B1.'
  },
  {
    id: 'apt-202',
    createdAt: '2025-02-24 18:10',
    fullName: 'Tariq Ozturk',
    email: 'tariq.ozturk@gmail.com',
    phone: '07 60 70 80 90',
    serviceId: 'droit-etrangers',
    serviceTitle: 'Droit des Étrangers & Titres de Séjour',
    appointmentType: 'telephone',
    date: '2025-02-28',
    timeSlot: '10:30 - 11:00',
    notes: 'Demande d’informations pour regroupement familial conjoint.',
    status: 'en_attente',
    internalNotes: 'Client anglophone ou turcophone.'
  },
  {
    id: 'apt-203',
    createdAt: '2025-02-22 14:00',
    fullName: 'Julien Lambert',
    email: 'j.lambert@outlook.fr',
    phone: '06 11 22 33 44',
    serviceId: 'carte-grise',
    serviceTitle: 'Carte Grise & Démarches d’Immatriculation',
    appointmentType: 'cabinet',
    date: '2025-02-26',
    timeSlot: '16:00 - 16:30',
    notes: 'Véhicule importé d’Allemagne, conformité et quitus.',
    status: 'termine',
    internalNotes: 'Dossier complet remis et CPI imprimé.'
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  companyName: 'ADN Conseils',
  tagline: 'Vos démarches administratives simplifiées',
  address: '119 avenue de Fontainebleau',
  postalCode: '94270',
  city: 'Le Kremlin-Bicêtre',
  phone: '+33 7 58 39 71 05',
  phoneDisplay: '+33 7 58 39 71 05',
  whatsapp: '+33758397105',
  email: 'contact@adn-conseils.fr',
  openingHours: [
    { day: 'Lundi', hours: '09h00 - 12h30 & 14h00 - 18h30', isOpen: true },
    { day: 'Mardi', hours: '09h00 - 12h30 & 14h00 - 18h30', isOpen: true },
    { day: 'Mercredi', hours: '09h00 - 12h30 & 14h00 - 18h30', isOpen: true },
    { day: 'Jeudi', hours: '09h00 - 12h30 & 14h00 - 18h30', isOpen: true },
    { day: 'Vendredi', hours: '09h00 - 12h30 & 14h00 - 18h00', isOpen: true },
    { day: 'Samedi', hours: '09h30 - 13h00 (Sur rendez-vous)', isOpen: true },
    { day: 'Dimanche', hours: 'Fermé', isOpen: false }
  ],
  alertBanner: {
    enabled: true,
    message: 'Accueil avec ou sans rendez-vous au cabinet • Démarches possibles à distance partout en France.',
    type: 'info'
  },
  disclaimerText: 'ADN Conseils est un organisme privé de conseil et d’accompagnement aux formalités administratives. Nous ne sommes ni une administration publique, ni une préfecture. Les décisions finales restent du ressort exclusif des autorités étatiques.',
  adminPin: '1234',
  languagesSpoken: ['Français', 'Arabe', 'English', 'Español', 'Türkçe'],
  socialLinks: {
    googleMaps: 'https://maps.google.com/?q=119+Avenue+de+Fontainebleau+94270+Le+Kremlin-Bicêtre',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com'
  }
};
