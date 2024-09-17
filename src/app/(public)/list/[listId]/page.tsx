"use client";
import BookList from "@/components/BookList";
import LoadingScreen from "@/components/LoadingScreen";
import { useBook } from "@/hooks/useBook";
import { useList } from "@/hooks/useList";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

export default function Page({ params }: { params: { listId: string } }) {
  const {
    data: list,
    isLoading: isListLoading,
    error: listError,
  } = useList.GetListById(params.listId);

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useUser.GetOneUser(list?.userId || "");

  const {
    data: bookIds,
    isLoading: isBookIdsLoading,
    error: bookIdsError,
    refetch: refetchIds,
  } = useBook.GetBooksByList(params.listId);

  const {
    data: books,
    isLoading: isBooksLoading,
    error: booksError,
    refetch: refetchBooks,
  } = useBook.GetBooksByIds(bookIds?.map((book) => book.book.id) || []);

  const refetchAllBooks = () => {
    refetchIds();
    refetchBooks();
  };

  // Combine status with each book
  const booksWithStatus = books?.map((book) => {
    const bookStatus = bookIds?.find((b) => b.book.id === book.id)?.status.name;
    return { ...book, status: bookStatus }; // Adding the status field
  });

  if (isBooksLoading || isListLoading || isUserLoading || isBookIdsLoading)
    return <LoadingScreen />;
  if (booksError || listError || userError || bookIdsError)
    return (
      <div className="h-screen bg-dark-grey text-red-800">
        Error:{" "}
        {booksError?.message ||
          listError?.message ||
          userError?.message ||
          bookIdsError?.message}
      </div>
    );

  return (
    <div className="px-40 h-screen bg-dark-grey">
      <div className="px-2 py-10">
        <h2 className="text-3xl font-semibold text-white">{list?.name}</h2>
        <h2 className="mt-3 text-lg text-gray-300">
          by{" "}
          <Link href={`/user/${user?.id}`}>
            <span className="font-medium text-xl">{user?.username}</span>
          </Link>
        </h2>
      </div>
      <hr />
      <BookList
        books={booksWithStatus || []}
        type="list"
        listId={params.listId}
        refetch={refetchAllBooks}
      />
    </div>
  );
}
