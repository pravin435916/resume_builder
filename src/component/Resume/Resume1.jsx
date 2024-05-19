import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Resume1 = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: [{ company: '', position: '', startDate: '', endDate: '', descriptions: [''] }],
    skills: [''],
    projects: [{ title: '', descriptions: [''] }],
  });

  const resumeRef = useRef(null);

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleExperienceAdd = () => {
    setUserData({
      ...userData,
      experience: [...userData.experience, { company: '', position: '', startDate: '', endDate: '', descriptions: [''] }],
    });
  };

  const handleExperienceChange = (index, event) => {
    const updatedExperience = [...userData.experience];
    updatedExperience[index][event.target.name] = event.target.value;
    setUserData({ ...userData, experience: updatedExperience });
  };

  const handleExperienceDescriptionChange = (index, descIndex, event) => {
    const updatedExperience = [...userData.experience];
    updatedExperience[index].descriptions[descIndex] = event.target.value;
    setUserData({ ...userData, experience: updatedExperience });
  };

  const handleExperienceDelete = (index) => {
    const updatedExperience = [...userData.experience];
    updatedExperience.splice(index, 1);
    setUserData({ ...userData, experience: updatedExperience });
  };

  const handleDescriptionAdd = (index) => {
    const updatedExperience = [...userData.experience];
    updatedExperience[index].descriptions.push('');
    setUserData({ ...userData, experience: updatedExperience });
  };

  const handleSkillAdd = () => {
    setUserData({
      ...userData,
      skills: [...userData.skills, ''],
    });
  };

  const handleSkillChange = (index, event) => {
    const updatedSkills = [...userData.skills];
    updatedSkills[index] = event.target.value;
    setUserData({ ...userData, skills: updatedSkills });
  };

  const handleSkillDelete = (index) => {
    const updatedSkills = [...userData.skills];
    updatedSkills.splice(index, 1);
    setUserData({ ...userData, skills: updatedSkills });
  };

  const handleProjectAdd = () => {
    setUserData({
      ...userData,
      projects: [...userData.projects, { title: '', descriptions: [''] }],
    });
  };

  const handleProjectChange = (index, event) => {
    const updatedProjects = [...userData.projects];
    updatedProjects[index][event.target.name] = event.target.value;
    setUserData({ ...userData, projects: updatedProjects });
  };

  const handleProjectDescriptionChange = (index, descIndex, event) => {
    const updatedProjects = [...userData.projects];
    updatedProjects[index].descriptions[descIndex] = event.target.value;
    setUserData({ ...userData, projects: updatedProjects });
  };

  const handleProjectDelete = (index) => {
    const updatedProjects = [...userData.projects];
    updatedProjects.splice(index, 1);
    setUserData({ ...userData, projects: updatedProjects });
  };

  const handleProjectDescriptionAdd = (index) => {
    const updatedProjects = [...userData.projects];
    updatedProjects[index].descriptions.push('');
    setUserData({ ...userData, projects: updatedProjects });
  };

  const handleDownloadPDF = () => {
    const input = resumeRef.current;
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${userData.fullName}-resume.pdf`);
      }).catch((error) => {
        console.error('Failed to download PDF:', error);
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <div className="w-1/2 pr-4">
        <h2 className="text-2xl font-bold mb-4">Resume Builder</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <section className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Experience</h3>
            {userData.experience.map((exp, index) => (
              <div key={index} className="mb-4 border p-4 rounded-md shadow-sm">
                <div className="mb-2">
                  <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    id={`company-${index}`}
                    name="company"
                    value={exp.company}
                    onChange={(event) => handleExperienceChange(index, event)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor={`position-${index}`} className="block text-sm font-medium text-gray-700">Position</label>
                  <input
                    type="text"
                    id={`position-${index}`}
                    name="position"
                    value={exp.position}
                    onChange={(event) => handleExperienceChange(index, event)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    id={`startDate-${index}`}
                    name="startDate"
                    value={exp.startDate}
                    onChange={(event) => handleExperienceChange(index, event)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    id={`endDate-${index}`}
                    name="endDate"
                    value={exp.endDate}
                    onChange={(event) => handleExperienceChange(index, event)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mb-2">
                  <h4 className="text-lg font-semibold">Descriptions</h4>
                  {exp.descriptions.map((desc, descIndex) => (
                    <div key={descIndex} className="flex items-center mb-2">
                      <textarea
                        value={desc}
                        onChange={(event) => handleExperienceDescriptionChange(index, descIndex, event)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>
                  ))}
                  <button type="button" className="text-blue-500" onClick={() => handleDescriptionAdd(index)}>Add Description</button>
                </div>
                <button type="button" className="text-red-500" onClick={() => handleExperienceDelete(index)}>Delete Experience</button>
              </div>
            ))}
            <button type="button" className="text-blue-500" onClick={handleExperienceAdd}>Add Experience</button>
          </section>

          <section className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Skills</h3>
            {userData.skills.map((skill, index) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type="text"
                  value={skill}
                  onChange={(event) => handleSkillChange(index, event)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                <button type="button" className="ml-2 text-red-500" onClick={() => handleSkillDelete(index)}>Delete</button>
              </div>
            ))}
            <button type="button" className="text-blue-500" onClick={handleSkillAdd}>Add Skill</button>
          </section>

          <section className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Projects</h3>
            {userData.projects.map((project, index) => (
              <div key={index} className="mb-4 border p-4 rounded-md shadow-sm">
                <div className="mb-2">
                  <label htmlFor={`title-${index}`} className="block text-sm font-medium text-gray-700">Project Title</label>
                  <input
                    type="text"
                    id={`title-${index}`}
                    name="title"
                    value={project.title}
                    onChange={(event) => handleProjectChange(index, event)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mb-2">
                  <h4 className="text-lg font-semibold">Descriptions</h4>
                  {project.descriptions.map((desc, descIndex) => (
                    <div key={descIndex} className="flex items-center mb-2">
                      <textarea
                        value={desc}
                        onChange={(event) => handleProjectDescriptionChange(index, descIndex, event)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>
                  ))}
                  <button type="button" className="text-blue-500" onClick={() => handleProjectDescriptionAdd(index)}>Add Description</button>
                </div>
                <button type="button" className="text-red-500" onClick={() => handleProjectDelete(index)}>Delete Project</button>
              </div>
            ))}
            <button type="button" className="text-blue-500" onClick={handleProjectAdd}>Add Project</button>
          </section>
        </form>
      </div>

      <div className="w-1/2 pl-4">
        <h2 className="text-2xl font-bold mb-4">Resume Preview</h2>
        <div ref={resumeRef} class="max-w-4xl mx-auto p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg text-white">
  <div class="flex items-center mb-8">
    <div class="w-24 h-24 rounded-full overflow-hidden mr-6">
      <img src="profile-picture.jpg" alt="Profile Picture" class="w-full h-full object-cover"/>
    </div>
    <div>
      <h1 class="text-4xl font-bold">{userData.fullName}</h1>
      <p class="text-lg">{userData.email}</p>
      <p class="text-lg">{userData.phone}</p>
    </div>
  </div>

  <div class="bg-white p-6 rounded-lg shadow-md text-gray-800">
    <h2 class="text-2xl font-semibold mb-4 text-purple-700">Experience</h2>
    {userData.experience.map((exp, index) => (
      <div key={index} class="mb-6">
        <h3 class="text-xl font-semibold">{exp.position} at {exp.company}</h3>
        <p class="text-gray-600 italic">{exp.startDate} - {exp.endDate}</p>
        <ul class="list-disc ml-6">
          {exp.descriptions.map((desc, descIndex) => (
            <li key={descIndex}>{desc}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>

  <div class="bg-white p-6 rounded-lg shadow-md mt-8 text-gray-800">
    <h2 class="text-2xl font-semibold mb-4 text-purple-700">Skills</h2>
    <ul class="list-disc ml-6">
      {userData.skills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
  </div>

  <div class="bg-white p-6 rounded-lg shadow-md mt-8 text-gray-800">
    <h2 class="text-2xl font-semibold mb-4 text-purple-700">Projects</h2>
    {userData.projects.map((project, index) => (
      <div key={index} class="mb-6">
        <h3 class="text-xl font-semibold">{project.title}</h3>
        <ul class="list-disc ml-6">
          {project.descriptions.map((desc, descIndex) => (
            <li key={descIndex}>{desc}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>

  <div class="bg-white p-6 rounded-lg shadow-md mt-8 text-gray-800">
    <h2 class="text-2xl font-semibold mb-4 text-purple-700">Education</h2>
    {/* <div class="mb-6">
      <h3 class="text-xl font-semibold">{userData.education.university}</h3>
      <p class="text-gray-600 italic">{userData.education.degree}, Class of {userData.education.graduationYear}</p>
      <ul class="list-disc ml-6">
        {userData.education.details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
    </div> */}
  </div>
</div>

        <button 
          onClick={handleDownloadPDF}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default Resume1;
