import React from 'react';
import ImageList from './ImageList';
import Navbar from '../Navbar';
import JobRoles from '../Data/JobRole';
import { Steps } from './Steps';

function Home() {
  return (
    <>
      <Navbar />
      <div className='flex flex-col gap-4 mt-10 overflow-hidden'>
        <div className="flex justify-center items-center gap-2">
          {JobRoles.map((role, index) => (
            <div className="flex w-max h-12 gap-4 items-center justify-center" key={index}>
              <span className="text-xs border rounded-lg text-white bg-gray-400 py-2 px-4" >
                {role}
              </span>
            </div>
          ))}
        </div>
        <span className='font-bold text-center text-4xl mt-4'>Build a resume online. Start by picking a template 
        </span>
        <ImageList />
        <Steps/>
      </div>
    </>
  );
}

export default Home;
