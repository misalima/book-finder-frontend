"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import UserMenu from "../UserMenu";
import { SearchBooks } from "../SearchBooks/index";

const NavBar = () => {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <header className="z-50 px-8 md:px-40 h-24 w-full bg-primary-green flex items-center">
            <Link href="/">
                <Image
                    className="max-h-[60px] cursor-pointer"
                    alt="logo"
                    width={160}
                    height={60}
                    src="/images/logo.png"
                />
            </Link>
            <div className="flex items-center flex-1 px-16">
                <SearchBooks />
            </div>
            <div className="flex items-center space-x-4">
                {session ? (
                    <UserMenu/>
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
