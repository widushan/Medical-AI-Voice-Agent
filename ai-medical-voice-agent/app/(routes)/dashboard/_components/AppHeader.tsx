"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const menuOptions = [
  { id: 1, name: 'Home', path: '/dashboard' },
  {
    id: 2,
    name: 'History',
    path: '/dashboard/history'
  }
]
 
export default function AppHeader() {
  const pathname = usePathname()
  return (
    <div className='flex items-center justify-between p-4 px-10 md:px-20 lg:px-40'>
      <Link href="/dashboard">
        <Image src="/logo.jpeg" alt="logo" width={200} height={150} />
      </Link>
      <nav className='hidden md:flex gap-12 items-center'>
        {menuOptions.map((option) => (
          <Link
            key={option.id}
            href={option.path}
            className={`hover:font-bold cursor-pointer ${pathname === option.path ? 'font-bold' : ''}`}
          >
            {option.name}
          </Link>
        ))}
      </nav>
      <UserButton />
    </div>
  )
}
 