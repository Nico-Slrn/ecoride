import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function MentionsLegales() {
  return (
    <>
      <Navbar />
      <div className="p-4 min-h-screen">
        <h1 className="text-2xl font-bold">Mentions légales</h1>
        <p className="mt-2">
          <strong>Éditeur :</strong> EcoRide (Projet étudiant fictif)
        </p>
        <p className="mt-1">
          <strong>Email :</strong> contact@ecoride.fr
        </p>
        <p className="mt-1">
          <strong>Hébergement :</strong> Vercel (cloud)
        </p>
        <p className="mt-1">
          Ce projet est purement fictif, réalisé dans le cadre d un examen
          étudiant.
        </p>
      </div>
      <Footer />
    </>
  );
}
