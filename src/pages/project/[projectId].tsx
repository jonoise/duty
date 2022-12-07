import { NewProjectButton, ProjectsList } from '@/components/dashboard'
import DashboardLayout from '@/components/layouts/dashboard'
import { CreateDutyButton } from '@/components/project'
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

  return (
    <DashboardLayout
      title={!project ? 'Loading project...' : `${project?.name}`}
      action={<CreateDutyButton />}
    >
      <div className='py-5 space-y-5'>
        <div className='w-full h-0.5 bg-zinc-700' />
        {error && <div>Failed to load</div>}
        {!!project?.duties && (
          <div>
            <p>
              No duties found for this project. Add a new duty to get started.
            </p>
          </div>
        )}
        {project && (
          <div className='flex flex-col space-y-5'>
            {project.duties.map((duty) => (
              <div className='flex flex-col space-y-5'>{duty.name}</div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default ProjectDetails
