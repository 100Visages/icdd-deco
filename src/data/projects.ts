import { Project } from '../types';

export const ICDD_PROJECTS: Project[] = [
  {
    id: 'villa-riviera',
    title: 'Projet Villa Riviera',
    subtitle: 'Rénovation d’exception & design épuré',
    location: 'Paris, France',
    area: 180,
    year: 2026,
    category: 'Résidentiel',
    style: 'Minimaliste',
    budgetRange: '> 400k€',
    description: "Rénovation complète d'un espace de 180m² alliant matériaux nobles et éclairage architectural.",
    fullDescription: "Création d'une résidence contemporaine baignée de lumière naturelle. L'agence ICDD a repensé l'intégralité des volumes pour fluidifier la circulation entre le grand salon, la suite parentale et la cuisine sur-mesure. Emploi de chêne massif blanchi, de dalles de travertine sculptées et de luminaires intégrés à gorges lumineuses.",
    coverImage: '/src/assets/images/icdd_luxury_interior_1786542633755.jpg',
    galleryImages: [
      '/src/assets/images/icdd_luxury_interior_1786542633755.jpg',
      '/src/assets/images/villa_riviera_1786542646750.jpg',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80'
    ],
    specs: {
      duration: '7 Mois',
      rooms: 4,
      bathrooms: 2,
      materials: ['Chêne Clair Suédois', 'Travertin Polipietra', 'Laiton Brossé', 'Verre Extra-Clair'],
      lighting: 'Scénographie lumineuse sur-mesure DALI, bandes LED à gorges invisibles'
    },
    features: [
      'Menuiserie intégrée du sol au plafond sur-mesure',
      'Climatisation réversible gainée invisible',
      'Isolation acoustique haute performance',
      'Domotique KNX intégrée (éclairage, stores, son, sécurité)'
    ],
    featured: true
  },
  {
    id: 'haussmann-reborn',
    title: 'Haussmann Reborn',
    subtitle: 'Sous les moulures, le minimalisme contemporain',
    location: 'Paris 8ème, France',
    area: 210,
    year: 2025,
    category: 'Haussmannien' as any, // Cast as category
    style: 'Haussmannien',
    budgetRange: '200k - 400k€',
    description: "Harmonie subtile entre l'ornementation d'époque XIXe et un mobilier sculpturaux minimaliste.",
    fullDescription: "Restauration minutieuse des parquet Point de Hongrie, des dorures à la feuille et des moulures d'origine, contrastées avec une cuisine monobloc en marbre de Carrare et un claustra en verre strié électrochrome.",
    coverImage: '/src/assets/images/haussmann_reborn_1786542659834.jpg',
    galleryImages: [
      '/src/assets/images/haussmann_reborn_1786542659834.jpg',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80'
    ],
    specs: {
      duration: '6 Mois',
      rooms: 5,
      bathrooms: 3,
      materials: ['Parquet Point de Hongrie', 'Marbre de Carrare', 'Acier Noir Sablé', 'Laine Vierge'],
      lighting: 'Lustres modulaires en verre soufflé et spots encastrés anti-éblouissement'
    },
    features: [
      'Restauration à l’identique par des maîtres artisans d’art',
      'Bibliothèque courbe intégrée avec panneau coulissant secret',
      'Espace cave à vin réfrigérée vitrée sur-mesure'
    ],
    featured: false
  },
  {
    id: 'penthouse-etoile',
    title: 'Penthouse Étoile',
    subtitle: 'Ligne d’horizon panoramique & luxe chaleureux',
    location: 'Neuilly-sur-Seine, France',
    area: 260,
    year: 2025,
    category: 'Penthouse',
    style: 'Contemporain',
    budgetRange: '> 400k€',
    description: "Aménagement haut de gamme d'un dernier étage avec terrasse paysagée suspendue à 360°.",
    fullDescription: "ICDD a conçu cet intérieur avec une palette minérale douce et un mobilier aux formes organiques enveloppantes. Les baies vitrées toute hauteur s'ouvrent sur un rooftop verdoyant.",
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80'
    ],
    specs: {
      duration: '9 Mois',
      rooms: 6,
      bathrooms: 4,
      materials: ['Noyer d’Amérique', 'Pierre de Ceppo di Gré', 'Bronze Brossé', 'Cuir Italien'],
      lighting: 'Contrôle dynamique de température de couleur (Casambi Circadien)'
    },
    features: [
      'Suite master de 60m² avec dressing double sur-mesure',
      'Cheminée à l’éthanol intégrée au mur de pierre',
      'Bassin de relaxation chauffé sur le toit-terrasse'
    ],
    featured: false
  },
  {
    id: 'maison-japandi',
    title: 'Maison Serenite Japandi',
    subtitle: 'Équilibre zen, bois brut et finitions artisanales',
    location: 'Cannes, France',
    area: 145,
    year: 2026,
    category: 'Résidentiel',
    style: 'Japandi',
    budgetRange: '100k - 200k€',
    description: "Un havre de paix épuré où le minimalisme scandinave rencontre la sérénité du design japonais.",
    fullDescription: "Chaque centimètre carré est pensé pour apporter le calme. Béton ciré aux tons sable, cloisons amovibles Shoji réinterprétées en chêne et verre fumé, assises basses en tissus bouclés.",
    coverImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80'
    ],
    specs: {
      duration: '4 Mois',
      rooms: 3,
      bathrooms: 2,
      materials: ['Chêne Brute Huilé', 'Béton Ciré Chaux', 'Raphia et Lin Brut', 'Céramique Artisanal'],
      lighting: 'Suspensions suspendues en papier Washi et appliques indirectes'
    },
    features: [
      'Jardin intérieur zen avec bonsaï centenaire',
      'Baignoire îlot façon Ofuro japonais en cèdre',
      'Mobilier sur-mesure assemblé sans clous apparents'
    ],
    featured: false
  },
  {
    id: 'boutique-marais',
    title: 'Hôtel Particulier & Showroom',
    subtitle: 'Espace commercial d’exception et galerie d’art',
    location: 'Paris Le Marais, France',
    area: 320,
    year: 2025,
    category: 'Commercial',
    style: 'Contemporain',
    budgetRange: '> 400k€',
    description: "Transformation d'un monument historique en showroom de haute joaillerie et salon privé.",
    fullDescription: "ICDD a conçu un écrin luxueux mêlant vitrines suspendues en laiton doré, draperies en velours de soie et arcs architecturaux rétro-éclairés.",
    coverImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=80'
    ],
    specs: {
      duration: '8 Mois',
      rooms: 8,
      bathrooms: 4,
      materials: ['Velours de Soie', 'Laiton Miroir', 'Marbre Nero Marquina', 'Chêne Brûlé Shou Sugi Ban'],
      lighting: 'Éclairage muséographique réglable haute précision CRI > 98'
    },
    features: [
      'Salon VIP confidentiel insonorisé',
      'Vitrines sécurisées domotisées à effacement optique',
      'Système audio spatialisé invisible'
    ],
    featured: false
  }
];

export const TEAM_MEMBERS = [
  {
    name: 'Isabelle Chantal-Dupré',
    role: 'Fondatrice & Directrice de Création',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    bio: '20 ans d’expertise dans l’architecture d’intérieur de luxe à Paris, Londres et New York.'
  },
  {
    name: 'Charles De la Tour',
    role: 'Architecte d’Intérieur Senior',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    bio: 'Spécialiste des restructurations haussmanniennes et des structures de verre contemporaines.'
  },
  {
    name: 'Elena Rostova',
    role: 'Designer Matériaux & Modélisation 3D',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    bio: 'Expertise en rendu photoréaliste et sourcing de pierres rares & essences de bois éco-responsables.'
  }
];
