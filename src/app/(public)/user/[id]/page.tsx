"use client";
import React, { useState } from "react";
import UserInfo from "../UserInfo";
import UserListsSection from "../UserListsSection";
import LoadingScreen from "@/components/LoadingScreen";
import CreateListModal from "@/components/CreateListModal";
import { useList } from "@/hooks/useList";
import { useUser } from "@/hooks/useUser";
import { BsPlusCircleFill } from "react-icons/bs";
import { isIUser } from "@/types/user";
import JumboImg from "@/components/JumboImg";

export default function UserPage({ params }: { params: { id: string } }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useUser.GetOneUser(params.id);
  const {
    data: lists,
    isLoading: listsLoading,
    isError: listsError,
    refetch: refetchLists,
  } = useList.GetUserLists(params.id);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  if (userLoading || listsLoading) return <LoadingScreen />;
  if (userError || listsError)
    return <div>Error loading data. Please try again.</div>;

  if (!isIUser(user)) {
    return (
      <div>
        <h1>Ocorreu um erro. Tente novamente</h1>
      </div>
    );
  }

  return (
    <>
    <JumboImg />
      <div
        className="container mx-auto max-w-6xl min-h-[760px] px-16 pt-6 pb-8 my-4 text-white bg-dark-grey rounded-lg"
        role="main"
        aria-labelledby={`user-${params.id}-heading`}
      >
        <UserInfo user={user} listsCount={lists?.length} />
        <UserListsSection lists={lists} />
        <div className="flex items-center justify-end py-4">
          <button
            onClick={toggleModal}
            className="bg-primary-green text-white text-base rounded-lg py-3 px-4 flex flex-row gap-3 items-center hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            aria-haspopup="dialog"
            aria-expanded={isModalOpen}
          >
            <BsPlusCircleFill className="text-2xl" />
            <span>Nova Lista</span>
          </button>
        </div>

        <CreateListModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          refetch={refetchLists}
        />
      </div>
    </>
  );
}
