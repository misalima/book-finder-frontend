import { IBook } from "@/types/book";
import Image from "next/image";
import AddToListButton from "../AddToListButton";
import { useState } from "react";
import { FaChevronDown, FaRegStar, FaStar } from "react-icons/fa";

export interface BookDetailsProps {
  book: IBook;
  lists: { id: string; name: string }[];
  onAddBookToList: (bookId: string, listId: string) => void;
}

export default function BookDetails({ book, lists, onAddBookToList }: BookDetailsProps) {
  const [isMoreInfoVisible, setIsMoreInfoVisible] = useState(false);
  const rating = 5;
  const avaliations = 100;

  return (
    <>
      <article className="container mx-auto max-w-6xl px-16 pt-6 pb-8 my-4 text-white bg-dark-grey rounded-lg" aria-label={`Detalhes do livro ${book.title}`}>
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full max-w-64 md:w-64 mx-auto md:mx-0 min-w-0" aria-label="Capa e avaliação do livro">
            <div className="aspect-[2/3] w-full">
              <Image
                src={book.cover_image || "/images/notfoundbook.jpg"}
                alt={`Capa do livro ${book.title}`}
                width={256}
                height={384}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col mt-4 w-full">
              <div 
                className="flex flex-wrap items-center gap-1 text-yellow-500"
                role="img"
                aria-label={`Avaliação: ${rating} de 5 estrelas`}
              >
                {[...Array(5)].map((_, i) => (
                  i < rating ? (
                    <FaStar 
                      key={i} 
                      className="text-xl flex-shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <FaRegStar 
                      key={i} 
                      className="text-xl flex-shrink-0"
                      aria-hidden="true"
                    />
                  )
                ))}
                <span className="text-gray-400 text-sm whitespace-nowrap">
                  ({avaliations} avaliações)
                </span>
              </div>
              <div className="mt-2 w-full">
                <AddToListButton
                  bookId={book.id}
                  lists={lists}
                  onAddBookToList={onAddBookToList}
                />
              </div>
            </div>
          </aside>

          <section className="flex-1 mt-6 md:mt-0" aria-label="Informações do livro">
            <h1 className="text-4xl font-bold">{book.title}</h1>
            <h2 className="text-xl font-semibold mt-2">
              Autor(es): {book.authors.map((author) => author.name).join(", ")}
            </h2>
            <p className="text-gray-400">
              Gênero(s): {book.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p className="mt-4">{book.summary}</p>
            
            <div className="flex flex-col mt-4">
              <button
                onClick={() => setIsMoreInfoVisible(!isMoreInfoVisible)}
                className="flex items-center text-lg text-primary-green"
                aria-expanded={isMoreInfoVisible}
                aria-controls="book-additional-info"
                aria-label={isMoreInfoVisible ? "Ocultar informações adicionais do livro" : "Mostrar informações adicionais do livro"}
              >
                Mais informações{" "}
                <FaChevronDown 
                  className={`ml-2 transition-transform duration-300 ${isMoreInfoVisible ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {isMoreInfoVisible && (
                <div 
                  id="book-additional-info"
                  className="mt-4 bg-gray-800 p-4 rounded-lg"
                  role="region"
                  aria-label="Informações adicionais do livro"
                >
                  <table className="w-full table-auto border-collapse border border-gray-600" aria-label="Detalhes técnicos do livro">
                    <tbody>
                      <tr className="border border-gray-600">
                        <th scope="row" className="p-2 text-left font-normal">ISBN:</th>
                        <td className="p-2">{book.isbn}</td>
                      </tr>
                      <tr className="border border-gray-600">
                        <th scope="row" className="p-2 text-left font-normal">Ano de publicação:</th>
                        <td className="p-2">
                          {new Date(book.published_date).getFullYear()}
                        </td>
                      </tr>
                      <tr className="border border-gray-600">
                        <th scope="row" className="p-2 text-left font-normal">Editora:</th>
                        <td className="p-2">{book.publisher.name}</td>
                      </tr>
                      <tr className="border border-gray-600">
                        <th scope="row" className="p-2 text-left font-normal">Nº de páginas:</th>
                        <td className="p-2">{book.page_count} p.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </div>
      </article>
    </>
  );
}