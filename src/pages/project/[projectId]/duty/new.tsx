import { DemoEditor, DemoOutput } from '@/components/duty'
import { SiteContainer } from '@/components/generics'
import { DutyInputs } from '@/components/Oldduty/DutyInputs'
import { InstructionsModal } from '@/components/project'
import { posibleError } from '@/data/demo'
import { useDemoData } from '@/stores/useDemoData'
import React from 'react'

const NewDuty = () => {
  const data = useDemoData()

  const testFunction = async () => {
    data.setOutputLoading(true)
    const res = await fetch(`/api/test`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code: data.code }),
    })
    if (res.ok) {
      const json = await res.json()
      if (!json.result) {
        data.setOutput(JSON.stringify(posibleError, null, 2))
      } else {
        data.setOutput(JSON.stringify(json.result, null, 2))
      }
    } else {
      data.setOutput(JSON.stringify(await res.json(), null, 2))
    }
    data.setOutputLoading(false)
  }

  return (
    <>
      <InstructionsModal />
      <div className='space-y-5'>
        <DutyInputs testFunction={testFunction} />
        <SiteContainer>
          <div className='flex'>
            <div className='flex-1'>
              <DemoEditor
                code={data.code}
                setCode={data.setCode}
                onSubmit={testFunction}
              />
            </div>
            <div className='w-2/5'>
              <DemoOutput output={data.output} />
            </div>
          </div>
        </SiteContainer>
      </div>
    </>
  )
}

export default NewDuty
