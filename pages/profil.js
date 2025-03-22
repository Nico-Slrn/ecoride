import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Profil() {
  const [utilisateur, setUtilisateur] = useState(null);
  const [erreur, setErreur] = useState(null);
  const [trajets, setTrajets] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("utilisateur"));

    if (user && user.id) {
      fetch(`/api/utilisateurs/${user.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Utilisateur introuvable");
          return res.json();
        })
        .then((data) => {
          setUtilisateur(data);
          setTrajets(data.historique || []);
        })
        .catch((err) => setErreur(err.message));
    } else {
      setErreur("Aucun utilisateur connecté.");
    }
  }, []);

  const handleDeconnexion = () => {
    localStorage.removeItem("utilisateur");
    window.location.href = "/connexion";
  };

  const handleAnnuler = async (trajetId) => {
    if (!utilisateur?.id) return;

    const res = await fetch(`/api/utilisateurs/${utilisateur.id}/historique`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trajetId }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Trajet annulé ❌");
      setTrajets(trajets.filter((t) => t.id !== trajetId));
    } else {
      setMessage(data.error || "Erreur lors de l'annulation");
    }
  };

  if (!utilisateur && !erreur) {
    return (
      <>
        <Navbar />
        <div className="p-4 min-h-screen">Chargement...</div>
        <Footer />
      </>
    );
  }

  if (erreur) {
    return (
      <>
        <Navbar />
        <div className="p-4 min-h-screen text-red-600">{erreur}</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-4 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">
          Bienvenue, {utilisateur.pseudo} 👋
        </h1>

        <div className="bg-gray-100 p-4 rounded shadow max-w-md mb-4">
          <p>
            <strong>Email :</strong> {utilisateur.email}
          </p>
          <p>
            <strong>Rôle :</strong> {utilisateur.role}
          </p>
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Historique de vos trajets
        </h2>
        {trajets.length === 0 ? (
          <p>Aucun trajet pour le moment.</p>
        ) : (
          trajets.map((t) => (
            <div
              key={t.id}
              className="mb-4 p-4 border rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {t.depart} → {t.arrivee} ({t.date})
                </p>
                <p>{t.vehicule}</p>
              </div>
              <button
                onClick={() => handleAnnuler(t.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Annuler
              </button>
            </div>
          ))
        )}

        {message && (
          <p className="text-center text-green-700 mt-4">{message}</p>
        )}

        <button
          onClick={handleDeconnexion}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Se déconnecter
        </button>
      </div>
      <Footer />
    </>
  );
}
