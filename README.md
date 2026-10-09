# kportfolio

Portfolio de Kevin Bosirany Orlando : projets, CV et compétences, en
français, anglais et malgache.

Site statique construit avec [Astro](https://astro.build) et Tailwind CSS,
publié sur GitHub Pages : <https://kbosirany.github.io/kportfolio/>

## Voir le site en local

Avec Docker (rien d'autre à installer) :

```sh
docker compose up
```

puis ouvrir <http://localhost:4321/kportfolio/>. Sans Docker : `npm ci`
puis `npm run dev`.

## Où modifier quoi

| Je veux changer…                         | Fichier                    |
|------------------------------------------|----------------------------|
| Nom, titre, présentation, ORCID          | `data/profil.yml`          |
| Ajouter un projet ou une catégorie       | `data/projets.yml`         |
| Compétences                              | `data/competences.yml`     |
| CV (liste, dates) et PDF                 | `data/cv.yml`, `public/cv/`|
| Textes de l'interface dans chaque langue | `src/lib/i18n.ts`          |
| Couleurs et polices                      | haut de `src/styles/global.css` |

## Langues (français, anglais, malgache)

Français à la racine (`/`), anglais sous `/en/`, malgache sous `/mg/`.

- **Interface** : `src/lib/i18n.ts`, un bloc par langue.
- **Fichiers de `data/`** : la traduction se met à côté du français avec le
  suffixe `_en` ou `_mg`, par exemple `description`, `description_en`,
  `description_mg`. Sans traduction, le français est affiché.

Les textes malgaches sont à faire relire.

## Ajouter un projet

Dans `data/projets.yml`, ajouter une ligne dans `projets` :

```yaml
- { depot: kmonpaquet, categorie: paquets-r, langage: R,
    site: "https://kbosirany.github.io/kmonpaquet/",
    description: Ce que fait le projet. }
```

`npm run check` vérifie que la catégorie existe et qu'il n'y a pas de doublon.

## CV

Les CV sont produits dans le dépôt [kcv](https://github.com/kbosirany/kcv).
Pour les publier ici : copier les PDF à jour dans `public/cv/` (noms listés
dans `data/cv.yml`). Un CV dont le fichier manque s'affiche « bientôt
disponible ». Le lien à mettre sur le CV est celui du site.

## Mise en ligne (GitHub Pages)

Une fois : *Settings > Pages > Source = GitHub Actions*. Ensuite, chaque
modification poussée sur `main` est publiée par
`.github/workflows/deploiement.yml`. Les autres branches et les pull requests
sont seulement vérifiées (`verification.yml`).

## Structure

```
data/         Contenu (YAML) : profil, projets, compétences, CV
public/cv/    PDF des CV
scripts/      verifier.mjs : cohérence de data/
src/lib/      i18n.ts (langues, textes), donnees.ts (lecture de data/)
src/vues/     Contenu de chaque page, partagé entre les trois langues
src/pages/    Routes : racine (fr) et [lang]/ (en, mg)
```
