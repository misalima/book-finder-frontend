"use client";
import React from "react";
import UserInfo from "../UserInfo";
import { IUser } from "@/types/user";
import UserListsSection from "../UserListsSection";

export default function UserPage({ params }: { params: { id: string } }) {
  const oneUser: IUser = {
    id: "kaodm",
    email: "admin@example.com",
    createdAt: new Date(),
    profile_visibility: "public",
    username: "joao",
  };
  return (
    <>
      <div className="min-h-screen bg-dark-grey text-white px-8 md:px-40">
        <UserInfo
          id={oneUser.id}
          createdAt={oneUser.createdAt}
          email={oneUser.email}
          profile_visibility={oneUser.profile_visibility}
          username={oneUser.username}
        />
        <UserListsSection />
      </div>
    </>
  );
}
