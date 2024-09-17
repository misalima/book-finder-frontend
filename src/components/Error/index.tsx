import React from "react";
import { BiError } from "react-icons/bi";
import { MdError } from "react-icons/md";

type ErrorProps = {
  message: string;
};

export default function Error({ message }: ErrorProps) {
  return (
    <div className="flex items-center w-full bg-red-400 text-lg text-white rounded-md px-4 py-3 mb-4">
      <MdError className="text-2xl mr-3"/>
      {message}
    </div>
  );
}
