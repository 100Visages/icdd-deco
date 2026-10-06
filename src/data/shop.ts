import { ShopProduct } from '../types';
import { ICDD_ASSETS } from './projects';
import { buildShopProductWhatsAppMessage, ICDD_WHATSAPP_PHONE } from '../utils/whatsapp';

export const ICDD_WHATSAPP_NUMBER = ICDD_WHATSAPP_PHONE;

export function getWhatsAppProductLink(product: ShopProduct): string {
  const base = `https://wa.me/${ICDD_WHATSAPP_NUMBER}?text=`;
  const text = encodeURIComponent(buildShopProductWhatsAppMessage(product));
  return `${base}${text}`;
}

export const ICDD_SHOP_PRODUCTS: ShopProduct[] = [
  // 1. PEINTURES
  {
    id: 'peinture-velours-prestige',
    name: 'Peinture Velours Minérale Haute Résistance',
    category: 'Peintures',
    shortDesc: 'Finition veloutée ultra soyeuse, lavable, formulation sans odeur et pigments haute tenue.',
    description: 'Peinture murale premium sélectionnée par ICDD pour les résidences d’exception. Offre un tendu exceptionnel, une couvrance maximale et une résistance remarquable aux frottements. Idéale pour salons et chambres.',
    priceDisplay: 'Prix au pot (15L) ou au m²',
    priceValue: 85,
    availability: 'En stock à Kinshasa',
    image: ICDD_ASSETS.r26,
    badge: 'Best-Seller Finition',
    specs: ['Conditionnement : Fût 15L / Seau 5L', 'Rendement : ~10 à 12 m²/L', 'Finition : Velours soyeux mat', 'Lessivable classe 1'],
    whatsappMessage: 'Bonjour ICDD, je souhaite commander la Peinture Velours Minérale Haute Résistance.'
  },
  {
    id: 'enduit-stuc-venitien',
    name: 'Enduit Stuc & Chaux Minérale Effet Marbré',
    category: 'Peintures',
    shortDesc: 'Enduit décoratif texturé pour effets de marbre, stuc vénitien et reliefs contemporains.',
    description: 'Composé de chaux naturelle et de poudres de marbre sélectionnées. Permet de réaliser des décors muraux spectaculaires avec des reflets subtils et une sensation minérale authentique.',
    priceDisplay: 'Sur devis / au m² posé',
    availability: 'Disponible',
    image: ICDD_ASSETS.r13,
    badge: 'Effet Luxe',
    specs: ['Texture : Pâte minérale onctueuse', 'Application : À la spatule inox', 'Aspect : Marbré brillant ou ciré', 'Respirant & naturel'],
    whatsappMessage: 'Bonjour ICDD, je souhaite un devis pour l’Enduit Stuc & Chaux Minérale Effet Marbré.'
  },
  {
    id: 'pigments-or-patine',
    name: 'Patine Or Nacrée & Vernis Doré pour Moulures',
    category: 'Peintures',
    shortDesc: 'Pigments or royal et patines de finition pour sublimer corniches de staff et boiseries.',
    description: 'Utilisée pour nos réalisations de la gamme Décoration Gold. Apporte cette touche lumineuse et prestigieuse sur les moulures, rosaces et encadrements muraux.',
    priceDisplay: '45 $ / flacon artisan',
    priceValue: 45,
    availability: 'En stock à Kinshasa',
    image: ICDD_ASSETS.r14,
    badge: 'Gamme Gold',
    specs: ['Finition : Or pâle ou Or royal', 'Utilisation : Moulures, corniches, boiseries', 'Séchage rapide', 'Ne ternit pas dans le temps'],
    whatsappMessage: 'Bonjour ICDD, je souhaite commander la Patine Or Nacrée pour moulures.'
  },

  // 2. PORTES (Réalisations Réelles ICDD)
  {
    id: 'porte-interieure-moderne-bois',
    name: 'Porte Intérieure Contemporaine & Bloc-Porte Acoustique',
    category: 'Portes',
    shortDesc: 'Bloc-porte contemporain sur mesure avec isolation acoustique, paumelles invisibles et finitions soignées.',
    description: 'Fabrication sur mesure dans nos ateliers de Kinshasa : vantaux pleins, rainurages modernes, huisseries assorties, serrures magnétiques silencieuses et ajustement millimétré sur votre chantier.',
    priceDisplay: 'À partir de 290 $ selon dimensions',
    priceValue: 290,
    availability: 'Sur commande / Sur mesure',
    image: ICDD_ASSETS.porte1,
    badge: 'Réalisation Réelle',
    specs: ['Fabrication sur mesure aux dimensions de vos baies', 'Serrure magnétique silencieuse', 'Charnières invisibles 3D réglables', 'Isolation acoustique renforcée'],
    whatsappMessage: 'Bonjour ICDD, je souhaite commander ou demander un devis pour la Porte Intérieure Contemporaine.'
  },
  {
    id: 'porte-design-lignes-epurees',
    name: 'Porte Design Contemporaine & Huisseries Affleurantes',
    category: 'Portes',
    shortDesc: 'Porte de séparation au design minimaliste avec lignes graphiques et quincaillerie haut de gamme.',
    description: 'Idéale pour sublimer les couloirs, chambres et bureaux de votre résidence. Résistante aux variations d’humidité et conçue pour un confort d’ouverture durable.',
    priceDisplay: 'À partir de 320 $ / unité',
    priceValue: 320,
    availability: 'Sur commande / Sur mesure',
    image: ICDD_ASSETS.porte2,
    badge: 'Chantier Réel',
    specs: ['Lignes graphiques contemporaines', 'Âme pleine isophonique', 'Finition laquée mate ou placage bois', 'Pose et réglages par nos menuisiers'],
    whatsappMessage: 'Bonjour ICDD, je souhaite un devis pour la Porte Design Contemporaine.'
  },
  {
    id: 'porte-prestige-grande-hauteur',
    name: 'Bloc-Porte de Prestige & Menuiserie d’Intérieur',
    category: 'Portes',
    shortDesc: 'Vantaux pleins, ferrures dissimulées et poignées contemporaines pour villas et appartements standing.',
    description: 'Conçue pour les intérieurs les plus exigeants de Kinshasa : intégration de chambranles épurés, étanchéité acoustique et esthétique intemporelle.',
    priceDisplay: 'Sur devis personnalisé',
    availability: 'Sur commande / Sur mesure',
    image: ICDD_ASSETS.porte3,
    badge: 'Luxe Contemporain',
    specs: ['Grande hauteur sous plafond disponible', 'Garnitures inox ou noir mat', 'Joint acoustique périphérique', 'Garantie qualité menuiserie ICDD'],
    whatsappMessage: 'Bonjour ICDD, je souhaite étudier un projet de Portes de Prestige.'
  },

  // 3. CUISINES
  {
    id: 'cuisine-moderne-epuree',
    name: 'Cuisine Contemporaine Épurée & Îlot Central',
    category: 'Cuisines',
    shortDesc: 'Agencement de cuisine moderne sur mesure avec façades anti-traces, îlot et gorges LED.',
    description: 'Conception complète de votre espace cuisine selon vos habitudes culinaires. Façades sans poignées avec système push-pull ou profil gorge, plans de travail en quartz ou pierre frittée résistante aux chocs et rayures.',
    priceDisplay: 'Étude & Devis 3D Gratuits',
    availability: 'Sur commande / Sur mesure',
    image: ICDD_ASSETS.cuisine1,
    badge: 'Réalisation Réelle',
    specs: ['Plans 3D immersifs fournis', 'Plans de travail : Quartz, Marbre, Granit', 'Électroménagers intégrés', 'Caissons hydrofuges haute densité'],
    whatsappMessage: 'Bonjour ICDD, je souhaite étudier un projet de Cuisine Contemporaine sur mesure.'
  },
  {
    id: 'facades-cuisine-renovation',
    name: 'Pack Rénovation Façades & Plans de Travail Cuisine',
    category: 'Cuisines',
    shortDesc: 'Modernisez votre cuisine existante en remplaçant façades, poignées et plan de travail.',
    description: 'Une solution économique et ultra efficace pour transformer totalement l’allure de votre cuisine en quelques jours seulement, sans casser la structure.',
    priceDisplay: 'À partir de 650 $ selon métré',
    priceValue: 650,
    availability: 'Disponible',
    image: ICDD_ASSETS.cuisine2,
    badge: 'Rénovation Rapide',
    specs: ['Prise de côtes à domicile', 'Large choix de coloris mats et texturés', 'Remplacement des charnières avec amortisseur', 'Délai d’exécution rapide'],
    whatsappMessage: 'Bonjour ICDD, je souhaite un devis pour le Pack Rénovation Façades de Cuisine.'
  },
  {
    id: 'ilot-central-rangement-ergonomique',
    name: 'Îlot Central & Meubles Bas Ergonomiques',
    category: 'Cuisines',
    shortDesc: 'Îlot convivial avec rangements doubles faces, plan débordant pour tabourets et éclairage d’accentuation.',
    description: 'Pièce maîtresse d’une cuisine moderne ouverte sur le salon. Conçu sur mesure pour accueillir un point de cuisson, un évier encastré ou un espace repas convivial.',
    priceDisplay: 'Sur devis sur-mesure',
    availability: 'Sur commande / Sur mesure',
    image: ICDD_ASSETS.cuisine3,
    badge: 'Cœur de Cuisine',
    specs: ['Rangements coulissants grande capacité', 'Prises encastrées escamotables', 'Éclairage d’ambiance sous plan', 'Matériaux résistants à l’humidité'],
    whatsappMessage: 'Bonjour ICDD, je souhaite commander un Îlot Central sur mesure pour ma cuisine.'
  },

  // 4. MATÉRIAUX & STAFF
  {
    id: 'corniche-staff-lumineuse',
    name: 'Corniche de Staff Sculptée pour Gorges LED',
    category: 'Matériaux',
    shortDesc: 'Corniche d’angle en plâtre staff armé spécialement profilée pour l’éclairage indirect.',
    description: 'Élément indispensable pour les plafonds design. Permet de dissimuler élégamment les bandeaux LED et de diffuser une lumière douce et rasante sur le plafond.',
    priceDisplay: '18 $ / mètre linéaire',
    priceValue: 18,
    availability: 'En stock à Kinshasa',
    image: ICDD_ASSETS.sp4,
    badge: 'Spécialité Staff',
    specs: ['Longueur standard : 2 mètres', 'Matériau : Plâtre de staff fibré haute résistance', 'Incombustible M0', 'Prêt à peindre après pose'],
    whatsappMessage: 'Bonjour ICDD, je souhaite commander des Corniches de Staff pour gorges LED.'
  },
  {
    id: 'cimaises-moulures-murales',
    name: 'Pack Baguettes & Cimaises Murales Classiques',
    category: 'Matériaux',
    shortDesc: 'Profilés décoratifs pour la réalisation de cadres muraux, boiseries et têtes de lit géométriques.',
    description: 'Apporte immédiatement du relief et du cachet aux murs lisses. Nos moulures en staff et polymère haute densité se découpent et se posent facilement pour créer des soubassements élégants.',
    priceDisplay: '12 $ / mètre linéaire',
    priceValue: 12,
    availability: 'En stock à Kinshasa',
    image: ICDD_ASSETS.sp7,
    badge: 'Classique & Chic',
    specs: ['Profils fins ou larges au choix', 'Collage haute adhérence sans vis', 'Peut recevoir toute peinture mate ou satinée', 'Garantie anti-fissure'],
    whatsappMessage: 'Bonjour ICDD, je souhaite commander des Cimaises et Moulures murales.'
  },
  {
    id: 'rosace-plafond-artisanale',
    name: 'Rosace Décorative de Plafond Sculptée Main',
    category: 'Matériaux',
    shortDesc: 'Rosace ornementale centrale en staff véritable pour suspension de lustre et luminaires.',
    description: 'Façonnée dans nos ateliers, chaque rosace est une pièce maîtresse pour habiller le point central de votre salon ou salle à manger au-dessus d’un lustre majestueux.',
    priceDisplay: 'À partir de 40 $ / pièce',
    priceValue: 40,
    availability: 'En stock à Kinshasa',
    image: ICDD_ASSETS.sp8,
    badge: 'Fait Main',
    specs: ['Diamètres disponibles : 45cm, 60cm, 80cm', 'Motifs : Feuilles d’acanthe, lignes modernes ou florales', 'Plâtre staff dense renforcé', 'Fixation sécurisée'],
    whatsappMessage: 'Bonjour ICDD, je souhaite commander une Rosace de Plafond en staff.'
  },

  // 5. MEUBLES (Fabrication & Agencement Sur Mesure ICDD)
  {
    id: 'meuble-tv-mural-luxe',
    name: 'Meuble TV Mural Suspendu & Panneau Rétroéclairé LED',
    category: 'Meubles',
    shortDesc: 'Meuble TV flottant sur mesure avec tasseaux décoratifs en bois, niches de rangement et ruban LED.',
    description: 'Conception et menuiserie haut de gamme par ICDD. Habillage mural avec tasseaux contemporains, meuble suspendu avec tiroirs invisibles push-to-open et passage de câbles totalement invisible. Dimensions ajustées à votre salon.',
    priceDisplay: 'À partir de 450 $ sur mesure',
    priceValue: 450,
    availability: 'Sur commande / Sur mesure',
    image: ICDD_ASSETS.r17,
    badge: 'Sur Mesure',
    specs: ['Finition : Chêne teinté, noir mat ou noyer', 'Rétroéclairage : LED indirect chaud 3000K', 'Passage de câbles dissimulé', 'Fixation murale haute sécurité'],
    whatsappMessage: 'Bonjour ICDD, je souhaite commander un Meuble TV Mural suspendu sur mesure.'
  },
  {
    id: 'dressing-encastre-prestige',
    name: 'Dressing Encastré & Armoire Modulaire Premium',
    category: 'Meubles',
    shortDesc: 'Agencement de dressing contemporain avec penderies éclairées, tiroirs feutrés et portes coulissantes ou battantes.',
    description: 'Optimisation complète de vos espaces chambres et suites parentales. Finitions nobles, étagères modulables, penderies à bascule et éclairage intérieur automatique à l’ouverture.',
    priceDisplay: 'Sur devis au mètre linéaire',
    availability: 'Sur commande / Sur mesure',
    image: ICDD_ASSETS.chambre2,
    badge: 'Agencement Luxe',
    specs: ['Structure : Panneaux haute densité hydrofuges', 'Système de fermeture soft-close amorti', 'Miroirs intégrés et éclairage LED', 'Conception 3D préalable incluse'],
    whatsappMessage: 'Bonjour ICDD, je souhaite un devis pour un Dressing Encastré sur mesure.'
  },
  {
    id: 'buffet-enfilade-design',
    name: 'Buffet Enfilade Design & Boiseries Cannelées',
    category: 'Meubles',
    shortDesc: 'Buffet bas pour salon ou salle à manger avec façades cannelées et plateau effet marbre.',
    description: 'Alliance parfaite de l’artisanat d’ébénisterie et des lignes contemporaines. Offre un volume de rangement généreux tout en constituant la pièce maîtresse décorative de votre pièce de réception.',
    priceDisplay: '580 $ / modèle standard',
    priceValue: 580,
    availability: 'Disponible',
    image: ICDD_ASSETS.r4,
    badge: 'Exclusivité',
    specs: ['Dimensions standard : 180cm ou 220cm', 'Façades rainurées faites main', 'Piétement laqué métal noir ou or', 'Plateau effet quartz ou marbre'],
    whatsappMessage: 'Bonjour ICDD, je souhaite commander le Buffet Enfilade Design.'
  },

  // 6. TABLES (Salles à Manger, Salons & Bureaux)
  {
    id: 'table-manger-marbre-prestige',
    name: 'Table à Manger Contemporaine Plateau Effet Marbre & Acier',
    category: 'Tables',
    shortDesc: 'Table de réception monumentale 8 à 12 personnes avec plateau céramique/marbre et piétement sculptural.',
    description: 'Création signature ICDD pour vos salles à manger de prestige. Plateau résistant aux chocs et aux taches avec chanfrein poli, soutenu par un piètement architectural géométrique.',
    priceDisplay: 'À partir de 650 $ selon dimensions',
    priceValue: 650,
    availability: 'Sur commande / Sur mesure',
    image: ICDD_ASSETS.r11,
    badge: 'Signature ICDD',
    specs: ['Capacité : 6, 8, 10 ou 12 convives', 'Plateau : Finition Calacatta blanc, Noir Marquina ou Granit', 'Piétement : Métal thermolaqué haute résistance', 'Facilité d’entretien exemplaire'],
    whatsappMessage: 'Bonjour ICDD, je souhaite commander la Table à Manger Plateau Effet Marbre.'
  },
  {
    id: 'table-basse-double-gigogne',
    name: 'Ensemble Tables Basses Gigognes Duo Rondes',
    category: 'Tables',
    shortDesc: 'Duo de tables basses rondes de salon en verre fumé, bois précieux et contours dorés.',
    description: 'Le complément indispensable de nos salons Décoration Luxueuse et Gold. Modulables, légères et élégantes, elles subliment le centre de votre espace détente devant vos canapés.',
    priceDisplay: '240 $ le set de 2',
    priceValue: 240,
    availability: 'En stock à Kinshasa',
    image: ICDD_ASSETS.r19,
    badge: 'Tendance Salon',
    specs: ['Set : Grande table Ø 80cm + Petite table Ø 60cm', 'Plateau : Verre trempé teinté ou marbre', 'Cerclage métal doré ou noir mat', 'Patin de protection pour carrelage et parquet'],
    whatsappMessage: 'Bonjour ICDD, je souhaite commander l’Ensemble Tables Basses Gigognes.'
  },
  {
    id: 'table-bureau-direction-luxe',
    name: 'Bureau de Direction Contemporain & Table de Conférence',
    category: 'Tables',
    shortDesc: 'Table de travail exécutive avec passe-câbles intégré, caisson latéral et finitions cuir/bois.',
    description: 'Conçue pour les dirigeants et espaces professionnels de standing à Kinshasa. Ergonomie soignée, large plateau de travail et intégration discrète des branchements électriques et réseau.',
    priceDisplay: 'Sur devis / Sur mesure',
    availability: 'Disponible',
    image: ICDD_ASSETS.bureau1,
    badge: 'Espace Direction',
    specs: ['Dimensions : 200x90cm ou 240x100cm', 'Boîtier connectique escamotable intégré', 'Plateau anti-rayures traitement mat', 'Caisson sécurisé avec serrure'],
    whatsappMessage: 'Bonjour ICDD, je souhaite commander un Bureau de Direction / Table de Conférence.'
  }
];
