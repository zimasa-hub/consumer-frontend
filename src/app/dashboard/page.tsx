"use client"
import { RootState } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaBrain, FaDumbbell, FaHome, FaHeartbeat, FaBed, FaStethoscope, FaAppleAlt } from 'react-icons/fa'; // Import the necessary icons
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const items = [
    { name: 'Mental Wellness', icon: <FaBrain className="text-black text-xl md:text-2xl" /> },
    { name: 'Fitness Levels', icon: <FaDumbbell className="text-black text-xl md:text-2xl" /> },
    { name: 'Home Care', icon: <FaHome className="text-black text-xl md:text-2xl" /> },
    { name: 'Vital Signs', icon: <FaHeartbeat className="text-black text-xl md:text-2xl" /> },
    { name: 'Quality of Sleep', icon: <FaBed className="text-black text-xl md:text-2xl" /> },
    { name: 'Body Metrics', icon: <FaStethoscope className="text-black text-xl md:text-2xl" /> },
    { name: 'Disease Presence', icon: <FaAppleAlt className="text-black text-xl md:text-2xl" /> },
    {
      name: 'Nutrition Status',
      icon: (
        <Link href="/dashboard/nutrition">
          <FaStethoscope className="text-black text-xl md:text-2xl" />
        </Link>
      ),
    }
    
  ];

  const radius = 150; // Adjust radius for better fit on smaller screens
  const angleStep = (2 * Math.PI) / items.length; // Angle between items

  const user = useSelector((state: RootState) => state.user.user);
  
   
  return (
    <div className="bg-semi-transparent-orange min-h-screen flex flex-col">
      {/* Profile Picture Section */}
     {/* Profile Picture Section */}
     <div className="flex justify-end items-center p-4">
        <Link href="/dashboard/profile"> {/* Link to the profile section */}
          <Image
            src="/lady_profile.png"
            width={100}
            height={100}
            className="rounded-lg w-[100px] h-[auto]" // Set width or height to auto
            alt="Profile Picture"
          />
        </Link>
      </div>

     {/* Greeting Section */}
     <div className="flex flex-col text-black lg:mt-12 mx-4 lg:mx-0 lg:text-center mt-[0rem]">
        <h1 className="md:text-3xl sm:text-sm lg:text-4xl font-normal">
          Hello,
        </h1>
        <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-black py-2 ml-2">
          {user ? user.username : 'Mary Jane'}
        </h2>
      </div>

      {/* Search Bar Section */}
      <div className="mx-4 lg:mx-0 lg:mt-6 flex justify-center items-center mt-[1rem]">
        <div className="relative w-full max-w-lg">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-gray-700" />
          </span>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 bg-gray-100 text-black rounded-[40px] focus:outline-none shadow-sm"
            placeholder="Search service"
          />
        </div>
      </div>

      {/* Circular Dashboard Items Section */}
      <div className="relative w-full h-[400px] sm:h-[800px] md:h-[600px] flex justify-center items-center mt-6">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute flex items-center justify-center w-full h-full">
            <div className="relative w-full h-full">
              {/* Center circle for health score */}
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="absolute text-center">
                  <h2 className=" text-teal-custom text-lg font-semibold  mb-2">Your health score is 90%</h2>
                </div>
              </div>

              <div className="absolute flex items-center justify-center w-full h-full">
                {items.map((item, index) => {
                  const angle = index * angleStep;
                  const x = radius * Math.cos(angle);
                  const y = radius * Math.sin(angle);
                  const style = {
                    transform: `translate(${x}px, ${y}px)`,
                  };

                  return (
                    <div key={item.name} className="absolute flex flex-col items-center" style={style}>
                      <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-[#FFA500] rounded-full shadow-md">
                        {item.icon}
                      </div>
                      <span className="text-black mt-2 text-center text-sm md:text-base">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative w-full h-[13rem] md:h-[12rem] lg:h-[15rem] "> {/* Added pb-2 for bottom padding */}
        <Image
          src="/hands.png"
          fill // replaces layout="fill"
          style={{ objectFit: "cover" }} // replaces objectFit="cover"
          className="rounded-lg"
          alt="Hands"
        />
        {/* Overlay with text */}
        <div className="absolute bottom-0 left-0 w-full  bg-white/50 p-4 rounded-b-lg flex flex-col justify-center items-center">
          <h2 className="text-teal-custom font-bold text-lg md:text-xl mb-2 text-center">
            How is Your Mental and Emotional Health Today?
          </h2>
          <p className="text-black/75 font-bold text-sm md:text-base text-center">
            Take a moment to check in with yourself and connect with an expert to explore your support options.
          </p>
        </div>
      </div>
    </div>
  );
}
