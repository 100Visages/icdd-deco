export type NavTab = 'accueil' | 'portfolio' | 'agence' | 'contact';

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
  category: DecorOffer;
  style: 'Moderne & Épuré' | 'Classique Élégant' | 'Luxe Contemporain' | 'Gold Prestige' | 'Haute Couture';
  budgetRange: '250 $ - 350 $' | '350 $ - 500 $' | '500 $ - 700 $' | '≥ 700 $';
  startingPrice: number; // in $
  description: string;
  fullDescription: string;
  coverImage: string;
  galleryImages: string[];
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

