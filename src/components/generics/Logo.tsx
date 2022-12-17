import Link from 'next/link'
import React from 'react'
import { GiAbstract089 } from 'react-icons/gi'

export const DutyLogo = () => {
  return (
    <Link href={'/'} className='flex space-x-2 items-center'>
      <GiAbstract089 />
      <h1 className='text-xl font-extrabold'>Duty</h1>
    </Link>
  )
}
