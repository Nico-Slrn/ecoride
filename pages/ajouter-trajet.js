import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function AjouterTrajet() {
  const [form, setForm] = useState({
    depart: "",
    arrivee: "",
    date: "",
    prix: "",
    vehicule: "",
  });
  const [message, setMessage] = useState("");

  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!utilisateur?.id) return;

    const res = await fetch(`/api/utilisateurs/${utilisateur.id}/trajets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Trajet ajouté avec succès ✅");
      setForm({ depart: "", arrivee: "", date: "", prix: "", vehicule: "" });
    } else {
      setMessage(data.error || "Erreur lors de l'ajout");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-4 min-h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full bg-white p-6 rounded shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
            Ajouter un covoiturage
          </h2>

          <input
            className="w-full mb-2 p-2 border"
            placeholder="Ville de départ"
            value={form.depart}
            onChange={(e) => setForm({ ...form, depart: e.target.value })}
            required
          />
          <input
            className="w-full mb-2 p-2 border"
            placeholder="Ville d'arrivée"
            value={form.arrivee}
            onChange={(e) => setForm({ ...form, arrivee: e.target.value })}
            required
          />
          <input
            type="date"
            className="w-full mb-2 p-2 border"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <input
            type="number"
            className="w-full mb-2 p-2 border"
            placeholder="Prix (€)"
            value={form.prix}
            onChange={(e) => setForm({ ...form, prix: e.target.value })}
            required
          />
          <input
            className="w-full mb-2 p-2 border"
            placeholder="Modèle + énergie du véhicule"
            value={form.vehicule}
            onChange={(e) => setForm({ ...form, vehicule: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Ajouter
          </button>
          {message && <p className="mt-3 text-sm text-center">✅ {message}</p>}
        </form>
      </div>
      <Footer />
    </>
  );
}
