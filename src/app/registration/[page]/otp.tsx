"use client";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useState, ChangeEvent } from "react";

export default function OtpScreen() {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { value } = e.target;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input box if there's a value and the index is within bounds
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(
          `otp-input-${index + 1}`
        ) as HTMLInputElement | null;
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    const paste = e.clipboardData.getData("text").slice(0, 4).split("");
    setOtp(paste);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col lg:flex-row lg:items-center relative font-poppins overflow-x-hidden">
      {/* Background SVG */}
      <div className="absolute top-0 left-0 right-0 z-0">
        <svg
          width="100%"
            height="100%"
          viewBox="0 0 428 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M535.5 78.2627C535.5 134.872 486.475 180.763 426 180.763C365.525 180.763 -61 18.8719 -61 -37.7373C-61 -94.3465 243.025 -63.7373 303.5 -63.7373C363.975 -63.7373 535.5 21.6535 535.5 78.2627Z"
            fill="#008080"
          />
        </svg>
      </div>

      <div className="relative w-full max-w-md lg:max-w-lg mx-auto mt-[3rem] z-10">
        <div className="h-16 w-full flex items-center justify-between px-4 lg:px-8">
          <Link
            href="/registration/signup"
            className="bg-teal-custom p-3 rounded-full shadow-lg mt-4 lg:mt-6"
          >
            <FaArrowLeft className="text-white" />
          </Link>
        </div>

        <div className="flex justify-center py-10 items-center text-black lg:mt-12 mx-4 lg:mx-0 lg:text-center mt-[3rem]">
          <h1 className="text-2xl md:text-3xl sm:text-sm lg:text-4xl font-bold">
            Confirmation Code
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center text-black font-normal">
          <h2>Please enter the verification code you've received</h2>
          <h2 className="text-teal-custom py-2 font-semibold">test@gmail.com</h2>

          <h1 className="text-black/50 py-6 font-normal">Enter Verification Code</h1>
        </div>

        {/* OTP Input Boxes */}
        <div className="flex justify-center space-x-4 py-4">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onPaste={handlePaste}
              maxLength={1}
              className="w-12 h-12 text-center text-lg border-2 border-teal-custom rounded-lg focus:outline-none focus:border-teal-500 text-black caret-black"
            />
          ))}
        </div>

        <div className="flex flex-col items-center py-6">
        <Link
              className="flex justify-center text-center bg-teal-custom shadow-lg text-white h-[3rem] w-[20rem] py-[0.6rem] rounded-[40px] text-lg font-semibold "
              href="/dashboard"
            >
             Confirm
            </Link>

            <h2 className="text-teal-custom py-4 font-semibold">Resend Code</h2>
        </div>
      </div>
    </div>
  );
}
