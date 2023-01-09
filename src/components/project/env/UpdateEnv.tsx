import { TextInput } from '@/components/forms'
import { ProjectEnvI } from '@/models'
import { VariableIcon } from '@heroicons/react/24/outline'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  env: ProjectEnvI
}

export const UpdateEnv = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { env } = props
  return (
    <div className='flex space-x-4 items-center py-3'>
      <div className='w-8 h-8 rounded-full flex items-center justify-center bg-zinc-800 border border-zinc-700'>
        <VariableIcon className='w-4 h-4' />
      </div>
      <div className='flex-1 space-y-1'>
        <TextInput
          name='key'
          placeholder='Key'
          register={register}
          error={errors.key}
          defaultValue={env.key}
        />
      </div>
      <div className='flex-1 space-y-1'>
        <TextInput
          name='value'
          placeholder='Value'
          register={register}
          error={errors.value}
          defaultValue={env.value}
        />
      </div>

      <button className='px-4 py-1'>
        <span className='sr-only'>Save</span>
        Save
      </button>
    </div>
  )
}
