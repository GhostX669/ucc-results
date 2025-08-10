async function loadResults() {
  const response = await fetch("assets/data/resultats.json");
  return await response.json();
}
