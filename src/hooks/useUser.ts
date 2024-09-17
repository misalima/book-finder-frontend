import { ApiUser } from "@/app/services/user";
import { IRegisterUser } from "@/types/registerUser";
import { IUser } from "@/types/user";
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
  return useQuery<IUser | IRegisterUser | IUpdateUser>({
    queryKey: [QUERY_KEY, userId],
    queryFn: () => ApiUser.findOne(userId),
    enabled: !!userId,
  });
};

const Update = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ApiUser.update,
    onSuccess: async (updatedUser: IUser | IRegisterUser | IUpdateUser) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, updatedUser.id] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
  return mutation;
};

export const useUser = {
  Create,
  GetOneUser,
  Update,
};
