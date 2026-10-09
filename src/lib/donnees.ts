// Lecture des fichiers de data/ (YAML).
import { readFileSync } from 'node:fs';
import { load } from 'js-yaml';

const lire = <T>(fichier: string) =>
  load(readFileSync(`data/${fichier}`, 'utf8')) as T;

export interface Profil {
  nom: string;
  github: string;
  ville: string;
  orcid?: string;
  [cle: string]: unknown;
}
export interface Categorie {
  id: string;
  nom: string;
  description?: string;
  [cle: string]: unknown;
}
export interface Projet {
  depot: string;
  categorie: string;
  langage?: string;
  site?: string;
  description?: string;
  [cle: string]: unknown;
}
export interface Competence {
  id: string;
  nom: string;
  items: string[];
  [cle: string]: unknown;
}
export interface Cv {
  id: string;
  titre: string;
  langue: string;
  fichier: string;
  maj?: string;
  [cle: string]: unknown;
}

export const profil = lire<Profil>('profil.yml');
export const competences = lire<Competence[]>('competences.yml');
const projetsYml = lire<{ categories: Categorie[]; projets: Projet[] }>(
  'projets.yml',
);
export const categories = projetsYml.categories;
export const projets = projetsYml.projets;
export const cvYml = lire<{ source: string; cv: Cv[] }>('cv.yml');

export const urlDepot = (p: Projet) =>
  `https://github.com/${profil.github}/${p.depot}`;

export const projetsDe = (categorie: string) =>
  projets.filter((p) => p.categorie === categorie);
