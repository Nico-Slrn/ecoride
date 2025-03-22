import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function DetailCovoiturage() {
  const router = useRouter();
  const { id } = router.query;

  const [trajet, setTrajet] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    fetch(`/api/covoiturages/${id}`)
      .then((res) => {
        if (!res.ok) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setTrajet(data);
        }
      });
  }, [router.isReady, id]);

  if (notFound) {
    return (
      <>
        <Navbar />
        <div className="p-4 text-red-600">Trajet non trouvé.</div>
        <Footer />
      </>
    );
  }

  if (!trajet) {
    return (
      <>
        <Navbar />
        <div className="p-4">Chargement...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-4 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Détail du covoiturage</h1>
        <p>
          <strong>Départ :</strong> {trajet.depart}
        </p>
        <p>
          <strong>Arrivée :</strong> {trajet.arrivee}
        </p>
        <p>
          <strong>Date :</strong> {trajet.date}
        </p>
        <p>
          <strong>Prix :</strong> {trajet.prix} €
        </p>
        <p>
          <strong>Écologique :</strong>{" "}
          {trajet.ecologique ? "✅ Oui" : "❌ Non"}
        </p>

        <div className="mt-4">
          <p>
            <strong>Conducteur :</strong> John Doe ⭐️⭐️⭐️⭐️⭐️ (5)
          </p>
          <p>
            <strong>Places restantes :</strong> 3
          </p>
          <p>
            <strong>Véhicule :</strong> Tesla Model 3 (électrique)
          </p>
        </div>

        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
          Participer
        </button>
      </div>
      <Footer />
    </>
  );
}
