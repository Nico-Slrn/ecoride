import data from "../../../data/db.json";

export default function handler(req, res) {
  const { id } = req.query;
  const trajet = data.covoiturages.find((t) => t.id === parseInt(id));
  if (!trajet) {
    return res.status(404).json({ error: "Covoiturage non trouvé" });
  }
  res.status(200).json(trajet);
}
