import React, { useState } from "react";
import { useBook } from "@/hooks/useBook";

const SearchBar = () => {
    const [localSearchTerm, setLocalSearchTerm] = useState("");
    const { GetBooksByTitle } = useBook;

    const { data: books } = GetBooksByTitle(localSearchTerm);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchTerm(event.target.value);
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={localSearchTerm}
                onChange={handleChange}
                placeholder="Buscar por livro"
                className="px-4 py-2 rounded-lg text-lg flex-grow"
                style={{ maxWidth: '300px' }}
            />
            {books && books.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 mt-2 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                    {books.map((book) => (
                        <div key={book.id} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                            <img
                                src={book.cover_image || "/images/notfoundbook.jpg"}
                                alt={book.title}
                                className="w-12 h-18 object-cover"
                            />
                            <span className="ml-2 text-lg">{book.title}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
