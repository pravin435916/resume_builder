import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Resume1 from './Resume1';

const resumeComponents = {
  'template/r.png': Resume1,
  'template/r8.webp': Resume1,
  'template/r2.jpeg': Resume1,
  'template/r4.webp': Resume1,
  'template/r5.webp': Resume1,
};

function ResumeDetail() {
  const { imageName } = useParams();

  const ResumeComponent = resumeComponents[decodeURIComponent(imageName)];

  return (
    <div className='flex justify-center items-center min-h-screen w-full'>
      {ResumeComponent ? <ResumeComponent /> : 
      <div className='flex flex-col gap-4 items-center'>
        <Link to='/'>Go to HomePage</Link>
         <p className='text-red-400'>Resume template not found.</p>
      </div>
      }
    </div>
  );
}

export default ResumeDetail;
