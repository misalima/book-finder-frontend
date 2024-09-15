import { ApiBook } from "@/app/services/book/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = "qkBook";

const GetOneBook = (bookId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY, bookId],
    queryFn: () => ApiBook.findOne(bookId),
    enabled: !!bookId,
  });
};

const GetBooksByTitle = (title: string) => {
    return useQuery({
        queryKey: [QUERY_KEY, title],
        queryFn: () => ApiBook.getBooksByTitle(title),
        enabled: !!title,
    });
}

const GetBooksByList = (listId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY, listId],
    queryFn: () => ApiBook.getBooksByList(listId),
    enabled: !!listId,
  })
}

const AddBookToList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookId,
      listId,
    }: {
      bookId: string;
      listId: string;
    }) => {
      return ApiBook.addBookToList(bookId, listId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userLists"] });
    },
    onError: (error) => {
      console.error("Failed to add the book to list", error);
    },
  });
};

const RemoveBookFromList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookId,
      listId,
    }: {
      bookId: string;
      listId: string;
    }) => {
      return ApiBook.removeBookFromList(bookId, listId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userLists"] });
    },
    onError: (error) => {
      console.error("Failed to remove the book from list", error);
    },
  });
};


export const useBook = {
  GetBooksByList, GetOneBook, GetBooksByTitle, AddBookToList, RemoveBookFromList
};
