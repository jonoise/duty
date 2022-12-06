import React from 'react'
import DashboardLayout from '@/components/layouts/dashboard'
import { NewProjectButton } from '@/components/dashboard'
import { GetServerSidePropsContext } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { useSession } from 'next-auth/react'

const DashboardPage = () => {
  const { data: session } = useSession()
  return (
    <DashboardLayout>
      {/* Write a beautiful dashboard to write serverless functions with tailwind */}
      <div className='py-5'>
        <div className='flex w-full justify-between '>
          <h1 className='text-3xl font-bold'>Dashboard</h1>
          <NewProjectButton />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage

// export const getServerSideProps = async (c: GetServerSidePropsContext) => {
//   const session = await unstable_getServerSession(c.req, c.res, authOptions)
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/signup',
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: {},
//   }
// }
