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

export const useBook = {
  GetOneBook,
};
