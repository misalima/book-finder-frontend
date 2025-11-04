import { FaSearch } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import { useBook } from "@/hooks/useBook";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const SearchBooks = () => {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const debouncedSearch = debounce((term: string) => setDebouncedSearchTerm(term), 300);
    const { data: books, isLoading, isError } = useBook.GetBooksByTitle(debouncedSearchTerm);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setShowSuggestions(true);
    };

    const handleBlur = () => {
        setTimeout(() => setShowSuggestions(false), 100);
    };

    const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (searchTerm) {
                router.push(`/books?title=${encodeURIComponent(searchTerm)}`);
                setShowSuggestions(false);
                inputRef.current?.blur();
            }
        }
    };

    useEffect(() => {
        debouncedSearch(searchTerm);
        return () => debouncedSearch.cancel();
    }, [debouncedSearch, searchTerm]);
    
    return(
        <div className="group relative flex-1">
            <div className="relative">
                <input
                    ref={inputRef}
                    data-slot="input"
                    value={searchTerm}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleSubmit}
                    className="pl-10 pr-4 py-2 rounded-lg text-lg flex-grow w-full focus:outline-none"
                    placeholder="Buscar por livro..."
                />
            
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch size={20} color="gray"/>
            </div>

            {showSuggestions && searchTerm && (
                <div className="absolute top-full mt-2 w-full bg-white shadow-lg max-h-80 overflow-y-auto rounded-lg z-10">
                    {isLoading ? (
                        <p className="p-4 text-gray-500">Carregando...</p>
                    ) : isError ? (
                        <p className="p-4 text-red-500">Erro ao carregar resultados.</p>
                    ) : (
                        <ul>
                            {books?.length ? (
                                books.map((book) => (
                                    <li key={book.id} className="p-2 border-b border-gray-300 flex items-center">
                                        <Image
                                            src={book.cover_image || "/images/notfoundbook.jpg"}
                                            alt={book.title}
                                            width={50}
                                            height={75}
                                            className="mr-4"
                                        />
                                        <Link href={`/book/${book.id}`}>
                                            <span className="text-gray-800">{book.title}</span>
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li className="p-2 text-gray-500">Nenhum livro encontrado.</li>
                            )}
                        </ul>
                    )}
                </div>
            )}
            </div>
        </div>
    );
};