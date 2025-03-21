import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Covoiturages() {
  const [trajets, setTrajets] = useState([]);

  useEffect(() => {
    fetch("/api/covoiturages")
      .then((res) => res.json())
      .then((data) => setTrajets(data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-4 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Covoiturages disponibles</h2>
        {trajets.map((trajet) => (
          <div key={trajet.id} className="mt-3 p-4 border rounded shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {trajet.depart} → {trajet.arrivee}
                </p>
                <p>Date : {trajet.date}</p>
                <p>Prix : {trajet.prix} €</p>
              </div>
              {trajet.ecologique && (
                <span className="inline-block bg-green-500 text-white rounded-full px-3 py-1 text-sm">
                  🌿 Éco
                </span>
              )}
            </div>
            <Link href={`/covoiturages/${trajet.id}`}>
              <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded">
                Voir détail
              </button>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
