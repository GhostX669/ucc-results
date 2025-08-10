// Menu burger toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.navbar ul');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Chargement JSON
async function loadResults() {
  const response = await fetch('assets/data/resultats.json');
  if (!response.ok) throw new Error('Erreur chargement JSON');
  return await response.json();
}

// Affichage résultats
function displayResults(results, filter = 'all', search = '') {
  const container = document.getElementById('resultList');
  if (!container) return;
  container.innerHTML = '';

  const filtered = results.filter(r => {
    const matchFilter = filter === 'all' || r.resultat === filter;
    const searchLower = search.toLowerCase();
    const matchSearch =
      r.nom.toLowerCase().includes(searchLower) ||
      r.matricule.toLowerCase().includes(searchLower);
    return matchFilter && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = '<p>Aucun résultat trouvé.</p>';
    return;
  }

  filtered.forEach(student => {
    let causeInfo = '';
    if (student.resultat === 'renvoye' && student.cause) {
      causeInfo = `<p><strong>Cause du renvoi :</strong> ${student.cause}</p>`;
    }

    const card = document.createElement('article');
    card.className = 'card ' + student.resultat;
    card.tabIndex = 0;
    card.innerHTML = `
      <h3>${student.nom}</h3>
      <p><strong>Matricule :</strong> ${student.matricule}</p>
      <p><strong>Résultat :</strong> ${student.resultat.charAt(0).toUpperCase() + student.resultat.slice(1)}</p>
      ${causeInfo}
      <a href="details.html?id=${student.matricule}" class="btn-primary" aria-label="Voir détails de ${student.nom}">Détails</a>
    `;
    container.appendChild(card);
  });
}

// Initialisation résultats page
(async () => {
  try {
    window.allResults = await loadResults();

    // Afficher par défaut tous les résultats
    displayResults(window.allResults);

    // Active bouton filtre "Tous"
    const filterButtons = document.querySelectorAll('.filters button');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    const btnAll = document.querySelector('.filters button[data-filter="all"]');
    btnAll.classList.add('active');

    // Gestion clic filtres
    filterButtons.forEach(btn => {
      btn.addEventListener('click', e => {
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        const filter = btn.dataset.filter;
        const search = document.getElementById('searchInput').value;
        displayResults(window.allResults, filter, search);
      });
    });

    // Recherche temps réel
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        const activeBtn = document.querySelector('.filters button.active');
        const filter = activeBtn ? activeBtn.dataset.filter : 'all';
        displayResults(window.allResults, filter, e.target.value);
      });
    }
  } catch (err) {
    const container = document.getElementById('resultList');
    if (container) container.innerHTML = '<p>Erreur lors du chargement des résultats.</p>';
    console.error(err);
  }
})();
