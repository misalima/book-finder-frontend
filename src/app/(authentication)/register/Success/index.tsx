import Link from "next/link";
import React from "react";

export default function Success() {
  return (
    <div className="max-w-[480px]">
      <h1 className="text-primary-green font-bold text-4xl">
        Sua conta foi criada com sucesso!
      </h1>
      <p className="text-lg leading-tight py-4">
        Agora é só fazer login usando os dados que você cadastrou, e começar a
        aproveitar sua conta no{" "}
        <span className="font-medium text-primary-green">Book Finder</span>!
      </p>
      <Link href={"/login"}>
        <button className="hover:bg-dark-grey text-2xl rounded-lg w-full font-medium bg-primary-green text-white p-2 mt-2">
          Ir para Login
        </button>
      </Link>
    </div>
  );
}
