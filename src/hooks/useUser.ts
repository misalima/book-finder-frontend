import { ApiUser } from "@/app/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = "qkUser";

const Create = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({mutationFn: ApiUser.create, onSuccess: async () => {
    queryClient.invalidateQueries({queryKey: [QUERY_KEY]})
  }}, )  
  return mutation;
};

export const useUser = {
    Create,
}