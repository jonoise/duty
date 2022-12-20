import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const ProjectLinksSubnavbar = () => {
  const router = useRouter()

  return (
    <div className='flex space-x-4 text-zinc-500 text-sm'>
      {projectNavigation.map((item) => (
        <Link key={item.id} href={item.href(router.query.projectId as string)}>
          {item.name}
        </Link>
      ))}
    </div>
  )
}

export default ProjectLinksSubnavbar

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
