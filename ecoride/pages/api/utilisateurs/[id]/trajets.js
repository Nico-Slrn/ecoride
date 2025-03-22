export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { id } = req.query;
  const { depart, arrivee, date, prix, vehicule } = req.body;

  if (!depart || !arrivee || !date || !prix || !vehicule) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  const rawData = fs.readFileSync(dbPath);
  const data = JSON.parse(rawData);

  const utilisateur = data.utilisateurs.find((u) => u.id === parseInt(id));
  if (!utilisateur) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }

  const nouveauTrajet = {
    id: data.covoiturages.length + 1,
    conducteurId: utilisateur.id,
    depart,
    arrivee,
    date,
    prix,
    vehicule,
    ecologique: vehicule.toLowerCase().includes("électrique") || false,
  };

  data.covoiturages.push(nouveauTrajet);
  utilisateur.trajets.push(nouveauTrajet);

  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

  res.status(201).json({ message: "Trajet ajouté avec succès." });
}
