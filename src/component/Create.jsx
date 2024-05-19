// import React, { useEffect, useState } from "react";
// import { storage, firestore } from "../context/firebase";
// import { v4 } from "uuid";
// import { getDownloadURL, ref, uploadBytes, listAll } from "firebase/storage";
// import { addDoc, collection, getDocs } from "firebase/firestore";

// function CreateTemplate() {
//   const [txt, setTxt] = useState("");
//   const [img, setImg] = useState(null); // Store the image URL
//   const [data, setData] = useState([]);
//   const [allImages, setAllImages] = useState([]); // State for all image URLs

//   // Handle image upload
//   const handleUpload = async (e) => {
//     if (!e.target.files[0]) return; // Handle no file selected case

//     try {
//       const imageRef = ref(storage, `images/${v4()}`);
//       await uploadBytes(imageRef, e.target.files[0]);
//       const imageUrl = await getDownloadURL(imageRef);
//       setImg(imageUrl);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       // Handle errors (e.g., display an error message to the user)
//     }
//   };

//   // Handle data submission
//   const handleClick = async () => {
//     if (!txt || !img) {
//       // Handle missing data (e.g., display an error message)
//       return;
//     }

//     try {
//       const dataRef = collection(firestore, "txtData");
//       await addDoc(dataRef, { txtVal: txt, imgUrl: img });
//       setTxt(""); // Clear form fields after successful submission
//       setImg(null);
//       alert("Data added successfully!");
//     } catch (error) {
//       console.error("Error adding data:", error);
//       // Handle errors (e.g., display an error message)
//     }
//   };

//   // Fetch data from Firestore (same as before)
//   const getData = async () => {
//     try {
//       const dataRef = collection(firestore, "txtData");
//       const dataSnapshot = await getDocs(dataRef);
//       const fetchedData = dataSnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));
//       setData(fetchedData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       // Handle errors (e.g., display an error message)
//     }
//   };

//   // Fetch all images from storage (new)
//   const fetchAllImages = async () => {
//     try {
//       const storageRef = ref(storage, "images/"); // Adjust image path if needed
//       const listResult = await listAll(storageRef);
//       const imageUrls = await Promise.all(
//         listResult.items.map(async (itemRef) => {
//           const url = await getDownloadURL(itemRef);
//           return url;
//         })
//       );
//       setAllImages(imageUrls);
//     } catch (error) {
//       console.error("Error fetching images:", error);
//       // Handle errors (e.g., display an error message)
//     }
//   };

//   // Run data and image fetching on component mount
//   useEffect(() => {
//     getData();
//     fetchAllImages();
//   }, []);

//   return (
//     <div>
//       <input
//         type="text"
//         value={txt}
//         onChange={(e) => setTxt(e.target.value)}
//         placeholder="Enter text"
//       />
//       <br />
//       <input type="file" onChange={handleUpload} />
//       <br />
//       <br />
//       <button onClick={handleClick}>Add</button>
//       {allImages.length > 0 && ( // Display fetched images
//         <div className="image-grid"> {/* Add styling for the grid */}
//           {allImages.map((imageUrl) => (
//             <img key={imageUrl} className="image-item" src={imageUrl} alt="Uploaded image" />
//           ))}
//         </div>
//       )}
//       {data.map((value) => ( // Display text data with image
//         <div key={value.id}>
//           <h1>{value.txtVal}</h1>
//           <img src={value.imgUrl} height="200px" width="200px" alt="Uploaded image" />
//                 </div>
//                 ))
//              }
//         </div>
//     )
// }
// export default CreateTemplate;