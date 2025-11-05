import { FaSearch } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import { useBook } from "@/hooks/useBook";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const SearchBooks = () => {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    
    const debouncedSearch = debounce((term: string) => setDebouncedSearchTerm(term), 300);
    
    const { data: books, isLoading, isError } = useBook.GetBooksByTitle(debouncedSearchTerm);
    
    const resultsCount = books?.length || 0;
    const hasResults = resultsCount > 0;
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setShowSuggestions(true);
        setActiveIndex(-1);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showSuggestions || !books?.length) return;
        
        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                setActiveIndex((prev) => {
                    if (!books?.length) return -1;
                    return (prev + 1) % books.length;
                });          
                break;
            case "ArrowUp":
                event.preventDefault();
                setActiveIndex((prev) => {
                    if (!books?.length) return -1;
                    return (prev - 1 + books.length) % books.length;
                });          
                break;
            case "Enter":
                event.preventDefault();
                if (activeIndex >= 0) {
                    const selected = books?.[activeIndex];
                    if (selected) {
                        router.push(`/book/${selected.id}`);
                    }
                } else if (searchTerm) {
                    router.push(`/books?title=${encodeURIComponent(searchTerm)}`);
                }
                setShowSuggestions(false);
                setActiveIndex(-1);
                inputRef.current?.blur();
                break;
            case "Escape":
                event.preventDefault();
                setShowSuggestions(false);
                setActiveIndex(-1);
                inputRef.current?.focus();
                break;
        }
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false);
            setActiveIndex(-1);
        }, 150);
    };

    const handleOptionClick = (bookId: string) => {
        router.push(`/book/${bookId}`);
        setShowSuggestions(false);
        setActiveIndex(-1);
        inputRef.current?.blur();
    };
    
    useEffect(() => {
        debouncedSearch(searchTerm);
        return () => debouncedSearch.cancel();
    }, [debouncedSearch, searchTerm]);

    useEffect(() => {
        if (activeIndex >= 0 && listRef.current) {
            const activeItem = listRef.current?.querySelector(`#suggestion-${activeIndex}`);
            if (activeItem) {
                activeItem.scrollIntoView({ block: "nearest", behavior: "smooth" });
            }
        }
    }, [activeIndex]);
    
    useEffect(() => {
        setActiveIndex(-1);
        if (listRef.current) {
            listRef.current.scrollTop = 0;
        }
    }, [debouncedSearchTerm]);
    
    return(
        <div className="group relative flex-1">
            <div className="relative">
                <input
                    ref={inputRef}
                    id="search-books"
                    type="search"
                    role="combobox"
                    aria-label="Buscar por livro"
                    aria-autocomplete="list"
                    aria-expanded={showSuggestions}
                    aria-controls="search-suggestions"
                    aria-activedescendant={
                        activeIndex >= 0 && showSuggestions ? `suggestion-${activeIndex}` : undefined
                    }
                    aria-haspopup="listbox"
                    value={searchTerm}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                        if (searchTerm) {
                            setShowSuggestions(true);
                        }
                    }}
                    className="pl-10 pr-4 py-2 rounded-lg text-lg flex-grow w-full focus:outline-none"
                    placeholder="Buscar por livro..."
                />
                
                <div 
                    className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                    aria-hidden="true"
                >
                    <FaSearch size={20} color="gray"/>
                </div>
            
                <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                    {isLoading
                        ? "Carregando resultados..."
                        : isError
                        ? "Erro ao carregar resultados."
                        : hasResults
                        ? `${resultsCount} ${resultsCount === 1 ? 
                            'resultado encontrado' : 'resultados encontrados'}.`
                        : debouncedSearchTerm
                        ? "Nenhum livro encontrado."
                        : ""}
                </div>

                {showSuggestions && searchTerm && (
                    <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg z-10">
                        {isLoading ? (
                            <p role="status" aria-live="polite" className="p-4 text-gray-500">
                                Carregando...
                            </p>
                        ) : isError ? (
                            <p role="alert" aria-live="assertive" className="p-4 text-gray-500">
                                Erro ao carregar resultados.
                            </p>
                        ) : (
                            <>
                            {hasResults ? (
                                <ul
                                    ref={listRef}
                                    id="search-suggestions"
                                    role="listbox"
                                    aria-label="Sugestões de livros"
                                    className="max-h-80 overflow-y-auto"
                                >
                                {books?.map((book, index) => (
                                        <li 
                                            key={book.id} 
                                            id={`suggestion-${index}`}
                                            role="option"
                                            aria-selected={activeIndex === index}
                                            className=
                                            {`p-2 border-b border-gray-300 flex items-center cursor-pointer ${
                                                activeIndex === index ? "bg-gray-200" : "hover:bg-gray-100"
                                            }`}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                handleOptionClick(book.id);
                                            }}
                                            onMouseEnter={() => setActiveIndex(index)}
                                        >
                                            <Image
                                                src={book.cover_image || "/images/notfoundbook.jpg"}
                                                alt={`Capa do livro ${book.title}`}
                                                width={50}
                                                height={75}
                                                className="mr-4"
                                                aria-hidden="true"
                                            />
                                            <span className="text-gray-800">{book.title}</span>
                                        </li>
                                    ))}
                                    </ul>
                                ) : (
                                    <p role="status" aria-live="polite" className="p-4 text-gray-500">
                                        Nenhum livro encontrado.
                                    </p>
                                )}
                                </>
                            )}
                    </div>
                )}
            </div>
        </div>
    );
};