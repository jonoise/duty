import React from 'react'
import {
  DutyLogo,
  SiteContainer,
  UserSettingsDropdown,
} from '@/components/generics'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useLastPath } from 'next-last-path'

export const ProjectLayoutNavbar = () => {
  const router = useRouter()
  return (
    <nav className='border-b border-zinc-800 px-2'>
      <SiteContainer>
        <div className='h-16 flex justify-between items-center flex-1'>
          <DutyLogo />
          <UserSettingsDropdown />
        </div>
        <div className='flex space-x-4 text-zinc-500 text-sm'>
          {projectNavigation.map((item) => (
            <Link href={item.href(router.query.projectId as string)}>
              {item.name}
            </Link>
          ))}
        </div>
      </SiteContainer>
    </nav>
  )
}

const projectNavigation = [
  {
    id: 1,
    name: 'General',
    href: (projectId: string) => `/project/${projectId}`,
    path: '[projectId]',
  },
  {
    id: 2,
    name: 'API Keys',
    href: (projectId: string) => `/project/${projectId}/keys`,
    path: 'keys',
  },
  {
    id: 3,
    name: 'Environment Variables',
    href: (projectId: string) => `/project/${projectId}/env`,
    path: 'env',
  },
  // {
  //   id: 4,
  //   name: 'Alerts',
  //   href: (projectId: string) => `/project/${projectId}/alerts`,
  //   path: 'alerts',
  // },
  // {
  //   id: 5,
  //   name: 'Settings',
  //   href: (projectId: string) => `/project/${projectId}/settings`,
  //   path: 'settings',
  // },
  // {
  //   id: 6,
  //   name: 'Billing',
  //   href: (projectId: string) => `/project/${projectId}/billing`,
  //   path: 'billing',
  // },
]
