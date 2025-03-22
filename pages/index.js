import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({
    depart: "",
    arrivee: "",
    date: "",
  });

  const lancerRecherche = () => {
    const { depart, arrivee, date } = form;
    const params = new URLSearchParams();

    if (depart) params.append("depart", depart);
    if (arrivee) params.append("arrivee", arrivee);
    if (date) params.append("date", date);

    router.push(`/covoiturages?${params.toString()}`);
  };

  return (
    <>
      <Navbar />
      <div className="bg-black text-gray-800 p-4 min-h-screen">
        <div className="max-w-2xl mx-auto text-center mt-12">
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            Bienvenue sur EcoRide 🌿
          </h1>
          <p className="mb-6 text-lg text-white">
            La plateforme écologique pour le covoiturage simple et responsable.
          </p>

          <div className="bg-gray-100 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Rechercher un trajet
            </h2>
            <input
              type="text"
              placeholder="Ville de départ"
              className="w-full mb-3 p-2 border border-gray-300 rounded text-gray-900"
              value={form.depart}
              onChange={(e) => setForm({ ...form, depart: e.target.value })}
            />
            <input
              type="text"
              placeholder="Ville d’arrivée"
              className="w-full mb-3 p-2 border border-gray-300 rounded text-gray-900"
              value={form.arrivee}
              onChange={(e) => setForm({ ...form, arrivee: e.target.value })}
            />
            <input
              type="date"
              className="w-full mb-4 p-2 border border-gray-300 rounded text-gray-900"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <button
              onClick={lancerRecherche}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition"
            >
              Rechercher
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
