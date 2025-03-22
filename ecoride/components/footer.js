import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-500 text-center p-4 text-md">
      <p>
        Contact : contact@ecoride.fr |{" "}
        <Link href="/mentions">Mentions légales</Link>
      </p>
    </footer>
  );
}
