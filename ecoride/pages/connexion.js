import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Connexion() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    motdepasse: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("utilisateur", JSON.stringify(data.utilisateur));
      setMessage("Connexion réussie !");
      router.push("/profil");
    } else {
      const err = await res.json();
      setMessage(err.error || "Erreur lors de la connexion");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-4 min-h-screen flex justify-center items-center bg-black">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-black">
            Connexion
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border border-gray-300 text-gray-500 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            autoComplete="email"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full mb-4 p-2 border border-gray-300 text-gray-500 rounded"
            value={form.motdepasse}
            onChange={(e) => setForm({ ...form, motdepasse: e.target.value })}
            autoComplete="current-password"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Se connecter
          </button>

          {message && (
            <p className="mt-4 text-center text-sm text-red-600">{message}</p>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
}
