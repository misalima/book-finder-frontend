"use client";
import { useState } from "react";
import { useList } from "@/hooks/useList";
import { AiOutlineClose } from "react-icons/ai";

interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void; // To refetch the lists after creating a new one
}

export default function CreateListModal({
  isOpen,
  onClose,
  refetch,
}: CreateListModalProps) {
  const [listName, setListName] = useState<string>("");
  const [listVisibility, setListVisibility] = useState<0 | 1>(0); // 0 for public, 1 for private

  const { mutate: createList } = useList.Create(); // Assuming you have a hook for list creation

  const handleSelect = (e: any) => {
    let vis: 0 | 1 = e.target.value; 
    if(e.target.value === 0 || e.target.value === 1) {
        setListVisibility(vis);
    }
  }
  const handleCreateList = () => {
    if (listName.trim() === "") {
      alert("Please enter a list name.");
      return;
    }


    createList(
      { name: listName, list_visibility: listVisibility, type: 1 },
      {
        onSuccess: () => {
          refetch(); // Refresh the lists after successful creation
          onClose(); // Close the modal
        },
        onError: (error: any) => {
          console.error("Error creating list:", error);
          alert("Failed to create the list. Please try again.");
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-dark-grey p-6 rounded-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-white text-xl">Create New List</h2>
          <button onClick={onClose}>
            <AiOutlineClose className="text-white text-2xl" />
          </button>
        </div>
        <div className="mt-4">
          <label className="block text-white mb-2">List Name</label>
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
            placeholder="Enter list name"
          />
        </div>
        <div className="mt-4">
          <label className="block text-white mb-2">Visibility</label>
          <select
            value={listVisibility}
            onChange={(e) => handleSelect(e)}
            className="w-full p-2 rounded bg-gray-800 text-white"
          >
            <option value={0}>Public</option>
            <option value={1}>Private</option>
          </select>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={handleCreateList}
            className="bg-primary-green text-white p-3 rounded hover:bg-emerald-900"
          >
            Create List
          </button>
        </div>
      </div>
    </div>
  );
}
