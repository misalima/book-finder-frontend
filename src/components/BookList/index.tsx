"use client";
import { useBook } from "@/hooks/useBook";
import { IBook } from "@/types/book";
import { IBookInList } from "@/types/bookInList";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface BookListProps {
  books: IBook[];
  listId?: string;
  refetch?: () => void;
  type: "search" | "list";
}

export default function BookList({
  books,
  type,
  listId,
  refetch,
}: BookListProps) {
  const router = useRouter();
  const { mutate: removeBookFromList } = useBook.RemoveBookFromList();

  const [localBooks, setLocalBooks] = useState(books || []);

  useEffect(() => {
    setLocalBooks(books);
  }, [books]);

  const handleRemove = (bookId: string) => {
    if (listId == undefined || !refetch) {
      console.log("An unknown error occurred");
    } else {
      removeBookFromList(
        { bookId, listId },
        {
          onSuccess: () => {
            refetch();
            setLocalBooks(localBooks.filter((book) => book.id !== bookId));
          },
        }
      );
    }
  };
  return (
    <>
      <ul>
        {books ? (
          books.map((book, index) => {
            const publicationYear = book.published_date
              ? new Date(book.published_date).getFullYear()
              : "Ano desconhecido";
            return (
              <li
                key={index}
                className="flex flex-row justify-between space-x-4 px-2 py-3 border-b border-gray-300 relative hover:bg-stone-900"
              >
                <div className="flex">
                  <a href={`/book/${book.id}`} className="flex-shrink-0">
                    <img
                      src={book.cover_image || "/images/notfoundbook.jpg"}
                      alt={book.title}
                      width={100}
                      height={150}
                      className="cursor-pointer"
                    />
                  </a>
                  <div className="flex flex-col justify-between px-4">
                    <div>
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
                        <p className="text-gray-400 text-sm">
                          Autor desconhecido
                        </p>
                      )}
                    </div>
                    {listId && (
                      <div className="flex text-gray-300 cursor-default items-center">
                        Status:
                        <h3 className="cursor-pointer hover:bg-primary-green hover:text-white w-fit ml-2 rounded-lg  justify-self-end px-3 py-1 bg-secondary-green text-emerald-900 text-sm font-semibold">
                          {book.status === "Default" ? "Sem status" : book.status}
                        </h3>
                      </div>
                    )}
                  </div>
                </div>

                {type === "search" ? (
                  <button
                    className="self-center mb-3 bg-primary-green text-white text-base rounded-lg p-4 flex items-center justify-center hover:bg-emerald-900"
                    onClick={() =>
                      console.log(`Livro ${book.title} adicionado`)
                    }
                  >
                    Adicionar à Lista
                  </button>
                ) : (
                  <div className="self-center flex flex-col items-center">
                    <button
                      className="w-full self-center mb-3 bg-primary-green text-white text-base rounded-lg p-3 flex items-center justify-center hover:bg-emerald-900"
                      onClick={() => router.push(`/book/${book.id}`)}
                    >
                      Ver detalhes
                    </button>
                    <button
                      onClick={() => handleRemove(book.id)}
                      className="w-full self-center mb-3 bg-red-900 text-white text-base rounded-lg p-3 flex items-center justify-center hover:bg-red-950"
                    >
                      Remover
                    </button>
                  </div>
                )}
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
