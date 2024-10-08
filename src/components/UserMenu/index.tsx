"use client";
import React, { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";


export default function UserMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="bg-dark-grey px-4 py-2 rounded-lg text-white font-medium flex items-center hover:bg-gray-600"
      >
        {session?.user?.name}
        <FaChevronDown className="ml-2 text-white" />
      </button>
      <div
        className={`absolute right-0 mt-2 w-48 bg-dark-grey border rounded-lg shadow-lg transition-all duration-300 ease-out ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ overflow: "hidden" }}
      >
        <div className="flex flex-col">
          <Link href={`/user/${session?.user?.id}`}>
            <button onClick={toggleMenu} className="w-full px-4 py-2 text-left text-white hover:bg-gray-100 hover:text-primary-green">
              Meu Perfil
            </button>
          </Link>
          
          <button
            onClick={async () => {
               await signOut({ redirect: true, callbackUrl: "/" });
              toggleMenu();
             
            }}
            className="w-full px-4 py-2 text-left text-white hover:bg-gray-100 hover:text-primary-green"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
