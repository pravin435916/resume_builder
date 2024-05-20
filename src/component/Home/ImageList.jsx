import React, { useState, useEffect } from 'react';
import { listAll, getDownloadURL, ref, deleteObject } from 'firebase/storage';
import { storage, useFirebase } from '../../context/firebase';
import { UploadLoader } from '../Loader/UploadLoader';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
function ImageList() {
  const navigate = useNavigate()
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const storageRef = ref(storage, 'template/'); // Replace 'template' with your path

    listAll(storageRef)
      .then((result) => {
        const imageUrls = result.items.map((imageRef) =>
          getDownloadURL(imageRef)
        );
        Promise.all(imageUrls).then((urls) => {
          setImages(urls);
          console.log(urls)

          setIsLoading(false); // Set loading to false after successful fetch
        });
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        setIsLoading(false); // Set loading to false even on error
      });
  }, []);
  const handleDeleteImage = async (imageUrl) => {
    try {
      const imageRef = ref(storage, imageUrl); // Extract image filename from URL
      await deleteObject(imageRef);
      setImages(images.filter((img) => img !== imageUrl)); // Update images state
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };
  const firebase = useFirebase();
  const handleImageClick = (imageUrl) => {
    const imageName = imageUrl.split('/').pop(); // Extract image name from URL
    if(!firebase.isLoggedIn) {
      navigate('/auth')
    }else{
      navigate(`/image/${imageName}`);
    }
  };

  return (
    <div>
      {isLoading ? (
        <UploadLoader/>
      ) : images.length > 0 ? (
        <div className='flex justify-center items-center gap-8 flex-wrap'>
          {images.map((imageUrl,i) => (
            <div title='resume template' className='w-80 h-[28rem] flex justify-center cursor-pointer items-center hover:bg-gray-300 relative' onClick={() => handleImageClick(imageUrl)} key={i}>
              {/* <div className='flex justify-center items-center text-white w-8 h-8 rounded-2xl bg-red-500 absolute right-2 top-2'>
                <button className='text-2xl' onClick={() => handleDeleteImage(imageUrl)}><MdDelete /></button>
                </div> */}
              <img className='w-72' src={imageUrl} alt="Uploaded Image" />
            </div>
          ))}
        </div>
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
}

export default ImageList;
