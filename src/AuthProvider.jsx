// import React, { createContext, useState, useEffect, useContext } from "react";
// import { initializeApp } from 'firebase/app';
// import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth';

// // Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAKIGET9Jl13kAn5cK6GTXM_A8xaX9QzEY",
//     authDomain: "resumebuilder-c949c.firebaseapp.com",
//     projectId: "resumebuilder-c949c",
//     storageBucket: "resumebuilder-c949c.appspot.com",
//     messagingSenderId: "1071530901076",
//     appId: "1:1071530901076:web:1d700139504ba990a3f7c1",
//     measurementId: "G-L8MRSFQXZC"
//   };

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp);

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, user => {
//       setUser(user);
//     });

//     return () => unsubscribe();
//   }, []);

//   const signInWithGoogle = () => {
//     const provider = new GoogleAuthProvider();
//     // provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
//     signInWithPopup(auth, provider);
//   };

//   const signInWithGitHub = () => {
//     const provider = new GithubAuthProvider();
//     signInWithPopup(auth, provider);
//   };

//   const handleSignOut = () => {
//     signOut(auth)
//       .then(() => {
//         console.log('User signed out successfully.');
//       })
//       .catch(error => {
//         console.error('Error signing out:', error.message);
//       });
//   };

//   const value = {
//     user,
//     signInWithGoogle,
//     signInWithGitHub,
//     handleSignOut
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
