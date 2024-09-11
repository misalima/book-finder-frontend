"use client"
import { useState, MouseEvent, useEffect } from "react";
import { useList } from "@/hooks/useList";
import SelectListMenu from "@/components/SelectListMenu";
import { useSession } from "next-auth/react";
import axios from "axios";
import LoadingScreen from "@/components/LoadingScreen";
import { useBook } from "@/hooks/useBook";

export default function Page({ params }: { params: { bookId: string } }) {
  const { data: book, isLoading, error } = useBook.GetOneBook(params.bookId);
  const [isMoreInfoVisible, setMoreInfoVisible] = useState(false);
  const [publisherName, setPublisherName] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  let publicationDate;
  if (book?.published_date) {

    publicationDate = new Date(book.published_date).getFullYear()
  }
  useEffect(() => {
    if (session === null) {
      router.push("/login");
    }
  }, [session, router]);
  const { data: lists } = useList.GetUserLists(session?.user.id || "");

  const handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
    setMenuPosition({ top: event.clientY, left: event.clientX });
    setIsMenuVisible(true);
  };


  if (session === undefined) return <LoadingScreen />;
  if (isLoading) return <LoadingScreen />;
  if (error) return <p>Ocorreu um erro ao carregar o livro.</p>;
  if (!book) return <p>Detalhes do livro não encontrados.</p>;

  return (
    <div
      className="container mx-auto px-40 py-10 text-white bg-dark-grey"
      onContextMenu={handleRightClick} // Shows the menu on right-click
    >
      <div className="flex">
        <img
          src={book.cover_image}
          alt={book.title}
          className="w-64 h-96 object-cover"
        />
        <div className="ml-6">
          <h1 className="text-4xl font-bold">{book.title}</h1>
          {/* <h2 className="text-2xl font-semibold mt-2">{book.authors[0]}</h2>
          <p className="text-gray-400">Gênero(s): {book.genres[0]}</p> */}
          <p className="mt-4">{book.summary}</p>
          <div className="flex items-center mt-4">
            <span className="text-yellow-500 text-xl">⭐⭐⭐⭐⭐</span>
            <span className="ml-2 text-gray-400">
              0
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setMenuPosition({ top: e.clientY, left: e.clientX });
              setIsMenuVisible(!isMenuVisible);
            }}
            className="mt-4 bg-primary-green px-6 py-2 rounded-md"
          >
            Adicionar à lista
          </button>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => setMoreInfoVisible(!isMoreInfoVisible)}
          className="flex items-center text-lg text-white"
        >
          Mais informações{" "}
          <span
            className={`ml-2 transform ${
              isMoreInfoVisible ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>

        {isMoreInfoVisible && (
          <div className="mt-4 bg-gray-800 p-4 rounded-lg">
            <table className="w-full table-auto border-collapse border border-gray-600">
              <tbody>
                <tr className="border border-gray-600">
                  <td className="p-2">ISBN:</td>
                  <td className="p-2">{book.isbn}</td>
                </tr>
                <tr className="border border-gray-600">
                  <td className="p-2">Ano de publicação:</td>
                  <td className="p-2">
                    {publicationDate || ""}
                  </td>
                </tr>
                <tr className="border border-gray-600">
                  <td className="p-2">Editora:</td>
                  <td className="p-2">{publisherName}</td>
                </tr>
                <tr className="border border-gray-600">
                  <td className="p-2">Nº de páginas:</td>
                  <td className="p-2">{book.page_count} p.</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Popup menu */}
      {isMenuVisible && menuPosition && (
        <div
          className="absolute bg-white text-black shadow-lg rounded-lg border border-gray-300"
          style={{
            top: menuPosition.top,
            left: menuPosition.left,
            zIndex: 1000,
          }}
        >
          <SelectListMenu
            lists={lists || []}
            onSelect={(selectedList) => {
              // Handle selection
              console.log(selectedList);
              setIsMenuVisible(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
