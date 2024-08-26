"use client";
/* eslint-disable @next/next/no-img-element */
import { IBook } from "@/types/book";
import React, { useState } from "react";

interface ListBarProps {
  id: string;
  name: string;
  books: IBook[];
}

export default function ListBar({ id, name, books }: ListBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
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
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
          isOpen ? "max-h-48 -mt-4" : "-mt-8 max-h-0 -z-10"
        } rounded-lg p-4 relative bg-white`}
      >
        <div className="flex gap-4 overflow-hidden ">
          {books.slice(0, 11).map((book) => (
            <div key={book.id} className="flex-shrink-0 w-24">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
        <button className="absolute right-2 bottom-2 self-end px-3 py-1 rounded-md bg-primary-green">
          Ver lista completa
        </button>
      </div>
    </div>
  );
}
