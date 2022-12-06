import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { TextInput } from '@/components/inputs'
import { useForm } from 'react-hook-form'

export const NewProjectButton = () => {
  let [isOpen, setIsOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='px-2 py-1 bg-zinc-800 rounded'
      >
        Create Project
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={() => setIsOpen(false)} className='relative z-50'>
          {/*
          Use one Transition.Child to apply one transition to the backdrop...
        */}
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

          {/*
          ...and another Transition.Child to apply a separate transition
          to the contents.
        */}
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <form
              onSubmit={handleSubmit((data) =>
                alert(JSON.stringify(data, null, 2))
              )}
              className='fixed inset-0 flex items-center justify-center p-4'
            >
              <Dialog.Panel
                className={'w-1/3 bg-gray-800 p-5 rounded-lg space-y-4'}
              >
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

                <div className='flex justify-end'>
                  <button
                    type='button'
                    className='px-2 py-1 bg-zinc-800 rounded'
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='ml-2 px-2 py-1 bg-zinc-800 rounded'
                  >
                    Create
                  </button>
                </div>
              </Dialog.Panel>
            </form>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
