import { SiteContainer } from '@/components/generics/SiteContainer'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { GiAbstract089 } from 'react-icons/gi'

const MainLayoutNavbar = () => {
  const { data: session } = useSession()
  return (
    <nav>
      <SiteContainer>
        <div className='flex justify-between items-center h-16'>
          <div className='flex space-x-2 items-center'>
            <GiAbstract089 />
            <h1 className='text-xl font-extrabold'>Duty</h1>
          </div>
          <div className='hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8 md:flex md:items-center '>
            <Link
              href='/pricing'
              className='inline-flex items-center px-1 pt-1 text-sm font-bold'
            >
              Pricing
            </Link>
            {session ? (
              <button
                onClick={() => signOut()}
                className='border border-pink-600 m-0 p-0 rounded-full flex items-center px-5 py-2 text-sm font-bold'
              >
                Logout
              </button>
            ) : (
              <Link
                href='/signup'
                className='bg-pink-600 m-0 p-0 rounded-full flex items-center px-5 py-2 text-sm font-bold'
              >
                Sign up
              </Link>
            )}
          </div>
        </div>
      </SiteContainer>
    </nav>
  )
}

export default MainLayoutNavbar
