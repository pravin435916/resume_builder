import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { FaGoogle, FaGithub, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
const Authentication = () => {
  const firebase = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  useEffect(()=> {
    if(firebase.isLoggedIn) {
      navigate('/')
    }
  },[firebase,navigate])
  const handleSubmit = async (e) => {
    toast('Login SuccessFully')
    e.preventDefault();
    console.log("sign up");
    await firebase.signUpWithEmailAndPass(email, password);
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="flex justify-center items-center  flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to the Resume Builder</h2>
        <p className="text-gray-600 mb-4">Please Log in Here</p>
        <form className="flex justify-center items-center  flex-col gap-4" onSubmit={handleSubmit}>
        <TextField className="w-80" value={email} onChange={(e)=> setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" />
        <TextField className="w-80" value={password} onChange={(e)=> setPassword(e.target.value)} id="outlined-basic" label="password" variant="outlined" />
          {/* <input className=" mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email" />
          <input className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password" /> */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Create an Account</button>
        </form>
        <div className="mb-4 text-gray-600 text-center">or</div>
        <div className="w-72 flex flex-col">
          <div className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mb-4">
            <FaGoogle className="mr-2" />
            <span onClick={firebase.signInWithGoogle}>Sign in with Google</span>
            <FaChevronRight className="ml-2" />
          </div>
          <div className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded cursor-pointer">
            <FaGithub className="mr-2" />
            <span onClick={firebase.signInWithGithub}>Sign in with GitHub</span>
            <FaChevronRight className="ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
