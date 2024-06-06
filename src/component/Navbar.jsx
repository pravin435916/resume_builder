import React, { useState } from "react";
import { useFirebase } from "../context/firebase";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"
import { SlideUp } from "../animations";
import { LiaSignInAltSolid } from "react-icons/lia";
const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const popUP = () => {
        setMenu(!menu);
    }
    const { user, handleSignOut } = useFirebase();

    return (
        <nav className="w-full z-10 shadow-md overflow-hidden">
            <div className=" text-black py-4 sm:px-6 flex justify-between items-center gap-4 mx-8">
                <img className="w-12" src="https://pro2-bar-s3-cdn-cf.myportfolio.com/3d13047a-c0fe-40bf-aeca-94fdf975291e/84193e9e-b5a2-4499-a4ec-7c4750826db0_rwc_0x614x5004x3753x5004.png?h=c79866de72d6dc2b3cc77502e03fc104" alt="" />
                <input type="search" className="rounded-md p-2 outline-none w-24 sm:w-[50rem]" placeholder="Search..." />
                <div>
                    {user ? (
                        <img className="w-12 h-12 border rounded-full cursor-pointer" onClick={popUP} src={user.photoURL} alt="User Profile" />
                    ) : (
                        <Link className="flex gap-2" to="/auth">
                            <div className="flex gap-2 items-center rounded-2xl text-white sm:px-4 sm:py-2 p-2 font-semibold bg-black">
                                <span >Sign in</span>
                                <span className="text-2xl"><LiaSignInAltSolid /></span>
                            </div> </Link>
                    )}
                </div>
            </div>
            <AnimatePresence>
                {
                    user && menu && (
                        <motion.div
                            {...SlideUp}
                            onMouseLeave={() => setMenu(false)}
                            className="flex justify-start items-start w-52 h-60 bg-white  absolute right-10 top-20 p-2 z-10">
                            <div className="flex flex-col gap-4 ml-4">
                                <div className="flex flex-col justify-center items-center gap-2">
                                    {user && (
                                        <>
                                            <img className="w-12 h-12 border rounded-full  cursor-pointer" src={user.photoURL} alt="User Profile" />
                                            <span className="text-gray-700 hover:text-black font-semibold"> {user.displayName}!</span>
                                        </>
                                    )}
                                </div>
                                <span className="text-gray-700 hover:text-black">My Account</span>
                                <Link to="/create"><span className="text-gray-700 hover:text-black">Add new Template</span></Link>
                                <div className="border-t-2 w-full flex items-center justify-center">
                                    <button className="text-gray-700 hover:text-black" onClick={handleSignOut}>Sign out</button>
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>

        </nav >
    );
};

export default Navbar;
