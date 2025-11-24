import Image from "next/image";
import React from "react";

export default function JumboImg() {
  return (
    <div className="fixed top-0 h-full w-full -z-50">
      <Image 
        style={ {opacity: "0.7"} } 
        fill={true} 
        src={"/images/background.png"}
        alt=""
        aria-hidden="true"
        className="pointer-events-none"
      />
    </div>
  );
}
