import React from "react";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import ResultsArea from "./ResultsArea";
 
export const ResultsPage = () => {
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverImageUrl:
        "https://s3.amazonaws.com/adg-bucket/the-great-gatsby-by-f-scott-fitzgerald/3419-medium.jpg",
      summary:
        "The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, set in the Roaring Twenties.",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      coverImageUrl:
        "https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg",
      summary:
        "A dystopian novel set in a totalitarian regime where Big Brother watches everyone, and individuality is crushed.",
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      coverImageUrl:
        "https://m.media-amazon.com/images/I/81aY1lxk+9L._AC_UF1000,1000_QL80_.jpg",
      summary:
        "A profound and stirring novel that explores the themes of racial injustice and moral growth through the young eyes of Scout Finch.",
    },
  ];
  return (
    <>
      <Filters />
      <SearchBar onSearch={"Book"}/>
      <ResultsArea books={books} />
    </>
  );
};
