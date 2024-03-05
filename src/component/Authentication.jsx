import React from "react";
import { useAuth } from "../AuthProvider";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
const Authentication = () => {
  const { user, signInWithGoogle, signInWithGitHub, handleSignOut } = useAuth();

  return (
    <>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-screen flex-col gap-8">
          <span>welcome to the resume builder</span>
          <span>Please Log in Here</span>
          <div className="flex gap-4 flex-col">
            <div className="flex gap-2 items-center p-2 border hover:bg-blue-500  rounded-lg bg-transparant px-4 cursor-pointer">
              <span><FaGoogle /></span>
              <span  onClick={signInWithGoogle}> Sign in with Google</span>
              <span><FaChevronRight /></span>
            </div>
            <div className="flex gap-2 items-center p-2 border hover:bg-blue-500  rounded-lg bg-transparant px-4 cursor-pointer">
              <span><FaGithub /></span>
              <span onClick={signInWithGitHub}> Sign in with GitHub</span>
              <span><FaChevronRight /></span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Authentication;
