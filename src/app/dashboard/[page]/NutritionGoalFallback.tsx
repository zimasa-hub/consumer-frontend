// NutrientGoalFallback.tsx

import Link from "next/link";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";

export default function NutrientGoalFallback() {
  return (
    <div className="flex flex-col min-h-screen bg-semi-transparent-orange font-plusJakarta mb-[4rem] overflow-y-auto ">
      <h2 className="flex mt-4 ml-4 items-start justify-start">
        <Link href="/dashboard/nutrition">
          <FaArrowLeft className="text-gray-600 hover:text-gray-800 font-bold mr-2 mt-[0.1rem]" />
        </Link>
        Set Nutrient Goal
      </h2>
      <h1 className="flex mt-4 ml-4 text-2xl font-bold items-start">
        Set Daily Nutrient Goal
      </h1>

      {/* Placeholder UI for loading state */}
      <div className="animate-pulse">
        {/* Input placeholders */}
        <div className="w-[380px] h-[41px] mt-4 ml-5 bg-gray-300 rounded-[10px]"></div>

        {/* Date picker placeholders */}
        <div className="grid grid-cols-2 gap-4 p-4 mt-4">
          <div className="w-full h-[35px] bg-gray-300 rounded-[10px]"></div>
          <div className="w-full h-[35px] bg-gray-300 rounded-[10px]"></div>
        </div>

        {/* Pie chart placeholder */}
        <div
          className="bg-gray-300 rounded-full"
          style={{
            width: "266.34px",
            height: "174.62px",
            marginTop: "20px",
            marginLeft: "57px",
          }}
        ></div>

        {/* Macro nutrient placeholders */}
        <div className="grid grid-cols-2 mt-4 px-4 gap-4">
          <div className="w-[100px] h-[41px] bg-gray-300 rounded-[5px]"></div>
          <div className="w-[100px] h-[41px] bg-gray-300 rounded-[5px]"></div>
          <div className="w-[100px] h-[41px] bg-gray-300 rounded-[5px]"></div>
        </div>

        {/* Micro nutrient goal placeholder */}
        <div className="mt-4 px-4">
          <div className="bg-gray-300 h-[50px] rounded-lg mb-4"></div>
          <div className="bg-gray-300 h-[50px] rounded-lg mb-4"></div>
        </div>
      </div>
    </div>
  );
}
