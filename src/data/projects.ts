import { Project, DecorOffer, RealisationCategory } from '../types';
import icddOfficialLogo from '../assets/images/icdd.jpeg';

// Photos authentiques des chantiers et réalisations réelles ICDD
import realProject1 from '../assets/projects/real_project_1.jpg';
import realProject2 from '../assets/projects/real_project_2.jpg';
import realProject3 from '../assets/projects/real_project_3.jpg';
import realProject7 from '../assets/projects/real_project_7.jpg';

// Photos réelles de cuisines modernes réalisées par ICDD
import cuisineModerne1 from '../assets/projects/cuisine_moderne_1.jpeg';
import cuisineModerne2 from '../assets/projects/cuisine_moderne_2.jpeg';
import cuisineModerne3 from '../assets/projects/cuisine_moderne_3.jpeg';

// Photos réelles de portes intérieures et blocs-portes réalisés par ICDD
import porteModerne1 from '../assets/projects/porte_moderne_1.jpeg';
import porteModerne2 from '../assets/projects/porte_moderne_2.jpeg';
import porteModerne3 from '../assets/projects/porte_moderne_3.jpeg';

// Photos réelles de décorations de bureaux réalisées par ICDD
import bureauDeco1 from '../assets/projects/bureau_deco_1.jpg';
import bureauDeco2 from '../assets/projects/bureau_deco_2.jpg';
import bureauDeco3 from '../assets/projects/bureau_deco_3.jpg';
import bureauDeco4 from '../assets/projects/bureau_deco_4.jpg';
import bureauDeco5 from '../assets/projects/bureau_deco_5.jpg';
import bureauDeco6 from '../assets/projects/bureau_deco_6.jpg';

// Photos réelles de décoration de chambres ajoutées par ICDD
import chambreDeco1 from '../assets/projects/chambre_deco_1.jpg';
import chambreDeco2 from '../assets/projects/chambre_deco_2.jpg';
import chambreDeco3 from '../assets/projects/chambre_deco_3.jpg';
import chambreDeco4 from '../assets/projects/chambre_deco_4.jpg';
import chambreDeco5 from '../assets/projects/chambre_deco_5.jpg';
import chambreDeco6 from '../assets/projects/chambre_deco_6.jpg';
import chambreDeco7 from '../assets/projects/chambre_deco_7.jpg';
import chambreDeco8 from '../assets/projects/chambre_deco_8.jpg';
import chambreDeco9 from '../assets/projects/chambre_deco_9.jpg';
import chambreDeco10 from '../assets/projects/chambre_deco_10.jpg';
import chambreDeco11 from '../assets/projects/chambre_deco_11.jpg';
import chambreDeco12 from '../assets/projects/chambre_deco_12.jpg';

// Nouvelles photos réelles ajoutées par le client pour ICDD Décoration & Aménagement
import icddRealisation1 from '../assets/realisations/icdd_realisation_1.jpg';
import icddRealisation2 from '../assets/realisations/icdd_realisation_2.jpg';
import icddRealisation3 from '../assets/realisations/icdd_realisation_3.jpg';
import icddRealisation4 from '../assets/realisations/icdd_realisation_4.jpg';
import icddRealisation5 from '../assets/realisations/icdd_realisation_5.jpg';
import icddRealisation6 from '../assets/realisations/icdd_realisation_6.jpg';
import icddRealisation7 from '../assets/realisations/icdd_realisation_7.jpg';
import icddRealisation8 from '../assets/realisations/icdd_realisation_8.jpg';
import icddRealisation9 from '../assets/realisations/icdd_realisation_9.jpg';
import icddRealisation10 from '../assets/realisations/icdd_realisation_10.jpg';
import icddRealisation11 from '../assets/realisations/icdd_realisation_11.jpg';
import icddRealisation12 from '../assets/realisations/icdd_realisation_12.jpg';
import icddRealisation13 from '../assets/realisations/icdd_realisation_13.jpg';
import icddRealisation14 from '../assets/realisations/icdd_realisation_14.jpg';
import icddRealisation15 from '../assets/realisations/icdd_realisation_15.jpg';
import icddRealisation16 from '../assets/realisations/icdd_realisation_16.jpg';
import icddRealisation17 from '../assets/realisations/icdd_realisation_17.jpg';
import icddRealisation18 from '../assets/realisations/icdd_realisation_18.jpg';
import icddRealisation19 from '../assets/realisations/icdd_realisation_19.jpg';
import icddRealisation20 from '../assets/realisations/icdd_realisation_20.jpg';
import icddRealisation21 from '../assets/realisations/icdd_realisation_21.jpg';
import icddRealisation22 from '../assets/realisations/icdd_realisation_22.jpg';
import icddRealisation23 from '../assets/realisations/icdd_realisation_23.jpg';
import icddRealisation24 from '../assets/realisations/icdd_realisation_24.jpg';
import icddRealisation25 from '../assets/realisations/icdd_realisation_25.jpg';
import icddRealisation26 from '../assets/realisations/icdd_realisation_26.jpg';
import icddRealisation27 from '../assets/realisations/icdd_realisation_27.jpg';
import icddRealisation28 from '../assets/realisations/icdd_realisation_28.jpg';
import icddRealisation29 from '../assets/realisations/icdd_realisation_29.jpg';
import icddRealisation30 from '../assets/realisations/icdd_realisation_30.jpg';
import icddRealisation31 from '../assets/realisations/icdd_realisation_31.jpg';
import icddRealisation32 from '../assets/realisations/icdd_realisation_32.jpg';
import icddRealisation33 from '../assets/realisations/icdd_realisation_33.jpg';
import icddRealisation34 from '../assets/realisations/icdd_realisation_34.jpg';
import icddRealisation35 from '../assets/realisations/icdd_realisation_35.jpg';

// Photos réelles de décoration plafond et staff armé ajoutées par le client pour ICDD
import staffPlafond1 from '../assets/staff/staff_plafond_1.jpg';
import staffPlafond2 from '../assets/staff/staff_plafond_2.jpg';
import staffPlafond3 from '../assets/staff/staff_plafond_3.jpg';
import staffPlafond4 from '../assets/staff/staff_plafond_4.jpg';
import staffPlafond5 from '../assets/staff/staff_plafond_5.jpg';
import staffPlafond6 from '../assets/staff/staff_plafond_6.jpg';
import staffPlafond7 from '../assets/staff/staff_plafond_7.jpg';
import staffPlafond8 from '../assets/staff/staff_plafond_8.jpg';
import staffPlafond9 from '../assets/staff/staff_plafond_9.jpg';
import staffPlafond10 from '../assets/staff/staff_plafond_10.jpg';
import staffPlafond11 from '../assets/staff/staff_plafond_11.jpg';
import staffPlafond12 from '../assets/staff/staff_plafond_12.jpg';
import staffPlafond13 from '../assets/staff/staff_plafond_13.jpg';
import staffPlafond14 from '../assets/staff/staff_plafond_14.jpg';

export const ICDD_STAFF_PLAFOND_IMAGES = [
  staffPlafond1,
  staffPlafond2,
  staffPlafond3,
  staffPlafond4,
  staffPlafond5,
  staffPlafond6,
  staffPlafond7,
  staffPlafond8,
  staffPlafond9,
  staffPlafond10,
  staffPlafond11,
  staffPlafond12,
  staffPlafond13,
  staffPlafond14,
];

export const ICDD_REALISATIONS = [
  icddRealisation1,
  icddRealisation2,
  icddRealisation3,
  icddRealisation4,
  icddRealisation5,
  icddRealisation6,
  icddRealisation7,
  icddRealisation8,
  icddRealisation9,
  icddRealisation10,
  icddRealisation11,
  icddRealisation12,
  icddRealisation13,
  icddRealisation14,
  icddRealisation15,
  icddRealisation16,
  icddRealisation17,
  icddRealisation18,
  icddRealisation19,
  icddRealisation20,
  icddRealisation21,
  icddRealisation22,
  icddRealisation23,
  icddRealisation24,
  icddRealisation25,
  icddRealisation26,
  icddRealisation27,
  icddRealisation28,
  icddRealisation29,
  icddRealisation30,
  icddRealisation31,
  icddRealisation32,
  icddRealisation33,
  icddRealisation34,
  icddRealisation35,
];

