"use client";
import Link from "next/link";
import {
  FaArrowLeft,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSpinner, // Import the spinner icon
} from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from "axios";
import { initializeUser } from "@/lib/slices/user/userSlice";
import { PhoneInput } from "react-international-phone";
import 'react-international-phone/style.css';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [phone, setPhone] = useState("");
  const [phone, setphone] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  const router = useRouter();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneError, setPhoneError] = useState<string>("");

    // Validate international phone number
    const validatephone = (number: string): boolean => {
      // Example validation; you might need to adjust it
      const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
      return regex.test(number) && number.length > 5; // Adjust length as needed
    };
  
  const handlePhoneChange = (newPhone: string) => {
    setphone(newPhone);
    if (validatephone(newPhone)) {
      setPhoneError("");
    } else {
      setPhoneError("Invalid phone number format.");
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSignUp = async () => {
    setIsLoading(true); // Start loading
    try {
      const payload = { username, email, passwordHash: password, phone };
      const response = await axios.post('/api/auth/signup', payload);
      
      // Dispatching the initializeUser action only on successful sign-up
      dispatch(initializeUser(response.data));
      
      router.push('/dashboard'); // Redirect on successful signup
    } catch (error: any) {
      console.error('Error signing up:', error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col lg:flex-row lg:items-center relative font-poppins overflow-x-hidden">
      {/* Background SVG */}
      <div className="absolute top-0 left-0 right-0 z-0">
        {/* SVG content */}
      </div>

      <div className="relative w-full max-w-md lg:max-w-lg mx-auto mt-[3rem] z-10">
        <div className="h-16 w-full flex items-center justify-between px-4 lg:px-8">
          <Link
            href="/registration/"
            className="bg-teal-custom p-3 rounded-full shadow-lg mt-4 lg:mt-6"
          >
            <FaArrowLeft className="text-white" />
          </Link>
        </div>

        <div className="text-black lg:mt-12 mx-4 lg:mx-0 lg:text-center mt-[3rem]">
          <h1 className="text-2xl md:text-3xl sm:text-sm lg:text-4xl font-bold">Sign Up</h1>
          <h2 className="text-sm md:text-xl lg:text-2xl font-normal text-black/50">Create an account here</h2>
        </div>

        {/* Input Fields Section */}
        <div className="flex flex-col ml-[3rem] mt-[2rem] lg:mx-8 space-y-6">
          {/* Username */}
          <div className="flex items-center border-b border-gray-400 ml-2 w-full h-[3rem] max-w-[17rem]">
            <FaUser className="text-gray-500 mr-2" />
            <div className="border-r border-gray-400 h-8 mr-2"></div>
            <input
              type="text"
              placeholder="Username"
              className="flex-1 py-1 px-2 focus:outline-none text-black text-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Phone */}
          {/* <div className="flex items-center border-b border-gray-400 ml-2 w-full h-[3rem] max-w-[17rem]">
            <FaPhone className="text-gray-500 mr-2" />
            <div className="border-r border-gray-400 h-8 mr-2"></div>
            <input
              type="text"
              placeholder="Phone"
              className="flex-1 py-1 px-2 focus:outline-none text-black text-lg"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div> */}

          {/* PHONE -2 */}
          <div className="flex flex-col items-center  border-gray-400 text-lg white ml-2 w-full h-[3rem] max-w-[17rem]">
          {/* <FaPhone className="text-gray-500 mr-2" /> */}
          {/* <div className="border-r border-gray-400 h-8 ml-2"></div> */}
          <div className="flex items-center border-b-2 border-gray-300 w-full h-[3.8rem] max-w-[17rem]">
          <PhoneInput
             defaultCountry="ke" // Ensure defaultCountry is set to KE
             value={phone}
              
             onChange={handlePhoneChange}
              inputStyle={{
                // backgroundColor: '#F7F8F9',
                border: '0px solid #E8ECF4',
                // borderBottom: '4px solid #D1D5DB',
                // borderRadius: '8px',
                fontSize: '1rem', // Adjust font size
                height: '3.5rem', // Adjust height
                width: '100%',    // Ensure full width
                padding: '0 1rem', // Adjust padding
              
              }}
              countrySelectorStyleProps={{
                flagStyle: {
                  // backgroundColor: 'border-gray-400',
                  width: '24px', // Adjust flag width
                  height: '24px', // Adjust flag height
                  objectFit: 'cover', // Ensure the flag image covers its container
               
                }
              }}
             
            />
          </div>
          {/* {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>} */}
        </div>

          {/* Email */}
          <div className="flex items-center border-b border-gray-400 ml-2 w-full h-[3rem] max-w-[17rem]">
            <FaEnvelope className="text-gray-500 mr-2" />
            <div className="border-r border-gray-400 h-8 mr-2"></div>
            <input
              type="email"
              placeholder="Email"
              className="flex-1 py-1 px-2 focus:outline-none text-black text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex items-center border-b border-gray-400 relative ml-2 w-full h-[3rem] max-w-[17rem]">
            <FaLock className="text-gray-500 mr-2" />
            <div className="border-r border-gray-400 h-8 mr-2"></div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="flex-1 py-2 px-2 focus:outline-none text-black text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute right-2">
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border-b border-gray-400 relative ml-2 w-full h-[3rem] max-w-[17rem]">
            <FaLock className="text-gray-500 mr-2" />
            <div className="border-r border-gray-400 h-8 mr-2"></div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="flex-1 py-2 px-2 focus:outline-none text-black text-lg"
            />
            <div className="absolute right-2">
              <button type="button" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center mr-[7rem] focus:outline-none text-sm w-[20rem] text-black/75">
            <h1>By signing up you agree with our Terms of Use</h1>
          </div>

          {/* Sign Up Button */}
          <div className="flex flex-col">
            <button
              onClick={handleSignUp}
              className="bg-teal-custom text-white w-[20rem] py-1 rounded-[40px] text-lg font-semibold text-center"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" /> Signing Up...
                </div>
              ) : (
                "Sign Up"
              )}
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
              <Link href="/registration/signin" className="font-bold text-[#008080]">
                Sign In
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
