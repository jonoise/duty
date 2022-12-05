import React, { FC, PropsWithChildren } from 'react'

const EditorNavContainer: FC<PropsWithChildren> = (props) => {
  return (
    <nav className='h-[40px] flex items-center px-2 bg-[#2F3238]'>
      {props.children}
    </nav>
  )
}

export default EditorNavContainer
