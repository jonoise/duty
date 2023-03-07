import React from 'react'
import { GetServerSidePropsContext } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]'
import { MainLayout } from '@/components/layouts/main'
import { DashboardLinksSubnavbar, LogDetails } from '@/components/dashboard'
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ProjectLinksSubnavbar } from '@/components/project'
import styles from '@/styles/radar.module.css'
import { LogData } from '@/types/logs'
import Link from 'next/link'
const DashboardPage = () => {
  const [logs, setLogs] = useState<LogData[]>([])
  const router = useRouter()
  useEffect(() => {
    if (router.isReady) {
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
        cluster: 'us2',
      })

      const channel = pusher.subscribe('logs')

      channel.bind(
        `new-log-${router.query.projectId}`,
        function (data: LogData) {
          setLogs((logs) => [data, ...logs])
        }
      )

      return () => {
        pusher.unsubscribe('logs')
      }
    }
  }, [router])

  return (
    <MainLayout LinksSubnavbar={ProjectLinksSubnavbar}>
      <div className='space-y-5'>
        <div>
          <h1 className='text-xl'>Logs</h1>
          <p className='text-xs text-zinc-500'>
            Real time logs via{' '}
            <Link
              href={'https://pusher.com/'}
              rel='noopener noreferrer'
              target={'_blank'}
              className='text-sky-300'
            >
              Pusher
            </Link>
          </p>
        </div>
        <div className='bg-zinc-900 rounded border border-gray-800 max-h-[70vh] overflow-y-scroll '>
          {logs.length === 0 && (
            <div className='p-10 h-96 flex justify-center items-center flex-col space-y-4'>
              <div className={styles.loader}>
                <span></span>
              </div>
              <h1 className='text-zinc-500'>Awaiting for requests...</h1>
            </div>
          )}
          {logs.map((log, i) => (
            <LogDetails log={log} key={i} />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

export default DashboardPage

export const getServerSideProps = async (c: GetServerSidePropsContext) => {
  const session = await unstable_getServerSession(c.req, c.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/signup',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
