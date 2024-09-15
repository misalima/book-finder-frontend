"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { debounce } from "lodash";
import { useBook } from "@/hooks/useBook";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const { data: books, isLoading, isError } = useBook.GetBooksByTitle(debouncedTerm);

    const debouncedSearch = debounce((term: string) => setDebouncedTerm(term), 300);

    useEffect(() => {
        debouncedSearch(searchTerm);
        return () => debouncedSearch.cancel();
    }, [searchTerm]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setShowSuggestions(true);
    };

    const handleBlur = () => {
        // Usa um timeout para garantir que o clique no item da lista não feche as sugestões imediatamente
        setTimeout(() => setShowSuggestions(false), 200);
    };

    const handleFocus = () => {
        setShowSuggestions(true);
    };

    return (
        <div className="relative">
            <input
                type="text"
                name="search"
                placeholder="Buscar por livro"
                value={searchTerm}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={inputRef}
                className="px-4 py-2 rounded-lg text-lg flex-grow focus:outline-none"
                style={{ maxWidth: '500px' }}
            />
            {showSuggestions && searchTerm && (
                <div className="absolute top-full mt-2 w-full bg-white shadow-lg max-h-60 overflow-y-auto rounded-lg z-10">
                    {isLoading ? (
                        <p className="p-4 text-gray-500">Carregando...</p>
                    ) : isError ? (
                        <p className="p-4 text-red-500">Erro ao carregar resultados.</p>
                    ) : (
                        <ul>
                            {books?.length ? (
                                books.map((book) => (
                                    <li key={book.id} className="p-2 border-b border-gray-300 flex items-center">
                                        <img
                                            src={book.cover_image || "/images/notfoundbook.jpg"}
                                            alt={book.title}
                                            width={50}
                                            height={75}
                                            className="mr-4"
                                        />
                                        <Link href={`/book/${book.id}`} className="text-black">
                                            {book.title}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <p className="p-4 text-gray-500">Nenhum resultado encontrado.</p>
                            )}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
