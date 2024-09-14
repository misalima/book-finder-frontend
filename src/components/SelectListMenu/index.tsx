import { IList } from "@/types/list";
import React, { MouseEvent } from "react";

interface SelectListMenuProps {
  lists: IList[];
  onSelect: (selectedList: IList | null) => void;
  menuPosition: { top: number; left: number };
}

export default function SelectListMenu({
  lists,
  onSelect,
  menuPosition,
}: SelectListMenuProps) {
  const handleSelect = (list: IList) => {
    onSelect(list);
  };

  return (
    <div
      className="absolute bg-white text-black shadow-lg rounded-lg border border-gray-300 w-64"
      style={{
        top: menuPosition.top,
        left: menuPosition.left,
        zIndex: 1000,
      }}
    >
      <ul className="py-1">
        {lists.map((list) => (
          <li
            key={list.id}
            onClick={() => handleSelect(list)}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer transition-colors duration-200 w-full"
          >
            {list.name}
          </li>
        ))}
        {lists.length === 0 && (
          <li className="px-4 py-2 text-gray-500">No lists available</li>
        )}
      </ul>
    </div>
  );
}
