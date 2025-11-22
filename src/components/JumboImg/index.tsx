import Image from "next/image";
import React from "react";

export default function JumboImg() {
  return (
    <div className="fixed top-0 h-full w-full -z-50">
      <Image 
        style={ {opacity: "0.7"} } 
        fill={true} 
        src={"/images/background.png"}
        aria-label="Imagem de fundo da página inicial"
        alt="Prateleiras com livros"
      />
    </div>
  );
}
