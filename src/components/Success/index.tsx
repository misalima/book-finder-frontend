import React from "react";
import { MdDone, MdError } from "react-icons/md";

type ErrorProps = {
  message: string;
};

export default function Success({ message }: ErrorProps) {
  return (
    <div className="flex items-center w-full bg-emerald-400 text-lg text-white rounded-md px-4 py-3 mb-4">
      <MdDone className="text-2xl mr-3" />
      {message}
    </div>
  );
}
