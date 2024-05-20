import React from 'react'
import { FaCode, FaProjectDiagram } from 'react-icons/fa'
import { ImBooks } from 'react-icons/im'
import { LiaCertificateSolid } from 'react-icons/lia'
import { RiGraduationCapFill } from 'react-icons/ri'

function Image({ userData }) {
    return (
        <>
            <header className="mb-2">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{userData.fullName}</h1>
                        <p className="text-gray-800 text-lg">{userData.role}</p>
                    </div>
                    <div className="space-x-4 text-sm">
                        <a href="#">
                            {userData.email}
                        </a>
                        <a href="#">
                            {userData.phone}
                        </a>
                        <a href="#">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </header>
            <hr />
            <main>
                <section className="mb-8">
                <div className='flex gap-2 items-center mb-2'>
                        <span className='text-xl'><RiGraduationCapFill /></span>
                        <h2 className="text-lg font-bold"> Education</h2>
                    </div>
                    {userData.education.map((exp, index) => (
                        <div className="space-y-4" key={index}>
                            <div>
                                <h3 className="font-medium">{exp.stream} in {exp.branch}</h3>
                                <div className='flex justify-between items-center'>
                                    <p className="text-gray-500">{exp.clg}</p>
                                    <p className="text-gray-500">, {exp.startDate} - {exp.endDate}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
                <hr />
                <section className="experience mb-8">
                <div className='flex gap-2 items-center mb-2'>
                        <span className='text-xl'><ImBooks /></span>
                        <h2 className="text-lg font-bold"> Experience</h2>
                    </div>
                    {userData.experience.map((exp, index) => (
                        <div key={index} class="mb-6">
                            <div className="space-y-4">
                                <div>
                                    <div className='flex justify-between items-center'>
                                        <h3 className="font-medium">{exp.position} @{exp.company}  </h3>
                                        <p className="text-gray-500">, {exp.startDate} - {exp.endDate}</p>
                                    </div>
                                    <ul className="mt-2 list-square space-y-2 pl-4 text-sm">
                                        {exp.descriptions.map((desc, descIndex) => (
                                            <li key={descIndex}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
                <hr />

                <section className="projects mb-8">
                <div className='flex gap-2 items-center mb-2'>
                        <span className='text-xl'><FaProjectDiagram /></span>
                        <h2 className="text-lg font-bold"> Projects</h2>
                    </div>
                    {userData.projects.map((project, index) => (
                        <div key={index} class="mb-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium">{project.title}  </h3>
                                    <ul className="mt-2 list-disc space-y-2 pl-4 text-sm">
                                        {project.descriptions.map((desc, descIndex) => (
                                            <li key={descIndex}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
                <hr />
                <section className="mb-8">
                <div className='flex gap-2 items-center mb-2'>
                        <span className='text-xl'><FaCode /></span>
                        <h2 className="text-lg font-bold"> Skills</h2>
                    </div>
                    <div className="flex flex-wrap gap-6">
                        {userData.skills.map((skill, index) => (
                            <div className="min-w-24 rounded-md bg-gray-300 px-2 py-2 text-sm font-medium ">{skill}</div>
                        ))}
                    </div>
                </section>
                <section className="mb-8">
                    <div className='flex gap-2 items-center'>
                        <span className='text-xl'><LiaCertificateSolid /></span>
                        <h2 className="text-lg font-bold"> Certification</h2>
                    </div>
                    <ol className="grid grid-cols-2 list-decimal">
                        {userData.certification.map((certi, index) => (
                            <li className="min-w-24 ml-10 rounded-md px-2 py-2 text-sm font-medium ">{certi}</li>
                        ))}
                    </ol>
                </section>
            </main>
        </>
    )
}

export default Image