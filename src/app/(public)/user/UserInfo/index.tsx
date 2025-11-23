import React from "react";
import { IUser } from "@/types/user";
import { FaUser, FaPen } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface UserInfoProps {
  user: IUser;
  followersCount?: number;
  followingCount?: number;
  listsCount?: number;
}

export default function UserInfo({
  user,
  followersCount = 0,
  followingCount = 0,
  listsCount = 0,
}: UserInfoProps) {
  const router = useRouter();

  const avatarUrl = (user as any).avatar as string | undefined;
  const initials = (user.username || "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const statButtonClass =
    "flex flex-col items-center px-2 py-1 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500";

  return (
    <header
      role="region"
      aria-labelledby={`user-${user.id}-heading`}
      className="max-w-[1200px] m-auto w-full"
    >
      <div className="h-40 gap-4 lg:px-10 flex items-center justify-center md:justify-between">
        <div className="flex flex-col items-center md:flex-row gap-4 md:gap-10">
          <div className="flex items-center gap-4">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={`${user.username} avatar`}
                className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover"
              />
            ) : initials ? (
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-emerald-600 text-white flex items-center justify-center text-2xl font-semibold">
                {initials}
              </div>
            ) : (
              <FaUser className="text-5xl md:text-6xl" />
            )}

            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-4 items-center">
                <div>
                <h2 id={`user-${user.id}-heading`} className="text-2xl md:text-4xl font-semibold">
                  {user.username}
                </h2>
                {/* optional: add bio / location here */}
              </div>

              <button
                className="ml-0 inline-flex items-center gap-2 border border-secondary-green text-secondary-green bg-transparent transition rounded-full px-2 py-1 text-sm hover:bg-emerald-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                onClick={() => router.push(`/user/edit-profile/${user.id}`)}
                aria-label="Editar perfil"
              >
                <FaPen className="text-sm" />
                <span className="hidden md:inline">Editar</span>
              </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col md:items-center md:gap-6 xl:gap-20">
          <button
            className={statButtonClass}
            onClick={() => router.push(`/user/${user.id}/followers`)}
            aria-label="Ver seguidores"
          >
            <div className="text-md w-12 md:w-24 lg:w-32 md:text-2xl text-center py-1 font-medium">
              {followersCount}
            </div>
            <div className="w-full md:text-center text-md md:text-xl font-medium">Seguidores</div>
          </button>

          <button
            className={statButtonClass}
            onClick={() => router.push(`/user/${user.id}/following`)}
            aria-label="Ver seguindo"
          >
            <div className="text-md w-12 md:w-24 lg:w-32 md:text-2xl text-center py-1 font-medium">
              {followingCount}
            </div>
            <div className="w-full md:text-center text-md md:text-xl font-medium">Seguindo</div>
          </button>

          <button
            className={statButtonClass}
            onClick={() => router.push(`/user/${user.id}/lists`)}
            aria-label="Ver listas"
          >
            <div className="text-md w-12 md:w-24 lg:w-32 md:text-2xl text-center py-1 font-medium">
              {listsCount}
            </div>
            <div className="w-full md:text-center text-md md:text-xl font-medium">Listas</div>
          </button>
        </div>
      </div>

      <hr className="border-[#3f3f3f]" />
    </header>
  );
}
