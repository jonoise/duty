import { ProjectLayout } from '@/components/layouts/project'
import { CreateDutyButton, SearchBar } from '@/components/project'
import fetcher from '@/lib/fetcher'
import { ProjectI } from '@/models'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'

const ProjectDetails = () => {
  const router = useRouter()

  const { data: project, error } = useSWR<ProjectI>(
    router.isReady &&
      `/api/internal/project?projectId=${router.query.projectId}`,
    fetcher
  )

  const [duties, setDuties] = React.useState<ProjectI['duties']>([])

  return (
    <ProjectLayout>
      <div className='py-5 space-y-5'>
        <div className='w-full flex space-x-4'>
          <SearchBar />
          <CreateDutyButton />
        </div>
        {error && <div>Failed to load</div>}
        {duties.length === 0 && (
          <div>
            <p>
              No duties found for this project. Add a new duty to get started.
            </p>
          </div>
        )}
        {project && (
          <div className='flex flex-col space-y-5'>
            {duties.map((duty) => (
              <div key={duty._id} className='flex flex-col space-y-5'>
                {duty.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </ProjectLayout>
  )
}

export default ProjectDetails
