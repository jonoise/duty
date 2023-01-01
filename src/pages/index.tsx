import React, { useEffect, useRef } from 'react'
import { SiteContainer } from '@/components/generics'
import MainLayout from '@/components/layouts/home'
import { HomeHeader, HomePerks, HomeGlobe } from '@/components/home'

const HomePage = () => {
  return (
    <MainLayout>
      <SiteContainer>
        <HomeHeader />
      </SiteContainer>
      <div className='flex overflow-hidden h-screen'>
        <HomeGlobe />
        <HomePerks />
      </div>

      <div className='flex flex-col lg:flex-row px-3 lg:p-20 py-14 lg:py-32 bg-white w-full space-x-6'>
        <video autoPlay muted className='lg:w-[47%] -skew-y-12 rounded-lg'>
          <source src='/duty.mp4' type='video/mp4' className='rounded-t-lg' />
        </video>
        <div className='flex-1 space-y-5 px-2 text-black pt-14 lg:pt-0'>
          <h1 className='text-2xl lg:text-7xl font-bold z-40'>
            Focus on your duties, not on your infrastructure.
          </h1>
          <p>
            We provide a just-write-and-deploy experience, so you can focus on
            on your duties and not on your infrastructure.
          </p>
        </div>
      </div>
      <div className='h-60 bg-blue-500 px-4'>
        <div className='flex flex-col justify-center items-center h-full space-y-4'>
          <h1 className='text-7xl font-bold z-40 text-white'>
            Since we launched
          </h1>
          <p className='text-2xl'>we have served over {'42.000'} requests</p>
        </div>
      </div>
      <div className='bg-blue-600 h-10 flex items-center px-40'>
        <div className='w-full flex justify-between'>
          <p>Duty™</p>
          <p>Duty™</p>
        </div>
      </div>
    </MainLayout>
  )
}

export default HomePage
