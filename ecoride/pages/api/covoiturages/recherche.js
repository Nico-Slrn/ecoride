import data from "../../../data/db.json";

export default function handler(req, res) {
  const { depart, arrivee, date, prixMax, ecologique } = req.query;

  let resultats = data.covoiturages;

  if (depart) {
    resultats = resultats.filter(
      (t) => t.depart.toLowerCase() === depart.toLowerCase()
    );
  }

  if (arrivee) {
    resultats = resultats.filter(
      (t) => t.arrivee.toLowerCase() === arrivee.toLowerCase()
    );
  }

  if (date) {
    resultats = resultats.filter((t) => t.date === date);
  }

  if (prixMax) {
    resultats = resultats.filter((t) => t.prix <= parseFloat(prixMax));
  }

  if (ecologique === "true") {
    resultats = resultats.filter((t) => t.ecologique === true);
  }

  res.status(200).json(resultats);
}
