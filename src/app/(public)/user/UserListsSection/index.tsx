import ListBar from '@/components/ListBar'
import { useList } from '@/hooks/useList';
import { IBook } from '@/types/book';
import { IList } from '@/types/list';
import React from 'react'

interface UserListsSectionProps {
  lists: IList[];
}

export default function UserListsSection({ lists }: UserListsSectionProps) {
  const books: IBook[] = [];
  return (
    <div>
      <h2 className="px-2 mt-4 text-3xl text-white">Lists</h2>
      <div className="flex flex-col gap-6 py-3">
        {lists.map((list, index) => (
          <ListBar key={index} id={list.id} name={list.name} books={books}/>
        ))}
      </div>
    </div>
  );
}
