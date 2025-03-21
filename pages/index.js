import Navbar from "../components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-3xl font-bold text-green-600">
          Bienvenue sur EcoRide 🌿
        </h1>
        <p className="mt-4">Plateforme écologique de covoiturage !</p>
      </div>
    </>
  );
}
