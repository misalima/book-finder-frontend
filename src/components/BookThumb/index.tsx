import { IBook } from "@/types/book";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";

export default function BookThumb({ title, cover_image, id }: IBook) {
  return (
    <div className="flex flex-col justify-between px-2 py-2 bg-white rounded-lg shadow-lg flex-none w-[220px]">
      <Link 
        href={`/book/${id}`}
        className="cursor-pointer"
        aria-label={`Ver detalhes do livro ${title}`}
      >
        <div className="bg-primary-green h-[280px] relative rounded-lg overflow-hidden">
          <Image
            src={cover_image || "/images/notfoundbook.jpg"}
            alt={`Capa do livro ${title}`}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="justify-end text-sm font-medium mt-4">{title}</h3>
      </Link>
      
      <div className="flex flex-row justify-end px-2 items-center" aria-label="Avaliações do livro">
        <span className="text-lg font-semibold mr-2" aria-label="Nota do livro">5.0</span>
        <FaStar className="text-yellow-500 mr-1 mb-1" aria-hidden="true" />
        <span className="text-sm mb-0.5" aria-label="Número de avaliações do livro">(134)</span>
      </div>
    </div>
  );
}
