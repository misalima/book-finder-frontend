"use client";
import { useBook } from "@/hooks/useBook";
import { IBook } from "@/types/book";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import AddToListButton from "@/components/AddToListButton";
import { useList } from "@/hooks/useList";
import { useSession } from "next-auth/react";

interface BookListProps {
  books: IBook[];
  listId?: string;
  refetch?: () => void;
  type: "search" | "list";
}

export default function BookList({ books, type, listId, refetch }: BookListProps) {
  const router = useRouter();
  const { mutate: removeBookFromList } = useBook.RemoveBookFromList();
  const { mutate: addBookToList } = useBook.AddBookToList();
  const { data: session } = useSession();
  const { data: lists } = useList.GetUserLists(session?.user.id || "");

  const formattedLists = (lists || []).map((list) => ({
    id: list.id || "",
    name: list.name,
  }));

  const [localBooks, setLocalBooks] = useState(books || []);

  const itemRefs = useRef<
    { img: HTMLAnchorElement | null; title: HTMLAnchorElement | null; button: HTMLButtonElement | null }[]
  >([]);

  useEffect(() => {
    setLocalBooks(books);
    itemRefs.current = books.map(() => ({ img: null, title: null, button: null }));
  }, [books]);

  const ensureRefSlot = (index: number) => {
    if (!itemRefs.current[index]) {
      itemRefs.current[index] = { img: null, title: null, button: null };
    }
  };

  const handleRemove = (bookId: string) => {
    if (!listId || !refetch) return;

    removeBookFromList(
      { bookId, listId },
      {
        onSuccess: () => {
          refetch();
          setLocalBooks((prev) => prev.filter((book) => book.id !== bookId));
        },
      }
    );
  };

  const handleAddBookToList = (bookId: string, targetListId?: string) => {
    const listToUse = targetListId || formattedLists[0]?.id;
    if (!listToUse) return;
    addBookToList({ bookId, listId: listToUse });
  };

  return (
    <ul role="list" aria-label={`Lista de livros`}>
      {localBooks.length > 0 ? (
        localBooks.map((book, index) => {
          const publicationYear = book.published_date
            ? new Date(book.published_date).getFullYear()
            : "Ano desconhecido";

          return (
            <li
              key={book.id}
              className="flex flex-row cursor-pointer justify-between space-x-4 px-2 py-3 border-b border-gray-300 relative hover:bg-stone-900"
              role="listitem"
              aria-label={`Livro: ${book.title}`}
              onClick={() => router.push(`/book/${book.id}`)}
            >
              <div className="flex">
                <a
                  href={`/book/${book.id}`}
                  aria-label={`Ver detalhes do livro ${book.title}`}
                  ref={(el) => {
                    ensureRefSlot(index);
                    itemRefs.current[index].img = el;
                  }}
                  className="flex-shrink-0"
                >
                  <img
                    src={book.cover_image || "/images/notfoundbook.jpg"}
                    alt={`Capa do livro: ${book.title}`}
                    width={100}
                    height={150}
                    className="cursor-pointer"
                  />
                </a>

                <div className="flex flex-col justify-between px-4">
                  <div>
                    <a
                      href={`/book/${book.id}`}
                      aria-label={`Título: ${book.title}, publicado em ${publicationYear}`}
                      ref={(el) => {
                        ensureRefSlot(index);
                        itemRefs.current[index].title = el;
                      }}
                      className="text-white text-lg font-medium hover:underline truncate whitespace-nowrap overflow-hidden block max-w-[350px]"
                    >
                      {book.title} ({publicationYear})
                    </a>

                    {book.subtitle && (
                      <p className="text-gray-300 text-base italic">
                        <span className="sr-only">Subtítulo: </span>
                        {book.subtitle}
                      </p>
                    )}

                    {book.authors?.length ? (
                      <p className="text-gray-400 text-sm">
                        <span className="sr-only">Autores: </span>
                        Autor(es): {book.authors.map((a) => a.name).join(", ")}
                      </p>
                    ) : (
                      <p className="text-gray-400 text-sm">
                        <span className="sr-only">Autor: </span>
                        Autor desconhecido
                      </p>
                    )}
                  </div>

                  {listId && (
                    <div
                      className="flex text-gray-300 cursor-default items-center"
                      aria-label={`Status do livro: ${book.status === "Default" ? "Sem status" : book.status}`}
                    >
                      Status:
                      <h3
                        className="cursor-pointer hover:bg-primary-green hover:text-white w-fit ml-2 rounded-lg px-3 py-1 bg-secondary-green text-emerald-900 text-sm font-semibold"
                        aria-live="polite"
                      >
                        {book.status === "Default" ? "Sem status" : book.status}
                      </h3>
                    </div>
                  )}
                </div>
              </div>

              <div className="self-center flex flex-col items-center space-y-2" onClick={(e)=>{e.stopPropagation()}}>
                {type === "search" ? (
                  <AddToListButton
                    bookId={book.id}
                    lists={formattedLists}
                    onAddBookToList={handleAddBookToList}
                    aria-label={`Adicionar ${book.title} à lista`}
                    ref={(el) => {
                      ensureRefSlot(index);
                      void (itemRefs.current[index].button = el);
                    }}
                  />
                ) : (
                  <div className="w-full flex flex-col items-center space-y-2">
                    <button
                      className="w-full bg-primary-green text-white rounded-lg p-3"
                      aria-label={`Ver detalhes do livro ${book.title}`}
                      onClick={() => router.push(`/book/${book.id}`)}
                    >
                      Ver detalhes
                    </button>

                    <button
                      onClick={() => handleRemove(book.id)}
                      className="w-full bg-red-900 text-white rounded-lg p-3 hover:bg-red-950"
                      aria-label={`Remover o livro ${book.title} da lista`}
                    >
                      Remover
                    </button>
                  </div>
                )}
              </div>
            </li>
          );
        })
      ) : (
        <li className="p-8 border-b border-gray-300 text-gray-400" aria-live="polite">
          Nenhum livro aqui.
        </li>
      )}
    </ul>
  );
}
