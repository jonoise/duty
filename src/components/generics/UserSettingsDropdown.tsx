import { Menu, Transition } from '@headlessui/react'
import React, { FC } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { HiHome, HiUserCircle, HiLogout } from 'react-icons/hi'
import clsx from 'clsx'
import Image from 'next/image'

export const UserSettingsDropdown: FC<{ dark?: boolean }> = ({ dark }) => {
  const { data: session, status } = useSession()
  const auth = status === 'authenticated'

  return (
    <Menu as='div' className='relative z-40'>
      <div>
        {auth ? (
          <Menu.Button className='flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-1'>
            <span className='sr-only'>Open user menu</span>
            <Image
              width={32}
              height={32}
              className='h-8 w-8 rounded-full'
              src={session?.user.image || '/logo-sm.png'}
              alt=''
            />
          </Menu.Button>
        ) : (
          <Menu.Button className='flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-1'>
            <span className='sr-only'>Open user menu</span>
            <Image
              width={32}
              height={32}
              className='h-8 w-8 rounded-full'
              src={session?.user.image || '/logo-sm.png'}
              alt=''
            />
          </Menu.Button>
        )}
      </div>
      <Transition
        as={'span'}
        enter='transition ease-out duration-200'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        {auth ? (
          <Menu.Items
            className={clsx(
              'absolute divide-y divide-zinc-800 border bg-black border-zinc-800 grid grid-cols-1 py-2 right-0 z-10 mt-2 w-48 origin-top-right rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
            )}
          >
            <div>
              {authNavigation.map((item) => (
                <Link key={item.id} href={item.href} passHref>
                  <Menu.Item>
                    <div className='px-2 py-1 flex items-center space-x-2 hover:bg-[#111]'>
                      <p className='text-xs font-light'>{item.name}</p>
                    </div>
                  </Menu.Item>
                </Link>
              ))}
            </div>
            <Menu.Item>
              <div
                onClick={() =>
                  signOut({
                    callbackUrl: '/',
                  })
                }
                className='px-2 py-1 flex items-center space-x-2 hover:bg-[#111]'
              >
                <p className='text-xs font-light'>Logout 🏄‍♀️</p>
              </div>
            </Menu.Item>
          </Menu.Items>
        ) : (
          <Menu.Items
            className={clsx(
              dark ? 'bg-black border border-zinc-800' : 'bg-white',
              'absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
            )}
          >
            <div className='h-52'>
              <div className='flex flex-col items-center justify-center h-full p-4 text-center space-y-4'>
                <div className='flex space-x-2 items-center'>
                  <Image
                    width={32}
                    height={32}
                    className='h-8 w-8 rounded-full border'
                    src={session?.user.image || '/logo-sm.png'}
                    alt=''
                  />
                  <h1>Duty ™</h1>
                </div>
                <h2>Deploy your next serverless API in seconds.</h2>
                <button className='px-4 py-2 bg-blue-600 rounded-full'>
                  Create Account
                </button>
              </div>
            </div>
          </Menu.Items>
        )}
      </Transition>
    </Menu>
  )
}

const authNavigation = [
  {
    id: 1,
    name: `Inicio`,
    href: `/`,
    Icon: HiHome,
  },
  {
    id: 3,
    name: `Dashboard`,
    href: `/dashboard`,
    Icon: HiUserCircle,
  },
  {
    id: 3,
    name: `Documentation`,
    href: `/docs`,
    Icon: HiUserCircle,
  },
]
