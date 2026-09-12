export type NavTab = 'accueil' | 'realisations' | 'services' | 'shop' | 'contact';

export type RealisationCategory = 'Tous' | 'Appartements' | 'Chambres' | 'Bureaux' | 'Cuisines' | 'Portes' | 'Décoration' | 'Staff';

export type ShopCategory = 'Tous' | 'Peintures' | 'Portes' | 'Cuisines' | 'Matériaux';

export type DecorOffer = 
  | 'Décoration simple' 
  | 'Décoration classique' 
  | 'Décoration luxueuse' 
  | 'Décoration Gold' 
  | 'Décoration Top Modèle';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  area: number; // m² mural ou espace
  year: number;
  mainCategory: 'Appartements' | 'Chambres' | 'Bureaux' | 'Cuisines' | 'Portes' | 'Décoration' | 'Staff';
  category: DecorOffer;
  style: 'Moderne & Épuré' | 'Classique Élégant' | 'Luxe Contemporain' | 'Gold Prestige' | 'Haute Couture';
  budgetRange: '250 $ - 350 $' | '350 $ - 500 $' | '500 $ - 700 $' | '≥ 700 $';
  startingPrice: number; // in $
  description: string;
  fullDescription: string;
  coverImage: string;
  galleryImages: string[];
  services: string[]; // e.g. ['Décoration', 'Staff', 'Peinture', 'Éclairage', 'Mobilier']
  specs: {
    duration: string;
    wallSurface: string;
    finishType: string;
    materials: string[];
    lighting: string;
  };
  features: string[];
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  tag: string;
  image: string;
  points: string[];
}

export interface ShopProduct {
  id: string;
  name: string;
  category: 'Peintures' | 'Portes' | 'Cuisines' | 'Matériaux';
  shortDesc: string;
  description: string;
  priceDisplay: string;
  priceValue?: number;
  availability: 'Disponible' | 'En stock à Kinshasa' | 'Sur commande / Sur mesure';
  image: string;
  badge?: string;
  specs?: string[];
  whatsappMessage: string;
}

export interface QuoteFormData {
  selectedOffer: DecorOffer;
  wallArea: number; // m² espace mural
  roomType: 'Salon' | 'Chambre' | 'Bureau' | 'Appartement complet' | 'Espace Commercial';
  preferredFinish: string;
  materialsIncluded: string[];
  estimatedBudgetMin: number; // in $
  estimatedBudgetMax: number; // in $
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientMessage: string;
  preferredDate?: string;
}

export interface FilterState {
  category: string;
  style: string;
  budget: string;
  searchQuery: string;
}


