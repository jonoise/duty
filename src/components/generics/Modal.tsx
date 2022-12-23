import React, { Dispatch, SetStateAction } from 'react'
import { useState, Fragment, FC } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Toaster } from 'react-hot-toast'

export const Modal: FC<
  {
    children: ({
      setIsOpen,
    }: {
      setIsOpen: Dispatch<SetStateAction<boolean>>
    }) => JSX.Element
  } & { ActionComponent: FC<{ onOpen?: () => void }> }
> = (props) => {
  const { ActionComponent } = props
  let [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {<ActionComponent onOpen={() => setIsOpen(true)} />}

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
              <Dialog.Panel
                className={
                  'w-1/3 bg-[#111] border border-zinc-800 p-5 rounded-lg '
                }
              >
                {props.children({ setIsOpen })}
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
