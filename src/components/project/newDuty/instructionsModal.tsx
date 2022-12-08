import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'

export const InstructionsModal = () => {
  let [isOpen, setIsOpen] = useState(true)

  return (
    // Use the `Transition` component at the root level
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => setIsOpen(false)}>
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

        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <div className='absolute w-full top-0 left-0 flex h-screen items-center justify-center p-4'>
            <Dialog.Panel
              className={`bg-white text-black max-w-md px-5 pb-5 rounded-lg`}
            >
              <div className='flex justify-between items-center py-5'>
                <h2 className={`font-semibold text-xl`}>Javascript Sandbox</h2>
                <Image
                  src={'/js-logo.svg'}
                  alt='Javascript logo'
                  width={25}
                  height={25}
                />
              </div>
              <p className={``}>
                This environment lets you write javascript in a safe way and
                test your code before deploying your duty.
              </p>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
