import { DemoEditor, DemoOutput } from '@/components/demo'
import { useDemoData } from '@/stores/useDemoData'
import React, { FC } from 'react'
import { GiAbstract089 } from 'react-icons/gi'

interface DutyLayoutProps {
  Filetree: JSX.Element
  Editor: JSX.Element
  Response: JSX.Element
}

const DutyLayout: FC<DutyLayoutProps> = (props): JSX.Element => {
  const data = useDemoData()

  const onSubmit = async () => {
    data.setOutputLoading(true)
    const res = await fetch(`/api/test`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code: data.code }),
    })
    if (res.ok) {
      const json = await res.json()
      data.setOutput(JSON.stringify(json.result, null, 2))
    } else {
      data.setOutput('Error')
    }
    data.setOutputLoading(false)
  }

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
      <div className='px-10'>
        <div className='flex'>
          <div className='flex-1'>
            <DemoEditor
              code={data.code}
              setCode={data.setCode}
              onSubmit={onSubmit}
            />
          </div>
          <div className='w-2/5'>
            <DemoOutput output={data.output} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DutyLayout
