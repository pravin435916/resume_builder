import React, { useState } from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import ImageList from './Home/ImageList';
import { IoCloudUploadOutline } from "react-icons/io5";
import JobRoles from './Data/JobRole';
import Navbar from './Navbar';
function CreateTemplate() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleInputChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const storage = getStorage();
        const storageRef = ref(storage, `template/${selectedFile.name}`);

        try {
            await uploadBytes(storageRef, selectedFile);
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Image upload failed!');
        }
    };

    return (
        <>
        <Navbar/>
        <div className="flex gap-4 m-4 w-full h-full">
            <div className='flex flex-col items-center justify-center w-[20%] absolute  left-10 top-20'>
                <div className="upload-box flex flex-col items-center justify-center w-72 h-96 bg-slate-400 rounded-2xl m-4">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <span className='text-3xl'><IoCloudUploadOutline /></span>
                        <span className='font-bold'>Click to Upload</span>
                    </div>
                    <input
                        className="w-80 h-80 absolute opacity-0 cursor-pointer"
                        type="file"
                        onChange={handleInputChange}
                        style={{ zIndex: 1 }}
                    />
                </div>
                <div className="flex flex-wrap justify-center items-center gap-2">
                    {JobRoles.map((role, index) => (
                        <div className="flex gap-1" key={index}>
                            <span className="text-xs border rounded-full text-white bg-blue-600 py-1 px-2" >
                                {role}
                            </span>
                        </div>
                    ))}
                </div>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    onClick={handleUpload}
                >
                    Save
                </button>
            </div>
            <div className="ml-96 w-[80%] mt-6 flex-1 overflow-auto">
                <ImageList />
            </div>
        </div>
        </>
    );
}

export default CreateTemplate;
