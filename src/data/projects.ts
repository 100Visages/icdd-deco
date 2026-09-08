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

export const ICDD_ASSETS = {
  logo: icddOfficialLogo,
  project1: realProject1,
  project2: realProject2,
  project3: realProject3,
  project4: realProject4,
  project5: realProject5,
  project6: realProject6,
  project7: realProject7,
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
  {
    id: 'residence-top-modele',
    title: 'Décoration Top Modèle – Salon Royal',
    subtitle: 'Création murale d’exception & relief 3D artistique',
    location: 'Kinshasa, Gombe',
    area: 95,
    year: 2026,
    category: 'Décoration Top Modèle',
    style: 'Haute Couture',
    budgetRange: '≥ 700 $',
    startingPrice: 800,
    description: "Finitions sur-mesure d'exception pour un grand salon avec effets de matières artistiques et niches lumineuses.",
    fullDescription: "Réalisation emblématique de la collection Top Modèle d'ICDD. Nos artisans peintres et décorateurs ont créé un jeu de textures murales uniques alliant enduit à la chaux poli, effets de feuilles dorées subtiles et préparation murale au millimètre près.",
    coverImage: realProject4,
    galleryImages: [
      realProject4,
      realProject1,
      realProject7,
      realProject6
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
    title: 'Décoration Gold – Suite Parentale Prestige',
    subtitle: 'Patines nacrées, reflets dorés et élégance moderne',
    location: 'Kinshasa, Ngaliema',
    area: 75,
    year: 2026,
    category: 'Décoration Gold',
    style: 'Gold Prestige',
    budgetRange: '≥ 700 $',
    startingPrice: 700,
    description: "Ambiance chaleureuse et lumineuse avec patines dorées, bandeaux de peinture métallisée et finitions velours.",
    fullDescription: "Pour cette suite parentale, ICDD a déployé sa formule Décoration Gold. Les murs se parent d'un jeu de lumière raffiné grâce à des peintures à reflets métalliques doux et des boiseries murales peintes dans des tons chauds.",
    coverImage: realProject1,
    galleryImages: [
      realProject1,
      realProject7,
      realProject6,
      realProject4
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
    title: 'Décoration Luxueuse – Espace Réception',
    subtitle: 'Effet stuc marbré & peintures minérales texturées',
    location: 'Kinshasa, Mont-Fleury',
    area: 60,
    year: 2025,
    category: 'Décoration luxueuse',
    style: 'Luxe Contemporain',
    budgetRange: '500 $ - 700 $',
    startingPrice: 500,
    description: "Transformation des espaces de vie avec des enduits texturés façon stuc et une palette chaleureuse raffinée.",
    fullDescription: "La Décoration Luxueuse met en scène un enduit décoratif minéral texturé, apportant de la profondeur et du relief aux murs. Les lignes modernes structurent le salon tout en conservant une grande douceur visuelle.",
    coverImage: realProject6,
    galleryImages: [
      realProject6,
      realProject7,
      realProject2,
      realProject1
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
  {
    id: 'bureau-classique',
    title: 'Décoration Classique – Salon & Boiseries',
    subtitle: 'Harmonie des teintes profondes & boiseries peintes',
    location: 'Kinshasa, Limete',
    area: 45,
    year: 2026,
    category: 'Décoration classique',
    style: 'Classique Élégant',
    budgetRange: '350 $ - 500 $',
    startingPrice: 350,
    description: "Peinture double couche haute opacité avec teintes personnalisées et finitions soignées.",
    fullDescription: "La Décoration Classique d'ICDD offre une alliance parfaite entre sobriété et élégance. Les murs sont soigneusement préparés pour recevoir une peinture mate lavable haut de gamme, complétée par des baguettes d'encadrement classiques.",
    coverImage: realProject2,
    galleryImages: [
      realProject2,
      realProject3,
      realProject5
    ],
    specs: {
      duration: '2 à 3 Jours',
      wallSurface: '45 m² de surface murale',
      finishType: 'Peinture Veloutée Haute Qualité & Baguettes',
      materials: ['Peinture acrylique biosourcée', 'Enduit de rebouchage et lissage', 'Baguettes de finition'],
      lighting: 'Lustres doux et éclairage de travail'
    },
    features: [
      'Application au rouleau microfibre sans traces',
      'Teintes profondes au choix sur nuancier',
      'Protection des sols et plinthes'
    ],
    featured: false
  },
  {
    id: 'studio-simple',
    title: 'Décoration Simple – Espace Contemporain',
    subtitle: 'Fraîcheur, netteté et pureté des couleurs',
    location: 'Kinshasa, Bandalungwa',
    area: 30,
    year: 2025,
    category: 'Décoration simple',
    style: 'Moderne & Épuré',
    budgetRange: '250 $ - 350 $',
    startingPrice: 250,
    description: "Rafraîchissement complet et peinture impeccable pour un intérieur lumineux à prix maîtrisé.",
    fullDescription: "Idéal pour redonner vie à une pièce, l'offre Décoration simple assure un rendu net et contemporain. Préparation des murs, rebouchage des imperfections et application de peintures certifiées anti-odeurs.",
    coverImage: realProject5,
    galleryImages: [
      realProject5,
      realProject3,
      realProject2
    ],
    specs: {
      duration: '1 à 2 Jours',
      wallSurface: '30 m² de surface murale',
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
    role: 'Chef de Projets & Coordination Décoration',
    avatar: icddOfficialLogo,
    bio: 'Supervision technique de tous les chantiers de décoration et peinture intérieure.'
  },
  {
    name: 'Maîtres Peintres ICDD',
    role: 'Spécialistes Enduits, Stucs & Finitions Gold',
    avatar: icddOfficialLogo,
    bio: 'Experts en patines dorées, textures en relief et application d’enduits décoratifs nobles.'
  },
  {
    name: 'Équipe Conseil Nuancier & Devis',
    role: 'Conseillers Décoration & Métré Mural',
    avatar: icddOfficialLogo,
    bio: 'À votre écoute du lundi au samedi au +243 897504570 pour établir votre devis personnalisé.'
  }
];

