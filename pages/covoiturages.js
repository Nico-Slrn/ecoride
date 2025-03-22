import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Covoiturages() {
  const router = useRouter();
  const [trajets, setTrajets] = useState([]);
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const [filtre, setFiltre] = useState({
    depart: "",
    arrivee: "",
    date: "",
    prixMax: "",
    ecologique: false,
  });

  const rechercher = () => {
    const params = new URLSearchParams();
    if (filtre.depart) params.append("depart", filtre.depart);
    if (filtre.arrivee) params.append("arrivee", filtre.arrivee);
    if (filtre.date) params.append("date", filtre.date);
    if (filtre.prixMax) params.append("prixMax", filtre.prixMax);
    if (filtre.ecologique) params.append("ecologique", "true");

    router.push(`/covoiturages?${params.toString()}`);
  };

  useEffect(() => {
    const { depart, arrivee, date } = router.query;

    if (depart || arrivee || date) {
      const params = new URLSearchParams(router.query);
      fetch(`/api/covoiturages/recherche?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setTrajets(data);
            setFallbackUsed(false);
          } else {
            fetch("/api/covoiturages")
              .then((res) => res.json())
              .then((fallback) => {
                setTrajets(fallback);
                setFallbackUsed(true);
              });
          }
        });
    } else {
      fetch("/api/covoiturages")
        .then((res) => res.json())
        .then((data) => {
          setTrajets(data);
          setFallbackUsed(false);
        });
    }
  }, [router.query]);

  return (
    <>
      <Navbar />
      <div className="p-4 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Rechercher un covoiturage</h2>

        {/* Message si fallback */}
        {fallbackUsed && (
          <p className="text-yellow-600 mb-4">
            Aucun trajet ne correspond exactement à votre recherche. Voici
            d'autres trajets disponibles :
          </p>
        )}

        {/* Liste des trajets */}
        <h2 className="text-2xl font-bold mb-4">Covoiturages disponibles</h2>
        {Array.isArray(trajets) && trajets.length > 0 ? (
          trajets.map((trajet) => (
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
          ))
        ) : (
          <p>Aucun covoiturage disponible.</p>
        )}
      </div>
      <Footer />
    </>
  );
}
