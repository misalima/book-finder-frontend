import { ApiUser } from "@/app/services/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = "qkUser";

const Create = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ApiUser.create,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
  return mutation;
};

const GetOneUser = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY, userId],
    queryFn: () => ApiUser.findOne(userId),
    enabled: !!userId,
  });
};

export const useUser = {
  Create,
  GetOneUser,
};
