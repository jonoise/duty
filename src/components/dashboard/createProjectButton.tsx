import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { TextInput } from '@/components/inputs'
import { FieldValues, useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import ky from 'ky'
import { toast, Toaster } from 'react-hot-toast'
import { mutate } from 'swr'
export const NewProjectButton = () => {
  let [isOpen, setIsOpen] = useState(false)
  let [loading, setLoading] = useState(false)

  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: FieldValues) => {
    setLoading(true)
    try {
      const res = await ky
        .get(`/api/internal/more-projects`)
        .json<{ canCreateMoreProjects: boolean }>()
      if (!res.canCreateMoreProjects) {
        toast.error('You need to upgrade your plan to create more projects')
        setLoading(false)
        return
      }
    } catch (error) {
      console.log(error)
    }

    try {
      await ky.post('/api/internal/project', {
        json: { ...data, userId: session?.user.id },
      })
      toast.success('Project created successfully')
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
    mutate('/api/internal/project')
  }

  return (
    <>
      <Toaster />
      <button
        onClick={() => setIsOpen(true)}
        className='px-5 py-1 bg-sky-600 rounded'
      >
        Create Project
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={() => setIsOpen(false)} className='relative z-50'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/30' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='fixed inset-0 flex items-center justify-center p-4'>
              <Dialog.Panel className={'w-1/3 bg-gray-800 p-5 rounded-lg '}>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                  <h1 className='text-2xl'>New Project</h1>
                  <TextInput
                    register={register}
                    name='name'
                    error={errors.name}
                    rules={{ required: 'Name is required' }}
                    label='Project Name'
                    placeholder='My awesome API endpoints'
                  />
                  <TextInput
                    register={register}
                    name='language'
                    error={errors.language}
                    label='Programming Language'
                    value={'javascript'}
                    disabled={true}
                  />
                  <div className='flex space-x-2'>
                    <TextInput
                      register={register}
                      name='db'
                      error={errors.language}
                      label='Database'
                      value={'MongoDB'}
                      disabled={true}
                    />
                    <TextInput
                      register={register}
                      name='region'
                      error={errors.language}
                      label='Region'
                      value={'N. Virginia (us-east-1)'}
                      disabled={true}
                    />
                  </div>

                  <div className='flex justify-end'>
                    <button
                      disabled={loading}
                      type='button'
                      className='px-5 py-1 bg-sky-600 rounded'
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={loading}
                      type='submit'
                      className='ml-2 px-5 py-1 bg-sky-600 rounded'
                    >
                      {loading ? 'Creating...' : 'Create'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
