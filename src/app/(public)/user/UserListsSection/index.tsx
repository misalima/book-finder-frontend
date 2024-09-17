"use client";

import ListBar from "@/components/ListBar";
import { IList } from "@/types/list";
import React, { useState, useEffect } from "react";

interface UserListsSectionProps {
  lists?: IList[];
}

export default function UserListsSection({ lists }: UserListsSectionProps) {
  const [arrayLists, setArrayLists] = useState<IList[]>([]);
  
  useEffect(() => {
    if (Array.isArray(lists)) {
      setArrayLists(lists);
    } else {
      setArrayLists([]);
    }
  }, [lists]);

  if (lists === undefined) {
    return <div className="h-screen bg-dark-grey text-white">Loading...</div>;
  }

  if (!Array.isArray(arrayLists)) {
    return (
      <div className="h-screen bg-dark-grey text-red-800">
        Ocorreu um erro. Por favor, tente novamente mais tarde.
      </div>
    );
  }

  return (
    <div>
      <h2 className="px-2 mt-4 text-3xl text-white">Lists</h2>
      <div className="flex flex-col gap-6 py-3">
        {arrayLists.length > 0 ? (
          arrayLists.map((list, index) => (
            <ListBar key={index} id={list.id || ""} name={list.name} />
          ))
        ) : (
          <p className="text-gray-400">Nenhuma lista encontrada.</p>
        )}
      </div>
    </div>
  );
}
