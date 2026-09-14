import { ServiceItem } from '../types';
import { ICDD_ASSETS } from './projects';

export const ICDD_SERVICES: ServiceItem[] = [
  {
    id: 'architecture-interieure',
    title: 'Architecture intérieure',
    tag: 'Conception & Espace',
    shortDesc: 'Conception et aménagement des espaces intérieurs selon les besoins et le style de vie du client.',
    fullDesc: 'Nous redéfinissons les volumes, optimisons la circulation et créons des plans d’aménagement 2D/3D sur-mesure. Du décloisonnement à la restructuration complète des pièces, nous sculptons votre habitat pour allier fonctionnalité, confort et esthétique contemporaine.',
    iconName: 'Compass',
    image: ICDD_ASSETS.project7,
    points: [
      'Étude volumétrique et optimisation des espaces',
      'Plans d’agencement 2D & modélisation 3D photoréaliste',
      'Sélection harmonieuse des matériaux nobles',
      'Suivi rigoureux et coordination de chantier'
    ]
  },
  {
    id: 'decoration-interieure',
    title: 'Décoration intérieure',
    tag: 'Ambiances & Élégance',
    shortDesc: 'Création d’ambiances élégantes et harmonieuses pour maisons, appartements, bureaux et espaces de prestige.',
    fullDesc: 'L’art de composer avec la lumière, les textures et les couleurs. Nous concevons des atmosphères uniques adaptées à votre personnalité : ambiances épurées contemporaines, chaleur des matières nobles, ou raffinement Haute Couture avec patines et dorures.',
    iconName: 'Sparkles',
    image: ICDD_ASSETS.project2,
    points: [
      'Création de planches d’ambiance et nuanciers sur mesure',
      'Habillage mural d’exception (stuc, velours minéral, reliefs 3D)',
      'Harmonie chromatique et mise en scène lumineuse',
      'Accompagnement dans le choix du mobilier et des accessoires'
    ]
  },
  {
    id: 'staff-plafonds',
    title: 'Staff & plafonds',
    tag: 'Plafonds & Ornements',
    shortDesc: 'Réalisation de staffs, plafonds décoratifs, moulures, corniches et éléments sculptés sur mesure.',
    fullDesc: 'Spécialité historique et signature d’excellence d’ICDD. Nos maîtres staffeurs conçoivent et posent des faux plafonds suspendus avec gorges lumineuses LED intégrées, corniches d’ornement, rosaces raffinées et cimaises murales pour magnifier chaque pièce.',
    iconName: 'Layers',
    image: ICDD_ASSETS.sp2,
    points: [
      'Plafonds décoratifs à niveaux multiples et corniches intégrées',
      'Gorges lumineuses dissimulées pour rétroéclairage LED',
      'Moulures, rosaces et encadrements classiques ou modernes',
      'Matériaux de staff haute densité, incombustibles et durables'
    ]
  },
  {
    id: 'peinture-finition',
    title: 'Peinture & finition',
    tag: 'Haute Précision',
    shortDesc: 'Travaux de peinture et finitions soignées pour donner aux espaces leur aspect final parfait.',
    fullDesc: 'Une préparation méticuleuse des supports et des applications sans raccords visibles. Nous maîtrisons l’ensemble des finitions : peintures veloutées dépolluantes, laques satinées, enduits à la chaux polis, stuc vénitien et touches dorées subtiles.',
    iconName: 'Paintbrush',
    image: ICDD_ASSETS.project7,
    points: [
      'Préparation et lissage des murs au millimètre près',
      'Peintures velours, satinées, mates lavables écologiques',
      'Enduits texturés, effets stuc marbré et patines nobles',
      'Protection intégrale des sols, plinthes et menuiseries'
    ]
  },
  {
    id: 'amenagement-sur-mesure',
    title: 'Cuisines, Portes & Menuiserie',
    tag: 'Cuisines & Portes',
    shortDesc: 'Conception et fabrication sur mesure de cuisines contemporaines, blocs-portes isophoniques et menuiseries intérieures.',
    fullDesc: 'Chaque recoin de votre intérieur est valorisé avec du mobilier intégré et des menuiseries contemporaines conçues sur-mesure dans nos ateliers : cuisines équipées aux lignes épurées, blocs-portes intérieurs acoustiques, habillages muraux et séparations de prestige.',
    iconName: 'LayoutGrid',
    image: ICDD_ASSETS.porte1,
    points: [
      'Portes intérieures modernes (affleurantes, vantaux pleins, poignées design)',
      'Cuisines contemporaines équipées avec plans de travail nobles',
      'Menuiserie sur mesure fabriquée dans nos ateliers à Kinshasa',
      'Quincaillerie haut de gamme avec amortisseurs silencieux'
    ]
  },
  {
    id: 'conseil-accompagnement',
    title: 'Conseil & accompagnement',
    tag: 'Clé en Main',
    shortDesc: 'Accompagnement personnalisé du client depuis l’idée initiale jusqu’à la livraison finale.',
    fullDesc: 'Nous sommes à vos côtés à chaque étape de votre projet. Nous écoutons vos désirs, évaluons vos contraintes budgétaires, établissons un métré rigoureux et garantissons le respect des délais et des plus hauts standards de finition.',
    iconName: 'UserCheck',
    image: ICDD_ASSETS.project3,
    points: [
      'Visite technique sur site et métré précis à Kinshasa',
      'Devis transparent et détaillé sans surprise',
      'Conseils personnalisés sur le choix des matériaux et couleurs',
      'Garantie qualité et service après-livraison'
    ]
  }
];
