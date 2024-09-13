"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useBook } from '@/hooks/useBook';
import { IoIosAdd } from "react-icons/io";

const BookList = () => {
    const searchParams = useSearchParams();
    const title = searchParams.get('title');
    const [debouncedTitle, setDebouncedTitle] = useState('');

    const { data: books, isLoading, isError } = useBook.GetBooksByTitle(debouncedTitle);

    useEffect(() => {
        if (title) {
            setDebouncedTitle(title);
        }
    }, [title]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-white">Resultados para "{title}"</h1>
            {isLoading ? (
                <p>Carregando...</p>
            ) : isError ? (
                <p>Erro ao carregar resultados.</p>
            ) : (
                <ul className="space-y-4">
                    {books?.length ? (
                        books.map((book) => {
                            const publicationYear = book.published_date ? new Date(book.published_date).getFullYear() : "Ano desconhecido";
                            return (
                                <li key={book.id} className="flex items-start space-x-4 p-2 border-b border-gray-300 relative">
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
                                        <a href={`/book/${book.id}`} className="text-white text-lg font-medium hover:underline">
                                            {book.title} ({publicationYear})
                                        </a>
                                        {/* Exibe o subtítulo, se houver */}
                                        {book.subtitle && (
                                            <p className="text-gray-300 text-base italic">{book.subtitle}</p>
                                        )}

                                        {book.authors?.length ? (
                                            <p className="text-gray-400 text-sm">
                                                {/* Join author names with commas */}
                                                Autor(es) da Obra: {book.authors.map(author => author.name).join(', ')}
                                            </p>
                                        ) : (
                                            <p className="text-gray-400 text-sm">Autor desconhecido</p>
                                        )}
                                    </div>

                                    <button
                                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary-green text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600"
                                        onClick={() => console.log(`Livro ${book.title} adicionado`)}
                                    >
                                        <IoIosAdd className='text-4xl' />
                                    </button>
                                </li>
                            );
                        })
                    ) : (
                        <p>Nenhum resultado encontrado.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default BookList;
