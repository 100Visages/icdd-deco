import { Project, DecorOffer } from '../types';
import icddOfficialLogo from '../assets/images/icdd.jpeg';

// Photos authentiques des chantiers et réalisations réelles ICDD
import realProject1 from '../assets/projects/real_project_1.jpg';
import realProject2 from '../assets/projects/real_project_2.jpg';
import realProject3 from '../assets/projects/real_project_3.jpg';
import realProject4 from '../assets/projects/real_project_4.jpg';
import realProject5 from '../assets/projects/real_project_5.jpg';
import realProject6 from '../assets/projects/real_project_6.jpg';
import realProject7 from '../assets/projects/real_project_7.jpg';

// Photos réelles de cuisines modernes réalisées par ICDD
import cuisineModerne1 from '../assets/projects/cuisine_moderne_1.jpeg';
import cuisineModerne2 from '../assets/projects/cuisine_moderne_2.jpeg';
import cuisineModerne3 from '../assets/projects/cuisine_moderne_3.jpeg';

// Photos réelles de portes intérieures et blocs-portes réalisés par ICDD
import porteModerne1 from '../assets/projects/porte_moderne_1.jpeg';
import porteModerne2 from '../assets/projects/porte_moderne_2.jpeg';
import porteModerne3 from '../assets/projects/porte_moderne_3.jpeg';

export const ICDD_ASSETS = {
  logo: icddOfficialLogo,
  project1: realProject1,
  project2: realProject2,
  project3: realProject3,
  project4: realProject4,
  project5: realProject5,
  project6: realProject6,
  project7: realProject7,
  cuisine1: cuisineModerne1,
  cuisine2: cuisineModerne2,
  cuisine3: cuisineModerne3,
  porte1: porteModerne1,
  porte2: porteModerne2,
  porte3: porteModerne3,
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
    coverImage: realProject4,
    galleryImages: [
      realProject4,
      realProject1,
      realProject7,
      realProject6
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
      realProject1,
      realProject4,
      realProject6
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
    coverImage: realProject3,
    galleryImages: [
      realProject3,
      realProject4,
      realProject5,
      realProject2
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
    title: 'Cuisine Moderne Épurée & Îlot – Kinshasa',
    subtitle: 'Agencement sur mesure, façades contemporaines et gorges LED',
    location: 'Kinshasa, Gombe',
    area: 45,
    year: 2026,
    mainCategory: 'Cuisines',
    category: 'Décoration Top Modèle',
    style: 'Luxe Contemporain',
    budgetRange: '≥ 700 $',
    startingPrice: 1200,
    description: 'Véritable réalisation de cuisine moderne sur mesure : façades épurées sans poignées, plan de travail haute résistance, électroménagers encastrés et gorges lumineuses.',
    fullDescription: 'Projet authentique de cuisine moderne conçu, fabriqué et posé par les ateliers ICDD à Kinshasa. Nos menuisiers et architectes d’intérieur ont sculpté cet espace pour concilier ergonomie maximale, pureté visuelle et noblesse des matériaux : caissons hydrofuges haute densité, façades contemporaines traitées anti-traces, plan de travail résistant aux rayures et éclairage architectural LED intégré sous les meubles hauts.',
    coverImage: cuisineModerne1,
    galleryImages: [
      cuisineModerne1,
      cuisineModerne2,
      cuisineModerne3
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
      cuisineModerne2,
      cuisineModerne3,
      cuisineModerne1
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
      porteModerne1,
      porteModerne2,
      porteModerne3
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
      porteModerne2,
      porteModerne1,
      porteModerne3
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

  // --- 4. DÉCORATION ---
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
    coverImage: realProject4,
    galleryImages: [
      realProject4,
      realProject1,
      realProject7,
      realProject6
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
    title: 'Décoration Suite Parentale – Finition Gold',
    subtitle: 'Patines nacrées, reflets dorés et élégance moderne',
    location: 'Kinshasa, Ngaliema',
    area: 75,
    year: 2026,
    mainCategory: 'Décoration',
    category: 'Décoration Gold',
    style: 'Gold Prestige',
    budgetRange: '≥ 700 $',
    startingPrice: 700,
    description: 'Ambiance chaleureuse et lumineuse pour une chambre parentale avec patines dorées, bandeaux nacrés et finitions velours.',
    fullDescription: 'Pour cette suite parentale, ICDD a déployé sa formule Décoration Gold. Les murs se parent d’un jeu de lumière raffiné grâce à des peintures à reflets métalliques doux et des boiseries murales peintes dans des tons chauds et apaisants.',
    coverImage: realProject1,
    galleryImages: [
      realProject1,
      realProject7,
      realProject6,
      realProject4
    ],
    services: [
      'Décoration chambre',
      'Patines nacrées Gold',
      'Moulures décoratives',
      'Éclairage d’ambiance'
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
    coverImage: realProject6,
    galleryImages: [
      realProject6,
      realProject7,
      realProject2,
      realProject1
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
    coverImage: realProject1,
    galleryImages: [
      realProject1,
      realProject4,
      realProject7,
      realProject2
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
    title: 'Staff Moulures & Rosaces – Salon de Réception',
    subtitle: 'Moulures d’ornement, rosaces centrales et encadrements classiques',
    location: 'Kinshasa, Limete',
    area: 65,
    year: 2026,
    mainCategory: 'Staff',
    category: 'Décoration classique',
    style: 'Classique Élégant',
    budgetRange: '350 $ - 500 $',
    startingPrice: 450,
    description: 'Pose artisanale de corniches classiques de staff, rosaces de lustre sculptées main et cadres muraux géométriques.',
    fullDescription: 'Pour conférer un style haussmannien ou classique revisité à cet espace, nos staffeurs ont fixé et raccordé des moulures de staff de haute précision. Les raccords invisibles et les finitions au couteau d’artisan garantissent une longévité absolue.',
    coverImage: realProject7,
    galleryImages: [
      realProject7,
      realProject2,
      realProject3,
      realProject5
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
    coverImage: realProject5,
    galleryImages: [
      realProject5,
      realProject3,
      realProject2
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
