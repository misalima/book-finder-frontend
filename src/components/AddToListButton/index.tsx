"use client";
import { useState, useRef, useEffect } from "react";

interface AddToListButtonProps {
    bookId: string;
    lists: { id: string; name: string }[];
    onAddBookToList: (bookId: string, listId: string) => void;
}

const AddToListButton = ({ bookId, lists, onAddBookToList }: AddToListButtonProps) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [selectedLists, setSelectedLists] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleMenu = () => {
        setIsMenuVisible((prev) => !prev);
    };

    const handleSelectList = (listId: string) => {
        setSelectedLists((prevSelected) =>
            prevSelected.includes(listId)
                ? prevSelected.filter((id) => id !== listId)
                : [...prevSelected, listId]
        );
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsMenuVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleAddToLists = () => {
        selectedLists.forEach((listId) => {
            onAddBookToList(bookId, listId);
        });

        setIsMenuVisible(false);
    };

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={toggleMenu}
                className="mt-4 bg-primary-green text-white font-medium px-6 py-2 rounded-md hover:bg-emerald-900"
            >
                Adicionar à Lista
            </button>

            {isMenuVisible && (
                <div
                    className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg border border-gray-300 z-50"
                >
                    <ul className="max-h-64 overflow-y-auto">
                        {lists.map((list) => (
                            <li
                                key={list.id}
                                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                            >
                                <span onClick={() => handleSelectList(list.id)}>
                                    {list.name}
                                </span>
                                <input
                                    className="custom-checkbox"
                                    type="checkbox"
                                    checked={selectedLists.includes(list.id)}
                                    onChange={() => handleSelectList(list.id)}
                                />
                            </li>
                        ))}
                    </ul>
                    <div className="p-2">
                        <button
                            onClick={handleAddToLists}
                            disabled={selectedLists.length === 0}
                            className={`w-full font-medium px-6 py-2 rounded-md transition-colors ${
                                selectedLists.length > 0
                                    ? "bg-primary-green text-white hover:bg-emerald-900"
                                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                            }`}
                        >
                            Salvar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddToListButton;
