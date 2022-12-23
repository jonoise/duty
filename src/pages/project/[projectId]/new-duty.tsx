import { DemoEditor, DemoOutput } from '@/components/duty'
import { MainLayout } from '@/components/layouts/main'
import { DutyInputs } from '@/components/Oldduty/DutyInputs'
import { InstructionsModal } from '@/components/project'
import ProjectLinksSubnavbar from '@/components/project/LinksSubnavbar'
import { testFunction } from '@/lib/testFunction'
import { useDutyData } from '@/stores/useDutyData'
import React from 'react'

const NewDuty = () => {
  const dutyData = useDutyData()

  return (
    <>
      <InstructionsModal />
      <MainLayout LinksSubnavbar={ProjectLinksSubnavbar}>
        <div className='space-y-2 pb-4'>
          <h1 className='text-4xl font-bold'>New Duty</h1>
        </div>
        <div className='space-y-5'>
          <DutyInputs testFunction={testFunction} />
          <div className='flex'>
            <div className='flex-1'>
              <DemoEditor
                code={dutyData.code}
                setCode={dutyData.setCode}
                testFunction={testFunction}
              />
            </div>
            <div className='w-2/5'>
              <DemoOutput
                output={dutyData.output}
                outputLoading={dutyData.outputLoading}
              />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default NewDuty
