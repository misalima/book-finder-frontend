import React from "react";
import BookThumb from "../BookThumb";
import { useBook } from "@/hooks/useBook";

interface BookSectionProps {
  title: string;
}

export default function BookSection({ title }: BookSectionProps) {
  const {
    data: books,
    isLoading,
    isError,
  } = useBook.GetBooksByTitle("Web Programming");

  return (
    <section 
      className="container mx-auto max-w-6xl px-16 pt-4 pb-8 my-12 bg-primary-green rounded-lg"
      aria-labelledby="book-section-title"
    >
      <h2 
        id="book-section-title"
        className="text-white mt-6 text-3xl font-semibold"
      >
        {title}
      </h2>
      {isLoading ? (
        <div 
          className="font-medium z-[100] rounded-md px-8 py-4 bg-none text-white"
          role="status"
          aria-live="polite"
          aria-label="Carregando livros"
        >
          Carregando...
        </div>
      ) : isError ? (
        <div 
          className="text-red-600 mt-4 p-4 bg-none rounded-lg"
          role="alert"
          aria-live="assertive"
        >
          Um erro ocorreu ao buscar os livros
        </div>
      ) : (
        <div 
          className="flex mt-4 gap-4 overflow-x-auto overflow-y-hidden pb-4"
          role="region"
          aria-label={`Lista de ${title.toLowerCase()}`}
          tabIndex={0}
        >
          {books &&
            books.map((book, index) => {
              return <BookThumb key={book.id || index} {...book} />;
            })}
        </div>
      )}
    </section>
  );
}
