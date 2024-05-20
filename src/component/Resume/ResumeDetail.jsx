import React from 'react';
import { useParams } from 'react-router-dom';
import Resume1 from './Resume1';

function ResumeDetail() {
  const { imageName } = useParams();

  return (
    <div>
        {imageName === 'template/r.png' && <Resume1 />}
        {imageName === 'template/r.webp' && <Resume1 />}
        {imageName === 'template/r1.webp' && <Resume1 />}
        {imageName === 'template/r2.jpeg' && <Resume1 />}
        {imageName === 'template/r4.webp' && <Resume1 />}
        {imageName === 'template/r5.webp' && <Resume1 />}
      {/* <h1> {imageName}</h1> */}
    </div>
  );
}

export default ResumeDetail;
