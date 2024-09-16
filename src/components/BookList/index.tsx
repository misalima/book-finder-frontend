import { IBook } from "@/types/book";
import React from "react";

interface BookListProps {
  books: IBook[];
  buttonAction: "addToList" | "viewBook";
}

export default function BookList({ books, buttonAction }: BookListProps) {
  const buttonText =
    buttonAction === "addToList" ? "Adicionar à Lista" : "Ver detalhes";

   console.log(books)
    return (
    <>
      <ul className="space-y-4">
        {books ? (
          books.map((book, index) => {
            const publicationYear = book.published_date
              ? new Date(book.published_date).getFullYear()
              : "Ano desconhecido";
            return (
              <li
                key={index}
                className="flex items-start space-x-4 p-2 border-b border-gray-300 relative"
              >
                <a href={`/book/${book.id}`} className="flex-shrink-0">
                  <img
                    src={book.cover_image || "/images/notfoundbook.jpg"}
                    alt={book.title}
                    width={100}
                    height={150}
                    className="cursor-pointer"
                  />
                </a>
                <div className="flex-1">
                  <a
                    href={`/book/${book.id}`}
                    className="text-white text-lg font-medium hover:underline"
                  >
                    {book.title} ({publicationYear})
                  </a>
                  {book.subtitle && (
                    <p className="text-gray-300 text-base italic">
                      {book.subtitle}
                    </p>
                  )}

                  {book.authors?.length ? (
                    <p className="text-gray-400 text-sm">
                      Autor(es) da Obra:{" "}
                      {book.authors.map((author) => author.name).join(", ")}
                    </p>
                  ) : (
                    <p className="text-gray-400 text-sm">Autor desconhecido</p>
                  )}
                </div>

                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary-green text-white text-sm rounded-lg px-3 py-3 flex items-center justify-center hover:bg-blue-600"
                  onClick={() => console.log(`Livro ${book.title} adicionado`)}
                >
                  {buttonText}
                </button>
              </li>
            );
          })
        ) : (
          <li className="p-8 border-b border-gray-300 relative text-gray-400">
            Nenhum livro aqui.
          </li>
        )}
      </ul>
    </>
  );
}
