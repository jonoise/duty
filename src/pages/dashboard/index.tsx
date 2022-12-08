import React from 'react'
import DashboardLayout from '@/components/layouts/dashboard'
import { NewProjectButton, ProjectsList } from '@/components/dashboard'
import { GetServerSidePropsContext } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'

const DashboardPage = () => {
  return (
    <DashboardLayout title='Projects' action={<NewProjectButton />}>
      <div className='py-5 space-y-5'>
        <div className='w-full h-0.5 bg-zinc-700' />
        <ProjectsList />
      </div>
    </DashboardLayout>
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
