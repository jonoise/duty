import React from 'react'
import EditorNavContainer from './EditorNavContainer'

const Filetree = () => {
  return (
    <div className='flex flex-col w-1/6 border-r- border-cyan-400 px-2 '>
      <EditorNavContainer>
        <div className='w-full flex justify-between'>
          <p className='text-[9px]'>Files</p>
          <p className='text-[9px]'>Files</p>
        </div>
      </EditorNavContainer>
      <h1 className='text-cyan-400'>Carpetas/Archivos</h1>

      <div className='flex flex-col w-full bg-stone-900 px-2 py-1 text-sm'>
        <p>Archivo 1</p>
      </div>
    </div>
  )
}

export default Filetree
