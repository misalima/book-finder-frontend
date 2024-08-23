import Image from 'next/image'
import React from 'react'

export default function NavBar() {
  return (
    <header className="z-50 px-40 h-24 w-full bg-primary-green flex items-center justify-between">
        <Image className='max-h-[60px] cursor-pointer' alt='logo' width={160} height={60} src={'/images/logo.png'}></Image>
        <button className='bg-white px-8 py-2 rounded-lg text-lg font-medium text-primary-green hover:bg-[#dddddd]'>Entrar</button>
    </header>
  )
}
