import fetcher from '@/lib/fetcher'
import { ProjectI } from '@/models'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { TextareaInput, TextInput } from '../forms'
import { SiteContainer } from '../generics'
import slugify from '@sindresorhus/slugify'
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid'
import toast, { Toaster } from 'react-hot-toast'
import { useDemoData } from '@/stores/useDemoData'
import { useSession } from 'next-auth/react'

interface DutyInputsProps {
  testFunction: () => Promise<void>
}

export const DutyInputs: FC<DutyInputsProps> = (props) => {
  const { testFunction } = props
  const code = useDemoData((s) => s.code)
  const { data: session } = useSession()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({})
  const slug = watch('slug')
  const [endpoint, setEndpoint] = React.useState('')

  const { data: project } = useSWR<ProjectI>(
    router.isReady &&
      `/api/internal/project?projectId=${router.query.projectId}`,
    fetcher
  )

  useEffect(() => {
    if (project) {
      setEndpoint(
        `https://tryduty.com/api/v1/${project.slug}/${slugify(slug || '')}`
      )
    }
  }, [project, slug])

  const onsubmit = async (data: any) => {
    const body = {
      ...data,
      code,
      endpoint,
      project: project?._id,
      pathToEndpoint: endpoint.split('/api/v1/')[1],
      user: session?.user?.id,
    }
    const res = await fetch('/api/internal/duty', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.ok) {
      toast.success('Duty created!')
      router.push(`/project/${project?._id}`)
    }
  }

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <Toaster />
      <SiteContainer>
        <div className='space-y-2 pb-4'>
          <h1 className='text-4xl font-bold pt-10'>Duty Details</h1>
        </div>
        <div className='flex flex-col space-y-4'>
          <div className='flex-1 space-y-4'>
            <div className='flex space-x-4 w-full'>
              <TextInput
                register={register}
                name='name'
                error={errors.name}
                rules={{ required: 'Name is required' }}
                label='Duty name'
                placeholder='Scrape the web'
                className='w-[15vw]'
              />
              <TextInput
                register={register}
                name='slug'
                error={errors.slug}
                rules={{ required: 'Slug is required' }}
                label='Duty Slug'
                placeholder='scrape-the-web'
                className='w-[15vw]'
              />
              <div className='w-full'>
                <label className='font-medium text-sm'>Endpoint:</label>
                <div className='flex justify-between items-center px-4 py-1.5 bg-zinc-800 rounded text-xs'>
                  <p className='text-green-500'>{endpoint}</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(endpoint)
                      toast.success('Copied to clipboard')
                    }}
                    className='bg-blue-600 p-1 rounded text-xs'
                  >
                    <ClipboardDocumentCheckIcon className='w-5 h-5' />
                  </button>
                </div>
              </div>
            </div>
            <TextareaInput
              register={register}
              name='description'
              error={errors.description}
              rules={{ required: 'Description is required' }}
              label='Duty Description'
              placeholder='This endpoint scrapes the web'
            />
          </div>
          <div className='flex space-x-4'>
            <button
              type='button'
              onClick={testFunction}
              className='w-full bg-blue-600 py-4 rounded'
            >
              Test function
            </button>
            <button type='submit' className='w-full bg-blue-600 py-4 rounded'>
              Save function
            </button>
          </div>
        </div>
      </SiteContainer>
    </form>
  )
}
