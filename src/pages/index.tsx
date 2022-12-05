import React from 'react'
import { SiteContainer } from '@/components/generics'
import MainLayout from '@/components/layouts/main'
import { HomeHeader } from '@/components/home'

const HomePage = () => {
  return (
    <MainLayout>
      <SiteContainer>
        <HomeHeader />
      </SiteContainer>
    </MainLayout>
  )
}

export default HomePage
