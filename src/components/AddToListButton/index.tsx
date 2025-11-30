"use client";
import Link from "next/link";
import { useState, useRef, useEffect, forwardRef } from "react";
import { useToast } from "@/components/Toast/ToastContext";

interface AddToListButtonProps {
  bookId: string;
  lists: { id: string; name: string }[];
  onAddBookToList: (bookId: string, listId: string) => void;
}

const AddToListButton = forwardRef<HTMLButtonElement, AddToListButtonProps>(
  ({ bookId, lists, onAddBookToList }, ref) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [selectedLists, setSelectedLists] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const { showToast } = useToast();

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
      if (selectedLists.length === 0) return;

      const promises = selectedLists.map((listId) =>
        Promise.resolve(onAddBookToList(bookId, listId)).then(
          () => ({ listId, ok: true }),
          (err) => ({ listId, ok: false, error: err })
        )
      );

      Promise.all(promises).then((results) => {
        const success = results.filter((r) => r.ok).length;
        const failed = results.filter((r) => !r.ok).length;

        if (success > 0) {
          if (selectedLists.length === 1) {
            const list = lists.find((l) => l.id === selectedLists[0]);
            const name = list?.name ?? "lista";
            showToast("success", `Livro adicionado à ${name}.`);
          } else {
            showToast("success", "Livro adicionado às listas selecionadas.");
          }
        }

        if (failed > 0) {
          showToast(
            "error",
            "Não foi possível adicionar o livro a uma ou mais listas."
          );
        }

        setIsMenuVisible(false);
      });
    };

    return (
      <div className="relative inline-block" ref={dropdownRef}>
        <button
          ref={ref}
          onClick={toggleMenu}
          className="mt-4 bg-primary-green text-white font-medium px-6 py-2 rounded-md hover:bg-emerald-900"
          aria-haspopup="menu"
          aria-expanded={isMenuVisible}
          aria-controls="add-to-list-menu"
          aria-label="Adicionar livro à lista"
        >
          Adicionar à Lista
        </button>

        {isMenuVisible && (
          <div
            id="add-to-list-menu"
            role="menu"
            aria-label="Selecione uma ou mais listas para adicionar o livro"
            className="absolute left-0 p-2 mt-2 w-64 bg-white text-black shadow-lg rounded-lg border border-gray-300 z-50"
          >
            <ul className="max-h-64 overflow-y-auto" role="none">
              {lists.map((list) => {
                const isChecked = selectedLists.includes(list.id);

                return (
                  <li
                    key={list.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                    role="menuitemcheckbox"
                    aria-checked={isChecked}
                    tabIndex={0}
                    onClick={(e) => {
                      // Evita duplicidade quando o clique vem do checkbox
                      if ((e.target as HTMLElement).tagName !== "INPUT") {
                        handleSelectList(list.id);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        handleSelectList(list.id);
                      }
                    }}
                  >
                    <label htmlFor={`checkbox-${list.id}`} className="cursor-pointer">
                      {list.name}
                    </label>

                    <input
                      id={`checkbox-${list.id}`}
                      type="checkbox"
                      checked={isChecked}
                      aria-label={`Selecionar lista ${list.name}`}
                      onChange={() => handleSelectList(list.id)}
                    />
                  </li>
                );
              })}
            </ul>

            <div className="p-2">
              {lists.length > 0 ? (
                <button
                  onClick={handleAddToLists}
                  disabled={selectedLists.length === 0}
                  className={`w-full font-medium px-6 py-2 rounded-md transition-colors ${
                    selectedLists.length > 0
                      ? "bg-primary-green text-white hover:bg-emerald-900"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                  aria-disabled={selectedLists.length === 0}
                  aria-label="Salvar seleção de listas"
                >
                  Salvar
                </button>
              ) : (
                <Link
                  href={"/login"}
                  aria-label="Fazer login para adicionar o livro a uma lista"
                  className="block"
                >
                  <h3 className="text-primary-green p-2 font-medium text-center">
                    Faça login para adicionar a uma lista
                  </h3>
                  <button className="w-full font-medium px-6 py-2 rounded-md bg-primary-green text-white hover:bg-emerald-900">
                    Fazer Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

AddToListButton.displayName = "AddToListButton";
export default AddToListButton;
