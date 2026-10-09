// Langues du site : français (par défaut, à la racine), anglais (/en/)
// et malgache (/mg/).

export const langues = ['fr', 'en', 'mg'] as const;
export type Langue = (typeof langues)[number];
export const langueParDefaut: Langue = 'fr';

export const nomsLangues: Record<Langue, string> = {
  fr: 'Français',
  en: 'English',
  mg: 'Malagasy',
};

export function estLangue(l: unknown): l is Langue {
  return typeof l === 'string' && (langues as readonly string[]).includes(l);
}

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Préfixe d'une langue : '' pour le français, '/en' ou '/mg' sinon. */
export const prefixe = (lang: Langue) =>
  lang === langueParDefaut ? '' : `/${lang}`;

/** Adresse d'une page : chemin('en', '/projets/') → '/kportfolio/en/projets/'. */
export const chemin = (lang: Langue, page: string) =>
  `${base}${prefixe(lang)}${page}`;

/** Retire base et langue d'une adresse : '/kportfolio/en/cv/' → '/cv/'. */
export function sansLangue(adresse: string) {
  const sans = adresse.startsWith(base) ? adresse.slice(base.length) : adresse;
  const m = sans.match(/^\/(en|mg)(\/.*)?$/);
  return m ? (m[2] ?? '/') : sans || '/';
}

/**
 * Texte d'un champ dans une langue. Dans data/, la traduction se met à côté
 * du français : `nom` (français), `nom_en`, `nom_mg`. Sans traduction, le
 * français est utilisé.
 */
export function loc(objet: object, cle: string, lang: Langue): string {
  const o = objet as Record<string, unknown>;
  return String(o[`${cle}_${lang}`] ?? o[cle] ?? '');
}

type Textes = Record<string, string>;

const fr: Textes = {
  'nav.accueil': 'Accueil',
  'nav.projets': 'Projets',
  'nav.cv': 'CV',
  'nav.competences': 'Compétences',
  'nav.langue': 'Langue',
  'nav.menu': 'Ouvrir le menu',
  'accueil.projetsTitre': 'Projets',
  'accueil.projetsLien': 'Voir tous les projets',
  'accueil.cvTitre': 'Mon CV',
  'accueil.github': 'Mon profil GitHub',
  'projets.titre': 'Projets',
  'projets.depot': 'Dépôt',
  'projets.site': 'Site',
  'projets.nombre': '{n} projets',
  'cv.titre': 'CV',
  'cv.telecharger': 'Télécharger',
  'cv.bientot': 'Bientôt disponible',
  'cv.maj': 'Mis à jour {date}',
  'cv.source': 'Les CV sont générés dans le dépôt kcv.',
  'competences.titre': 'Compétences',
  'pied.code': 'fait avec Astro et quelques lignes de code',
  'meta.description': 'Portfolio de {nom} : projets, CV et compétences',
};

const en: Textes = {
  'nav.accueil': 'Home',
  'nav.projets': 'Projects',
  'nav.cv': 'Résumé',
  'nav.competences': 'Skills',
  'nav.langue': 'Language',
  'nav.menu': 'Open menu',
  'accueil.projetsTitre': 'Projects',
  'accueil.projetsLien': 'See all projects',
  'accueil.cvTitre': 'My résumé',
  'accueil.github': 'My GitHub profile',
  'projets.titre': 'Projects',
  'projets.depot': 'Repository',
  'projets.site': 'Website',
  'projets.nombre': '{n} projects',
  'cv.titre': 'Résumé',
  'cv.telecharger': 'Download',
  'cv.bientot': 'Coming soon',
  'cv.maj': 'Updated {date}',
  'cv.source': 'Résumés are generated in the kcv repository.',
  'competences.titre': 'Skills',
  'pied.code': 'made with Astro and a few lines of code',
  'meta.description': 'Portfolio of {nom}: projects, résumé and skills',
};

// Textes malgaches à faire relire par un locuteur natif.
const mg: Textes = {
  'nav.accueil': 'Fandraisana',
  'nav.projets': 'Tetikasa',
  'nav.cv': 'CV',
  'nav.competences': 'Fahaiza-manao',
  'nav.langue': 'Fiteny',
  'nav.menu': 'Sokafy ny menio',
  'accueil.projetsTitre': 'Tetikasa',
  'accueil.projetsLien': 'Hijery ny tetikasa rehetra',
  'accueil.cvTitre': 'Ny CV-ko',
  'accueil.github': 'Ny pejy GitHub-ko',
  'projets.titre': 'Tetikasa',
  'projets.depot': 'Repository',
  'projets.site': 'Tranokala',
  'projets.nombre': 'Tetikasa {n}',
  'cv.titre': 'CV',
  'cv.telecharger': 'Alaina',
  'cv.bientot': 'Tsy ho ela',
  'cv.maj': 'Havaozina {date}',
  'cv.source': 'Ao amin\'ny repository kcv no amboarina ny CV.',
  'competences.titre': 'Fahaiza-manao',
  'pied.code': 'natao tamin\'ny Astro sy andalana kaody vitsivitsy',
  'meta.description': 'Portfolio an\'i {nom}: tetikasa, CV ary fahaiza-manao',
};

const textes: Record<Langue, Textes> = { fr, en, mg };

/** Texte de l'interface ; le français sert de repli. */
export function traduire(
  lang: Langue,
  cle: string,
  valeurs: Record<string, string | number> = {},
) {
  const texte = textes[lang][cle] ?? fr[cle] ?? cle;
  return texte.replace(/\{(\w+)\}/g, (_, k) => String(valeurs[k] ?? ''));
}
