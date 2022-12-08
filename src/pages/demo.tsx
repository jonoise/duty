import React, { FC, useState } from 'react'
import Editor from '../components/duty/Editor'
import { GiAbstract089 } from 'react-icons/gi'

interface DutyLayoutProps {
  Filetree: JSX.Element
  Editor: JSX.Element
  Response: JSX.Element
}

const DutyLayout: FC<DutyLayoutProps> = (props): JSX.Element => {
  return (
    <div className='bg-zinc-900 w-full h-screen text-white '>
      <nav className='w-full px-10'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex'>
            <div className='flex-shrink-0 flex space-x-1 items-center'>
              <GiAbstract089 />
              <p className='text-xl font-bold'>Duty</p>
            </div>
            <div className='hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'>
              <a
                href='#'
                className='border-indigo-500 text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
              >
                Dashboard
              </a>

              <a
                href='#'
                className='border-transparent text-gray-300 hover:border-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
              >
                Team
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className=' px-10'>
        <Editor />
      </div>
    </div>
  )
}

export default DutyLayout
