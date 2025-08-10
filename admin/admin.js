document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const file = document.getElementById("pdfFile").files[0];
  if (!file) return;
  document.getElementById("statusMessage").textContent =
    "Fichier sélectionné : " + file.name + " (conversion à faire avec le script Python)";
});
