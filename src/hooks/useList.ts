
import { ApiList } from "@/app/services/list/api";
import { IList } from "@/types/list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = "qkList";

const Create = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ApiList.createWithCredentials,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
  return mutation;
};


const GetUserLists = (userId: string) => {
  return useQuery<IList[], Error>({
    queryKey: [QUERY_KEY, userId],
    queryFn: () => ApiList.getUserLists(userId),
  });
};

const GetListById = (listId: string) => {
  return useQuery<IList>({
    queryKey: [QUERY_KEY, listId],
    queryFn: () => ApiList.findOne(listId),
  });
}

export const useList = {
  Create,
  GetUserLists,
  GetListById,
};
