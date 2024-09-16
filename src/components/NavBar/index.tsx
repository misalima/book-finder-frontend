"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import UserMenu from "../UserMenu";
import SearchBar from "../SearchBar";

const NavBar = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchTerm = (event.target as any).search.value; // Recupera o valor do campo de busca
        if (searchTerm) {
            router.push(`/books?title=${encodeURIComponent(searchTerm)}`); // Redireciona para a página de resultados
        }
    };
    

    return (
      <header className="z-50 px-8 md:px-40 h-24 w-full bg-primary-green flex items-center justify-between">
        <Link href="/">
          <Image
            className="max-h-[60px] cursor-pointer"
            alt="logo"
            width={160}
            height={60}
            src="/images/logo.png"
          />
        </Link>
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <SearchBar />
          <button
            type="submit"
            className="ml-3 bg-gray-300 px-4 py-2 rounded-lg text-lg text-gray-500 hover:bg-tertiary-green"
          >
            Buscar
          </button>
        </form>
        <div className="flex items-center space-x-4">
          {session ? (
            <UserMenu
              username={session.user?.name || "User"}
              id={session.user?.id}
            />
          ) : (
            <div className="flex items-center space-x-4">
              <button
                className="bg-white mr-4 px-8 py-2 rounded-lg text-lg font-medium text-primary-green hover:bg-[#dddddd]"
                onClick={() => router.push("/login")}
              >
                Entrar
              </button>
              <button
                className="ring-2 ring-white ring-inset bg-primary-green w-28 py-2 rounded-lg text-lg font-medium text-white hover:bg-secondary-green"
                onClick={() => router.push("/register")}
              >
                Cadastrar
              </button>
            </div>
          )}
        </div>
      </header>
    );
};

export default NavBar;
