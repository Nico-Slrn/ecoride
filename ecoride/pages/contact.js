import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Contact() {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    message: "",
  });
  const [confirmation, setConfirmation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setConfirmation("Message envoyé avec succès !");
      setForm({ nom: "", email: "", message: "" });
    } else {
      const err = await res.json();
      setConfirmation(err.error || "Une erreur est survenue.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-4 min-h-screen bg-black flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
            Contactez-nous 🌱
          </h2>

          <input
            type="text"
            placeholder="Votre nom"
            className="w-full mb-3 p-2 border border-gray-300 text-gray-500 rounded"
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Votre email"
            className="w-full mb-3 p-2 border border-gray-300 text-gray-500 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Votre message"
            className="w-full mb-3 p-2 border border-gray-300 text-gray-500 rounded"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Envoyer
          </button>

          {confirmation && (
            <p className="mt-4 text-center text-sm text-green-600">
              {confirmation}
            </p>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
}
