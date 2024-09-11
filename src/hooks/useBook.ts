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

export const useBook = {
  GetOneBook, GetBooksByTitle
};
