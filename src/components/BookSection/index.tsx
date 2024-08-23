import { IBook } from "@/types/book";
import React from "react";
import BookThumb from "../BookThumb";

interface BookSectionProps {
  title: string;
}

export default function BookSection({ title }: BookSectionProps) {
  const books: IBook[] = [
    {
      id: "jasfajsf",
      title: "Book number one",
      author: "John Paul",
      coverUrl:
        "https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_book-cover-adb8a02f82394b605711f8632a44488b.jpg?ts%20=%201698323696",
      avgRating: 3.9,
      ratingsNumber: 133,
    },
    {
      id: "jaswfajs",
      title: "Book number two",
      author: "John Paul",
      coverUrl:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1698210220",
      avgRating: 4.6,
      ratingsNumber: 721,
    },
    {
      id: "iyhjbflk",
      title: "A million to one",
      author: "John Paul",
      coverUrl:
        "https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
      avgRating: 4.4,
      ratingsNumber: 134,
    },
  ];

  return (
    <>
    <div className="-mt-12 w-full bg-primary-green px-40 py-8">
      <h1 className="text-white text-3xl font-semibold">{title}</h1>
      <div className="flex mt-4">
        {books.map((book, index) => (
          <BookThumb key={index} title={book.title} coverUrl={book.coverUrl} ratingsNumber={book.ratingsNumber} avgRating={book.avgRating} author={book.author} />
        ))}
      </div>
    </div>
    </>
  );
}