export const ICDD_ASSETS = {
  logo: icddOfficialLogo,
  project1: realProject1,
  project2: realProject2,
  project3: realProject3,
  project4: icddRealisation4,
  project5: icddRealisation5,
  project6: icddRealisation6,
  project7: realProject7,
  realisations: ICDD_REALISATIONS,
  r1: icddRealisation1,
  r2: icddRealisation2,
  r3: icddRealisation3,
  r4: icddRealisation4,
  r5: icddRealisation5,
  r6: icddRealisation6,
  r7: icddRealisation7,
  r8: icddRealisation8,
  r9: icddRealisation9,
  r10: icddRealisation10,
  r11: icddRealisation11,
  r12: icddRealisation12,
  r13: icddRealisation13,
  r14: icddRealisation14,
  r15: icddRealisation15,
  r16: icddRealisation16,
  r17: icddRealisation17,
  r18: icddRealisation18,
  r19: icddRealisation19,
  r20: icddRealisation20,
  r21: icddRealisation21,
  r22: icddRealisation22,
  r23: icddRealisation23,
  r24: icddRealisation24,
  r25: icddRealisation25,
  r26: icddRealisation26,
  r27: icddRealisation27,
  r28: icddRealisation28,
  r29: icddRealisation29,
  r30: icddRealisation30,
  r31: icddRealisation31,
  r32: icddRealisation32,
  r33: icddRealisation33,
  r34: icddRealisation34,
  r35: icddRealisation35,
  cuisine1: cuisineModerne1,
  cuisine2: cuisineModerne2,
  cuisine3: cuisineModerne3,
  porte1: porteModerne1,
  porte2: porteModerne2,
  porte3: porteModerne3,
  bureau1: bureauDeco1,
  bureau2: bureauDeco2,
  bureau3: bureauDeco3,
  bureau4: bureauDeco4,
  bureau5: bureauDeco5,
  bureau6: bureauDeco6,
  chambre1: chambreDeco1,
  chambre2: chambreDeco2,
  chambre3: chambreDeco3,
  chambre4: chambreDeco4,
  chambre5: chambreDeco5,
  chambre6: chambreDeco6,
  chambre7: chambreDeco7,
  chambre8: chambreDeco8,
  chambre9: chambreDeco9,
  chambre10: chambreDeco10,
  chambre11: chambreDeco11,
  chambre12: chambreDeco12,
  staffPlafonds: ICDD_STAFF_PLAFOND_IMAGES,
  sp1: staffPlafond1,
  sp2: staffPlafond2,
  sp3: staffPlafond3,
  sp4: staffPlafond4,
  sp5: staffPlafond5,
  sp6: staffPlafond6,
  sp7: staffPlafond7,
  sp8: staffPlafond8,
  sp9: staffPlafond9,
  sp10: staffPlafond10,
  sp11: staffPlafond11,
  sp12: staffPlafond12,
  sp13: staffPlafond13,
  sp14: staffPlafond14,
};

export const ICDD_OFFERS_CONFIG: Record<DecorOffer, { basePrice: number; description: string; badge: string; minWallM2: number }> = {
  'Décoration simple': {
    basePrice: 250,
    description: 'Finition soignée, préparation des murs et peinture satinée/mate premium.',
    badge: 'À partir de 250 $',
    minWallM2: 25,
  },
  'Décoration classique': {
    basePrice: 350,
    description: 'Peinture double couche haute résistance, moulures décoratives et harmonies chromatiques.',
    badge: 'À partir de 350 $',
    minWallM2: 35,
  },
  'Décoration luxueuse': {
    basePrice: 500,
    description: 'Enduits texturés, effets stuc vénitien, velouté minéral et finitions haut de gamme.',
    badge: 'À partir de 500 $',
    minWallM2: 50,
  },
  'Décoration Gold': {
    basePrice: 700,
    description: 'Finitions nacrées, patines or/bronze, panneaux muraux nobles et textures raffinées.',
    badge: 'À partir de 700 $',
    minWallM2: 70,
  },
  'Décoration Top Modèle': {
    basePrice: 800,
    description: 'Création artistique d’exception, fresque murale, relief 3D et matériaux d’artisanat d’art.',
    badge: 'À partir de 800 $',
    minWallM2: 85,
  },
};

