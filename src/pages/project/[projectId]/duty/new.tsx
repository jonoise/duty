import { DutyInputs } from '@/components/duty/DutyInputs'
import DutyEditor from '@/components/duty/Editor'
import { InstructionsModal } from '@/components/project'
import React from 'react'

const NewDuty = () => {
  return (
    <>
      <InstructionsModal />
      <div className='space-y-5'>
        <DutyInputs />
        <DutyEditor />
      </div>
    </>
  )
}

export default NewDuty
