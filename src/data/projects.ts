import { Project, DecorOffer } from '../types';

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
    coverImage: '/src/assets/images/icdd_luxury_interior_1786542633755.jpg',
    galleryImages: [
      '/src/assets/images/icdd_luxury_interior_1786542633755.jpg',
      '/src/assets/images/villa_riviera_1786542646750.jpg',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80'
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
    coverImage: '/src/assets/images/haussmann_reborn_1786542659834.jpg',
    galleryImages: [
      '/src/assets/images/haussmann_reborn_1786542659834.jpg',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80'
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
    description: "Transformation des espaces de vie avec des enduits texturés façon stuc et une palette neutre raffinée.",
    fullDescription: "La Décoration Luxueuse met en scène un enduit décoratif minéral texturé, apportant de la profondeur et du relief aux murs. Les lignes modernes structurent le salon tout en conservant une grande douceur visuelle.",
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80'
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
    title: 'Décoration Classique – Bureau & Bibliothèque',
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
    coverImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80'
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
    title: 'Décoration Simple – Chambre Moderne',
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
    coverImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=80'
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
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    bio: 'Supervision technique de tous les chantiers de décoration et peinture intérieure.'
  },
  {
    name: 'Maîtres Peintres ICDD',
    role: 'Spécialistes Enduits, Stucs & Finitions Gold',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    bio: 'Experts en patines dorées, textures en relief et application d’enduits décoratifs nobles.'
  },
  {
    name: 'Équipe Conseil Nuancier & Devis',
    role: 'Conseillers Décoration & Métré Mural',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    bio: 'À votre écoute du lundi au samedi au +243 897504570 pour établir votre devis personnalisé.'
  }
];

