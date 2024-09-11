"use client";
import React, { useEffect } from "react";
import UserInfo from "../UserInfo";
import { isIUser } from "@/types/user";
import UserListsSection from "../UserListsSection";
import { useList } from "@/hooks/useList";
import { useUser } from "@/hooks/useUser";
import LoadingScreen from "@/components/LoadingScreen";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { AxiosError } from "axios";

export default function UserPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
    error: userFetchError, // Pega o erro
  } = useUser.GetOneUser(params.id);

  const {
    data: lists,
    isLoading: listsLoading,
    isError: listsError,
    error: listsFetchError, // Pega o erro
  } = useList.GetUserLists(params.id);

  // Cast para AxiosError para acessar a 'response'
  const userErrorResponse = userFetchError as AxiosError | undefined;
  const listsErrorResponse = listsFetchError as AxiosError | undefined;

  // Redireciona para /login se ocorrer um erro 401 (não autorizado)
  useEffect(() => {
    if (
      userErrorResponse?.response?.status === 401 ||
      listsErrorResponse?.response?.status === 401
    ) {
      signOut();
      router.push("/login");
    }
  }, [userErrorResponse, listsErrorResponse, router]);

  // Condicional de Loading e Erro simplificado
  if (userLoading || listsLoading) {
    return <LoadingScreen />;
  }

  // Tratamento de erro genérico no carregamento do usuário ou listas
  if (userError || listsError) {
    return (
      <div className="min-h-screen bg-dark-grey text-white px-8 md:px-40">
        <h1 className="text-2xl text-white font-medium">
          Error loading data. Please try again later.
        </h1>
      </div>
    );
  }

  // Verifica se o usuário está carregado e válido
  if (isIUser(user) && user.id) {
    return (
      <div className="min-h-screen bg-dark-grey text-white px-8 md:px-40">
        <UserInfo
          id={user.id}
          createdAt={user.createdAt}
          email={user.email}
          profile_visibility={user.profile_visibility}
          username={user.username}
        />
        <UserListsSection lists={lists || []} />
      </div>
    );
  }

  // Fallback caso algo inesperado ocorra
  console.error("Unexpected error: Invalid user data.");
  router.push("/");
  return null;
}
