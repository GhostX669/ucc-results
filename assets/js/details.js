document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const matricule = params.get('id');
  const container = document.getElementById('studentDetails');

  if (!matricule) {
    container.innerHTML = '<p>Matricule non spécifié dans l’URL.</p>';
    return;
  }

  try {
    const response = await fetch('assets/data/resultats.json');
    if (!response.ok) throw new Error('Erreur chargement JSON');
    const data = await response.json();

    const student = data.find(e => e.matricule === matricule);
    if (!student) {
      container.innerHTML = '<p>Étudiant introuvable.</p>';
      return;
    }

    container.innerHTML = `
      <article class="card ${student.resultat}">
        <h2>${student.nom}</h2>
        <p><strong>Matricule:</strong> ${student.matricule}</p>
        <p><strong>Résultat:</strong> ${student.resultat.charAt(0).toUpperCase() + student.resultat.slice(1)}</p>
        ${student.resultat === 'renvoye' && student.cause ? `<p><strong>Cause du renvoi:</strong> ${student.cause}</p>` : ''}
        ${student.resultat === 'reussi&renvoye' && student.cause ? `<p><strong>Cause du renvoi:</strong> ${student.cause}</p>` : ''}
        <br>
        <a href="https://ghostx669.github.io/ucc-results/uploads/resultats-ucc-2025.pdf" 
   target="_blank" class="btn">
  📄 Voir mon relevé en PDF
</a>

        <br>
        <a href="resultats.html" class="btn">⬅ Retour aux résultats</a>
        <br>
        <a href="../index.html" class="btn">⬅ Retour à laccueil</a>
      </article>
    `;
    
  } catch (error) {
    container.innerHTML = '<p>Erreur lors du chargement des détails.</p>';
    console.error(error);
  }
});
