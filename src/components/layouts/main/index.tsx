import { FC, PropsWithChildren } from 'react'
import React from 'react'
import {
  Breadcrumbs,
  DutyLogo,
  SiteContainer,
  UserSettingsDropdown,
} from '@/components/generics'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface MainLayoutProps extends PropsWithChildren<{}> {
  LinksSubnavbar?: React.FC<{}>
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  return (
    <div className='bg-black'>
      <nav className='border-b border-zinc-800 px-2'>
        <SiteContainer>
          <div className='h-16 flex justify-between items-center flex-1'>
            <DutyLogo />
            <UserSettingsDropdown />
          </div>
          {props.LinksSubnavbar && <props.LinksSubnavbar />}
        </SiteContainer>
      </nav>
      <section>
        <SiteContainer>
          <Breadcrumbs />
        </SiteContainer>
      </section>
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
