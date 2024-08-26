import Image from "next/image";
import React from "react";

export default function NavBar() {
  return (
    <header className="z-50 px-8 md:px-40 h-24 w-full bg-primary-green flex items-center justify-between">
      <Image
        className="max-h-[60px] cursor-pointer"
        alt="logo"
        width={160}
        height={60}
        src={"/images/logo.png"}
      ></Image>
      <div className="flex gap-3">
        <button className="bg-white w-28 py-2 rounded-lg text-lg font-medium text-primary-green hover:bg-[#dddddd]">
          Entrar
        </button>
        <button className="ring-2 ring-white ring-inset bg-primary-green w-28 py-2 rounded-lg text-lg font-medium text-white hover:bg-secondary-green">
          Cadastrar
        </button>
      </div>
    </header>
  );
}
