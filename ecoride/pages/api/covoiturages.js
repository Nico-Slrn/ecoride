// pages/api/covoiturages.js
import data from "../../data/db.json";

export default function handler(req, res) {
  res.status(200).json(data.covoiturages); // ✅ On retourne simplement la liste
}