export const ICDD_PROJECTS: Project[] = [
  // --- 1. APPARTEMENTS ---
  {
    id: 'appartement-moderne-kinshasa',
    title: 'Appartement Moderne – Kinshasa Gombe',
    subtitle: 'Aménagement intérieur complet & architecture d’exception',
    location: 'Kinshasa, Gombe',
    area: 120,
    year: 2026,
    mainCategory: 'Appartements',
    category: 'Décoration Top Modèle',
    style: 'Haute Couture',
    budgetRange: '≥ 700 $',
    startingPrice: 850,
    description: 'Transformation intégrale d’un appartement résidentiel avec décloisonnement, faux-plafonds en staff, gorges lumineuses et agencements sur mesure.',
    fullDescription: 'Projet emblématique d’aménagement intérieur complet réalisé par ICDD. Nos équipes d’architectes d’intérieur, maîtres staffeurs et peintres décorateurs ont orchestré la métamorphose de cet appartement : restructuration des volumes, intégration d’un éclairage indirect raffiné, pose de menuiseries sur mesure et création d’un salon de réception chaleureux.',
    coverImage: realProject2,
    galleryImages: [
      realProject2,
      icddRealisation1,
      icddRealisation2,
      icddRealisation11
    ],
    services: [
      'Architecture intérieure & Plans 3D',
      'Décoration',
      'Staff & Plafonds',
      'Peinture & Finition',
      'Éclairage LED intégré',
      'Mobilier sur mesure'
    ],
    specs: {
      duration: '3 à 4 Semaines',
      wallSurface: '120 m² habitables aménagés',
      finishType: 'Haut de gamme complet – Top Modèle',
      materials: ['Staff fibré haute résistance', 'Enduits à la chaux naturelle', 'Peintures velours dépolluantes', 'Boiseries nobles'],
      lighting: 'Scénographie lumineuse LED dissimulée 3000K'
    },
    features: [
      'Aménagement intérieur complet clé en main',
      'Plafonds suspendus en staff avec gorges lumineuses',
      'Harmonie chromatique et acoustique optimisée',
      'Matériaux haut de gamme certifiés'
    ],
    featured: true
  },
  {
    id: 'penthouse-kinshasa',
    title: 'Penthouse & Salon Royal – Kinshasa Gombe',
    subtitle: 'Moulures d’ornement, patines dorées et ambiance majestueuse',
    location: 'Kinshasa, Gombe',
    area: 95,
    year: 2026,
    mainCategory: 'Appartements',
    category: 'Décoration Gold',
    style: 'Gold Prestige',
    budgetRange: '≥ 700 $',
    startingPrice: 750,
    description: 'Rénovation complète d’un penthouse avec travail minutieux des corniches de staff, peintures dorées et aménagements sur mesure.',
    fullDescription: 'Cette réalisation marie la noblesse des moulures classiques avec une palette chromatique contemporaine. Nos artisans ont réalisé des rehauts à la feuille et des patines pour capturer la lumière naturelle des grandes baies vitrées de ce penthouse de prestige.',
    coverImage: realProject7,
    galleryImages: [
      realProject7,
      icddRealisation3,
      icddRealisation12,
      icddRealisation7
    ],
    services: [
      'Aménagement complet',
      'Décoration Gold',
      'Staff d’ornement',
      'Peinture soyeuse',
      'Éclairage architectural'
    ],
    specs: {
      duration: '5 à 6 Jours',
      wallSurface: '95 m² de surface murale',
      finishType: 'Moulures Classiques & Rehauts d’Or',
      materials: ['Peintures mates soyeuses', 'Cimaises et rosaces d’ornement', 'Pigments or nacré'],
      lighting: 'Scénographie lumineuse chaleureuse 2700K'
    },
    features: [
      'Travail d’orfèvre sur les encadrements muraux',
      'Harmonie des teintes crème et reflets dorés',
      'Protection durable et lavabilité maximale'
    ],
    featured: true
  },
  {
    id: 'appartement-lounge-ngaliema',
    title: 'Appartement Lounge & Épuré – Ngaliema',
    subtitle: 'Textures d’enduit sculpté, camaïeux contemporains et agencement',
    location: 'Kinshasa, Ngaliema',
    area: 80,
    year: 2026,
    mainCategory: 'Appartements',
    category: 'Décoration Top Modèle',
    style: 'Haute Couture',
    budgetRange: '≥ 700 $',
    startingPrice: 850,
    description: 'Création d’un espace de vie moderne avec mur d’accent sculpté à la main et cuisine ouverte contemporaine.',
    fullDescription: 'Pour cet appartement moderne, l’équipe ICDD a conçu un mur d’accent spectaculaire en relief minéral avec éclairage indirect. Chaque détail sublime le volume de la pièce pour un effet architectural saisissant et fonctionnel.',
    coverImage: icddRealisation10,
    galleryImages: [
      icddRealisation10,
      icddRealisation8,
      icddRealisation9,
      icddRealisation5
    ],
    services: [
      'Conception d’espace',
      'Décoration intérieure',
      'Mur sculpté 3D',
      'Staff',
      'Éclairage LED'
    ],
    specs: {
      duration: '4 à 6 Jours',
      wallSurface: '80 m² de surface murale',
      finishType: 'Relief Minéral 3D & Peinture Velours',
      materials: ['Enduits texturés sculptés à la main', 'Peinture veloutée sans COV', 'Lasure protectrice mate'],
      lighting: 'Lumières rasantes LED dissimulées'
    },
    features: [
      'Mur signature exclusif sculpté à la main',
      'Atmosphère feutrée et isolation phonique accrue',
      'Teintes profondes résistantes aux frottements'
    ],
    featured: false
  },

  // --- 2. CUISINES MODERNES (Réalisations Authentiques ICDD) ---
  {
    id: 'cuisine-moderne-sur-mesure-kinshasa',
    title: 'Cuisine Linéaire Beige & Plan Sombre Marbré – Kinshasa',
    subtitle: 'Agencement sur mesure, façades contemporaines beiges et crédence marbrée',
    location: 'Kinshasa, Gombe',
    area: 45,
    year: 2026,
    mainCategory: 'Cuisines',
    category: 'Décoration Top Modèle',
    style: 'Luxe Contemporain',
    budgetRange: '≥ 700 $',
    startingPrice: 1200,
    description: 'Véritable réalisation de cuisine moderne sur mesure : façades épurées beiges, plan de travail sombre marbré haute résistance et gorges lumineuses.',
    fullDescription: 'Projet authentique de cuisine contemporaine conçu, fabriqué et posé par les ateliers ICDD à Kinshasa. Nos menuisiers et agenceurs ont sculpté cet espace linéaire pour concilier ergonomie maximale, pureté visuelle et noblesse des matériaux : caissons hydrofuges haute densité, façades beiges traitées anti-traces, plan de travail marbré résistant aux rayures et éclairage LED sous caissons.',
    coverImage: cuisineModerne1,
    galleryImages: [
      cuisineModerne1
    ],
    services: [
      'Conception 3D & Ergonomie',
      'Fabrication de caissons sur mesure',
      'Plan de travail haute résistance',
      'Éclairage LED intégré',
      'Pose soignée par les équipes ICDD'
    ],
    specs: {
      duration: '2 à 3 Semaines',
      wallSurface: '45 m² d’espace cuisine agencé',
      finishType: 'Façades Contemporaines & Plan Quartz/Granit',
      materials: ['Caissons hydrofuges haute densité', 'Façades traitées anti-traces', 'Charnières et coulisses avec amortisseurs', 'Plan de travail minéral haute dureté'],
      lighting: 'Bandeaux LED 3000K encastrés et rétroéclairage de crédence'
    },
    features: [
      'Réalisation réelle exécutée par les équipes ICDD à Kinshasa',
      'Rangements optimisés du sol au plafond avec amortisseurs silencieux',
      'Matériaux résistants à la chaleur, aux chocs et à l’humidité',
      'Harmonie esthétique totale avec les espaces de vie attenants'
    ],
    featured: true
  },
  {
    id: 'cuisine-moderne-agencement-integre',
    title: 'Cuisine Contemporaine Intégrée & Finition Haute Précision',
    subtitle: 'Rangements toute hauteur, crédence design et électroménagers intégrés',
    location: 'Kinshasa, Ngaliema',
    area: 35,
    year: 2026,
    mainCategory: 'Cuisines',
    category: 'Décoration luxueuse',
    style: 'Moderne & Épuré',
    budgetRange: '≥ 700 $',
    startingPrice: 950,
    description: 'Conception et pose d’une cuisine intégrée moderne aux lignes fluides, maximisant chaque centimètre carré de rangement.',
    fullDescription: 'Autre réalisation réelle signée ICDD. Pour ce projet résidentiel, nos artisans ont privilégié des lignes horizontales étirées, des finitions mates faciles d’entretien et un agencement ergonomique facilitant la circulation et la préparation culinaire au quotidien.',
    coverImage: cuisineModerne2,
    galleryImages: [
      cuisineModerne2
    ],
    services: [
      'Agencement cuisine moderne',
      'Façades mates contemporaines',
      'Crédence & Plan de travail',
      'Quincaillerie amortie'
    ],
    specs: {
      duration: '10 à 15 Jours',
      wallSurface: '35 m² d’espace cuisine',
      finishType: 'Finition Mate Soyeuse & Crédence Décorative',
      materials: ['Panneaux haute densité mélaminés hydrofuges', 'Plans hydrofuges stratifiés premium', 'Poignées profilées invisibles'],
      lighting: 'Spots encastrés et bandeau LED sous meubles'
    },
    features: [
      'Fabrication sur-mesure adaptée aux dimensions exactes de la pièce',
      'Solutions d’angles et tiroirs coulissants à ouverture totale',
      'Résistance optimale au climat tropical de Kinshasa'
    ],
    featured: false
  },
  {
    id: 'cuisine-moderne-plans-quartz-kinshasa',
    title: 'Cuisine Américaine Contemporaine & Plans Haute Précision',
    subtitle: 'Agencement ouvert, caissons suspendus et éclairage architectural',
    location: 'Kinshasa, Macampagne',
    area: 40,
    year: 2026,
    mainCategory: 'Cuisines',
    category: 'Décoration Gold',
    style: 'Gold Prestige',
    budgetRange: '≥ 700 $',
    startingPrice: 1100,
    description: 'Chantier haut de gamme avec finitions soignées en quartz et intégration discrète des équipements.',
    fullDescription: 'Réalisation complète d’une cuisine moderne ouverte sur séjour. ICDD a harmonisé les teintes des façades avec les revêtements muraux pour une continuité visuelle fluide et élégante.',
    coverImage: cuisineModerne3,
    galleryImages: [
      cuisineModerne3
    ],
    services: [
      'Îlot central sur mesure',
      'Plans de travail quartz poli',
      'Menuiserie d’agencement noble',
      'Éclairage architectural scénarisé'
    ],
    specs: {
      duration: '2 à 3 Semaines',
      wallSurface: '40 m²',
      finishType: 'Quartz Poli & Façades Anti-Traces',
      materials: ['Quartz composite haute densité', 'Chants ABS renforcés', 'Tiroirs à amortisseur blum'],
      lighting: 'Ruban LED 24V sous plinthe et gorges suspendues'
    },
    features: [
      'Plan de travail antibactérien résistant aux chocs thermiques',
      'Prises escamotables et finitions invisibles',
      'Conception pensée pour la convivialité et la circulation'
    ],
    featured: true
  },

  // --- 3. PORTES INTÉRIEURES & MENUISERIE DE PRESTIGE (Réalisations Authentiques ICDD) ---
  {
    id: 'portes-interieures-modernes-kinshasa',
    title: 'Portes Intérieures Modernes & Blocs-Portes – Kinshasa',
    subtitle: 'Vantaux pleins isophoniques, rainurages design et poignées contemporaines',
    location: 'Kinshasa, Macampagne',
    area: 35,
    year: 2026,
    mainCategory: 'Portes',
    category: 'Décoration Top Modèle',
    style: 'Luxe Contemporain',
    budgetRange: '≥ 700 $',
    startingPrice: 450,
    description: 'Véritables réalisations de blocs-portes intérieurs modernes fabriqués et installés sur mesure par les maîtres artisans ICDD.',
    fullDescription: 'Projet réel de fabrication et pose de portes intérieures contemporaines pour une résidence de haut standing à Kinshasa. Châssis renforcés, vantaux pleins offrant une isolation phonique maximale, rainurages géométriques modernes, paumelles invisibles 3D réglables et serrures magnétiques pour une fermeture feutrée sans claquement.',
    coverImage: porteModerne1,
    galleryImages: [
      porteModerne1
    ],
    services: [
      'Prise de côtes et fabrication sur mesure',
      'Blocs-portes acoustiques isophoniques',
      'Chambranles et couvre-joints assortis',
      'Poignées contemporaines inox & serrures magnétiques',
      'Pose de précision et ajustement millimétré'
    ],
    specs: {
      duration: '5 à 10 Jours',
      wallSurface: 'Bloc-porte simple ou double battant sur mesure',
      finishType: 'Finition laquée soyeuse ou placage bois noble avec chants protégés',
      materials: ['Âme pleine hydrofuge haute densité', 'Charnières invisibles 3D réglables', 'Serrures magnétiques silencieuses'],
      lighting: 'Finition assortie aux plinthes et teintes murales'
    },
    features: [
      'Réalisation réelle photographiée sur site après installation par ICDD',
      'Isolation acoustique supérieure adaptée aux chambres et bureaux',
      'Résistance accrue à l’humidité et aux variations thermiques de Kinshasa',
      'Finitions luxueuses sans vis apparentes'
    ],
    featured: true
  },
  {
    id: 'portes-design-contemporaines-gombe',
    title: 'Portes Design Minimalistes & Finitions Nobles',
    subtitle: 'Lignes épurées, huisseries affleurantes et quincaillerie haut de gamme',
    location: 'Kinshasa, Gombe',
    area: 25,
    year: 2026,
    mainCategory: 'Portes',
    category: 'Décoration luxueuse',
    style: 'Moderne & Épuré',
    budgetRange: '350 $ - 500 $',
    startingPrice: 380,
    description: 'Chantier réel de pose de portes de séparation intérieures alliant élégance graphique et robustesse.',
    fullDescription: 'Autre réalisation authentique exécutée par nos équipes à Kinshasa. Ces portes intérieures subliment les circulations de la maison grâce à leurs lignes graphiques verticales, leur fermeture hermétique et silencieuse, et leurs matériaux nobles conçus pour résister au temps.',
    coverImage: porteModerne2,
    galleryImages: [
      porteModerne2
    ],
    services: [
      'Conception blocs-portes sur mesure',
      'Traitement anti-humidité spécial Kinshasa',
      'Quincaillerie et poignées ergonomiques',
      'Ajustement et pose sur bâti existant ou neuf'
    ],
    specs: {
      duration: '4 à 8 Jours',
      wallSurface: 'Blocs-portes grande hauteur',
      finishType: 'Laque mate anti-traces ou texture bois contemporain',
      materials: ['Bois sélectionné et panneaux composites renforcés', 'Garnitures inox brossé'],
      lighting: 'Seuil suisse ou plinthe automatique invisible'
    },
    features: [
      'Chantier photographié in situ à Kinshasa',
      'Excellente tenue mécanique et confort acoustique',
      'Personnalisation complète des dimensions et des poignées'
    ],
    featured: false
  },
  {
    id: 'portes-acoustiques-prestige-gombe',
    title: 'Blocs-Portes Isophoniques & Huisseries Affleurantes',
    subtitle: 'Isolation phonique renforcée pour suites et bureaux de direction',
    location: 'Kinshasa, Gombe',
    area: 30,
    year: 2026,
    mainCategory: 'Portes',
    category: 'Décoration Gold',
    style: 'Gold Prestige',
    budgetRange: '500 $ - 700 $',
    startingPrice: 490,
    description: 'Pose technique de portes à âme pleine acoustique avec joint périphérique compressif et paumelles invisibles 3D.',
    fullDescription: 'Solution recommandée pour les chambres de repos et cabinets de consultation. Offre un affaiblissement acoustique certifié tout en conservant une esthétique moderne et épurée parfaitement alignée avec le staff et les plinthes.',
    coverImage: porteModerne3,
    galleryImages: [
      porteModerne3
    ],
    services: [
      'Étanchéité phonique certifiée',
      'Huisseries invisibles intégrées au plâtre',
      'Serrures magnétiques haute fluidité',
      'Finitions laquées d’usine'
    ],
    specs: {
      duration: '5 à 7 Jours',
      wallSurface: 'Sur mesure selon trémie',
      finishType: 'Laquage au four anti-rayures',
      materials: ['Âme acoustique multicouche', 'Aluminium anodisé', 'Joints silicone haute résilience'],
      lighting: 'Bandeau LED de plinthe assorti'
    },
    features: [
      'Atténuation phonique jusqu’à 38 dB',
      'Fermeture douce sans bruit de gâche',
      'Pose au laser pour un affleurement parfait avec le mur'
    ],
    featured: true
  },

  // --- 4. BUREAUX & ESPACES PROFESSIONNELS (Réalisations Déco Authentiques ICDD) ---
  {
    id: 'bureau-direction-moderne-kinshasa',
    title: 'Décoration Bureau de Direction – Kinshasa Gombe',
    subtitle: 'Habillage mural contemporain, éclairage feutré et acoustique de prestige',
    location: 'Kinshasa, Gombe',
    area: 55,
    year: 2026,
    mainCategory: 'Bureaux',
    category: 'Décoration Top Modèle',
    style: 'Luxe Contemporain',
    budgetRange: '≥ 700 $',
    startingPrice: 850,
    description: 'Véritable réalisation de décoration pour bureau de direction : habillage mural design, travail des textures, ambiance feutrée propice à la concentration et aux réceptions d’affaires.',
    fullDescription: 'Projet réel d’aménagement et de décoration de bureau d’affaires exécuté par les équipes ICDD à Kinshasa. Nos architectes d’intérieur et artisans peintres ont façonné un espace de travail alliant prestance institutionnelle, confort acoustique et pureté visuelle : habillage mural géométrique contemporain, palette chromatique apaisante favorisant la réflexion, éclairage indirect soigné et intégration d’éléments de menuiserie sur mesure.',
    coverImage: bureauDeco1,
    galleryImages: [
      bureauDeco1,
      bureauDeco4
    ],
    services: [
      'Décoration murale bureau',
      'Architecture & Agencement pro',
      'Éclairage architectural LED',
      'Isolation acoustique murale',
      'Finitions Haute Précision'
    ],
    specs: {
      duration: '1 à 2 Semaines',
      wallSurface: '55 m² de surfaces murales aménagées',
      finishType: 'Habillage Mural Contemporain & Peinture Velours',
      materials: ['Enduits texturés haut de gamme', 'Peintures écologiques dépolluantes', 'Boiseries et panneaux muraux nobles', 'Profilés laqués'],
      lighting: 'Gorges lumineuses LED 3000K et spots d’accentuation'
    },
    features: [
      'Chantier authentique photographié in situ après réalisation par ICDD',
      'Atmosphère prestigieuse favorisant la productivité et les réceptions',
      'Harmonie esthétique sur mesure adaptée à l’image corporative',
      'Matériaux durables haute résistance'
    ],
    featured: true
  },
  {
    id: 'bureau-collaboratif-open-space-kinshasa',
    title: 'Décoration Bureau & Espace Collaboratif – Kinshasa',
    subtitle: 'Design épuré, claustras bois, peintures veloutées et clarté naturelle',
    location: 'Kinshasa, Ngaliema',
    area: 75,
    year: 2026,
    mainCategory: 'Bureaux',
    category: 'Décoration luxueuse',
    style: 'Moderne & Épuré',
    budgetRange: '500 $ - 700 $',
    startingPrice: 650,
    description: 'Décoration murale et agencement d’un espace de travail professionnel : mariage de textures modernes, confort visuel et élégance fonctionnelle.',
    fullDescription: 'Autre réalisation réelle signée ICDD pour un bureau professionnel à Kinshasa. Nos équipes ont orchestré la mise en peinture des cloisons avec des camaïeux neutres chauds, l’intégration de panneaux acoustiques décoratifs et la mise en lumière des postes de travail pour un confort visuel optimal tout au long de la journée.',
    coverImage: bureauDeco2,
    galleryImages: [
      bureauDeco2,
      bureauDeco5
    ],
    services: [
      'Décoration espace de travail',
      'Panneaux muraux & claustras',
      'Peinture mate soyeuse',
      'Confort visuel & LED'
    ],
    specs: {
      duration: '5 à 8 Jours',
      wallSurface: '75 m² de surfaces murales',
      finishType: 'Finition Mate Soyeuse & Murs d’Accent',
      materials: ['Peintures mates lavables haute résistance', 'Enduits lissés au diamant', 'Profils décoratifs'],
      lighting: 'Éclairage indirect uniforme sans éblouissement'
    },
    features: [
      'Véritable projet de décoration pour bureau réalisé par ICDD',
      'Clarté lumineuse accrue et sensation d’espace maximisée',
      'Revêtements muraux faciles d’entretien et très résistants'
    ],
    featured: true
  },
  {
    id: 'salle-reunion-cabinet-direction',
    title: 'Décoration Salle de Réunion & Cabinet Exécutif – Kinshasa',
    subtitle: 'Panneaux décoratifs d’accent, staff soigné et finitions de prestige',
    location: 'Kinshasa, Limete',
    area: 45,
    year: 2026,
    mainCategory: 'Bureaux',
    category: 'Décoration Gold',
    style: 'Gold Prestige',
    budgetRange: '≥ 700 $',
    startingPrice: 750,
    description: 'Aménagement décoratif d’une salle de réunion et de décision : mur d’accent soigné, retombées de staff et éclairage d’ambiance haut de gamme.',
    fullDescription: 'Pour cette salle de réunion stratégique, ICDD a réalisé une composition murale graphique combinant enduits d’art, baguettes d’encadrement fines et retombée de plafond avec rubans LED dissimulés pour des présentations et des échanges dans un cadre de grand standing.',
    coverImage: bureauDeco3,
    galleryImages: [
      bureauDeco3,
      bureauDeco6
    ],
    services: [
      'Décoration salle de réunion',
      'Mur de présentation & vidéoprojection',
      'Staff & retombées lumineuses',
      'Peinture haute résistance'
    ],
    specs: {
      duration: '4 à 6 Jours',
      wallSurface: '45 m² de surfaces murales',
      finishType: 'Finition Gold & Cadres Muraux Géométriques',
      materials: ['Panneaux décoratifs', 'Peinture satinée anti-reflets', 'Cimaises contemporaines'],
      lighting: 'Gradation lumineuse adaptée aux visioconférences'
    },
    features: [
      'Ambiance de travail prestigieuse et chaleureuse',
      'Atténuation des résonances acoustiques',
      'Finitions d’artisanat d’art signées ICDD'
    ],
    featured: false
  },

  // --- 5. CHAMBRES & SUITES PARENTALES (Réalisations Déco Authentiques ICDD) ---
  {
    id: 'chambre-suite-royale-gombe',
    title: 'Décoration Suite Parentale Royale – Kinshasa Gombe',
    subtitle: 'Tête de lit sculptée, panneaux muraux veloutés et éclairage feutré',
    location: 'Kinshasa, Gombe',
    area: 48,
    year: 2026,
    mainCategory: 'Chambres',
    category: 'Décoration Top Modèle',
    style: 'Haute Couture',
    budgetRange: '≥ 700 $',
    startingPrice: 750,
    description: 'Véritable réalisation de décoration de chambre parentale de grand standing : travail des reliefs muraux, tête de lit sur mesure et palette chromatique apaisante.',
    fullDescription: 'Projet d’exception réalisé par ICDD pour une suite parentale de maître à Kinshasa Gombe. Nos maîtres peintres et décorateurs ont conçu une ambiance feutrée et enveloppante : habillage mural avec panneaux acoustiques décoratifs, finitions velours mates très douces au toucher, éclairage indirect en gorge lumineuse et harmonie parfaite avec le mobilier.',
    coverImage: chambreDeco1,
    galleryImages: [
      chambreDeco1,
      chambreDeco2,
      chambreDeco3
    ],
    services: [
      'Décoration chambre parentale',
      'Habillage mural de tête de lit',
      'Staff & gorges lumineuses',
      'Peintures dépolluantes velours',
      'Harmonie textile & teintes'
    ],
    specs: {
      duration: '5 à 8 Jours',
      wallSurface: '48 m² de surfaces murales',
      finishType: 'Finition Top Modèle & Tête de Lit Sculptée',
      materials: ['Panneaux décoratifs rembourrés', 'Peintures écologiques veloutées', 'Profils laqués or mat'],
      lighting: 'Gorges lumineuses LED 2700K chaleureuses et liseuses intégrées'
    },
    features: [
      'Chantier réel photographié après exécution par ICDD',
      'Atmosphère intimiste et reposante haut de gamme',
      'Matériaux sains sans odeur certifiés pour chambre',
      'Isolation acoustique soignée pour un sommeil préservé'
    ],
    featured: true
  },
  {
    id: 'chambre-cosy-moderne-ngaliema',
    title: 'Décoration Chambre Contemporaine Bois – Kinshasa Ngaliema',
    subtitle: 'Camaïeux doux, boiseries décoratives et clarté naturelle apaisante',
    location: 'Kinshasa, Ngaliema',
    area: 38,
    year: 2026,
    mainCategory: 'Chambres',
    category: 'Décoration luxueuse',
    style: 'Moderne & Épuré',
    budgetRange: '500 $ - 700 $',
    startingPrice: 520,
    description: 'Aménagement décoratif d’une chambre moderne : teintes neutres chaleureuses, boiseries contemporaines et finitions soignées.',
    fullDescription: 'Autre projet authentique réalisé par les artisans ICDD à Kinshasa. Pour cette chambre moderne, l’accent a été mis sur la sérénité et le confort visuel : enduits fins lissés, mur d’accent graphique, intégration discrète des rangements et mise en valeur de la lumière du jour.',
    coverImage: chambreDeco5,
    galleryImages: [
      chambreDeco5,
      chambreDeco4,
      chambreDeco6
    ],
    services: [
      'Décoration chambre moderne',
      'Mur d’accent graphique',
      'Peinture mate lavable',
      'Dressing coordonné'
    ],
    specs: {
      duration: '4 à 6 Jours',
      wallSurface: '38 m² de surfaces murales',
      finishType: 'Finition Luxueuse & Mur d’Accent',
      materials: ['Enduits à la chaux lissés', 'Peintures lessivables haute qualité', 'Baguettes contemporaines'],
      lighting: 'Éclairage indirect et suspensions de chevet'
    },
    features: [
      'Projet authentique de décoration de chambre ICDD',
      'Élégance intemporelle et sensation d’espace maximisée',
      'Entretien facile et finitions durables'
    ],
    featured: true
  },
  {
    id: 'chambre-hotes-suite-gold-limete',
    title: 'Décoration Suite d’Hôtes Gold – Kinshasa Limete',
    subtitle: 'Moulures raffinées, touches dorées et ambiance hôtelière prestigieuse',
    location: 'Kinshasa, Limete',
    area: 42,
    year: 2026,
    mainCategory: 'Chambres',
    category: 'Décoration Gold',
    style: 'Gold Prestige',
    budgetRange: '500 $ - 700 $',
    startingPrice: 620,
    description: 'Décoration haut de gamme pour chambre d’hôtes de prestige : cadres muraux, staff épuré et finitions satinées soignées.',
    fullDescription: 'ICDD a transformé cette chambre en une suite de prestige digne des plus beaux hôtels : cadres muraux moulurés, retombée de faux-plafond avec ruban LED discret, peinture satinée haute réflectance et patines dorées subtiles.',
    coverImage: chambreDeco9,
    galleryImages: [
      chambreDeco9,
      chambreDeco7
    ],
    services: [
      'Décoration style hôtelier',
      'Moulures et cadres muraux',
      'Staff & corniche lumineuse',
      'Patines décoratives'
    ],
    specs: {
      duration: '5 à 7 Jours',
      wallSurface: '42 m² de surfaces murales',
      finishType: 'Finition Gold & Cadres Moulurés',
      materials: ['Cimaises de style', 'Peinture soyeuse grand passage', 'Détails dorés métallisés'],
      lighting: 'Rétroéclairage plafond et appliques murales'
    },
    features: [
      'Ambiance raffinée et chaleureuse',
      'Qualité de finition artisanale exceptionnelle',
      'Valorisation esthétique immédiate de la suite'
    ],
    featured: false
  },
  {
    id: 'chambre-harmonie-zen-mont-fleury',
    title: 'Décoration Chambre Zen & Dressing – Kinshasa Mont-Fleury',
    subtitle: 'Équilibre des volumes, niches lumineuses et enduits soyeux',
    location: 'Kinshasa, Mont-Fleury',
    area: 35,
    year: 2026,
    mainCategory: 'Chambres',
    category: 'Décoration classique',
    style: 'Moderne & Épuré',
    budgetRange: '350 $ - 500 $',
    startingPrice: 420,
    description: 'Décoration sobre et élégante d’une chambre d’appartement avec niches murales décoratives et teintes apaisantes.',
    fullDescription: 'Réalisation sur mesure pour une chambre contemporaine à Mont-Fleury. Préparation minutieuse des supports, application d’enduits extra-fins et peinture veloutée anti-reflets créant un cocon de tranquillité.',
    coverImage: chambreDeco8,
    galleryImages: [
      chambreDeco8,
      chambreDeco12
    ],
    services: [
      'Décoration chambre contemporaine',
      'Préparation soignée des murs',
      'Niches décoratives staff',
      'Peinture velours'
    ],
    specs: {
      duration: '3 à 5 Jours',
      wallSurface: '35 m² de surfaces murales',
      finishType: 'Finition Velours & Niches Décoratives',
      materials: ['Peintures dépolluantes', 'Enduits extra-fins', 'Plâtre staff haute densité'],
      lighting: 'Spots basse consommation et liseuses'
    },
    features: [
      'Cocon de calme propice au repos',
      'Finitions nettes aux angles et raccords impeccables',
      'Excellent rapport qualité/prix'
    ],
    featured: false
  },

  // --- 6. DÉCORATION ---
  {
    id: 'residence-top-modele',
    title: 'Décoration Salon Royal – Reliefs & Matières',
    subtitle: 'Création murale d’exception & relief 3D artistique',
    location: 'Kinshasa, Gombe',
    area: 95,
    year: 2026,
    mainCategory: 'Décoration',
    category: 'Décoration Top Modèle',
    style: 'Haute Couture',
    budgetRange: '≥ 700 $',
    startingPrice: 800,
    description: 'Finitions sur-mesure d’exception pour un grand salon avec effets de matières artistiques et niches lumineuses.',
    fullDescription: 'Réalisation emblématique de la collection Décoration d’ICDD. Nos artisans peintres et décorateurs ont créé un jeu de textures murales uniques alliant enduit à la chaux poli, effets de feuilles dorées subtiles et préparation murale au millimètre près.',
    coverImage: realProject3,
    galleryImages: [
      realProject3,
      icddRealisation18
    ],
    services: [
      'Décoration artistique',
      'Enduits structurés 3D',
      'Peinture velours',
      'Patines de dorure',
      'Harmonies couleurs'
    ],
    specs: {
      duration: '5 à 7 Jours',
      wallSurface: '95 m² de surface murale',
      finishType: 'Top Modèle Artistique 3D & Dorures',
      materials: ['Matériaux décoratifs d’art', 'Enduits haute texture', 'Feuilles d’or décoratives', 'Peinture velours dépolluante'],
      lighting: 'Mise en valeur par gorges LED et lumière rasante'
    },
    features: [
      'Préparation et lissage haute définition des supports',
      'Création murale texturée exclusive signée ICDD',
      'Matériaux de décoration premium certifiés'
    ],
    featured: true
  },
  {
    id: 'suite-gold-prestige',
    title: 'Salon Contemporain & Boiseries d’Exception – Finition Gold',
    subtitle: 'Patines nacrées, mobilier moderne, boiseries fines et éclairage tamisé',
    location: 'Kinshasa, Ngaliema',
    area: 75,
    year: 2026,
    mainCategory: 'Décoration',
    category: 'Décoration Gold',
    style: 'Gold Prestige',
    budgetRange: '≥ 700 $',
    startingPrice: 700,
    description: 'Ambiance de salon haut standing avec boiseries contemporaines, patines dorées chaudes et finitions soignées signées ICDD.',
    fullDescription: 'Pour ce salon résidentiel de prestige, ICDD a déployé sa formule Décoration Gold. Les murs et encadrements se parent d’un jeu de boiseries raffinées, de peintures aux tons chauds et de finitions soyeuses valorisant l’espace de réception.',
    coverImage: realProject1,
    galleryImages: [
      realProject1,
      icddRealisation21
    ],
    services: [
      'Décoration salon contemporain',
      'Patines nacrées Gold',
      'Boiseries & moulures fines',
      'Éclairage architectural'
    ],
    specs: {
      duration: '4 à 6 Jours',
      wallSurface: '75 m² de surface murale',
      finishType: 'Finition Gold Nacrée & Patines Nobles',
      materials: ['Enduit décoratif nacré', 'Peinture satinée or doux', 'Moulures murales d’encadrement'],
      lighting: 'Appliques murales diffusantes et éclairage indirect'
    },
    features: [
      'Encadrements muraux décoratifs et cimaises fines',
      'Effet de matière soyeux au toucher',
      'Durabilité et lavabilité maximale des teintes'
    ],
    featured: false
  },
  {
    id: 'salon-luxueuse',
    title: 'Décoration Espace Réception – Stuc Minéral',
    subtitle: 'Effet stuc marbré & peintures minérales texturées',
    location: 'Kinshasa, Mont-Fleury',
    area: 60,
    year: 2025,
    mainCategory: 'Décoration',
    category: 'Décoration luxueuse',
    style: 'Luxe Contemporain',
    budgetRange: '500 $ - 700 $',
    startingPrice: 500,
    description: 'Transformation d’une salle de séjour avec enduit minéral texturé façon stuc vénitien et palette chromatique chaleureuse.',
    fullDescription: 'La Décoration Luxueuse met en scène un enduit décoratif minéral texturé, apportant de la profondeur et du relief aux murs. Les lignes modernes structurent le salon tout en conservant une grande douceur visuelle.',
    coverImage: icddRealisation26,
    galleryImages: [
      icddRealisation26,
      icddRealisation23
    ],
    services: [
      'Stuc minéral vénitien',
      'Peinture mate poudrée',
      'Décoration murale',
      'Vernis de protection'
    ],
    specs: {
      duration: '3 à 5 Jours',
      wallSurface: '60 m² de surface murale',
      finishType: 'Stuc Minéral & Velours Texturé',
      materials: ['Enduits à la chaux naturelle', 'Peintures minérales mates poudrées', 'Vernis de protection hydrofuge'],
      lighting: 'Lumière chaleureuse orientable'
    },
    features: [
      'Effet marbré ou minéral sans raccord visible',
      'Pigments naturels haute tenue aux UV',
      'Finition résistante et facile d’entretien'
    ],
    featured: false
  },

  // --- 3. STAFF ---
  {
    id: 'staff-plafond-lumineux',
    title: 'Staff & Plafond Lumineux – Résidence Gombe',
    subtitle: 'Plafonds suspendus en staff, corniches sculptées et gorges LED',
    location: 'Kinshasa, Gombe',
    area: 110,
    year: 2026,
    mainCategory: 'Staff',
    category: 'Décoration luxueuse',
    style: 'Luxe Contemporain',
    budgetRange: '500 $ - 700 $',
    startingPrice: 650,
    description: 'Réalisation complète de faux plafonds en plâtre staff armé avec intégration de gorges lumineuses pour rubans LED dissimulés.',
    fullDescription: 'La réalisation phare de nos maîtres staffeurs à Kinshasa. Le plafond a été conçu à double niveau avec des corniches courbes profilées spécialement pour diffuser un rétroéclairage homogène sans éblouissement, agrandissant visuellement la pièce.',
    coverImage: staffPlafond1,
    galleryImages: [
      staffPlafond1,
      staffPlafond5
    ],
    services: [
      'Faux-plafond en staff',
      'Corniches sculptées',
      'Gorges lumineuses LED',
      'Peinture de finition mate',
      'Staff armé haute densité'
    ],
    specs: {
      duration: '5 à 8 Jours',
      wallSurface: '110 m² de plafond en staff',
      finishType: 'Staff Lisse & Gorges LED Rétroéclairées',
      materials: ['Plâtre de staff fibré', 'Armatures métalliques sécurisées', 'Corniches sur mesure', 'Peinture mate spéciale plafond'],
      lighting: 'Rubans LED 24V haute densité dissimulés dans les gorges'
    },
    features: [
      'Plafond suspendu 100% incombustible et isolant',
      'Profils de corniches conçus sur mesure',
      'Rétroéclairage architectural sans zones d’ombre',
      'Surface parfaitement plane et poncée au diamant'
    ],
    featured: true
  },
  {
    id: 'staff-rosaces-moulures',
    title: 'Faux-Plafond Staff & Rétroéclairage LED Bleues – Kinshasa',
    subtitle: 'Plafond suspendu en staff moderne, double retombée et gorges LED bleutées',
    location: 'Kinshasa, Limete',
    area: 65,
    year: 2026,
    mainCategory: 'Staff',
    category: 'Décoration classique',
    style: 'Luxe Contemporain',
    budgetRange: '350 $ - 500 $',
    startingPrice: 450,
    description: 'Pose technique de faux-plafond en staff avec décrochés géométriques et rubans LED bleutés dissimulés pour un effet contemporain saisissant.',
    fullDescription: 'Réalisation sur mesure d’un faux-plafond suspendu en plâtre de staff armé. Les gorges d’éclairage dissimulent une scénographie lumineuse LED bleutée qui accentue la modernité et les volumes du salon.',
    coverImage: staffPlafond8,
    galleryImages: [
      staffPlafond8,
      staffPlafond6
    ],
    services: [
      'Corniches classiques de staff',
      'Rosaces centrales',
      'Cimaises et cadres muraux',
      'Finitions au plâtre fin'
    ],
    specs: {
      duration: '3 à 4 Jours',
      wallSurface: '65 m² de plafond & murs',
      finishType: 'Staff Ornemental & Finition Satinée',
      materials: ['Moulures staff véritable', 'Rosace sculptée main', 'Colle staff haute adhérence', 'Enduit de finition'],
      lighting: 'Mise en valeur par lustre suspendu et appliques'
    },
    features: [
      'Rosace centrale sculptée à la main',
      'Jonctions et angles taillés sur mesure',
      'Résistance totale à l’humidité et à la chaleur',
      'Prêt à recevoir la peinture de votre choix'
    ],
    featured: false
  },
  {
    id: 'studio-simple',
    title: 'Décoration Moderne & Fraîcheur – Espace Contemporain',
    subtitle: 'Fraîcheur, netteté et pureté des couleurs',
    location: 'Kinshasa, Bandalungwa',
    area: 35,
    year: 2025,
    mainCategory: 'Décoration',
    category: 'Décoration simple',
    style: 'Moderne & Épuré',
    budgetRange: '250 $ - 350 $',
    startingPrice: 250,
    description: 'Rafraîchissement complet et peinture impeccable pour un intérieur lumineux à prix maîtrisé.',
    fullDescription: 'Idéal pour redonner vie à une pièce, l’offre Décoration simple assure un rendu net et contemporain. Préparation soignée des murs, rebouchage des imperfections et application de peintures certifiées sans odeur.',
    coverImage: icddRealisation30,
    galleryImages: [
      icddRealisation30,
      icddRealisation31
    ],
    services: [
      'Préparation des murs',
      'Peinture veloutée',
      'Protection des sols',
      'Nettoyage de fin de chantier'
    ],
    specs: {
      duration: '1 à 2 Jours',
      wallSurface: '35 m² de surface murale',
      finishType: 'Peinture Blanche ou Colorée Mate/Satinée',
      materials: ['Peinture murale monocouche / bicouche', 'Enduit de lissage d’appoint'],
      lighting: 'Lumière naturelle optimisée'
    },
    features: [
      'Rendu uniforme et propre',
      'Séchage rapide et sans odeur',
      'Rapport qualité / prix optimal'
    ],
    featured: false
  },
  // --- NOUVEAUX CHANTIERS & RÉALISATIONS RÉELLES ICDD ---
  {
    id: 'realisation-salon-prestige-kinshasa',
    title: 'Salon Réception & Plafond Sculpté LED – Macampagne',
    subtitle: 'Création d’un faux plafond contemporain en staff avec éclairage scénographique',
    location: 'Kinshasa, Macampagne',
    area: 95,
    year: 2026,
    mainCategory: 'Appartements',
    category: 'Décoration Top Modèle',
    style: 'Haute Couture',
    budgetRange: '≥ 700 $',
    startingPrice: 900,
    description: 'Chantier complet exécuté par ICDD : staffage profilé, gorges lumineuses dissimulées, finitions laquées et harmonie générale.',
    fullDescription: 'Réalisation emblématique mettant en valeur la maîtrise artisanale d’ICDD. Les plafonds ont été structurés par paliers géométriques avec rétro-éclairage LED chaleureux, combinés à un traitement mural soigné pour une acoustique feutrée.',
    coverImage: icddRealisation4,
    galleryImages: [
      icddRealisation4,
      icddRealisation14,
      icddRealisation15
    ],
    services: [
      'Staff architectural',
      'Gorges LED dissimulées',
      'Peinture satinée anti-trace',
      'Habillages muraux design'
    ],
    specs: {
      duration: '2 à 3 Semaines',
      wallSurface: '95 m² de superficie',
      finishType: 'Top Modèle & Staff armé',
      materials: ['Plâtre de staff armé haute résistance', 'Enduit fin lissé au couteau', 'Peinture velours dépolluante'],
      lighting: 'Rubans LED 24V dissimulés 3000K'
    },
    features: [
      'Gorges lumineuses intégrées sans visibilité directe des LED',
      'Murs lissés au millimètre près',
      'Finitions d’angles impeccables',
      'Chantier livré clé en main et nettoyé'
    ],
    featured: true
  },
  {
    id: 'realisation-suite-moderne-kinshasa',
    title: 'Habillage Mural Tasseaux & Marbre Noir – Ngaliema',
    subtitle: 'Tasseaux de bois précieux, marbre sombre poli et rubans LED intégrés',
    location: 'Kinshasa, Ngaliema',
    area: 55,
    year: 2026,
    mainCategory: 'Décoration',
    category: 'Décoration Gold',
    style: 'Gold Prestige',
    budgetRange: '500 $ - 700 $',
    startingPrice: 650,
    description: 'Conception et pose d’un habillage mural d’exception : combinaison de tasseaux verticaux en bois et panneau central façon marbre noir rétroéclairé.',
    fullDescription: 'Projet d’aménagement décoratif haut standing à Ngaliema. Nos artisans ont combiné la chaleur des tasseaux de bois nobles avec l’élégance d’un marbre noir poli et des gorges lumineuses pour un résultat architectural spectaculaire.',
    coverImage: icddRealisation16,
    galleryImages: [
      icddRealisation16,
      icddRealisation17
    ],
    services: [
      'Habillage mural sur mesure',
      'Tasseaux de bois verticaux',
      'Panneau marbre poli',
      'Rétroéclairage LED dissimulé'
    ],
    specs: {
      duration: '1 à 2 Semaines',
      wallSurface: '55 m²',
      finishType: 'Décoration Gold & Boiseries',
      materials: ['Tasseaux de bois traités', 'Revêtement marbré haut de gamme', 'Profils aluminium LED'],
      lighting: 'Éclairage architectural scénarisé'
    },
    features: [
      'Isolation acoustique et esthétique contemporaine',
      'Éclairage chaleureux dissimulé',
      'Finition haute précision sans raccord visible'
    ],
    featured: true
  },
  {
    id: 'realisation-staff-haute-precision',
    title: 'Staff d’Art & Moulures Décoratives – Gombe',
    subtitle: 'Maîtrise artisanale du plâtre et des reliefs pour espaces d’apparat',
    location: 'Kinshasa, Gombe',
    area: 80,
    year: 2026,
    mainCategory: 'Staff',
    category: 'Décoration Top Modèle',
    style: 'Luxe Contemporain',
    budgetRange: '≥ 700 $',
    startingPrice: 850,
    description: 'Pose experte de corniches travaillées, coffrages suspendus et rosaces artisanales pour villas de standing.',
    fullDescription: 'Chantier illustrant le savoir-faire de nos maîtres staffeurs à Kinshasa. Du coffrage des poutres à la sculpture des détails, chaque courbe est exécutée selon les règles de l’art pour sublimer la hauteur sous plafond.',
    coverImage: staffPlafond7,
    galleryImages: [
      staffPlafond7,
      staffPlafond3,
      staffPlafond4
    ],
    services: [
      'Staff armé grande portée',
      'Corniches et cimaises profilées',
      'Plafond suspendu multi-niveaux',
      'Finition au blanc pur mat'
    ],
    specs: {
      duration: '2 Semaines',
      wallSurface: '80 m² de plafonds',
      finishType: 'Haute Précision Staff',
      materials: ['Plâtre de staff sélectionné', 'Armatures acier galvanisé', 'Fibre de sisal'],
      lighting: 'Gorges d’éclairage indirect périphérique'
    },
    features: [
      'Résistance accrue au climat tropical',
      'Raccords d’angles invisibles',
      'Garantie décennale sur la structure de staff'
    ],
    featured: true
  },
  {
    id: 'staff-plafond-design-sculptural',
    title: 'Décoration Plafond & Faux-Plafond Staff Lumineux',
    subtitle: 'Découpes géométriques, caissons suspendus et éclairage indirect LED',
    location: 'Kinshasa, Macampagne',
    area: 90,
    year: 2026,
    mainCategory: 'Staff',
    category: 'Décoration Top Modèle',
    style: 'Luxe Contemporain',
    budgetRange: '≥ 700 $',
    startingPrice: 850,
    description: 'Conception architecturale et réalisation de plafonds sculptés en staff avec jeux de creux et reliefs contemporains.',
    fullDescription: 'Projet d’exception mettant en scène la finesse du plâtre armé et des décors plafonniers ICDD. Des caissons décaissés avec rétro-éclairage chaud apportent une sensation de volume exceptionnelle et une atmosphère feutrée dans les pièces de réception.',
    coverImage: staffPlafond2,
    galleryImages: [
      staffPlafond2,
      staffPlafond9,
      staffPlafond13
    ],
    services: [
      'Plafond staff géométrique',
      'Caissons suspendus design',
      'Gorges rétro-éclairées 3000K',
      'Enduit fin et lissage parfait'
    ],
    specs: {
      duration: '10 à 14 Jours',
      wallSurface: '90 m² de plafond sculpté',
      finishType: 'Staff Relief & Lignes Lumineuses',
      materials: ['Staff fibré haute densité', 'Profils aluminium dissimulés', 'Peinture velours mate'],
      lighting: 'Rubans LED 24V anti-éblouissement'
    },
    features: [
      'Jeux d’ombres et de lumières scénographiques',
      'Structure allégée et ultra-robuste',
      'Intégration invisible des câblages électriques',
      'Finition lisse soyeuse prête à peindre'
    ],
    featured: true
  },
  {
    id: 'staff-corniches-modernes-gorges',
    title: 'Corniches Modernes & Décoration Plafonnier Staff',
    subtitle: 'Structuration des volumes de plafond avec effets d’ombres et de lumières',
    location: 'Kinshasa, Limete Résidentiel',
    area: 75,
    year: 2026,
    mainCategory: 'Staff',
    category: 'Décoration Gold',
    style: 'Gold Prestige',
    budgetRange: '500 $ - 700 $',
    startingPrice: 600,
    description: 'Réalisation sur mesure de corniches contemporaines et motifs plafonniers en staff pour salon et salle à manger.',
    fullDescription: 'Mariage parfait entre l’art du staff traditionnel et les codes de l’architecture moderne. Nos artisans staffeurs ont posé des corniches linéaires en staff armé, associées à un décroché central accueillant un éclairage d’ambiance doux.',
    coverImage: staffPlafond10,
    galleryImages: [
      staffPlafond10,
      staffPlafond11,
      staffPlafond12,
      staffPlafond14
    ],
    services: [
      'Corniches modernes profilées',
      'Décrochés et retombées de staff',
      'Préparation et ponçage minutieux',
      'Peinture satinée haute résistance'
    ],
    specs: {
      duration: '7 à 10 Jours',
      wallSurface: '75 m²',
      finishType: 'Corniches Modernes & Décrochés',
      materials: ['Plâtre de moulage supérieur', 'Fibres végétales de renfort', 'Enduits haute finesse'],
      lighting: 'Spots encastrés et bandeaux lumineux'
    },
    features: [
      'Angles coupés et raccordés au millimètre',
      'Plafond respirant et régulateur thermique',
      'Esthétique épurée valorisant l’espace'
    ],
    featured: true
  }
];

