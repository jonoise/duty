import MainLayout from '@/components/layouts/home'
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { IoLogoGithub, IoLogoGitlab, IoLogoGoogle } from 'react-icons/io5'
// import Globe, { GlobeMethods } from 'react-globe.gl'
const Globe = dynamic(() => import('@/components/generics/GlobeGL'), {
  ssr: false,
})

const SignUpPage = () => {
  return (
    <MainLayout>
      <div className='flex flex-col-reverse  md:flex-row  lg:h-[90vh] bg-[#000012]'>
        <div className='flex-1 flex justify-center h-[88vh] lg:h-auto items-center '>
          <div className='px-6 lg:pl-40 grid space-y-4'>
            <h1 className='text-5xl font-bold'>
              Start your journey to the clouds! 🚀☁️
            </h1>
            <p className='text-zinc-400'>
              Deploy your duties on serverless functions running in the edge.
            </p>
            <div
              onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
              className='bg-blue-600 flex space-x-2 items-center justify-center hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer'
            >
              <IoLogoGithub className='w-5 h-5' /> <p>Continue with Github</p>
            </div>
            <div
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className='bg-blue-600 flex space-x-2 items-center justify-center hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer'
            >
              <IoLogoGoogle className='w-5 h-5' /> <p>Continue with Google</p>
            </div>

            <p className='text-zinc-400'>
              By continuing, you agree to our{' '}
              <a href='' className='text-blue-600'>
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href='' className='text-blue-600'>
                Terms of Service
              </a>
              .
            </p>
          </div>
        </div>
        <div className='hidden lg:block flex-1 overflow-hidden'>
          <Globe />
        </div>
      </div>
    </MainLayout>
  )
}

export default SignUpPage
