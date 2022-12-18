import { FC, PropsWithChildren } from 'react'
import { SiteContainer } from '@/components/generics'
import { ProjectLayoutNavbar } from './navbar'

export const ProjectLayout: FC<PropsWithChildren> = (props) => {
  return (
    <div className='bg-black'>
      <ProjectLayoutNavbar />
      <SiteContainer>
        <div className='flex flex-col'>
          <div className='flex flex-col flex-1 overflow-hidden'>
            <main className='flex-1 overflow-x-hidden overflow-y-auto'>
              <div className='py-5 space-y-5 mx-auto'>{props.children}</div>
            </main>
          </div>
        </div>
      </SiteContainer>
    </div>
  )
}
