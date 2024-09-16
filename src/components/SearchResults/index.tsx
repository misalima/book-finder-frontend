/* eslint-disable @next/next/no-img-element */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useBook } from "@/hooks/useBook";
import { IoIosAdd } from "react-icons/io";
import BookList from "../BookList";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const [debouncedTitle, setDebouncedTitle] = useState("");

  const {
    data: books,
    isLoading,
    isError,
  } = useBook.GetBooksByTitle(debouncedTitle);

  useEffect(() => {
    if (title) {
      setDebouncedTitle(title);
    }
  }, [title]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Resultados para &quot;{title}&quot;
      </h1>
      {isLoading ? (
        <p>Carregando...</p>
      ) : isError ? (
        <p>Erro ao carregar resultados.</p>
      ) : (
        <BookList books={books} buttonAction="addToList" />
      )}
    </div>
  );
};

export default SearchResults;
