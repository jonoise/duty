import { DutyLogo } from '@/components/generics'
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
        <div className='flex justify-between items-center h-16 px-2'>
          <DutyLogo />
          <div className='hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8 md:flex md:items-center '>
            <p>Versión 0.3</p>
            {session && (
              <Link href={`/dashboard`} passHref>
                <button className='border border-blue-600 m-0 p-0 rounded flex items-center px-4 py-1 text-sm font-bold'>
                  Dashboard
                </button>
              </Link>
            )}
            {session ? (
              <button
                onClick={() => signOut()}
                className='border border-blue-600 m-0 p-0 rounded flex items-center px-4 py-1 text-sm font-bold'
              >
                Logout
              </button>
            ) : (
              <Link
                href='/signup'
                className='bg-blue-600 m-0 p-0 rounded-full flex items-center px-5 py-2 text-sm font-bold'
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
