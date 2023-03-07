import clsx from 'clsx'
import { useLastPath } from 'next-last-path'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const DashboardLinksSubnavbar = () => {
  const { lastPath } = useLastPath()

  return (
    <div className='flex space-x-4 text-zinc-500 text-sm'>
      {dashboardNavigation.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={clsx('px-1', item.path === lastPath && 'border-b-2')}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}

const dashboardNavigation = [
  {
    id: 1,
    name: 'Overview',
    href: '/dashboard',
    path: 'dashboard',
  },
  {
    id: 3,
    name: 'Reports',
    href: '/dashboard/reports',
    path: 'reports',
  },
]
