import clsx from 'clsx'
import { useLastPath } from 'next-last-path'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const ProjectLinksSubnavbar = () => {
  const router = useRouter()
  const { lastPath } = useLastPath()
  return (
    <div className={'flex space-x-4 text-zinc-500 text-sm'}>
      {projectNavigation.map((item) => (
        <Link
          key={item.id}
          href={item.href(router.query.projectId as string)}
          className={clsx(
            'px-1',
            item.path(router.query.projectId as string) === lastPath &&
              'border-b-2'
          )}
        >
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
    name: 'Overview',
    href: (projectId: string) => `/project/${projectId}`,
    path: (projectId: string) => `${projectId}`,
  },
  {
    id: 2,
    name: 'API Keys',
    href: (projectId: string) => `/project/${projectId}/keys`,
    path: () => 'keys',
  },
  {
    id: 3,
    name: 'Environment Variables',
    href: (projectId: string) => `/project/${projectId}/env`,
    path: () => 'env',
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
