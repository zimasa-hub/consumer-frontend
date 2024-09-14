"use client";
import Link from "next/link";
import {
  FaArrowLeft,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { initializeUser } from "@/lib/slices/user/userSlice"; // Adjust the import path as needed
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [showpasswordHash, setShowpasswordHash] = useState(false);
  const [email, setemail] = useState("");
  const [passwordHash, setpasswordHash] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  const router = useRouter();

  const togglepasswordHashVisibility = () => setShowpasswordHash(!showpasswordHash);

  const handleSignIn = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post('/api/auth/signin', { email, passwordHash });

      console.log("RESPONSE :" ,response)
      
      // Dispatching the initializeUser action only on successful sign-in
      dispatch(initializeUser(response.data));
      
      router.push('/dashboard'); // Redirect on successful login
    } catch (error: any) {
      console.error('Error signing in:', error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col lg:flex-row lg:items-center relative font-poppins overflow-x-hidden">
      {/* Background SVG and other elements */}

      <div className="relative w-full max-w-md lg:max-w-lg mx-auto mt-[3rem] z-10">
        <div className="text-black lg:mt-12 mx-4 lg:mx-0 lg:text-center mt-[3rem]">
          <h1 className="text-2xl md:text-3xl sm:text-sm lg:text-4xl font-bold">Sign In</h1>
          <h2 className="text-sm md:text-xl lg:text-2xl font-normal text-black/50 py-2 ml-2">Welcome back</h2>
        </div>

        {/* Input Fields Section */}
        <div className="flex flex-col ml-[3rem] mt-[2rem] lg:mx-8 space-y-6">
          {/* Email Address */}
          <div className="flex items-center border-b border-gray-400 ml-2 w-full h-[3rem] max-w-[17rem]">
          <FaEnvelope className="text-gray-500 mr-2 shrink-0 text-xl" />


            <div className="border-r border-gray-400 h-8 mr-2"></div>
            <input
              type="email"
              placeholder="Email"
              className="flex-1 py-1 px-2 focus:outline-none text-black text-lg"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex items-center border-b border-gray-400 relative ml-2 w-full h-[3rem] max-w-[17rem]">
            <FaLock className="text-gray-500 mr-2 shrink-0 text-xl" />
            <div className="border-r border-gray-400 h-8 mr-2"></div>
            <input
              type={showpasswordHash ? "text" : "password"}
              placeholder="Password"
              className="flex-1 py-2 px-2 focus:outline-none text-black text-lg"
              value={passwordHash}
              onChange={(e) => setpasswordHash(e.target.value)}
            />
            <div className="absolute right-2">
              <button type="button" onClick={togglepasswordHashVisibility}>
                {showpasswordHash ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <div className="flex flex-col">
            <button
              onClick={handleSignIn}
              className="bg-teal-custom text-white w-[20rem] py-1 rounded-[40px] text-lg font-semibold text-center flex justify-center items-center"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? <FaSpinner className="animate-spin mr-2" /> : "Sign In"}
            </button>
          </div>

          {/* OR Divider */}
          <div className="flex justify-center items-center w-full max-w-[20rem] ">
            <hr className="border-teal-custom flex-grow opacity-100" />
            <div className="mx-2 bg-white px-[6px] py-[6px] rounded-full border-1 border-teal-custom text-teal-custom font-semibold text-sm">
              OR
            </div>
            <hr className="border-teal-custom flex-grow opacity-100" />
          </div>

          {/* Social Login Links */}
          <div className="flex flex-col items-center">
            <Link
              className="bg-white text-teal-custom ml-[-3rem] w-[20rem] border-[0] shadow-[0px_4px_10px_rgba(0,0,0,0.3)] border-teal-custom py-2 rounded-[40px] text-lg font-normal text-center flex items-center justify-center"
              href="/registration/signup"
            >
              <img src="/google_svg.svg" alt="Google Logo" className="mr-2 w-4 h-4 ml-[-1rem]" />
              Log in with Google
            </Link>

            <Link
              className="bg-white text-teal-custom ml-[-3rem] w-[20rem] mt-3 border-[0] shadow-[0px_4px_10px_rgba(0,0,0,0.3)] border-teal-custom py-2 rounded-[40px] text-lg font-normal text-center flex items-center justify-center"
              href="/registration/signup"
            >
              <img src="/facebook_svg.svg" alt="Facebook Logo" className="mr-2 w-4 h-4" />
              Log in with Facebook
            </Link>

            <h2 className="flex items-center md:text-xl lg:text-xl mt-3 text-black/50">
              New Member?{" "}
              <Link href="/registration/signup" className="font-bold text-[#008080]">
                Sign Up
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
