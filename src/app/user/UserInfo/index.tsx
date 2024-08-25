import { IUser } from "@/types/user";
import React from "react";
import { FaUser } from "react-icons/fa";

interface UserInfoProps {
  user: IUser;
}

export default function UserInfo(user: IUser) {
  const numberOfFollowers = 20;
  const numberOfFollowing = 13;
  const numberOfLists = 6;

  return (
    <>
      <div className="h-40 gap-4 lg:px-10 flex items-center justify-center md:justify-between">
        <div className="flex flex-col items-center md:flex-row gap-2 md:gap-10">
          <FaUser className="text-5xl md:text-6xl" />
          <h3 className="text-4xl md:text-5xl font-semibold">
            {user.username}
          </h3>
        </div>
        <div className="flex md:flex-row flex-col lg:flex-end md:gap-6 xl:gap-20">
          <div className="flex gap-1 items-center mb-1 md:block md:mb-none">
            <div className="ml-2 bg-primary-green text-md w-12 md:w-24 lg:w-32 md:text-2xl text-center py-1 rounded-lg font-medium">
              {numberOfFollowers}
            </div>
            <div className="w-full md:text-center text-md md:text-xl font-medium md:mt-2">
              Seguidores
            </div>
          </div>
          <div className="flex gap-1 items-center mb-1 md:block md:mb-none">
            <div className="ml-2 bg-primary-green text-md w-12 md:w-24 lg:w-32 md:text-2xl text-center py-1 rounded-lg font-medium">
              {numberOfFollowing}
            </div>
            <div className="w-full md:text-center text-md md:text-xl font-medium md:mt-2">
              Seguindo
            </div>
          </div>
          <div className="flex gap-1 items-center mb-1 md:block md:mb-none">
            <div className="ml-2 bg-primary-green text-md w-12 md:w-24 lg:w-32 md:text-2xl text-center py-1 rounded-lg font-medium">
              {numberOfLists}
            </div>
            <div className="w-full md:text-center text-md md:text-xl font-medium md:mt-2">
              Listas
            </div>
          </div>
        </div>
      </div>
      <hr className="max-w-[1200px] m-auto" />
    </>
  );
}
