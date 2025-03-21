import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Connexion() {
  return (
    <>
      <Navbar />
      <div className="p-4 min-h-screen">
        <h1 className="text-2xl font-bold">Connexion / Création de compte</h1>
        <form className="mt-4 space-y-3">
          <div>
            <label>Email :</label>
            <input
              type="email"
              className="border rounded p-2 w-full"
              placeholder="ton.email@example.com"
            />
          </div>
          <div>
            <label>Mot de passe :</label>
            <input
              type="password"
              className="border rounded p-2 w-full"
              placeholder="Mot de passe"
            />
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Se connecter / Créer
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
