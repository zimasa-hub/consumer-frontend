"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeUser } from "@/lib/slices/user/userSlice"; // Adjust the import path as needed
import axios, { AxiosError } from 'axios';
import { useRouter } from "next/navigation";
import 'react-international-phone/style.css';
import { PhoneInput } from "react-international-phone";
import { RootState } from "@/lib/store";
import { formatDateToISO, formatISOToDate } from "@/lib/utilities";


export default function Profile() {
  const [username, setUsername] = useState<string>("Mary Jane");
  const [email, setEmail] = useState<string>("mary.jane@example.com");
  const [phone, setphone] = useState<string>("");
  const [address, setaddress] = useState<string>("Female");
  const [dateOfBirth, setdateOfBirth] = useState<string>("1990-01-01");
  const [phoneError, setPhoneError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Define loading state
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const token = user?.accessToken
  const userId = user?.id;

  // Format the date of birth to ISO 8601 format
  const formattedDateOfBirth = formatDateToISO(dateOfBirth);

  

  
  // Fetch user data when component mounts
  
    const fetchUserData = async () => {
      if (!userId) return;
  
      try {
        const response = await axios.get(`/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          }
        });
  
        const data = response.data;

        console.log("DATA :", data)
  
        setUsername(data.username || "");
        setEmail(data.email || "");
        setphone(data.phone || "");
        setaddress(data.address || "");
        setdateOfBirth(formatISOToDate(data.dateOfBirth) || "");
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          // Handle Axios-specific errors
          console.error('Error fetching user data:', error.response?.data?.message || error.message);
        } else if (error instanceof Error) {
          // Handle standard errors
          console.error('Error fetching user data:', error.message);
        } else {
          // Fallback for unknown error types
          console.error('An unknown error occurred:', error);
        }
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
  
    fetchUserData();
  }, [userId,token]);

   // Manual trigger function for testing
   const handleManualFetch = () => {
    setLoading(true); // Show loading state
    fetchUserData();
  };

  const handleSave = async () => {
    try {
      
    
      const response = await axios.put('/api/user/update', {
        username,
        email,
        phone,
        address,
        dateOfBirth: formattedDateOfBirth
      }, {
        headers: {
          Authorization: `${token}`, // Include the token in the Authorization header
          'X-User-ID': user?.id, // Custom header for user ID
          'Content-Type': 'application/json'
        }
      });


      // Handle successful response
      console.log('Profile updated:', response.data);

      
      handleManualFetch();
      // Optionally, update the Redux store or perform additional actions
      // dispatch(updateUser(response.data));
      
      router.push('/dashboard/profile'); // Redirect to profile page or wherever you want
    } catch (error: any) {
      console.error('Error updating profile:', error.response?.data?.message || error.message);
    }
  };

  const handleSignOut = () => {
    // Logic to sign out the user
  };

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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="spinner"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8 text-base font-poppins">
      {/* Profile Image Section */}
      <div className="relative w-32 h-32 mb-6 mt-8">
        <Image
          src="/lady_profile.png"
          alt="Profile"
          className="rounded-lg object-cover"
          layout="fill"
          objectFit="cover"
          priority
        />
        <button className="absolute bottom-0 right-0 p-2 bg-teal-500 rounded-full text-white">
          <FaEdit />
        </button>

        <h1 className="relative text-xl md:text-xl lg:text-2xl font-bold text-black mt-[9rem] ml-2">
          {user ? user.username : 'Mary Jane'}
        </h1>
      </div>

      {/* Editable Fields */}
      <div className="w-full max-w-md mt-4">
        {/* Username */}
        <div className="relative mb-6 mt-4">
          <label
            htmlFor="username"
            className="text-gray-600 text-sm absolute -top-4 left-1 "
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-14 bg-[#F7F8F9] border border-[#E8ECF4] rounded-lg px-4 text-black  mt-[0.4rem]"
          />
        </div>

        {/* Email */}
        <div className="relative mb-6 mt-[2rem]">
          <label
            htmlFor="email"
            className="text-gray-600 text-sm absolute -top-4 left-1 "
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 bg-[#F7F8F9] border border-[#E8ECF4] rounded-lg px-4 text-black  mt-[0.4rem]"
          />
        </div>

   {/* Phone Number */}
   <div className="relative mb-6 mt-[2rem] ">
          <label
            htmlFor="phone"
            className="text-gray-600 text-sm absolute -top-4 left-1 mb-[1rem]"
          >
            Phone Number
          </label>
          <div className="relative w-full h-14 bg-[#F7F8F9] border border-[#E8ECF4] rounded-lg ">
            <PhoneInput
             defaultCountry="ke" // Ensure defaultCountry is set to KE
              value={phone}
              onChange={handlePhoneChange}
              inputStyle={{
                backgroundColor: '#F7F8F9',
                border: '1px solid #E8ECF4',
                borderRadius: '8px',
                fontSize: '1rem', // Adjust font size
                height: '3.5rem', // Adjust height
                width: '100%',    // Ensure full width
                padding: '0 1rem' // Adjust padding
              }}
              countrySelectorStyleProps={{
                flagStyle: {
                  width: '24px', // Adjust flag width
                  height: '24px', // Adjust flag height
                  objectFit: 'cover', // Ensure the flag image covers its container
               
                }
              }}
             
            />
          </div>
          {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
        </div>
        
        {/* Gender */}
        <div className="relative mb-6 py-2">
          <label
            htmlFor="address"
            className="text-gray-600 text-sm absolute -top-4 left-1 py-[0.2rem]"
          >
            Gender
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            className="w-full h-14 bg-[#F7F8F9] border border-[#E8ECF4] rounded-lg px-4 text-black"
          />
        </div>

    {/* Date of Birth */}
    <div className="relative mb-8 mt-[2rem]">
          <label
            htmlFor="dateOfBirth"
            className="text-gray-600 text-sm absolute -top-4 left-1"
          >
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setdateOfBirth(e.target.value)}
            className="w-full h-14 bg-[#F7F8F9] border border-[#E8ECF4] rounded-lg px-4 text-black mt-[0.2rem]"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full h-14 bg-teal-500 text-white rounded-lg font-bold text-xl mt-2"
        >
          Save
        </button>

          {/* Manual Fetch Button */}
          {/* <button
          onClick={handleManualFetch}
          className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold mt-4"
        >
          Fetch User Data
        </button> */}
      </div>

      {/* Sign Out Link */}
      <Link
        href="/signout"
        onClick={handleSignOut}
        className="mt-4 text-red-400  font-semibold text-xl"
      >
        Sign Out
      </Link>
    </div>
  );
}
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

