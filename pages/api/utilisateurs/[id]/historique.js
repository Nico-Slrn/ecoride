export default function handler(req, res) {
  const { id } = req.query;
  const rawData = fs.readFileSync(dbPath);
  const data = JSON.parse(rawData);

  const utilisateur = data.utilisateurs.find((u) => u.id === parseInt(id));
  if (!utilisateur) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }

  if (req.method === "GET") {
    return res.status(200).json({ historique: utilisateur.historique || [] });
  }

  if (req.method === "DELETE") {
    const { trajetId } = req.body;

    utilisateur.historique = utilisateur.historique.filter(
      (t) => t.id !== trajetId
    );

    const index = data.covoiturages.findIndex((t) => t.id === trajetId);
    if (index !== -1) {
      data.covoiturages.splice(index, 1);
    }

    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    return res.status(200).json({ message: "Trajet annulé." });
  }

  return res.status(405).json({ error: "Méthode non autorisée" });
}
