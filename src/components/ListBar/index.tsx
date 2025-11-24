"use client";
import { useBook } from "@/hooks/useBook";
/* eslint-disable @next/next/no-img-element */
import { IBook } from "@/types/book";
import Link from "next/link";
import React, { useState, useRef } from "react";
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
  } = useBook.GetBooksByList(id);

  const {
    data: books,
    isLoading: isBooksLoading,
    error: booksError,
  } = useBook.GetBooksByIds(bookIds?.map((book) => book.book.id) || []);

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
      <div className="z-50">
        <button
          id={`list-button-${id}`}
          ref={useRef<HTMLButtonElement | null>(null)}
          onClick={toggleCollapse}
          onMouseEnter={(e) => {
            try {
              const btn = e.currentTarget as HTMLButtonElement;
              // Only focus on hover if nothing else is focused (avoids stealing keyboard focus)
              if (document.activeElement === document.body) {
                btn.focus();
                (btn as any).__focusedByHover = true;
              }
            } catch (err) {
              /* ignore */
            }
          }}
          onMouseLeave={(e) => {
            try {
              const btn = e.currentTarget as HTMLButtonElement;
              if ((btn as any).__focusedByHover) {
                btn.blur();
                delete (btn as any).__focusedByHover;
              }
            } catch (err) {
              /* ignore */
            }
          }}
          aria-expanded={isOpen}
          aria-controls={`list-collapse-${id}`}
          aria-label={`Lista: ${name}`}
          title={`Lista: ${name}`}
          className="w-full text-left bg-white text-dark-grey font-semibold rounded-lg text-xl px-6 py-3 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          <span>{name}</span>
          <span className="text-3xl" aria-hidden>
            {isOpen ? "-" : "+"}
          </span>
        </button>
      </div>

      <div
        id={`list-collapse-${id}`}
        role="region"
        aria-labelledby={`list-button-${id}`}
        className={`overflow-hidden -mt-4 transition-max-height duration-300 ease-in-out ${
          isOpen ? "max-h-48" : "max-h-0 py-0"
        } rounded-lg p-4 relative bg-white`}
        aria-hidden={!isOpen}
      >
        {books && books.length > 0 ? (
          <>
            <div className="flex gap-4 overflow-hidden">
              {books.slice(0, 11).map((book, index) => (
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
              <button className="absolute right-4 bottom-4 self-end px-3 py-1 rounded-md bg-primary-green hover:bg-emerald-900 transition text-white text-sm">
                Ver lista completa
              </button>
            </Link>
          </>
        ) : (
          <div className="flex items-start justify-start h-full py-2 px-4">
            <p className="text-center text-gray-500 text-lg font-semibold">
              Sem livros na lista...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
