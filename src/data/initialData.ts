import { BlogPost, ContactOrQuoteRequest, Appointment, FaqItem, ServiceItem, SiteSettings, Testimonial } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'nationalite-francaise',
    slug: 'nationalite-francaise',
    title: 'Conseil en nationalité française et autres droits des étrangers',
    shortDescription: 'Naturalisation par décret, par mariage ou filiation, titres de séjour, renouvellements, changements de statut et regroupement familial.',
    fullDescription: 'Devenir citoyen français est une étape majeure nécessitant un dossier irréprochable et une préparation approfondie. Nous vérifions l’ensemble de vos attaches en France, vos déclarations fiscales, vos diplômes et nous vous entraînons à l’entretien d’assimilation républicaine. Nous vous accompagnons aussi pour vos autres démarches en préfecture : première demande et renouvellement de titre de séjour, changement de statut, regroupement familial.',
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
    id: 'creation-entreprise',
    slug: 'creation-entreprise',
    title: 'Création d’entreprise',
    shortDescription: 'SARL, SAS, EURL, SCI ou micro-entreprise : choix du statut, rédaction des documents et immatriculation.',
    fullDescription: 'Nous vous accompagnons dans la création de votre société ou de votre micro-entreprise : choix de la forme juridique la plus adaptée à votre projet (SARL, SAS, EURL, SCI, micro-entreprise), préparation des documents, constitution du dossier et suivi de l’immatriculation jusqu’à l’obtention de votre numéro SIRET.',
    category: 'creation',
    priceEstimate: 'Sur devis',
    processingTime: 'Selon la forme juridique',
    icon: 'Building2',
    requiredDocuments: [
      'Pièce d’identité du ou des dirigeants',
      'Justificatif de domicile ou adresse du futur siège',
      'Description de l’activité envisagée'
    ],
    steps: [
      { step: 1, title: 'Étude de votre projet', description: 'Nous faisons le point sur votre activité et vous conseillons la forme juridique la plus adaptée.' },
      { step: 2, title: 'Préparation du dossier', description: 'Rédaction des documents nécessaires et vérification des pièces justificatives.' },
      { step: 3, title: 'Immatriculation', description: 'Dépôt du dossier et suivi jusqu’à l’obtention de votre numéro SIRET.' }
    ],
    highlights: [
      'SARL, SAS, EURL, SCI et micro-entreprise',
      'Conseil sur le choix du statut',
      'Accompagnement jusqu’à l’immatriculation'
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
    id: 'faq-7',
    question: 'Quelles sont les langues parlées à l’accueil du cabinet ?',
    answer: 'Notre équipe vous accueille et vous accompagne en Français, Arabe, Anglais, Espagnol et Turc pour vous garantir une parfaite compréhension de chaque étape de vos formalités.',
    category: 'Général',
    featured: true,
    order: 7
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [];

export const INITIAL_CONTACT_REQUESTS: ContactOrQuoteRequest[] = [];

export const INITIAL_APPOINTMENTS: Appointment[] = [];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  companyName: 'ADN Conseils',
  tagline: 'Vos démarches administratives simplifiées',
  address: '119 avenue de Fontainebleau',
  postalCode: '94270',
  city: 'Le Kremlin-Bicêtre',
  phone: '+33 9 87 55 54 52',
  phoneDisplay: '09 87 55 54 52',
  whatsapp: '',
  email: 'contact@adn-administration.fr',
  openingHours: [
    { day: 'Lundi', hours: '10h00 - 20h00', isOpen: true },
    { day: 'Mardi', hours: '10h00 - 20h00', isOpen: true },
    { day: 'Mercredi', hours: '10h00 - 20h00', isOpen: true },
    { day: 'Jeudi', hours: '10h00 - 20h00', isOpen: true },
    { day: 'Vendredi', hours: '10h00 - 20h00', isOpen: true },
    { day: 'Samedi', hours: '10h00 - 20h00', isOpen: true },
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
    facebook: '',
    linkedin: '',
    instagram: ''
  }
};
