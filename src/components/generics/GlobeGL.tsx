import React, { useEffect, useRef } from 'react'
import Globe, { GlobeMethods } from 'react-globe.gl'

const GlobeGL = () => {
  const N = 20

  // @ts-ignore
  const arcsData = [...Array(N).keys()].map(() => ({
    startLat: (Math.random() + 1) * 230,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 240,
    endLng: (Math.random() - 0.5) * 360,
    color: [
      ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 0.2)],
      ['white', 'blue', 'green'][Math.round(Math.random() * 0.4)],
    ],
  }))

  const globeEl = useRef<GlobeMethods>()
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.pointOfView({
        lat: 31.02,
        lng: -67,
        altitude: 1,
      })
      globeEl.current.controls().enableZoom = false
      globeEl.current.controls().maxAzimuthAngle = 0
      //   globeEl.current.controls().maxPolarAngle = 0
      globeEl.current.controls().maxPolarAngle = Math.PI / 2
    }
  }, [globeEl])
  return (
    <Globe
      ref={globeEl}
      globeImageUrl='//unpkg.com/three-globe/example/img/earth-night.jpg'
      arcsData={arcsData}
      arcColor={'color'}
      arcDashLength={() => Math.random()}
      arcAltitudeAutoScale={0.5}
      arcDashGap={() => 2}
      arcDashAnimateTime={() => Math.random() * 4000 + 500}
    />
  )
}

export default GlobeGL
