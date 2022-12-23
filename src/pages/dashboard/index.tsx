import React from 'react'
import { ProjectsList, DashboardLinksSubnavbar } from '@/components/dashboard'
import { GetServerSidePropsContext } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { MainLayout } from '@/components/layouts/main'

const DashboardPage = () => {
  return (
    <MainLayout LinksSubnavbar={DashboardLinksSubnavbar}>
      <div className='flex flex-col flex-1 overflow-hidden'>
        <ProjectsList />
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
