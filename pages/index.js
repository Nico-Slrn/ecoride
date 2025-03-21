import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="p-4 min-h-screen">
        <h1 className="text-3xl font-bold text-green-600">
          Bienvenue sur EcoRide 🌿
        </h1>
        <p className="mt-2">
          La plateforme écologique pour le covoiturage simple.
        </p>

        {/* Barre de recherche visuelle */}
        <div className="mt-4">
          <input
            className="border rounded p-2 w-full"
            placeholder="Départ, destination, date..."
          />
          <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded">
            Rechercher
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
