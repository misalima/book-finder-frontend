import { IBook } from '@/types/book'
import Image from 'next/image'
import React from 'react'

export default function BookThumb({title, coverUrl, ratingsNumber, avgRating}: IBook) {
  return (
    <div className="cursor-pointer px-2 py-2 bg-white mr-2 rounded-lg shadow-lg">
      <img src={coverUrl} className="w-[220px] h-[330px] rounded-lg" alt={title} />
      <div className="flex justify-end mt-2 px-2 items-center">
        <p className='text-lg font-semibold mr-2'>{avgRating}</p>
        <p className=''>({ratingsNumber})</p>
      </div>
    </div>
  );
}
