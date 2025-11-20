import { IBook } from "@/types/book";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";

export default function BookThumb({ title, cover_image, id }: IBook) {
  return (
    <article className="flex flex-col justify-between px-2 py-2 bg-white rounded-lg shadow-lg flex-none w-[220px]">
      <Link 
        href={`/book/${id}`}
        className="focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 rounded-lg"
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
      <div 
        className="flex justify-end px-2 items-center mt-2"
        role="img"
        aria-label="Avaliação: 5.0 de 5 estrelas, 134 avaliações"
      >
        <div className="flex flex-row items-center" aria-hidden="true">
          <span className="text-lg font-semibold mr-2">5.0</span>
          <FaStar className="text-yellow-500 mr-1 mb-1" />
          <span className="text-sm mb-0.5">(134)</span>
        </div>
      </div>
    </article>
  );
}
