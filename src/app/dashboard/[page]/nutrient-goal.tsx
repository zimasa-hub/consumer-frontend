"use server";
import Link from "next/link";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";

import NutrientCSR from "./NutrientCSR";
import { Suspense } from "react";
import NutrientGoalFallback from "./NutritionGoalFallback";


async function NutrientGoal() {

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
  {/* Use Suspense to wrap the CSR component */}
  <Suspense fallback={<NutrientGoalFallback />}>
        <NutrientCSR />
      </Suspense>
    </div>
  );
}

export default NutrientGoal;