export const TEAM_MEMBERS = [
  {
    name: 'Direction ICDD',
    role: 'Chef de Projets & Coordination Générale',
    avatar: icddOfficialLogo,
    bio: 'Supervision technique et esthétique de l’ensemble des projets d’architecture intérieure, staff et décoration.'
  },
  {
    name: 'Maîtres Staffeurs & Peintres',
    role: 'Spécialistes Staff, Gorges LED & Finitions Gold',
    avatar: icddOfficialLogo,
    bio: 'Équipe d’artisans qualifiés formés aux techniques de staffage haute précision et d’enduits texturés d’exception.'
  },
  {
    name: 'Conseil Projet & Devis',
    role: 'Conseillers Clientèle & Métré sur Site',
    avatar: icddOfficialLogo,
    bio: 'À votre disposition au +243 897504570 pour étudier votre projet et vous accompagner dans votre choix de matériaux.'
  }
];

export interface RealisationPhotoItem {
  id: string;
  image: string;
  mainCategory: RealisationCategory;
  location: string;
  projectId: string;
  project: Project;
  startingPrice?: number;
  categoryName?: string;
  services?: string[];
}

export function getUniqueRealisationPhotos(): RealisationPhotoItem[] {
  const photos: RealisationPhotoItem[] = [];
  const seenImages = new Set<string>();

  for (const project of ICDD_PROJECTS) {
    const candidateImages = [project.coverImage, ...(project.galleryImages || [])];
    candidateImages.forEach((img, idx) => {
      if (img && !seenImages.has(img)) {
        seenImages.add(img);
        photos.push({
          id: `${project.id}-photo-${idx}`,
          image: img,
          mainCategory: project.mainCategory,
          location: project.location,
          projectId: project.id,
          project: project,
          startingPrice: project.startingPrice,
          categoryName: project.category,
          services: project.services
        });
      }
    });
  }

  return photos;
}

export const ICDD_REALISATION_PHOTOS: RealisationPhotoItem[] = getUniqueRealisationPhotos();

