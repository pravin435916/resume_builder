import React from 'react';
import { FaCode, FaProjectDiagram } from 'react-icons/fa';
import { ImBooks } from 'react-icons/im';
import { LiaCertificateSolid } from 'react-icons/lia';
import { RiGraduationCapFill } from 'react-icons/ri';

function Image2({ userData,imageUrl }) {
    return (
        <>
            <header className="mb-4">
                <div className='flex justify-between items-center mx-4'>
                    <div className='flex flex-col gap-2'>
                        <h1 className="text-4xl font-bold">{userData.fullName}</h1>
                        <p className="text-gray-600 text-lg">{userData.role}</p>
                        <div className="flex flex-col mt-2 text-sm">
                            <p>{userData.email}</p>
                            <p>{userData.phone}</p>
                            <a href="#">LinkedIn</a>
                        </div>
                    </div>
                    { imageUrl && <div className='w-36 h-36 rounded-full border overflow-hidden'>
                        <img className='w-full h-full' src={imageUrl} alt="Uploaded" />
                    </div>}
                </div>
            </header>
            <hr className="mb-8" />
            <main>
                <section className="mb-8">
                    <div className='flex gap-2 items-center mb-2'>
                        <span className='text-xl'><RiGraduationCapFill /></span>
                        {userData.education && <h2 className="text-lg font-bold"> Education</h2> }
                    </div>
                    {userData.education.map((exp, index) => (
                        <div className="mb-4" key={index}>
                            <h3 className="font-medium">{exp.stream} in {exp.branch}</h3>
                            <p className="text-gray-500">{exp.clg}, {exp.startDate} - {exp.endDate}</p>
                        </div>
                    ))}
                </section>
                <hr className="mb-8" />
                <section className="experience mb-8">
                    <div className='flex gap-2 items-center mb-2'>
                        <span className='text-xl'><ImBooks /></span>
                        <h2 className="text-lg font-bold"> Experience</h2>
                    </div>
                    {userData.experience.map((exp, index) => (
                        <div className="mb-6" key={index}>
                            <h3 className="font-medium">{exp.position} @{exp.company}</h3>
                            <p className="text-gray-500">{exp.startDate} - {exp.endDate}</p>
                            <ul className="list-disc pl-6 text-sm">
                                {exp.descriptions.map((desc, descIndex) => (
                                    <li key={descIndex}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
                <hr className="mb-8" />
                <section className="projects mb-8">
                    <div className='flex gap-2 items-center mb-2'>
                        <span className='text-xl'><FaProjectDiagram /></span>
                        <h2 className="text-lg font-bold"> Projects</h2>
                    </div>
                    {userData.projects.map((project, index) => (
                        <div className="mb-6" key={index}>
                            <h3 className="font-medium">{project.title}</h3>
                            <ul className="list-disc pl-6 text-sm">
                                {project.descriptions.map((desc, descIndex) => (
                                    <li key={descIndex}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
                <hr className="mb-8" />
                <section className="mb-8">
                    <div className='flex gap-2 items-center mb-2'>
                        <span className='text-xl'><FaCode /></span>
                        <h2 className="text-lg font-bold"> Skills</h2>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {userData.skills.map((skill, index) => (
                            <div key={index} className="rounded-md bg-gray-200 px-3 py-2 text-sm font-medium">{skill}</div>
                        ))}
                    </div>
                </section>
                <hr className="mb-8" />
               {userData.certification && <section className="mb-8">
                    <div className='flex gap-2 items-center'>
                        <span className='text-xl'><LiaCertificateSolid /></span>
                        <h2 className="text-lg font-bold"> Certification</h2>
                    </div>
                    <ol className="grid grid-cols-2 list-decimal">
                        {userData.certification.map((certi, index) => (
                            <li key={index} className="ml-6 mb-2 text-sm font-medium">{certi}</li>
                        ))}
                    </ol>
                </section>}
            </main>
        </>
    );
}

export default Image2;
