import json
import pdfplumber

data = []

with pdfplumber.open("uploads/resultats-ucc-2025.pdf") as pdf:
    for page in pdf.pages:
        text = page.extract_text()
        lines = text.split("\n")
        for line in lines:
            parts = line.strip().split("\t")
            if len(parts) >= 3:
                result = {
                    "nom": parts[0],
                    "matricule": parts[1],
                    "resultat": parts[2].lower()
                }
                if result["resultat"] == "renvoye" and len(parts) > 3:
                    result["cause"] = parts[3]
                data.append(result)

with open("../assets/data/resultats.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ Conversion terminée. Données enregistrées dans resultats.json")
