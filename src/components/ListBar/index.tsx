"use client";
import { useBook } from "@/hooks/useBook";
/* eslint-disable @next/next/no-img-element */
import { IBook } from "@/types/book";
import Link from "next/link";
import React, { useState } from "react";
import LoadingScreen from "../LoadingScreen";

interface ListBarProps {
  id: string;
  name: string;
}

export default function ListBar({ id, name }: ListBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: bookIds,
    isLoading: isBookIdsLoading,
    error: bookIdsError,
  } = useBook.GetBooksByList(id); // Access the method from useBook

 const {
   data: books,
   isLoading: isBooksLoading,
   error: booksError,
 } = useBook.GetBooksByIds(bookIds?.map((book) => book.bookId) || []);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  if (isBooksLoading || isBookIdsLoading) return <LoadingScreen />;
  if (booksError || bookIdsError) {
    return (
      <div className="min-h-screen bg-dark-grey text-white px-8 md:px-40">
        <h1 className="text-2xl text-white font-medium">
          Error loading data. Please try again later.
        </h1>
      </div>
    );
  }
  return (
    <div>
      <div
        onClick={toggleCollapse}
        className="z-50 cursor-pointer bg-white text-dark-grey font-semibold rounded-lg text-xl px-4 py-2 flex justify-between items-center"
      >
        <span>{name}</span>
        <span className="text-3xl">{isOpen ? "-" : "+"}</span>
      </div>

      <div
        className={`overflow-hidden -mt-4 transition-max-height duration-300 ease-in-out ${
          isOpen ? "max-h-48" : "max-h-0 py-0"
        } rounded-lg p-4 relative bg-white`}
      >
        <div className="flex gap-4 overflow-hidden ">
          {books?.slice(0, 11).map((book, index) => (
            <div key={index} className="flex-shrink-0 w-24">
              <img
                key={index}
                src={book.cover_image}
                alt={book.title}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
        <Link href={`/list/${id}`}>
          <button className="absolute right-2 bottom-2 self-end px-3 py-1 rounded-md bg-primary-green">
            Ver lista completa
          </button>
        </Link>
      </div>
    </div>
  );
}
