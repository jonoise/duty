import React, { useEffect, useRef } from 'react'
import { SiteContainer } from '@/components/generics'
import MainLayout from '@/components/layouts/main'
import { HomeHeader } from '@/components/home'
import createGlobe from 'cobe'
import Image from 'next/image'

const HomePage = () => {
  const canvasRef = useRef(null)
  useEffect(() => {
    let phi = 0
    if (canvasRef.current) {
      const globe = createGlobe(canvasRef.current!, {
        devicePixelRatio: 2,
        width: 1200 * 2,
        height: 1200 * 2,
        phi: 1,
        theta: 0.2,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 7,
        baseColor: [0.9, 0.1, 0.3],
        markerColor: [0.1, 0.8, 1],
        glowColor: [0, 0, 0.2],
        markers: [
          // longitude latitude
          { location: [37.7595, -122.4367], size: 0.05 },
          { location: [40.7128, -74.006], size: 0.04 },
          { location: [10.096433, -84.4703], size: 0.04 },
          { location: [3.953167, -70.166687], size: 0.03 },
          { location: [-34.902995, 138.944691], size: 0.02 },
          { location: [39.430278, -2.436379], size: 0.05 },
          { location: [55.549599, 37.564188], size: 0.04 },
          { location: [52.489792, 13.416467], size: 0.03 },
          { location: [53.616352, -7.83001], size: 0.02 },
          { location: [21.313627, -101.799449], size: 0.03 },
          { location: [-32.219653, 116.011286], size: 0.03 },
          { location: [41.107503, 15.472617], size: 0.03 },
          { location: [24.891897, 31.042856], size: 0.03 },
          { location: [7.938426, 10.781097], size: 0.03 },
          { location: [-26.303326, 28.101924], size: 0.03 },
          { location: [16.661634, 9.794713], size: 0.02 },
          { location: [31.26362, -6.561827], size: 0.02 },
          { location: [-11.116061, -51.566703], size: 0.02 },
          { location: [-35.258728, -58.200371], size: 0.02 },
          { location: [-12.034614, -76.879335], size: 0.01 },
          { location: [56.793578, -125.171103], size: 0.03 },
          { location: [22.790865, 113.272831], size: 0.03 },
          { location: [31.433011, 120.769449], size: 0.03 },
          { location: [13.263659, 109.129963], size: 0.03 },
          { location: [13.565211, 101.041507], size: 0.03 },
          { location: [16.963207, 78.636202], size: 0.03 },
          { location: [26.756055, 76.07157], size: 0.04 },
          { location: [27.524687, 68.788322], size: 0.04 },
          { location: [23.921476, 56.137427], size: 0.04 },
          { location: [31.685529, 35.518576], size: 0.04 },
          { location: [36.365975, -5.34058], size: 0.04 },
          { location: [37.538648, 14.365585], size: 0.04 },
          { location: [-28.222977, 152.873614], size: 0.02 },
        ],
        onRender: (state) => {
          // Called on every animation frame.
          // `state` will be an empty object, return updated params.
          state.phi = phi
          phi += 0.005
        },
      })

      return () => {
        globe.destroy()
      }
    }
  }, [canvasRef])
  return (
    <MainLayout>
      <SiteContainer>
        <HomeHeader />
      </SiteContainer>
      <div className='flex overflow-hidden h-screen from-inherit to-transparent'>
        <div className='w-[50%]'>
          <canvas
            style={{
              width: 1200,
              height: 1200,
              marginLeft: -200,
            }}
            ref={canvasRef}
          />
        </div>
        <div className='relative flex-1 space-y-5 pt-52 px-2'>
          <h1 className='text-7xl font-bold z-40'>SPEED IS KEY</h1>
          <p className='z-10 inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-2xl md:text-2xl  tracking-tight text-transparent'>
            Built on cutting-edge serverless technology, Duty can withstand any
            traffic spike, with automatic failover and global replication of
            assets.
          </p>
          <p className='text-xl'>
            Get your duties done, everyday, 365 days a year. NON STOP!
          </p>
        </div>
      </div>
    </MainLayout>
  )
}

export default HomePage
