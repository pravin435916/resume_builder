import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    GithubAuthProvider, 
    signInWithPopup, 
    onAuthStateChanged, 
    signOut 
} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAKIGET9Jl13kAn5cK6GTXM_A8xaX9QzEY",
    authDomain: "resumebuilder-c949c.firebaseapp.com",
    databaseURL: "https://resumebuilder-c949c-default-rtdb.firebaseio.com",
    projectId: "resumebuilder-c949c",
    storageBucket: "resumebuilder-c949c.appspot.com",
    messagingSenderId: "1071530901076",
    appId: "1:1071530901076:web:1d700139504ba990a3f7c1",
    measurementId: "G-L8MRSFQXZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const FirebaseAuth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();
const storage = getStorage(app);
const firestore = getFirestore(app);

// Create Firebase context
const FirebaseContext = createContext(null);

// Hook to use Firebase context
export const useFirebase = () => useContext(FirebaseContext);

// Firebase provider component
export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);

    // Sign up with email and password
    const signUpWithEmailAndPass = (email, password) => {
        createUserWithEmailAndPassword(FirebaseAuth, email, password);
    };

    // Sign in with Google
    const signInWithGoogle = () => {
        signInWithPopup(FirebaseAuth, GoogleProvider);
    };

    // Sign in with GitHub
    const signInWithGithub = () => {
        signInWithPopup(FirebaseAuth, GithubProvider);
    };

    // Sign out
    const handleSignOut = () => {
        signOut(FirebaseAuth)
            .then(() => {
                console.log('User signed out successfully.');
            })
            .catch(error => {
                console.error('Error signing out:', error.message);
            });
    };

    // Monitor authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FirebaseAuth, (user) => {
            setUser(user ? user : null);
        });
        return () => unsubscribe();
    }, []);

    // Check if user is logged in
    const isLoggedIn = user ? user : null;

    return (
        <FirebaseContext.Provider value={{
            signUpWithEmailAndPass,
            signInWithGoogle,
            signInWithGithub,
            isLoggedIn,
            user,
            handleSignOut,
            storage
        }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};

// Export storage for direct use if needed
export { storage , firestore };
