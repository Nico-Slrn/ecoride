import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4 flex gap-4">
      <Link href="/">Accueil</Link>
      <Link href="/covoiturages">Covoiturages</Link>
      <Link href="/connexion">Connexion</Link>
      <Link href="/ajouter-trajet">Ajouter un trajet</Link>
      <Link href="/profil">Mon profil</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
