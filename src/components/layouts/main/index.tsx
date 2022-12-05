import React, { FC, PropsWithChildren } from 'react'
import MainLayoutNavbar from './nav'

const MainLayout: FC<PropsWithChildren> = (props) => {
  return (
    <>
      <MainLayoutNavbar />
      {props.children}
    </>
  )
}

export default MainLayout
