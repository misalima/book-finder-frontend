"use client";
import BookList from "@/components/BookList";
import LoadingScreen from "@/components/LoadingScreen";
import { useBook } from "@/hooks/useBook"; // Import the object containing the methods
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
    data: books,
    isLoading: isBooksLoading,
    error: booksError,
  } = useBook.GetBooksByList(params.listId); // Access the method from useBook

  if (isBooksLoading || isListLoading || isUserLoading) return <LoadingScreen />;
  if (booksError || listError || userError)
    return (
      <div className="h-screen bg-dark-grey text-red-800">
        Error: {booksError?.message || listError?.message || userError?.message}
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
      <BookList books={books} buttonAction="viewBook" />
    </div>
  );
}
