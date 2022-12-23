import fetcher from '@/lib/fetcher'
import { ProjectI } from '@/models'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { TextareaInput, TextInput } from '../forms'
import slugify from '@sindresorhus/slugify'
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid'
import toast, { Toaster } from 'react-hot-toast'
import { DutyData, useDutyData } from '@/stores/useDutyData'
import { useSession } from 'next-auth/react'

interface UpdateDutyInputsProps {
  testFunction: (dutyData: DutyData) => Promise<void>
  name?: string
  description?: string
  slug?: string
}

export const UpdateDutyInputs: FC<UpdateDutyInputsProps> = (props) => {
  const { name, description, slug, testFunction } = props

  const { data: session } = useSession()

  const router = useRouter()

  const dutyData = useDutyData()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({})

  const slugWatched = watch('slug')

  const [endpoint, setEndpoint] = React.useState('')

  const { data: project } = useSWR<ProjectI>(
    router.isReady &&
      `/api/internal/project?projectId=${router.query.projectId}`,
    fetcher
  )

  useEffect(() => {
    if (project) {
      setEndpoint(
        `https://tryduty.com/api/v1/${project.slug}/${slugify(
          slugWatched || ''
        )}`
      )
    }
  }, [project, slugWatched])

  useEffect(() => {
    if (name) {
      setValue('name', name)
    }
    if (description) {
      setValue('description', description)
    }
    if (slug) {
      setValue('slug', slug)
    }
  }, [name, description, slug])

  const onsubmit = async (data: any) => {
    const body = {
      ...data,
      slug: slugify(data.slug),
      code: dutyData.code,
      endpoint,
      project: project?._id,
      pathToEndpoint: endpoint.split('/api/v1/')[1],
      user: session?.user?.id,
    }

    const res = await fetch(
      `/api/internal/duty?dutyId=${router.query.dutyId}`,
      {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
    if (res.ok) {
      toast.success('Duty updated!')
      router.push(`/project/${project?._id}`)
    } else {
      const json = await res.json()
      toast.error(json.error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className='flex flex-col space-y-4'>
        <div className='flex-1 space-y-4'>
          <div className='flex space-x-4 w-full'>
            <TextInput
              register={register}
              name='name'
              error={errors.name}
              rules={{ required: 'Name is required' }}
              label='Name'
              placeholder='Scrape the web'
              className='w-[15vw] bg-zinc-900 border-zinc-800 placeholder:text-gray-500'
            />
            <TextInput
              register={register}
              name='slug'
              error={errors.slug}
              rules={{ required: 'Slug is required' }}
              label='Slug'
              placeholder='scrape-the-web'
              className='w-[15vw] bg-zinc-900 border-zinc-800 placeholder:text-gray-500'
            />
            <div className='w-full'>
              <label className='font-medium text-sm'>Endpoint:</label>
              <div className='flex justify-between items-center px-4 py-1.5 bg-zinc-900 border-zinc-800 rounded text-xs'>
                <p className='text-green-500'>{endpoint}</p>
                <button
                  type='button'
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
            label='Description'
            placeholder='This endpoint scrapes the web'
            className='bg-zinc-900 border-zinc-800 placeholder:text-gray-500'
          />
        </div>
        <div className='flex space-x-4'>
          <button
            type='button'
            onClick={() => testFunction(dutyData)}
            className='w-full bg-blue-600 py-4 rounded'
          >
            Test function
          </button>
          <button type='submit' className='w-full bg-blue-600 py-4 rounded'>
            Save function
          </button>
        </div>
      </div>
    </form>
  )
}
