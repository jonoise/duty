import fetcher from '@/lib/fetcher'
import { ProjectI } from '@/models'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { TextareaInput, TextInput } from '../forms'
import { SiteContainer } from '../generics'
import slugify from '@sindresorhus/slugify'
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid'
import toast, { Toaster } from 'react-hot-toast'

export const DutyInputs = () => {
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

  const onsubmit = () => {}

  return (
    <div>
      <Toaster />
      <SiteContainer>
        <div className='space-y-2 pb-4'>
          <h1 className='text-4xl font-bold pt-10'>Duty Details</h1>
        </div>
        <div className='flex space-x-5'>
          <form className='flex-1 space-y-4' onSubmit={handleSubmit(onsubmit)}>
            <div className='flex space-x-4 w-full'>
              <TextInput
                register={register}
                name='name'
                error={errors.description}
                rules={{ required: 'Name is required' }}
                label='Duty name'
                placeholder='Scrape the web'
                className='flex-1'
              />
              <TextInput
                register={register}
                name='slug'
                error={errors.description}
                rules={{ required: 'Slug is required' }}
                label='Duty Slug'
                placeholder='scrape-the-web'
                className='flex-1'
              />
            </div>
            <TextareaInput
              register={register}
              name='description'
              error={errors.description}
              rules={{ required: 'Descriptio is required' }}
              label='Duty Description'
              placeholder='This endpoint scrapes the web'
            />
          </form>
          <div
            className='flex-1 space-y-4 flex flex-col justify-between '
            onSubmit={handleSubmit(onsubmit)}
          >
            <div>
              <label className='font-medium text-sm'>Endpoint:</label>
              <div className='flex justify-between items-center px-4 py-1.5 bg-zinc-800 rounded text-xs'>
                <p className='text-green-500'>{endpoint}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(endpoint)
                    toast.success('Copied to clipboard')
                  }}
                  className='bg-pink-600 p-1 rounded text-xs'
                >
                  <ClipboardDocumentCheckIcon className='w-5 h-5' />
                </button>
              </div>
            </div>
            <div className='flex space-x-4'>
              <button className='w-full bg-pink-600 py-4 rounded'>
                Test function
              </button>
              <button className='w-full bg-pink-600 py-4 rounded'>
                Save function
              </button>
            </div>
          </div>
        </div>
      </SiteContainer>
    </div>
  )
}
