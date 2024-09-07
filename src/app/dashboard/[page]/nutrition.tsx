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
import DatePicker from "react-datepicker"; // 
import { formatDateToISO, formatISOToDate } from "@/lib/utilities";


export default function Nutrition() {
  const [username, setUsername] = useState<string>("Mary Jane");
  const [email, setEmail] = useState<string>("mary.jane@example.com");
  const [phone, setphone] = useState<string>("");
//   const [address, setaddress] = useState<string>("Female");
//   const [dateOfBirth, setdateOfBirth] = useState<string>("1990-01-01");
  const [phoneError, setPhoneError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Define loading state
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const token = user?.jwt
  const userId = user?.id;

  // Format the date of birth to ISO 8601 format
//   const formattedDateOfBirth = formatDateToISO(dateOfBirth);

  
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(new Date());

  
  

  const handleDateChange = (date: Date | null) => {
    setDateOfBirth(date);
  };

  // Date navigation
  const navigateDate = (direction: "prev" | "next") => {
    if (dateOfBirth) {
      const newDate = new Date(dateOfBirth);
      newDate.setDate(direction === "prev" ? newDate.getDate() - 1 : newDate.getDate() + 1);
      setDateOfBirth(newDate);
    }
  };

//   if (loading) return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="spinner"></div>
//     </div>
//   );

return (
    <div className="flex flex-col min-h-screen items-center bg-gray-50">
      {/* Date Navigation Section */}
      <div className="relative w-full flex justify-center items-center mt-6">
        <button onClick={() => navigateDate("prev")} className="absolute left-4">
          {"<"}
        </button>
        <div className="flex items-center justify-center">
          <DatePicker
            selected={dateOfBirth}
            onChange={handleDateChange}
            className="text-center border border-gray-300 rounded-md p-1"
            dateFormat="dd MMMM yyyy"
            wrapperClassName="w-[139px] h-[21px]"
          />
        </div>
        <button onClick={() => navigateDate("next")} className="absolute right-4">
          {">"}
        </button>
      </div>

      {/* Content Section */}
      <div className="flex flex-col w-full h-[25vh] items-center bg-[#FFA5001A] md:h-[20vh] lg:h-[15vh] mt-6">
        THIS IS NUTRITION
      </div>
    </div>
  );
  
}
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

