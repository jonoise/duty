import React from 'react'
import s from './multicolor.module.css'
const FullscreenLoader = () => {
  return (
    <div className='w-full h-full'>
      <div className={s.loader}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default FullscreenLoader
