import React from 'react'
import {
  VariableIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'
import { ProjectEnvI, ProjectI } from '@/models'
import { toast } from 'react-hot-toast'
import { UpdateEnv } from './UpdateEnv'

interface Props {
  env: ProjectEnvI
  project: ProjectI | undefined
  mutate: () => void
}

export const EnvCard = (props: Props) => {
  const [showEnv, setShowEnv] = React.useState(false)
  const [showUpdate, setShowUpdate] = React.useState(false)

  const { env, project, mutate } = props
  return (
    <div className='py-4'>
      <div className='flex space-x-4 items-center'>
        <div className='w-8 h-8 rounded-full flex items-center justify-center bg-zinc-800 border border-zinc-700'>
          <VariableIcon className='w-4 h-4' />
        </div>
        <div className='flex-1 space-y-1'>
          <p className=''>{env.key}</p>
        </div>
        <div className='flex-1 space-y-1'>
          <p className=''>
            {showEnv ? env.value : '••••••••••••••••••••••••••••••'}
          </p>
        </div>
        <div>
          <button
            className='py-2 px-2 bg-zinc-600 rounded-l h-min'
            onClick={() => setShowEnv(!showEnv)}
          >
            <EyeIcon className='w-3 h-3' />
          </button>
          <button
            className='py-2 px-2 bg-blue-600 h-min'
            onClick={async () => {
              setShowUpdate(!showUpdate)
            }}
          >
            <PencilIcon className='w-3 h-3' />
          </button>
          <button
            className='py-2 px-2 bg-red-600 rounded-r h-min'
            onClick={async () => {
              const res = await fetch(`/api/internal/env`, {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                  _id: env._id,
                  project: project?._id,
                  user: project?.user,
                }),
              })
              if (res.ok) {
                toast.success('Environment variable deleted.')
                mutate()
              }
            }}
          >
            <TrashIcon className='w-3 h-3' />
          </button>
        </div>
      </div>
      {showUpdate && <UpdateEnv env={env} />}
    </div>
  )
}
