import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "db.json");

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { nom, email, message } = req.body;

  if (!nom || !email || !message) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  const rawData = fs.readFileSync(dbPath);
  const data = JSON.parse(rawData);

  if (!data.contacts) {
    data.contacts = [];
  }

  const nouveauMessage = {
    id: data.contacts.length + 1,
    nom,
    email,
    message,
    date: new Date().toISOString(),
  };

  data.contacts.push(nouveauMessage);
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

  res.status(200).json({ message: "Message envoyé avec succès." });
}
