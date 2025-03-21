import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Link from "next/link";

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
      <div className="p-4">
        <h2 className="text-2xl font-bold">
          Liste des covoiturages disponibles
        </h2>
        {trajets.map((trajet) => (
          <div key={trajet.id} className="mt-2 p-2 border rounded">
            <p>
              <strong>De :</strong> {trajet.depart} → <strong>À :</strong>{" "}
              {trajet.arrivee}
            </p>
            <Link href={`/covoiturages/${trajet.id}`}>
              <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded">
                Voir détail
              </button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
