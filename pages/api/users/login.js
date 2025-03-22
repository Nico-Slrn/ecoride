import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "db.json");

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { email, motdepasse, pseudo } = req.body;

  if (!email || !motdepasse) {
    return res.status(400).json({ error: "Email et mot de passe requis." });
  }

  const rawData = fs.readFileSync(dbPath);
  const data = JSON.parse(rawData);

  let utilisateur = data.utilisateurs.find((u) => u.email === email);

  if (utilisateur) {
    if (utilisateur.motdepasse !== motdepasse) {
      return res.status(401).json({ error: "Mot de passe incorrect." });
    }
  } else {
    // Création d'un nouvel utilisateur
    const nouvelUtilisateur = {
      id: data.utilisateurs.length + 1,
      pseudo: pseudo || "Nouvel utilisateur",
      email,
      motdepasse,
      role: "utilisateur",
    };

    data.utilisateurs.push(nouvelUtilisateur);
    utilisateur = nouvelUtilisateur;

    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  }

  res.status(200).json({
    message: "Connexion réussie",
    utilisateur: {
      id: utilisateur.id,
      pseudo: utilisateur.pseudo,
      email: utilisateur.email,
    },
    token: "simule-token-user-" + utilisateur.id,
  });
}
