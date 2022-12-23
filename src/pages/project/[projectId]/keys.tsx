import { MainLayout } from '@/components/layouts/main'
import ProjectLinksSubnavbar from '@/components/project/LinksSubnavbar'
import React from 'react'

const ProjectApiKeys = () => {
  return (
    <MainLayout LinksSubnavbar={ProjectLinksSubnavbar}>
      <div>
        <h1 className='text-xl'>{'API Keys'}</h1>
      </div>
    </MainLayout>
  )
}

export default ProjectApiKeys
