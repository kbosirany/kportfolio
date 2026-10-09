// Vérifie la cohérence de data/ : catégories connues, fichiers de CV présents.
import { existsSync, readFileSync } from 'node:fs';
import { load } from 'js-yaml';

const lire = (f) => load(readFileSync(`data/${f}`, 'utf8'));
const { categories, projets } = lire('projets.yml');
const ids = new Set(categories.map((c) => c.id));
let erreurs = 0;

for (const p of projets) {
  if (!ids.has(p.categorie)) {
    console.error(`✗ ${p.depot} : catégorie inconnue « ${p.categorie} »`);
    erreurs++;
  }
}
const doublons = projets.map((p) => p.depot).filter((d, i, t) => t.indexOf(d) !== i);
for (const d of new Set(doublons)) {
  console.error(`✗ ${d} : projet en double`);
  erreurs++;
}
for (const cv of lire('cv.yml').cv) {
  if (!existsSync(`public/${cv.fichier}`)) {
    console.warn(`! ${cv.fichier} absent : affiché « bientôt disponible »`);
  }
}
if (erreurs) process.exit(1);
console.log(`✓ ${projets.length} projets, ${categories.length} catégories`);
