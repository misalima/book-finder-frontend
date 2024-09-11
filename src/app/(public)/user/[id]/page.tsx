"use client";
import React, { useEffect } from "react";
import UserInfo from "../UserInfo";
import { isIUser, IUser } from "@/types/user";
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
     error: userFetchError, // Get the error object here
   } = useUser.GetOneUser(params.id);

   const {
     data: lists,
     isLoading: listsLoading,
     isError: listsError,
     error: listsFetchError, // Get the error object here
   } = useList.GetUserLists(params.id);

   // Cast error to AxiosError to access 'response'
   const userErrorResponse = userFetchError as AxiosError;
   const listsErrorResponse = listsFetchError as AxiosError;

   // Check for 401 error and redirect
   useEffect(() => {
     if (
       userErrorResponse?.response?.status === 401 ||
       listsErrorResponse?.response?.status === 401
     ) {
       router.push("/login");
     }
   }, [userErrorResponse, listsErrorResponse, router]);
   
  if (userLoading || listsLoading) {
    return <LoadingScreen />;
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
        {listsError ? (
          <h1 className="text-2xl text-white font-medium">
            Error loading lists: {listsError && "An unknown error occurred"}
          </h1>
        ) : (
          <UserListsSection lists={lists || []} />
        )}
      </div>
    );
  } else {
    console.error("Unexpected error");
    router.push("/");
    return null;
  }
}
