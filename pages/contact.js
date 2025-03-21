import Navbar from "../components/navbar";

export default function Contact() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Contactez-nous</h1>
        <form className="mt-4 space-y-3">
          <div>
            <label className="block">Votre email :</label>
            <input
              type="email"
              className="border rounded p-2 w-full"
              placeholder="votre.email@example.com"
            />
          </div>
          <div>
            <label className="block">Votre message :</label>
            <textarea
              className="border rounded p-2 w-full"
              placeholder="Écrivez votre message ici"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Envoyer
          </button>
        </form>
      </div>
    </>
  );
}
