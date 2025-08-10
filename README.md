# Portail Résultats UCC

## Structure du projet

- `index.html` : Page d'accueil
- `resultats.html` : Liste des résultats avec filtres et recherche
- `details.html` : Détail d'un étudiant (paramètre `?id=matricule`)
- `stats.html` : Statistiques globales des résultats
- `admin/admin.html` : Interface d'upload PDF
- `admin/pdf-to-json.py` : Script Python pour convertir PDF en JSON
- `assets/css/style.css` : Styles CSS
- `assets/js/main.js` : Scripts JS pour pages principales
- `assets/js/details.js` : Script JS pour détails étudiant
- `assets/data/resultats.json` : Données JSON des résultats (généré via Python)
- `uploads/resultats-ucc-2025.pdf` : PDF source des résultats

## Déploiement

- Placer le PDF dans `uploads/`
- Lancer `pdf-to-json.py` pour générer `resultats.json`
- Ouvrir les pages HTML dans un serveur local (ex: VSCode Live Server)
- Utiliser la page admin pour uploader / simuler l'upload

## Technologies

- HTML5, CSS3 (Poppins)
- JavaScript ES6+
- Python + pdfplumber (pour extraction PDF)
