"use client";
import React from "react";
import UserInfo from "../UserInfo";
import { isIUser} from "@/types/user";
import UserListsSection from "../UserListsSection";
import { useList } from "@/hooks/useList";
import { useUser } from "@/hooks/useUser";
import LoadingScreen from "@/components/LoadingScreen";
import Link from "next/link";

export default function UserPage({ params }: { params: { id: string } }) {
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useUser.GetOneUser(params.id);
  const {
    data: lists,
    isLoading: listsLoading,
    isError: listsError,
  } = useList.GetUserLists(params.id);

  

  if (userLoading || listsLoading) {
    return <LoadingScreen />;
  }

  if (userError) {
    return (
      <div className="w-full h-screen bg-red-300 flex items-center justify-center">
        <h1 className="text-2xl text-white font-medium">
          An unexpected error occurred while fetching user
        </h1>
      </div>
    );
  }

  if (listsError) {
    return (
      <div className="w-full h-screen bg-red-300 flex items-center justify-center">
        <h1 className="text-2xl text-white font-medium">
          Error loading lists: {listsError && "An unknown error occurred"}
        </h1>
      </div>
    );
  }

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

  return (
    <div className="w-full h-screen bg-red-300 flex items-center justify-center">
      <h1 className="text-2xl text-white font-medium">
        An unexpected error occurred.
      </h1>
      <Link href="/">
        <div className="w-[300px] px-3 py-4 bg-white text-primary-green rounded-lg font-medium text-2xl">
          Voltar para o início
        </div>
      </Link>
    </div>
  );
}
