import { IBook } from "@/types/book";
import Link from "next/link";
import React from "react";

export default function BookThumb({ title, cover_image, id }: IBook) {
  return (
    <div className="flex flex-col cursor-pointer px-2 py-2 bg-white rounded-lg shadow-lg flex-none w-[220px]">
      <Link href={`/book/${id}`}>
        <div className="bg-primary-green h-[280px] relative rounded-lg overflow-hidden">
          <img
            src={cover_image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <h3 className="justify-end text-sm font-medium mt-4">{title}</h3>
      </Link>
      <div className="flex justify-end px-2 items-center">
        <p className="text-lg font-semibold mr-2">5.0</p>
        <p className="">⭐134</p>
      </div>
    </div>
  );
}
