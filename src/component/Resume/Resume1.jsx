import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaAngleDown, FaCloudUploadAlt, FaCode, FaFileDownload, FaProjectDiagram, FaUser } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';
import { IoAddCircle } from 'react-icons/io5';
import { RiGraduationCapFill } from 'react-icons/ri';
import { ImBooks } from 'react-icons/im';
import { LiaCertificateSolid } from 'react-icons/lia';
import Image2 from './Image2';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../context/firebase';
const Resume1 = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    role: '',
    email: '',
    phone: '',
    education: [{ clg: '', stream: '', branch: '', startDate: '', endDate: '' }],
    experience: [{ company: '', position: '', startDate: '', endDate: '', descriptions: [''] }],
    skills: [''],
    certification: [''],
    projects: [{ title: '', descriptions: [''] }],
  });

  const resumeRef = useRef(null);

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleEduAdd = () => {
    setUserData({
      ...userData,
      education: [...userData.education, { clg: '', stream: '', branch: '', startDate: '', endDate: '' }],
    });
  };

  const handleEduChange = (index, event) => {
    const updatedExperience = [...userData.education];
    updatedExperience[index][event.target.name] = event.target.value;
    setUserData({ ...userData, education: updatedExperience });
  };

  const handleEduDelete = (index) => {
    const updatedExperience = [...userData.education];
    updatedExperience.splice(index, 1);
    setUserData({ ...userData, education: updatedExperience });
  };

  //experience
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

  const handleExperienceDelete = (index) => {
    const updatedExperience = [...userData.experience];
    updatedExperience.splice(index, 1);
    setUserData({ ...userData, experience: updatedExperience });
  };
  const handleExperienceDescriptionChange = (index, descIndex, event) => {
    const updatedExperience = [...userData.experience];
    updatedExperience[index].descriptions[descIndex] = event.target.value;
    setUserData({ ...userData, experience: updatedExperience });
  };


  const handleDescriptionAdd = (index) => {
    const updatedExperience = [...userData.experience];
    updatedExperience[index].descriptions.push('');
    setUserData({ ...userData, experience: updatedExperience });
  };
  //  skills 
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
  //certificates
  const handleCertiAdd = () => {
    setUserData({
      ...userData,
      certification: [...userData.certification, ''],
    });
  };
  const handleCertiChange = (index, event) => {
    const updatedSkills = [...userData.certification];
    updatedSkills[index] = event.target.value;
    setUserData({ ...userData, certification: updatedSkills });
  };
  const handleCertiDelete = (index) => {
    const updatedSkills = [...userData.skills];
    updatedSkills.splice(index, 1);
    setUserData({ ...userData, certification: updatedSkills });
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
  //upload
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const storage = getStorage();
    const storageRef = ref(storage, `IMAGE/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setImageUrl(url);
        });
      }
    );
  };
  return (
    <div className="container mx-auto px-4 py-8 flex gap-4">
      <div className="w-1/2 pr-4 overflow-auto mx-10">
        <div className='flex justify-between items-center mb-4'>
          <h2 className="text-2xl font-bold">Resume Builder</h2>

          <div
            onClick={handleDownloadPDF}
            className="flex gap-2 mt-4 mx-12 cursor-pointer bg-black text-white font-bold py-2 px-4 border rounded-full"
          >
            <span>Download as PDF</span>
            <span className='text-xl'><FaFileDownload /></span>
          </div>
        </div>
        <form >
          {/* Personal info */}
          <details className='bg-white border rounded-2xl shadow-xl p-6 mb-4'>
            <summary className='flex justify-between items-center cursor-pointer'>
              <div className='flex gap-2 items-center text-2xl font-bold'>
                <span><FaUser /></span>
                <span>Personal Info</span>
              </div>
              <span><FaAngleDown /></span>
            </summary>
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
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                id="role"
                name="role"
                value={userData.role}
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
            <div className="mb-4">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">Photo</label>
              <div className='flex gap-8 items-center'>
              <input type="file" onChange={handleImageChange} />
              <div
                onClick={handleUpload}
                className="flex gap-2 cursor-pointer bg-black text-white font-bold py-2 px-4 border rounded-full"
              >
                <span>Upload</span>
                <span className='text-xl'><FaCloudUploadAlt /></span>
              </div>
              </div>
            </div>
          </details>
          {/* education */}
          <section className="mb-4">
            <details className='bg-white border rounded-2xl shadow-xl p-6'>
              <summary className='flex justify-between items-center cursor-pointer'>
                <div className='flex gap-2 items-center text-2xl font-bold'>
                  <span><RiGraduationCapFill /></span>
                  <span>Education</span>
                </div>
                <span><FaAngleDown /></span>
              </summary>
              {userData.education.map((exp, index) => (
                <div key={index} className="mb-4 border p-4 rounded-md shadow-sm">
                  <div className="mb-2">
                    <label htmlFor={`clg-${index}`} className="block text-sm font-medium text-gray-700">College</label>
                    <input
                      type="text"
                      id={`clg-${index}`}
                      name="clg"
                      value={exp.clg}
                      onChange={(event) => handleEduChange(index, event)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor={`stream-${index}`} className="block text-sm font-medium text-gray-700">Stream</label>
                    <input
                      type="text"
                      id={`stream-${index}`}
                      name="stream"
                      value={exp.stream}
                      onChange={(event) => handleEduChange(index, event)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor={`branch-${index}`} className="block text-sm font-medium text-gray-700">Branch</label>
                    <input
                      type="text"
                      id={`branch-${index}`}
                      name="branch"
                      value={exp.branch}
                      onChange={(event) => handleEduChange(index, event)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="number"
                      id={`startDate-${index}`}
                      name="startDate"
                      maxLength={4}
                      placeholder="YYYY"
                      value={exp.startDate}
                      onChange={(event) => handleEduChange(index, event)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                      type="number"
                      id={`endDate-${index}`}
                      name="endDate"
                      maxLength={4}
                      placeholder="YYYY"
                      value={exp.endDate}
                      onChange={(event) => handleEduChange(index, event)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>

                  <button type="button" className="text-red-500" onClick={() => handleEduDelete(index)}>Delete Experience</button>
                </div>
              ))}
              <button type="button" className="text-blue-500" onClick={handleEduAdd}>Add Education</button>
            </details>
          </section>
          {/* experience */}
          <section className="mb-4">
            <details className='bg-white border rounded-2xl shadow-xl p-6'>
              <summary className='flex justify-between items-center cursor-pointer'>
                <div className='flex gap-2 items-center text-2xl font-bold'>
                  {/* <span><RiGraduationCapFill /></span> */}
                  <span><ImBooks /></span>
                  <span>Experience</span>
                </div>
                <span><FaAngleDown /></span>
              </summary>
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
                      type="number"
                      id={`startDate-${index}`}
                      name="startDate"
                      maxLength={4}
                      placeholder="YYYY"
                      value={exp.startDate}
                      onChange={(event) => handleExperienceChange(index, event)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                      type="number"
                      id={`endDate-${index}`}
                      name="endDate"
                      maxLength={4}
                      placeholder="YYYY"
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
            </details>
          </section>
          {/* skills  */}
          <section className="mb-4">
            <details className='bg-white border rounded-2xl shadow-xl p-6 mb-4'>
              <summary className='flex justify-between items-center cursor-pointer'>
                <div className='flex gap-2 items-center text-2xl font-bold'>
                  <span><FaCode /></span>
                  <span>Skills</span>
                </div>
                <span><FaAngleDown /></span>
              </summary>
              {userData.skills.map((skill, index) => (
                <div key={index} className="mb-2 flex items-center">
                  <input
                    type="text"
                    value={skill}
                    onChange={(event) => handleSkillChange(index, event)}
                    className="mt-1 block w-52 border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  <button type="button" className="ml-2 text-red-500 text-2xl" onClick={() => handleSkillDelete(index)}><MdDelete /></button>
                </div>
              ))}
              <button type="button" className="text-blue-500 text-2xl" onClick={handleSkillAdd}><IoAddCircle />
              </button>
            </details>
          </section>
          {/* projects */}
          <section className="mb-4">
            <details className='bg-white border rounded-2xl shadow-xl p-6 mb-4'>
              <summary className='flex justify-between items-center cursor-pointer'>
                <div className='flex gap-2 items-center text-2xl font-bold'>
                  <span><FaProjectDiagram /></span>
                  <span>Projects</span>
                </div>
                <span><FaAngleDown /></span>
              </summary>
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
            </details>
          </section>

          <section className="mb-4">
            <details className='bg-white border rounded-2xl shadow-xl p-6 mb-4'>
              <summary className='flex justify-between items-center cursor-pointer'>
                <div className='flex gap-2 items-center text-2xl font-bold'>
                  <span><LiaCertificateSolid /></span>
                  <span>Certification</span>
                </div>
                <span><FaAngleDown /></span>
              </summary>
              {userData.certification.map((certi, index) => (
                <div key={index} className="mb-2 flex items-center">
                  <input
                    type="text"
                    value={certi}
                    onChange={(event) => handleCertiChange(index, event)}
                    className="mt-1 block w-96 border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  <button type="button" className="ml-2 text-red-500 text-2xl" onClick={() => handleCertiDelete(index)}><MdDelete /></button>
                </div>
              ))}
              <button type="button" className="text-blue-500 text-2xl" onClick={handleCertiAdd}><IoAddCircle />
              </button>
            </details>
          </section>
        </form>
      </div>

      <div className="w-1/2 pl-4 max-h-screen overflow-auto fixed top-2 right-0 text-xs mb-6">
        <div ref={resumeRef} class=" mx-12 p-4 rounded-lg shadow-xl m-2">
          <Image2 userData={userData} imageUrl={imageUrl} />
        </div>

      </div>
    </div>
  );
};

export default Resume1;
