import React from 'react'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import { ProjectI } from '@/models'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Modal } from '../generics'
import { CreateProjectForm } from '../forms'

export const ProjectsList = () => {
  const { data: projects } = useSWR<ProjectI[]>(
    '/api/internal/project',
    fetcher
  )

  return (
    <div className='w-full flex flex-col space-y-3'>
      <div className='flex space-x-3 items-center'>
        {projects?.length === 0 && (
          <div className='py-5'>
            <h1 className=''>
              No projects yet,{' '}
              <Modal
                ActionComponent={({ onOpen }) => (
                  <span
                    onClick={onOpen}
                    className='underline text-cyan-400 cursor-pointer'
                  >
                    create one
                  </span>
                )}
              >
                {({ setIsOpen }) => <CreateProjectForm setIsOpen={setIsOpen} />}
              </Modal>
              .
            </h1>
          </div>
        )}
      </div>
      <div className='flex space-x-4'>
        {projects?.map((project) => (
          <div
            key={project._id}
            className='relative w-52 h-52 bg-gray-800 rounded-lg px-4 py-3 space-y-2 flex flex-col justify-between'
          >
            <h1 className='text-xl font-bold'>{project.name}</h1>
            {project.duties.length === 0 && (
              <h1 className='text-[12px] font-light '>
                No duties yet,{' '}
                <Link href={`/project/${project._id}`}>
                  <span className='underline text-orange-500'>create one</span>.
                </Link>
              </h1>
            )}

            <Link href={`/project/${project._id}`}>
              <button className='bg-gradient-to-r from-indigo-500 to-blue-500 w-full rounded py-2'>
                Manage
              </button>
            </Link>
          </div>
        ))}
        <Modal
          ActionComponent={({ onOpen }) => (
            <div
              onClick={onOpen}
              className='relative cursor-pointer w-52 h-52 border border-zinc-800 bg-[#111] rounded px-4 py-3 space-y-2 flex flex-col justify-between'
            >
              <div className='flex-1 rounded border-4 border-dashed border-zinc-800 flex items-center justify-center'>
                <PlusIcon className='text-zinc-600 opacity-50 w-20 h-20 border-2 border-zinc-600 rounded-full' />
              </div>
              <button className='bg-gradient-to-tr from-zinc-900 to-zinc-800 w-full rounded py-2  text-zinc-400'>
                Add Project
              </button>
            </div>
          )}
        >
          {({ setIsOpen }) => <CreateProjectForm setIsOpen={setIsOpen} />}
        </Modal>
      </div>
    </div>
  )
}
