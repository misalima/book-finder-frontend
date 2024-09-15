/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useRef, useEffect } from "react";
import { useList } from "@/hooks/useList";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/LoadingScreen";
import { useBook } from "@/hooks/useBook";
import { IBook } from "@/types/book";

export default function Page({ params }: { params: { bookId: string } }) {
  const { data: book, isLoading, error } = useBook.GetOneBook(params.bookId);
  const [isMoreInfoVisible, setMoreInfoVisible] = useState(false);
  const { data: session } = useSession();
  const { data: lists } = useList.GetUserLists(session?.user.id || "");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Toggle dropdown visibility
  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  // Handle selecting or deselecting a list
  const handleSelectList = (listId: string) => {
    setSelectedLists((prevSelected) =>
      prevSelected.includes(listId)
        ? prevSelected.filter((id) => id !== listId)
        : [...prevSelected, listId]
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (session === undefined) return <LoadingScreen />;
  if (isLoading) return <LoadingScreen />;
  if (error) return <p>Ocorreu um erro ao carregar o livro.</p>;
  if (!book) return <p>Detalhes do livro não encontrados.</p>;

  return (
    <div className="container mx-auto px-40 py-10 min-h-screen text-white bg-dark-grey">
      <div className="flex">
        <img
          src={book.cover_image}
          alt={book.title}
          className="w-64 h-96 object-cover"
        />
        <div className="ml-6">
          <h1 className="text-4xl font-bold">{book.title}</h1>
          <h2 className="text-2xl font-semibold mt-2">
            {book.authors.map((author) => author.name).join(", ")}
          </h2>
          <p className="text-gray-400">
            Gênero(s): {book.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="mt-4">{book.summary}</p>
          <div className="flex items-center mt-4">
            <span className="text-yellow-500 text-xl">⭐⭐⭐⭐⭐</span>
            <span className="ml-2 text-gray-400">0</span>
          </div>

          {/* Adicionar à lista button */}
          <div className="relative inline-block" ref={dropdownRef}>
            <button
              onClick={toggleMenu}
              className="mt-4 bg-primary-green font-medium px-6 py-2 rounded-md hover:bg-white hover:text-primary-green"
            >
              Adicionar à lista
            </button>

            {isMenuVisible && (
              <div
                className={`absolute bottom-full -mb-2 right-0 w-full bg-white text-black shadow-lg rounded-lg border border-gray-300 z-10 transform transition-all duration-300 ease-out ${
                  isMenuVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                }`}
              >
                <ul className="max-h-64 overflow-y-auto">
                  {lists?.map((list) => (
                    <li
                      key={list.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                      onClick={() => handleSelectList(list.id || "")}
                    >
                      <span>{list.name}</span>
                      <input
                        className="custom-checkbox"
                        type="checkbox"
                        checked={selectedLists.includes(list.id || "")}
                        readOnly
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
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
                    {new Date(book.published_date).getFullYear()}
                  </td>
                </tr>
                <tr className="border border-gray-600">
                  <td className="p-2">Editora:</td>
                  <td className="p-2">{book.publisher.name}</td>
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
    </div>
  );
}
