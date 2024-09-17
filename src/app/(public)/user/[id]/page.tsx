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

  if(!isIUser(user)) {
    return (<div>
      <h1>Ocorreu um erro. Tente novamente</h1>
    </div>)
  }

  return (
    <div className="min-h-screen bg-dark-grey text-white px-8 md:px-40">
      <UserInfo user={user} />
      <UserListsSection lists={lists} />
      <div className="flex items-center justify-end py-4">
        <button
          onClick={toggleModal}
          className="bg-primary-green text-white text-base rounded-lg p-4 flex flex-row gap-3 items-center hover:bg-emerald-900"
        >
          <BsPlusCircleFill className="text-2xl" />
          <p>Nova Lista</p>
        </button>
      </div>

      <CreateListModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        refetch={refetchLists}
      />
    </div>
  );
}
