import { TextInput } from '@/components/forms'
import { SearchBar } from '@/components/generics'
import { MainLayout } from '@/components/layouts/main'
import fetcher from '@/lib/fetcher'
import { ProjectI } from '@/models'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'
import useSWR from 'swr'
import {
  VariableIcon,
  TrashIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'
import ProjectLinksSubnavbar from '@/components/project/LinksSubnavbar'

const ProjectEnvVars = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const {
    data: project,
    error,
    mutate,
  } = useSWR<ProjectI>(
    router.isReady &&
      `/api/internal/project?projectId=${router.query.projectId}`,
    fetcher
  )
  const onSubmit = async (data: any) => {
    const res = await fetch(`/api/internal/env`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...data,
        project: project?._id,
        user: project?.user,
      }),
    })
    if (res.ok) {
      toast.success('Environment variable added.')
      mutate()
    }
  }
  console.log(project)
  return (
    <>
      <MainLayout LinksSubnavbar={ProjectLinksSubnavbar}>
        <h1 className='text-xl'>{'Environment Variables'}</h1>

        <div className='w-full flex space-x-4'>
          <SearchBar />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-[#111] p-4 rounded border border-zinc-800 space-y-4'
        >
          <h2 className='text-lg'>Add a new environment variable.</h2>
          <p className='text-sm text-zinc-400 font-light'>
            You can access environment variables directly from within your
            duties using the `process` object.
          </p>
          <div className='flex w-full space-x-4 items-end'>
            <TextInput
              register={register}
              name='key'
              label='Key'
              error={errors.key}
              parentClassName='flex-1'
              placeholder='e.g. MONGO_URI'
              className='bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder:text-zinc-400'
            />
            <TextInput
              register={register}
              name='value'
              label='Value'
              error={errors.value}
              parentClassName='flex-1'
              className='bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder:text-zinc-400'
            />
            <button
              className='py-2 px-4 bg-blue-600 rounded h-min'
              disabled={!project}
            >
              Add
            </button>
          </div>
        </form>
        <div className='bg-[#111] p-4 rounded border border-zinc-800 space-y-4'>
          <div className='grid grid-cols-1 divide-y divide-zinc-700'>
            {project?.env.map((env) => (
              <div key={env._id} className='py-4'>
                <div className='flex space-x-4 items-center'>
                  <div className='w-8 h-8 rounded-full flex items-center justify-center bg-zinc-800 border border-zinc-700'>
                    <VariableIcon className='w-4 h-4' />
                  </div>
                  <div className='flex-1 space-y-1'>
                    <p className=''>{env.key}</p>
                  </div>
                  <div className='flex-1 space-y-1'>
                    <p className=''>{env.value}</p>
                  </div>
                  <button
                    className='py-2 px-2 bg-blue-600 rounded h-min'
                    onClick={async () => {
                      const res = await fetch(`/api/internal/env`, {
                        method: 'PUT',
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
                    <PencilIcon className='w-3 h-3' />
                  </button>
                  <button
                    className='py-2 px-2 bg-red-600 rounded h-min'
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
            ))}
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default ProjectEnvVars
