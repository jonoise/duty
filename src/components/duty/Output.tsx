import { useDutyData } from '@/stores/useDutyData'
import { xcodeDark } from '@uiw/codemirror-theme-xcode'
import ReactCodeMirror from '@uiw/react-codemirror'
import React, { FC } from 'react'

interface Props {
  output: string
  outputLoading: boolean
}

export const DemoOutput: FC<Props> = (props) => {
  const { output, outputLoading } = props

  const data = useDutyData()

  return outputLoading ? (
    <div className='h-[460px] w-full bg-zinc-800'>
      <div className='flex justify-center items-center h-full'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-100' />
      </div>
    </div>
  ) : (
    <ReactCodeMirror
      value={output}
      theme={xcodeDark}
      height='460px'
      style={{ fontSize: '14px' }}
      lang={'json'}
      readOnly={true}
    />
  )
}
