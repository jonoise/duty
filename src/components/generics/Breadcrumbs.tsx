import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const Breadcrumbs = () => {
  const router = useRouter()
  const breadcrumbs = React.useMemo(
    function generateBreadcrumbs() {
      const pathnameWithoutQuery = router.pathname.split('?')[0]
      const pathnameNestedRoutes = pathnameWithoutQuery
        .split('/')
        .filter((v) => v.length > 0)

      const asPathWithoutQuery = router.asPath.split('?')[0]
      const asPathNestedRoutes = asPathWithoutQuery
        .split('/')
        .filter((v) => v.length > 0)

      const crumblist = pathnameNestedRoutes.map((path, idx) => {
        let href = ''
        let subpath = capitalize(path)

        if (path.startsWith('[') && path.endsWith(']')) {
          subpath = mapDynamicRoute(path)
        }
        if (path === 'project') {
          href = '/dashboard'
          subpath = 'Dashboard'
        } else {
          href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/')
        }

        return { href, text: subpath.replace(/-/g, ' ') }
      })

      return [{ href: '/', text: 'Home' }, ...crumblist]
    },
    [router.asPath]
  )

  return (
    <div className='py-2 px-2 text-[9px] text-zinc-400'>
      {breadcrumbs.map((crumb, idx) => {
        return (
          <span key={idx}>
            <Link href={crumb.href} passHref>
              {crumb.text}
            </Link>
            {idx < breadcrumbs.length - 1 && <span> / </span>}
          </span>
        )
      })}
    </div>
  )
}

const capitalize = (s: string) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const mapDynamicRoute = (s: string) => {
  if (s === '[projectId]') return 'Project Overview'
  if (s === '[dutyId]') return 'Duty Details'
  return capitalize(s)
}

const mapProjectToDashboard = (s: string) => {}
