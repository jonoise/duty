import ky from 'ky'
import { useSession } from 'next-auth/react'
import React, { FC, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { mutate } from 'swr'
import { TextInput, TextareaInput } from '@/components/forms'
import slugify from '@sindresorhus/slugify'
import { useRouter } from 'next/router'
import { ProjectI } from '@/models'

interface Props {
  setIsOpen?: (isOpen: boolean) => void
}

export const CreateProjectForm: FC<Props> = (props) => {
  const { setIsOpen } = props
  const router = useRouter()
  let [loading, setLoading] = useState(false)
  let [slugifyInput, setSlugifyInput] = useState('')

  const { data: session } = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm()

  useEffect(() => {
    const subscription = watch((val) => {
      setSlugifyInput(slugify(val.slug))
    })
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    setValue('slug', slugifyInput)
  }, [slugifyInput])

  const onSubmit = async (data: FieldValues) => {
    setLoading(true)

    const moreProjects = await fetch(`/api/internal/more-projects`)
    if (!moreProjects.ok)
      return toast.error('Something went wrong, please try again.')
    const { canCreateMoreProjects } = await moreProjects.json()
    if (!canCreateMoreProjects) {
      toast.error('You need to upgrade your plan to create more projects.')
      setLoading(false)
      return
    }

    const res = await fetch('/api/internal/project', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...data, userId: session?.user.id }),
    })
    if (!res.ok) return toast.error('Something went wrong, please try again.')
    const json = await res.json()
    toast.success('Project created successfully')
    setIsOpen && setIsOpen(false)

    router.push(`/project/${json._id}`)

    setLoading(false)
    mutate('/api/internal/project')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <h1 className='text-2xl'>New Project</h1>
      <TextInput
        register={register}
        name='name'
        error={errors.name}
        rules={{ required: 'Name is required' }}
        label='Project Name'
        placeholder='My awesome microservice'
        className='bg-zinc-900 border-zinc-800 placeholder:text-gray-500'
      />
      <div className='space-y-1'>
        <TextInput
          register={register}
          name='slug'
          error={errors.slug}
          rules={{ required: 'Slug is required' }}
          label='Project Slug'
          placeholder='my-unique-slug'
          className='bg-zinc-900 border-zinc-800 placeholder:text-gray-500'
        />
        <p className='text-xs'>
          endpoint:{' '}
          <span className=' text-blue-400'>{`https://tryduty.com/api/v1/${slugifyInput}`}</span>
        </p>
      </div>
      <TextareaInput
        register={register}
        name='description'
        error={errors.description}
        rules={{ required: 'Description is required' }}
        label='Project Description'
        placeholder='This project contains all the API endpoints for...'
        className='bg-zinc-900 border-zinc-800 placeholder:text-gray-500 min-h-16 max-h-16'
      />
      <div className='flex justify-end'>
        <button
          disabled={loading}
          type='button'
          className='px-5 py-1 bg-blue-600 rounded'
          onClick={() => setIsOpen && setIsOpen(false)}
        >
          Cancel
        </button>
        <button
          disabled={loading}
          type='submit'
          className='ml-2 px-5 py-1 bg-blue-600 rounded'
        >
          {loading ? 'Creating...' : 'Create'}
        </button>
      </div>
    </form>
  )
}
