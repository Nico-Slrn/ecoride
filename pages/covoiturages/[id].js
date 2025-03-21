import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";

export default function DetailCovoiturage() {
  const router = useRouter();
  const { id } = router.query;

  const [trajet, setTrajet] = useState(null);

  useEffect(() => {
    if (id) {
      fetch("/api/covoiturages")
        .then((res) => res.json())
        .then((data) => {
          const trajetChoisi = data.find(
            (trajet) => trajet.id === parseInt(id)
          );
          setTrajet(trajetChoisi);
        });
    }
  }, [id]);

  if (!trajet) return <div>Chargement...</div>;

  return (
    <>
      <Navbar />
      <div className="p-4">
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
          <strong>Prix :</strong> {trajet.prix}€
        </p>
        <p>
          <strong>Écologique :</strong>{" "}
          {trajet.ecologique ? "✅ Oui" : "❌ Non"}
        </p>
      </div>
    </>
  );
}
