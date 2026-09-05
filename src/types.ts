export type NavTab = 'accueil' | 'portfolio' | 'agence' | 'contact';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  area: number; // m²
  year: number;
  category: 'Résidentiel' | 'Commercial' | 'Penthouse' | 'Rénovation Complexe';
  style: 'Minimaliste' | 'Contemporain' | 'Haussmannien' | 'Japandi';
  budgetRange: 'Sur Devis' | '100k - 200k€' | '200k - 400k€' | '> 400k€';
  description: string;
  fullDescription: string;
  coverImage: string;
  galleryImages: string[];
  specs: {
    duration: string;
    rooms: number;
    bathrooms: number;
    materials: string[];
    lighting: string;
  };
  features: string[];
  featured?: boolean;
}

export interface QuoteFormData {
  propertyType: 'Appartement' | 'Maison / Villa' | 'Espace Commercial' | 'Penthouse';
  surfaceArea: number; // m²
  projectScope: 'Rénovation Complète' | 'Design & Furnishing' | 'Aménagement de Pièce' | 'Consultation 3D';
  preferredStyle: 'Minimaliste' | 'Contemporain' | 'Haussmannien' | 'Japandi' | 'Libre';
  materials: string[];
  estimatedBudgetMin: number;
  estimatedBudgetMax: number;
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
