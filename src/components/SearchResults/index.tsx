/* eslint-disable @next/next/no-img-element */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useBook } from "@/hooks/useBook";
import BookList from "../BookList";
import LoadingScreen from "../LoadingScreen";
import Error from "../Error";

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

  if (isLoading) {
    return <LoadingScreen />;
  } else if (isError) {
    return (
      <div className="h-screen">
        <Error message={"Algum erro inesperado aconteceu. Tente novamente."} />
      </div>
    );
  }
  return (
    <>
      <div className="p-4 min-h-screen" aria-label="Resultados da busca">
        <h1 className="text-2xl font-bold mb-4 text-white" aria-hidden="true">
          Resultados para &quot;{title}&quot;
        </h1>
        {books && books.length > 0 ? (
          <BookList books={books} type="search" />
        ) : (
          <div className="px-2 py-3" role="alert" aria-live="assertive">
            <h3 className="text-white text-lg" aria-hidden="true">Nenhum livro foi encontrado com a(s) palavra(s) buscadas.</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults;
