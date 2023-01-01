import React from 'react'
import {
  Battery100Icon,
  BoltIcon,
  CheckIcon,
  ServerStackIcon,
} from '@heroicons/react/24/solid'

export const HomePerks = () => {
  return (
    <div className='relative flex-1 space-y-5 pt-20 lg:pt-52 px-2'>
      <h1 className='text-7xl font-bold z-40 py-4'>SPEED IS KEY</h1>
      {cobePerks.map((perk) => (
        <div key={perk.id} className='flex space-x-2 items-center '>
          <div className='p-2 bg-gray-900 border border-blue-600 rounded'>
            <perk.Icon className='w-5 h-5 text-yellow-300' />
          </div>
          <p className='z-10 inline font-display text-xl lg:text-2xl tracking-tight'>
            {perk.title}
          </p>
        </div>
      ))}
      <div className='flex space-x-4 mt-4'>
        <button className='bg-blue-600 text-white m-0 p-0 rounded flex items-center px-5 py-2 text-sm font-bold'>
          TRY DUTY
        </button>
        <button className='bg-blue-600 text-white m-0 p-0 rounded flex items-center px-5 py-2 text-sm font-bold'>
          CREATE ACCOUNT
        </button>
      </div>
    </div>
  )
}

const cobePerks = [
  {
    id: 1,
    Icon: BoltIcon,
    title: 'Built on cutting-edge serverless technology.',
  },
  {
    id: 2,
    Icon: Battery100Icon,
    title: 'Designed to handle large amounts of traffic.',
  },
  {
    id: 3,
    Icon: ServerStackIcon,
    title: `Don't worry about scaling, patching, or maintaining your infrastructure.`,
  },
  {
    id: 4,
    Icon: CheckIcon,
    title:
      'Start free, then pay only for what you use with per-request pricing.',
  },
]
