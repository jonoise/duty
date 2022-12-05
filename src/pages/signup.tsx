import MainLayout from '@/components/layouts/main'
import { signIn } from 'next-auth/react'
import React from 'react'

const SignUpPage = () => {
  return (
    <MainLayout>
      <button
        onClick={() => signIn('google')}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Sign Up
      </button>
    </MainLayout>
  )
}

export default SignUpPage
