"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import axios from 'axios';
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { formatDateToISO } from "@/lib/utilities";
import { NutritionPayload } from "@/lib/interfaces";

export default function Nutrition() {
  const [nutritionDate, setNutritionDate] = useState<Date | null>(new Date());
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const user = useSelector((state: RootState) => state.user.user);
  const token = user?.accessToken
  const userId = user?.id;


  const [nutrients, setNutrients] = useState<Array<{ name: string; current: number; goal: number }>>([]);
  const [foodSections, setFoodSections] = useState<Array<{ name: string; recommended: number; consumed: number }>>([]);
  const [calories, setCalories] = useState<number>(0);
  
  const [goal,setGoal] = useState(0) // Example goal
  const [recommendedCalories, setRecommendedCalories] = useState<number>(430); // Example recommended calories
  const [consumedCalories, setConsumedCalories] = useState<number>(170); // Example consumed calories

  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const [noData, setNoData] = useState<boolean>(false); // State to track if no data is available


  const fetchData = async (date: Date | null) => {
  if (date) {
    try {
      const formattedDate = date.toISOString();
  
      const response = await axios.get(`/api/user/${formattedDate}`, {
        headers: {
          Authorization: `${token}`,
        }
      });
  
      const data: NutritionPayload = response.data;
      setNoData(false); // Reset noData state if data is fetched successfully


      // Update state with the received data
      setNutrients(data.nutrientTargets.map(n => ({
        name: n.nutrient.name,
        current: 0, // You might want to calculate the current value based on user data
        goal: n.dailyTarget
      })));
      setFoodSections(data.plannedMealSchedule.map(m => ({
        name: m.mealTimings.name,
        recommended: 0, // You might want to calculate the recommended value based on user data
        consumed: 0 // You might want to calculate the consumed value based on user data
      })));
      setGoal(data.nutritionTarget.totalCaloriesSet); // Adjust based on actual data
      // Adjust any other state updates based on the response data
      setCalories(data.nutritionTarget.remainingCalories)

    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setNoData(true); // Set noData to true if a 404 error occurs
      } else {
        console.error("Error fetching data:", error);
      }
    }
  }
};

  
  useEffect(() => {
    // Fetch nutrients and food data from API
    fetchData(nutritionDate); // Pass the Date object directly
  }, [token]);
  
  const handleDateChange = (date: Date | null) => {
    setNutritionDate(date);
    fetchData(date);
  };

  const navigateDate = (direction: "prev" | "next") => {
    if (nutritionDate) {
      const newDate = new Date(nutritionDate);
      newDate.setDate(direction === "prev" ? newDate.getDate() - 1 : newDate.getDate() + 1);
      setNutritionDate(newDate);
      setCalories(0)
      fetchData(newDate)
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollLeft = carouselRef.current.scrollLeft;
        const width = carouselRef.current.clientWidth;
        const index = Math.round(scrollLeft / width);
        setScrollIndex(index);
      }
    };

    const element = carouselRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => element.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const width = carouselRef.current.clientWidth;
      const scrollAmount = direction === "left" ? -width : width;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleRectangleClick = (index: number) => {
    setSelectedIndex(index);
    setScrollIndex(index);
    const scrollPosition = index * (carouselRef.current?.clientWidth || 0);
    carouselRef.current?.scrollTo({ left: scrollPosition, behavior: "smooth" });
  };

  // UPDATE THIS BASED ON BACKEND API
  const progress = Math.min(calories / goal, 1);
  const startColor = '#008080';
  const endColor = 'rgba(255, 165, 0, 0.5)';
  // const caloriesRemaining =  calories;

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-50 font-poppins">
      {/* Date Navigation Section */}
      <div className="relative w-full flex justify-center items-center mt-4 px-20 bg-semi-transparent-orange">
        <button
          onClick={() => navigateDate("prev")}
          className="p-2 text-lg text-[#008080] rounded-md"
        >
          {"<"}
        </button>
        <div className="flex-grow flex items-center justify-center z-40">
          <DatePicker
            selected={nutritionDate}
            onChange={handleDateChange}
            className="flex flex-col text-center text-base p-1 w-[158px] bg-transparent"
            dateFormat="dd MMMM yyyy"
            wrapperClassName="flex flex-col justify-center items-center"
            popperPlacement="bottom"
            popperClassName="date-picker-popper"
            dropdownMode="scroll"
            showMonthDropdown
            showYearDropdown
            onKeyDown={handleKeyDown}
            yearDropdownItemNumber={15}
            scrollableYearDropdown
          />
        </div>
        <button
          onClick={() => navigateDate("next")}
          className="p-2 text-lg text-[#008080] rounded-md"
        >
          {">"}
        </button>
      </div>

      {/* Circle Content Section */}
      <div className="flex flex-col py-2 w-full h-[27vh] items-center bg-semi-transparent-orange md:h-[20vh] lg:h-[15vh]">
        <div className="relative flex items-center justify-center mt-2" style={{ width: '159px', height: '159px' }}>
          {/* Circular Progress SVG */}
          <svg className="absolute inset-0" width="159" height="159" viewBox="0 0 159 159">
            <circle
              cx="79.5"
              cy="79.5"
              r="74.5"
              stroke={endColor}
              strokeWidth="5"
              fill="none"
            />
            <circle
              cx="79.5"
              cy="79.5"
              r="74.5"
              stroke={startColor}
              strokeWidth="5"
              fill="none"
              strokeDasharray="468"
              strokeDashoffset={468 * (1 - progress)} 
              strokeLinecap="round"
            />
          </svg>
          {/* Inner Circle */}
          <div className="relative flex items-center justify-center rounded-full bg-[rgba(255,165,0,0.1)] w-full h-full">
            <div className="relative text-center">
              <div className="text-2xl font-semibold" style={{ fontFamily: 'Epilogue', fontSize: '22px', fontWeight: 600, lineHeight: '21px' }}>
                {calories} 
              </div>
              <div className="text-sm font-semibold" style={{ fontFamily: 'Epilogue', fontSize: '12px', fontWeight: 600, lineHeight: '21px' }}>
                Calories Remaining
              </div>
            </div>
          </div>
        </div>
        <Link
          className="flex justify-center text-center bg-teal-custom shadow-lg text-white h-[3rem] w-[15rem] py-[0.6rem] mt-4 rounded-[40px] text-lg font-semibold"
          href="/dashboard/nutrient-goal"
        >
          My Goals
        </Link>
      </div>

       {/* Nutrients List */}
       <div className="bg-semi-transparent-orange min-h-screen mt-6 w-full">
        {noData ? (
          <div className="flex justify-center items-center py-20 w-full h-full">
            <div className="animate-pulse bg-teal-custom rounded-md p-4">
              <p className="text-lg text-white">No Goal set on this date</p>
            </div>
          </div>
        ) : (
          <div  className="">
             {/* Nutrients Goal Section */}
      <div className="flex flex-col py-2 w-full mt-4 bg-[#FFA5001A] md:h-[20vh] lg:h-[15vh] overflow-x-auto">
  <div className="flex items-center">
    <h2 className="text-lg font-semibold mb-2 px-2 mt-2">Nutrients Goal</h2>
  </div>
  <div className="flex space-x-2 px-2" ref={carouselRef}>
    {nutrients.map((nutrient, index) => (
      <div
      key={index}
      onClick={() => handleRectangleClick(index)}
      className={`flex flex-col items-center justify-between bg-white shadow-md rounded-md p-2 cursor-pointer ${selectedIndex === index ? "border-2 border-[#4CAF50]" : ""}`}
      style={{ width: '100px', height: '110px', overflow: 'hidden' }}
    >
      <div className="text-sm font-semibold mb-1 overflow-hidden text-ellipsis whitespace-nowrap" style={{ width: '100%' }}>
        {nutrient.name}
      </div>
      <div className="text-xs mb-1 overflow-hidden">{`${nutrient.current}/${nutrient.goal}g`}</div>
      <div
        className="w-full h-2 bg-[#4CAF504D] rounded-md"
        style={{
          background: `linear-gradient(to right, #4CAF50 ${Math.min(nutrient.current / nutrient.goal, 1) * 100}%, #4CAF504D ${Math.min(nutrient.current / nutrient.goal, 1) * 100}%)`
        }}
      />
    </div>
    
    ))}
  </div>
</div>


           {/* Carousel Indicator */}
           <div className="flex items-center justify-center w-full py-2 bg-[#FFA5001A]">
        <button
          onClick={() => scrollCarousel("left")}
          className="p-2 text-lg text-[#008080] rounded-md"
        >
          {""}
        </button>
        <div className="flex flex-grow items-center justify-center space-x-2">
          {nutrients.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${scrollIndex === index ? 'bg-[#4CAF50]' : 'bg-[#D9D9D9]'} transition-colors duration-300`}
            />
          ))}
        </div>
        <button
          onClick={() => scrollCarousel("right")}
          className="p-2 text-lg text-[#008080] rounded-md"
        >
          {""}
        </button>
      </div>

     
      {/* Food Section */}
      <div className="flex flex-col py-2 w-full mt-4 mb-4 bg-[#FFA5001A] overflow-x-auto">
  <h2 className="text-lg font-semibold mb-2 px-2 mt-2">Food Section</h2>
  {foodSections.length > 0 ? (
    <div className="space-y-4 px-2">
      {foodSections.map((section, index) => {
        const progress = Math.min(section.consumed / section.recommended, 1);
        return (
          <div
            key={index}
            className="relative flex flex-col bg-white shadow-md rounded-md p-4 mb-4"
            style={{ width: '100%', maxWidth: '500px' }}
          >
            {/* Floating Button */}
            <div className="absolute top-4 right-4 flex items-center justify-center">
              <button className="border-2 border-teal-custom text-teal-custom rounded-full p-2">
                <FaPlus />
              </button>
            </div>
            
            <div className="text-lg font-semibold">{section.name}</div>
            <div className="text-sm mt-1">
              <span className="font-medium">Recommended: </span>
              {section.recommended} calories
            </div>
            <div className="text-sm mt-1">
              <span className="font-medium">Consumed: </span>
              {section.consumed} calories
            </div>
            <div className="relative mt-2 h-2 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-[#4CAF50] rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="text-center text-gray-500">No food data available</div>
  )}
</div>
          </div>
        )}
      </div>
    

    

    </div>
  );
}
