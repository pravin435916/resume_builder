import React, { useState } from "react";
import { useAuth } from "../AuthProvider";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"
import { SlideUp } from "../animations";
const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const popUP = () => {
        setMenu(!menu);
    }
    const { user, handleSignOut } = useAuth();

    return (
        <nav className="w-full z-10 bg-gray-200">
            <div className=" text-black py-4 px-6 flex justify-between items-center gap-4 mx-8">
                <img className="w-12" src="https://pro2-bar-s3-cdn-cf.myportfolio.com/3d13047a-c0fe-40bf-aeca-94fdf975291e/84193e9e-b5a2-4499-a4ec-7c4750826db0_rwc_0x614x5004x3753x5004.png?h=c79866de72d6dc2b3cc77502e03fc104" alt="" />
                <input type="search" className="rounded-md p-2 outline-none w-44 md:w-[50rem]" placeholder="Search..." />
                <div>
                    {user ? (
                        <img className="w-12 h-12 border rounded-full cursor-pointer" onClick={popUP} src={user.photoURL} alt="User Profile" />
                    ) : (
                        <Link to="/auth"><button className="bg-transparant border border-black rounded-full hover:bg-black px-3 py-1 font-semibold hover:text-white">Sign in</button></Link>
                    )}
                </div>
            </div>
            <AnimatePresence>
                {
                    menu && (
                        <motion.div
                           {...SlideUp}
                            onMouseLeave={() => setMenu(false)}
                            className="flex justify-start items-start w-52 h-60 bg-white  absolute right-10 top-20 p-2">
                            <div className="flex flex-col gap-6 ml-4">
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

        </nav>
    );
};

export default Navbar;
