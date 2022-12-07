import React, { FC } from 'react'

export const DashboardLayoutHeader: FC<Props> = (props) => {
  return (
    <div className='pt-5 flex w-full justify-between '>
      <h1 className='text-3xl font-bold text-sky-400'>{props.title}</h1>
      {props.action}
    </div>
  )
}

interface Props {
  title: string
  action: React.ReactElement
}
