import React, { FC } from 'react'

export const SearchBar: FC<{ placeholder?: string }> = (props) => {
  return (
    <input
      className='bg-[#111] w-full border-zinc-800 border rounded px-4 py-2 focus:outline-none focus:ring-0 focus:ring-offset-0 placeholder:text-zinc-700'
      placeholder={props.placeholder || 'Search'}
    />
  )
}
