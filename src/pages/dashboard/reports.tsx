import React from 'react'
import { GetServerSidePropsContext } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { MainLayout } from '@/components/layouts/main'
import DashboardLinksSubnavbar from '@/components/dashboard/LinkSubnavbar'

const DashboardPage = () => {
  return (
    <MainLayout LinksSubnavbar={DashboardLinksSubnavbar}>
      <div className='flex flex-col flex-1 overflow-hidden'></div>
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
