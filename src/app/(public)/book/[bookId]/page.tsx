"use client";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/LoadingScreen";
import { useBook } from "@/hooks/useBook";
import { useList } from "@/hooks/useList";
import BookDetails from "@/components/BookDetails";
import JumboImg from "@/components/JumboImg";

export default function Page({ params }: { params: { bookId: string } }) {
  const { data: book, isLoading, error } = useBook.GetOneBook(params.bookId);
  const { data: session } = useSession();
  const { data: lists } = useList.GetUserLists(session?.user.id || "");

  const formattedLists = (lists || []).map((list) => ({
    id: list.id || "",
    name: list.name
  }));

  const { mutate: addBookToList } = useBook.AddBookToList();

  const handleAddBookToList = (bookId: string, listId: string) => {
    addBookToList({ bookId, listId });
  };

  if (session === undefined) return <LoadingScreen />;
  if (isLoading) return <LoadingScreen />;
  if (error) return <p>Ocorreu um erro ao carregar o livro.</p>;
  if (!book) return <p>Detalhes do livro não encontrados.</p>;

  return (
    <>
      <JumboImg />
      <BookDetails
        book={book}
        lists={formattedLists}
        onAddBookToList={handleAddBookToList}
      />
    </>
  );
}
