"use client";
import { useBook } from "@/hooks/useBook";
import { IBook } from "@/types/book";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AddToListButton from "@/components/AddToListButton";
import { useList } from "@/hooks/useList";
import { useSession } from "next-auth/react";

interface BookListProps {
    books: IBook[];
    listId?: string;
    refetch?: () => void;
    type: "search" | "list";
}

export default function BookList({books, type, listId, refetch}: BookListProps) {
    const router = useRouter();
    const { mutate: removeBookFromList } = useBook.RemoveBookFromList();
    const { mutate: addBookToList } = useBook.AddBookToList();
    const { data: session } = useSession();
    const { data: lists } = useList.GetUserLists(session?.user.id || "");

    const formattedLists = (lists || []).map((list) => ({
        id: list.id || "",
        name: list.name
    }));

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

    const handleAddBookToList = (bookId: string, listId: string) => {
        addBookToList({ bookId, listId });
    };

    return (
        <>
            <ul>
                {books.length > 0 ? (
                    books.map((book) => {
                        const publicationYear = book.published_date
                            ? new Date(book.published_date).getFullYear()
                            : "Ano desconhecido";

                        return (
                            <li
                                key={book.id}
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

                                            {/* TÍTULO COM TRUNCATE */}
                                            <a
                                                href={`/book/${book.id}`}
                                                className="text-white text-lg font-medium hover:underline truncate whitespace-nowrap overflow-hidden block max-w-[550px]"
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
                                                <h3 className="cursor-pointer hover:bg-primary-green hover:text-white w-fit ml-2 rounded-lg px-3 py-1 bg-secondary-green text-emerald-900 text-sm font-semibold">
                                                    {book.status === "Default" ? "Sem status" : book.status}
                                                </h3>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="self-center flex flex-col items-center space-y-2">
                                    {type === "search" ? (
                                        <AddToListButton
                                            bookId={book.id}
                                            lists={formattedLists}
                                            onAddBookToList={handleAddBookToList}
                                        />
                                    ) : (
                                        <div className="w-full flex flex-col items-center space-y-2">
                                            <button
                                                className="w-full bg-primary-green text-white text-base rounded-lg p-3 flex items-center justify-center hover:bg-emerald-900"
                                                onClick={() => router.push(`/book/${book.id}`)}
                                            >
                                                Ver detalhes
                                            </button>
                                            <button
                                                onClick={() => handleRemove(book.id)}
                                                className="w-full bg-red-900 text-white text-base rounded-lg p-3 flex items-center justify-center hover:bg-red-950"
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
                    <li className="p-8 border-b border-gray-300 relative text-gray-400">
                        Nenhum livro aqui.
                    </li>
                )}
            </ul>
        </>
    );
}
