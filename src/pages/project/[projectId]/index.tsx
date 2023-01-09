import { MainLayout } from '@/components/layouts/main'
import { CreateDutyButton } from '@/components/project'
import { datef, fromNow } from '@/lib/datef'
import fetcher from '@/lib/fetcher'
import { ProjectI } from '@/models'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import useSWR from 'swr'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { SearchBar } from '@/components/generics'
import { ProjectLinksSubnavbar } from '@/components/project'

const ProjectDetails = () => {
  const router = useRouter()

  const { data: project, error } = useSWR<ProjectI>(
    router.isReady &&
      `/api/internal/project?projectId=${router.query.projectId}`,
    fetcher
  )
  const [duties, setDuties] = React.useState<ProjectI['duties'] | undefined>(
    undefined
  )

  useEffect(() => {
    if (project) {
      setDuties(project.duties)
    }
  }, [project])

  console.log(project)

  return (
    <MainLayout LinksSubnavbar={ProjectLinksSubnavbar}>
      <div>
        <h1 className='text-xl'>{!project ? 'Loading...' : project?.name}</h1>
      </div>
      <div className='w-full flex space-x-4'>
        <SearchBar />
        <CreateDutyButton />
      </div>
      {error && <div>Failed to load</div>}
      {!duties && (
        <div>
          <p>Loading duties...</p>
        </div>
      )}
      {duties?.length === 0 && (
        <div>
          <p>
            No duties found for this project. Add a new duty to get started.
          </p>
        </div>
      )}
      {project && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {duties?.map((duty) => (
            <div
              key={duty._id}
              className='space-y-5 p-3 border border-zinc-800 bg-[#111] rounded'
            >
              <div className='flex items-center space-x-2'>
                <Link href={`/project/${project._id}/duty/${duty._id}`}>
                  <Image
                    width={32}
                    height={32}
                    src='/logo-sm.png'
                    alt='Duty Icon'
                    className='border border-zinc-600 rounded-full'
                  />
                </Link>
                <Link href={`/project/${project._id}/duty/${duty._id}`}>
                  <h2>{duty.name}</h2>
                </Link>
              </div>
              <div>
                <Link href={`/project/${project._id}/duty/${duty._id}`}>
                  <p className='text-sm font-light text-zinc-400'>
                    {duty.description}
                  </p>
                </Link>
              </div>
              <Link href={duty.endpoint} target='_blank'>
                <p className='text-xs font-light text-slate-300'>
                  {duty.endpoint}
                </p>
              </Link>
              <div>
                <Link href={`/project/${project._id}/${duty._id}`}>
                  <button className='w-full bg-blue-600 py-2 rounded'>
                    View Duty
                  </button>
                </Link>
              </div>
              <div className='flex space-x-2 items-center text-[10px] font-extralight text-zinc-400'>
                <PencilSquareIcon className='w-4 h-4' />
                <p>{fromNow(duty.updatedAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  )
}

export default ProjectDetails
