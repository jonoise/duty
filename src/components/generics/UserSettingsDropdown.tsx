import { Menu, Transition } from '@headlessui/react'
import React, { FC } from 'react'
import { useSession } from 'next-auth/react'
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
            <Link href={'/logout'} passHref>
              <Menu.Item>
                <div className='px-2 py-1 flex items-center space-x-2 hover:bg-[#111]'>
                  <p className='text-xs font-light'>Logout 🏄‍♀️</p>
                </div>
              </Menu.Item>
            </Link>
          </Menu.Items>
        ) : (
          <Menu.Items
            className={clsx(
              dark ? 'bg-black border border-zinc-800' : 'bg-white',
              'absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
            )}
          >
            <div className='px-5 py-2 text-gray-700 space-y-6'>
              <Link href={`/login`} passHref>
                <div className='flex flex-col items-center w-full'>
                  <img
                    className='h-16 w-16 rounded-full cursor-pointer'
                    alt=''
                  />
                  <h1 className='text-center text-gray-700 text-lg font-bold'>
                    Empieza a bloguear en tu idioma con{' '}
                    <span
                      className={clsx(
                        dark ? 'text-sky-300' : 'text-indigo-500',
                        'font-bold  cursor-pointer'
                      )}
                    >
                      Los Junior
                    </span>
                  </h1>
                </div>
              </Link>
              <div className='flex justify-evenly space-x-4'>
                <Link href={`/login`}>
                  <button>Entrar</button>
                </Link>
                <Link href={`/register`}>
                  <button>Registrarme</button>
                </Link>
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
]
