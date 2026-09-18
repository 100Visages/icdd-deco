import { Project, ShopProduct, ServiceItem, DecorOffer } from '../types';
import { ICDD_PROJECTS, RealisationPhotoItem } from '../data/projects';

export const ICDD_WHATSAPP_PHONE = '243897504570';

/**
 * Returns an absolute, publicly accessible HTTP(S) URL for an image.
 * This ensures WhatsApp unfurls/displays the image or allows the recipient
 * to tap and immediately view the full-resolution photo in their chat.
 */
export function getAbsoluteImageUrl(imageSrc?: string): string {
  if (!imageSrc) return '';

  // If already an absolute URL (e.g. Unsplash, external CDN)
  if (imageSrc.startsWith('http://') || imageSrc.startsWith('https://')) {
    return imageSrc;
  }

  // If running in browser, prepend current site origin
  if (typeof window !== 'undefined' && window.location?.origin) {
    const origin = window.location.origin.replace(/\/$/, '');
    const cleanPath = imageSrc.startsWith('/') ? imageSrc : `/${imageSrc}`;
    return `${origin}${cleanPath}`;
  }

  return imageSrc;
}

/**
 * Opens WhatsApp in a new browser tab with the encoded message
 */
export function openWhatsAppChat(message: string): void {
  const encodedText = encodeURIComponent(message);
  window.open(`https://wa.me/${ICDD_WHATSAPP_PHONE}?text=${encodedText}`, '_blank');
}

/**
 * WhatsApp message for a specific Realisation Photo
 */
export function buildRealisationPhotoWhatsAppMessage(photo: RealisationPhotoItem): string {
  const photoUrl = getAbsoluteImageUrl(photo.image);
  const servicesList = photo.services && photo.services.length > 0 
    ? photo.services.join(', ') 
    : 'Finitions intérieures d’excellence';

  const lines = [
    `Bonjour ICDD,`,
    `Je suis très intéressé(e) par cette réalisation et je souhaite obtenir plus d'informations et un devis :`,
    ``,
    `• Décor / Thème : ${photo.mainCategory}`,
    `• Lieu : ${photo.location}`,
    `• Prestations : ${servicesList}`,
    photoUrl ? `• 📸 Photo du décor qui m'intéresse :\n${photoUrl}` : null,
    ``,
    `Pouvez-vous me contacter pour me donner des précisions et convenir d’une visite ou d’une estimation pour mon espace ? Merci !`
  ];

  return lines.filter(line => line !== null).join('\n');
}

/**
 * WhatsApp message for an entire Project / Chantier
 */
export function buildProjectWhatsAppMessage(project: Project, specificImageUrl?: string): string {
  const activeImage = specificImageUrl || project.coverImage;
  const photoUrl = getAbsoluteImageUrl(activeImage);

  const lines = [
    `Bonjour ICDD,`,
    `Je souhaite avoir plus d'informations et un devis pour cette réalisation :`,
    ``,
    `• Projet : "${project.title}"`,
    `• Formule : ${project.category || 'Architecture d’intérieur'}`,
    `• Lieu du chantier : ${project.location}`,
    project.startingPrice ? `• Budget indicatif : Dès ${project.startingPrice} $` : null,
    photoUrl ? `• 📸 Photo du décor sélectionné :\n${photoUrl}` : null,
    ``,
    `Pouvez-vous me renseigner pour réaliser ce style chez moi à Kinshasa ?`
  ];

  return lines.filter(line => line !== null).join('\n');
}

/**
 * WhatsApp message for Quote Estimator (Devis)
 */
export function buildQuoteWhatsAppMessage(params: {
  selectedOffer: DecorOffer;
  wallArea: number;
  roomType: string;
  materialsIncluded: string[];
  estimatedBudgetMin: number;
  estimatedBudgetMax: number;
  clientName?: string;
  clientPhone?: string;
  clientMessage?: string;
  commune?: string;
  preferredDate?: string;
  referenceId?: string;
  inspirationPhotoUrl?: string;
}): string {
  const {
    selectedOffer,
    wallArea,
    roomType,
    materialsIncluded,
    estimatedBudgetMin,
    estimatedBudgetMax,
    clientName,
    clientPhone,
    clientMessage,
    commune,
    preferredDate,
    referenceId,
    inspirationPhotoUrl,
  } = params;

  // Fallback to sample photo if no inspiration photo provided
  let photoUrl = inspirationPhotoUrl;
  if (!photoUrl) {
    const sample = ICDD_PROJECTS.find(p => p.category === selectedOffer) || ICDD_PROJECTS[0];
    if (sample?.coverImage) {
      photoUrl = getAbsoluteImageUrl(sample.coverImage);
    }
  } else {
    photoUrl = getAbsoluteImageUrl(photoUrl);
  }

  const finishesText = materialsIncluded.length > 0 
    ? materialsIncluded.join(', ')
    : 'Finitions professionnelles adaptées';

  const lines = [
    `Bonjour ICDD,`,
    referenceId ? `Je confirme ma demande de devis [Réf : ${referenceId}] :` : `Je souhaite obtenir un devis pour mes murs :`,
    ``,
    `• Formule choisie : ${selectedOffer}`,
    `• Surface murale : ${wallArea} m²`,
    `• Espace : ${roomType}${commune ? ` (${commune})` : ''}`,
    `• Finitions & effets : ${finishesText}`,
    `• Budget matériaux estimé : ${estimatedBudgetMin} $ – ${estimatedBudgetMax} $`,
    clientName ? `• Nom : ${clientName}` : null,
    clientPhone ? `• WhatsApp : ${clientPhone}` : null,
    preferredDate ? `• Date souhaitée : ${preferredDate}` : null,
    photoUrl ? `\n📸 Photo / Référence du décor souhaité :\n${photoUrl}\n` : null,
    clientMessage ? `• Précisions : ${clientMessage}` : null,
    ``,
    `Merci de me contacter pour affiner ce projet et planifier une visite technique.`
  ];

  return lines.filter(line => line !== null).join('\n');
}

/**
 * WhatsApp message for Shop Product
 */
export function buildShopProductWhatsAppMessage(product: ShopProduct): string {
  const photoUrl = getAbsoluteImageUrl(product.image);

  const lines = [
    `Bonjour ICDD,`,
    `Je souhaite commander ou avoir des détails sur ce produit du Shop :`,
    ``,
    `• Article : ${product.name}`,
    `• Catégorie : ${product.category}`,
    `• Prix indicatif : ${product.priceDisplay}`,
    `• Référence : ${product.id}`,
    photoUrl ? `• 📸 Photo du produit / matériau :\n${photoUrl}` : null,
    ``,
    `Pourriez-vous me renseigner sur la disponibilité et la livraison à Kinshasa ? Merci !`
  ];

  return lines.filter(line => line !== null).join('\n');
}

/**
 * WhatsApp message for Service Item
 */
export function buildServiceWhatsAppMessage(service: ServiceItem): string {
  const photoUrl = getAbsoluteImageUrl(service.image);

  const lines = [
    `Bonjour ICDD,`,
    `Je souhaite des informations sur votre prestation : "${service.title}" (${service.tag}).`,
    photoUrl ? `\n📸 Découvrir la réalisation en image :\n${photoUrl}\n` : null,
    `Pouvez-vous me renseigner sur les modalités d'intervention à Kinshasa ? Merci !`
  ];

  return lines.filter(line => line !== null).join('\n');
}
