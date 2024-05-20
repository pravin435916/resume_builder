import React from 'react'

export const Steps = () => {
  return (
    <>
    <h1 className='text-4xl font-bold text-center'>Just four simple steps to download your resume:</h1>
    <div className='flex justify-center items-center w-full h-full gap-32 my-20'>
       <div className='w-40 h-52 flex flex-col justify-center items-center text-center'>
          <img className='w-full' src="/assests/one.png" alt="" />
          <span>Step 1 : Pick Up Template </span>
       </div>
       <div className='w-40 h-52 flex flex-col justify-center items-center text-center'>
          <img className='w-full' src="/assests/two.png" alt="" />
          <span>Step 2 : Make your resume in our Website. </span>
       </div>
       <div className='w-40 h-52 flex flex-col justify-center items-center text-center'>
          <img className='w-full h-full bg-cover' src="/assests/three.png" alt="" />
          <span>Step 3 : Customize the design. </span>
       </div>
       <div className='w-40 h-52 flex flex-col justify-center items-center text-center'>
          <img className='w-full' src="/assests/four.png" alt="" />
          <span>Step 4 : Download in DOC or PDF.</span>
       </div>
    </div>
    </>
  )
}
