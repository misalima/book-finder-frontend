import { IBook } from "@/types/book";
import React from "react";
import BookThumb from "../BookThumb";

interface BookSectionProps {
  title: string;
}

export default function BookSection({ title }: BookSectionProps) {
  const books: IBook[] = [];
  
  return (
    <>
    <div className="-mt-12 w-full bg-primary-green px-40 py-8">
      <h1 className="text-white text-3xl font-semibold">{title}</h1>
      <div className="flex mt-4">
      
      </div>
    </div>
    </>
  );
}
