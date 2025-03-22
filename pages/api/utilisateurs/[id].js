// pages/api/utilisateurs/[id].js
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "db.json");

export default function handler(req, res) {
  const {
    query: { id },
  } = req;

  const rawData = fs.readFileSync(dbPath);
  const data = JSON.parse(rawData);

  const utilisateur = data.utilisateurs.find((u) => u.id === parseInt(id));

  if (!utilisateur) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }

  res.status(200).json({
    id: utilisateur.id,
    pseudo: utilisateur.pseudo,
    email: utilisateur.email,
    role: utilisateur.role || "utilisateur",
  });
}
