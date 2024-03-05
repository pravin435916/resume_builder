import React from 'react'
import shape from '../assets/shape_blur.png'
import Authentication from './Authentication'
function Home() {
  return (
    <>
      <div className='h-screen -z-0'>
        {/* <img className='w-full h-full object-contain bg-center absolute top-0' src={shape} alt="" /> */}
        <Authentication/>
      </div>
    </>
  )
}

export default Home