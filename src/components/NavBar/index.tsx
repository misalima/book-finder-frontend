"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import UserMenu from "../UserMenu";
import SearchBar from "../SearchBar";

const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchTerm = (event.target as any).search.value;
    if (searchTerm) {
      router.push(`/books?title=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Acessibilidade: mover foco com setas
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const focusableSelectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e: KeyboardEvent) => {
      const focusable = Array.from(
        nav.querySelectorAll<HTMLElement>(focusableSelectors)
      );

      const index = focusable.indexOf(document.activeElement as HTMLElement);
      if (index === -1) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = (index + 1) % focusable.length;
        focusable[next].focus();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = (index - 1 + focusable.length) % focusable.length;
        focusable[prev].focus();
      }
    };

    nav.addEventListener("keydown", handleKeyDown);
    return () => nav.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Barra de navegação principal do site"
      className="z-50 px-8 md:px-40 h-24 w-full bg-primary-green flex items-center justify-between"
    >
      <Link
        href="/"
        aria-label="Ir para a página inicial"
        aria-current={pathname === "/" ? "page" : undefined}
      >
        <Image
          className="max-h-[60px] cursor-pointer"
          alt="Logo da Livraria"
          width={160}
          height={60}
          src="/images/logo.png"
        />
      </Link>

      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center"
        role="search"
        aria-label="Barra de busca de livros"
      >
        <SearchBar />
        <button
          type="submit"
          aria-label="Buscar livros"
          className="ml-3 bg-gray-300 px-4 py-2 rounded-lg text-lg text-primary-green hover:bg-secondary-green hover:text-white"
        >
          Buscar
        </button>
      </form>

      <div
        className="flex items-center space-x-4"
        role="group"
        aria-label="Área de autenticação do usuário"
      >
        {session ? (
          <UserMenu />
        ) : (
          <>
            <button
              aria-label="Entrar na conta"
              className="bg-white px-8 py-2 rounded-lg text-lg font-medium text-primary-green hover:bg-[#dddddd]"
              onClick={() => router.push("/login")}
            >
              Entrar
            </button>
            <button
              aria-label="Cadastrar nova conta"
              className="ring-2 ring-white ring-inset bg-primary-green w-28 py-2 rounded-lg text-lg font-medium text-white hover:bg-secondary-green"
              onClick={() => router.push("/register")}
            >
              Cadastrar
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
