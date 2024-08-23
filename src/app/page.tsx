import Image from "next/image";
import NavBar from "../components/NavBar";
import JumboImg from "../components/JumboImg";
import BookSection from "../components/BookSection";

export default function App() {
  const sectionTitle = "Most liked books";

  return (
    <>
      <div className="z-99 w-full flex flex-col px-40 py-32 items-start justify-center">
        <h1 className="max-w-xl text-white text-5xl font-semibold">
          Descubra, avalie e compartilhe seus livros favoritos.
        </h1>
        <h3 className="max-w-md text-white text-2xl mt-8">
          Sua próxima grande leitura está a um clique de distância.
        </h3>
        <button className="mt-8 bg-white px-12 py-3 rounded-lg text-lg font-semibold text-primary-green hover:bg-[#dddddd]">
          Comece agora
        </button>
      </div>
      <JumboImg />
      <BookSection title="Most liked books" />
    </>
  );
}
