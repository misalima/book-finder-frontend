import React from "react";
import BookThumb from "../BookThumb";
import { useBook } from "@/hooks/useBook";
import LoadingScreen from "../LoadingScreen";

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
    <>
      <div className="-mt-12 w-full bg-primary-green px-40 py-8">
        <h1 className="text-white mt-6 text-3xl font-semibold">{title}</h1>
        {isLoading ? (
          <h3 className="font-medium z-[100] rounded-md px-8 py-4 bg-white">
            Loading...
          </h3>
        ) : isError ? (
          <div>Um erro ocorreu ao buscar os livros</div>
        ) : (
          <div className="flex mt-4 flex-wrap gap-4">
            {books &&
              books.map((book, index) => {
                return <BookThumb key={index} {...book} />;
              })}
          </div>
        )}
      </div>
    </>
  );
}
