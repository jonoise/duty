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
import { EnvCard, ProjectLinksSubnavbar, UpdateEnv } from '@/components/project'

const ProjectEnvVars = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { data: project, mutate } = useSWR<ProjectI>(
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
              <EnvCard
                key={env._id}
                env={env}
                project={project}
                mutate={mutate}
              />
            ))}
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default ProjectEnvVars
