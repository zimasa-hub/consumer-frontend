"use client";

import Link from "next/link";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import NutrientPopUp from "./nutrientpopup";
import PopUp from "./nutrientpopup";
import { MicroNutrient } from "@/lib/interfaces";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { formatISOToDate } from "@/lib/utilities";
import axios from "axios";
import { setMealTimings } from "@/lib/slices/nutrition/nutrition_goal";
import { useAppDispatch } from "@/lib/hooks";



// Register necessary chart components
Chart.register(ArcElement, Tooltip, Legend);



export default function NutrientCSR() {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch()
  const token = user?.accessToken
  const userId = user?.id;
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedMealTimings, setSelectedMealTimings] = useState<number[]>([]); // Store selected meal timing IDs
  
  const mealTimings = useSelector((state: RootState) => state.meals.meals) || null;

  console.log("mealTimings : ", selectedMealTimings)


  const [microNutrients, setMicroNutrients] = useState<MicroNutrient[]>([
    { name: "Calcium", amount: 0, unit: "mg" },
  ]);

  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedNutrients, setSelectedNutrients] = useState<MicroNutrient[]>(
    []
  );

   // Use states for Carbs, Fats, and Proteins instead of hardcoded values
   const [carbs, setCarbs] = useState<number>(50);
   const [fats, setFats] = useState<number>(30);
   const [proteins, setProteins] = useState<number>(20);

   const fetchMealTimings = async () => {
    if (!userId) return;

    console.log("TOKEN : ", token)

    try {
      const response = await axios.get(`/api/user/nutritiongoal`, {
        headers: {
          Authorization: ` ${token}`, // Include the token in the Authorization header
        }
      });

      const data = response.data;
  
      console.log("DATA :", data)

      dispatch(setMealTimings(data));

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
      // setLoading(false);
    }
  };

useEffect(() => {

  fetchMealTimings();
}, [userId,token]);


// Memoize the calculation of percentages
const { carbsPercent, fatsPercent, proteinsPercent } = useMemo(() => {
  const total = carbs + fats + proteins;
  if (total === 0) {
    return { carbsPercent: 0, fatsPercent: 0, proteinsPercent: 0 };
  }
  return {
    carbsPercent: (carbs / total) * 100,
    fatsPercent: (fats / total) * 100,
    proteinsPercent: (proteins / total) * 100,
  };
}, [carbs, fats, proteins]); // Recalculate percentages only when carbs, fats, or proteins change



   // Handle empty input cases
   const handleCarbsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setCarbs(value === "" ? 0 : parseFloat(value));
  };

  const handleFatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setFats(value === "" ? 0 : parseFloat(value));
  };

  const handleProteinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setProteins(value === "" ? 0 : parseFloat(value));
  };


  const allNutrients: MicroNutrient[] = [
    { name: "Vitamin A", amount: 0, unit: "IU" },
    { name: "Vitamin C", amount: 0, unit: "mg" },
    { name: "Iron", amount: 0, unit: "mg" },
    { name: "Calcium", amount: 0, unit: "mg" },
    { name: "Vitamin D", amount: 0, unit: "IU" },
    { name: "Vitamin E", amount: 0, unit: "mg" },
    { name: "Vitamin K", amount: 0, unit: "mcg" },
    { name: "Thiamine (Vitamin B1)", amount: 0, unit: "mg" },
    { name: "Riboflavin (Vitamin B2)", amount: 0, unit: "mg" },
    { name: "Niacin (Vitamin B3)", amount: 0, unit: "mg" },
    { name: "Vitamin B6", amount: 0, unit: "mg" },
    { name: "Folate (Vitamin B9)", amount: 0, unit: "mcg" },
    { name: "Vitamin B12", amount: 0, unit: "mcg" },
    { name: "Biotin", amount: 0, unit: "mcg" },
    { name: "Pantothenic Acid (Vitamin B5)", amount: 0, unit: "mg" },
    { name: "Magnesium", amount: 0, unit: "mg" },
    { name: "Zinc", amount: 0, unit: "mg" },
    { name: "Copper", amount: 0, unit: "mg" },
    { name: "Manganese", amount: 0, unit: "mg" },
    { name: "Selenium", amount: 0, unit: "mcg" },
    { name: "Potassium", amount: 0, unit: "mg" },
    { name: "Sodium", amount: 0, unit: "mg" },
    { name: "Choline", amount: 0, unit: "mg" },
    { name: "Omega-3 Fatty Acids", amount: 0, unit: "g" },
    { name: "Omega-6 Fatty Acids", amount: 0, unit: "g" },
    { name: "Iodine", amount: 0, unit: "mcg" },
    { name: "Fluoride", amount: 0, unit: "mg" },
    { name: "Chromium", amount: 0, unit: "mcg" },
    { name: "Molybdenum", amount: 0, unit: "mcg" },
    { name: "Sulfur", amount: 0, unit: "mg" },
    { name: "Pectin", amount: 0, unit: "mg" },
    { name: "Lutein + Zeaxanthin", amount: 0, unit: "mg" },
    // Add more nutrients as needed
  ];


  const handleSliderChange = (index: number, value: number) => {
    const updatedNutrients = [...microNutrients];
    updatedNutrients[index].amount = value;
    setMicroNutrients(updatedNutrients);
  };

  const addMicroNutrient = () => {
    setShowPopUp(true);
  };

  const handleNutrientSelection = (nutrient: MicroNutrient) => {
    setSelectedNutrients(prevSelected => {
      // Check if the nutrient is already selected
      const isSelected = prevSelected.some(
        selected =>
          selected.name === nutrient.name &&
          selected.amount === nutrient.amount &&
          selected.unit === nutrient.unit
      );
  
      if (isSelected) {
        // Deselect the nutrient
        return prevSelected.filter(
          selected =>
            selected.name !== nutrient.name ||
            selected.amount !== nutrient.amount ||
            selected.unit !== nutrient.unit
        );
      } else {
        // Select the nutrient
        return [...prevSelected, nutrient];
      }
    });
  };
  

  const handleAddSelectedNutrients = () => {
    // Add the selected nutrients to the current microNutrients
     
     fetchMealTimings();

    setMicroNutrients((prevNutrients) => [
      ...prevNutrients,
      ...selectedNutrients,
    ]);
  
    // Clear selected nutrients to prevent re-adding them
    setSelectedNutrients([]);
  
    // Close the pop-up
    setShowPopUp(false);
  };
  





  const handleMealTimingChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked) {
      setSelectedMealTimings(prev => [...prev, id]);
    } else {
      setSelectedMealTimings(prev => prev.filter(item => item !== id));
    }
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    e.preventDefault(); // Prevents typing in the date picker
  };

    // Memoize the data for the Pie chart
    const data = useMemo(() => {
      return {
        labels: ['Carbs', 'Fats', 'Proteins'],
        datasets: [
          {
            data: [carbs, fats, proteins],
            backgroundColor: ['#FFA500', '#800080', '#1E90FF'],
            hoverBackgroundColor: ['#FFA500', '#800080', '#1E90FF'],
            borderWidth: 0,
            cutout: '70%', // Donut chart
          },
        ],
      };
    }, [carbs, fats, proteins]); // Only recalculate data when macronutrient values change
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the chart legend
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const label = data.labels[tooltipItem.dataIndex];
            const value = data.datasets[0].data[tooltipItem.dataIndex];
            return `${label} ${value}%`;
          },
        },
      },
    },
    onClick: (event: any, elements: any) => {
      if (elements.length > 0) {
        const chartElementIndex = elements[0].index;
        const label = data.labels[chartElementIndex];
        const value = data.datasets[0].data[chartElementIndex];
        setSelectedValue(`${label} ${value}%`);
      }
    },
  };

    return(
        <div>
              <h2 className="flex mt-2 ml-5 items-start">Enter Goal Name</h2>

<input
  type="text"
  className="w-[380px] h-[41px] mt-2 ml-5 border border-[#E8DECF] rounded-[10px] opacity-100 px-3"
  placeholder="Enter your goal"
/>

<div className="grid grid-cols-2 gap-4 p-4">
  <div className="flex flex-col items-start justify-start">
    <label htmlFor="start-date" className="mb-2">
      Start Date
    </label>
    <div className="relative w-full">
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        className="w-full h-[35px] border border-[#E8DECF] rounded-[10px] pl-3 pr-10"
        dateFormat="dd MMMM yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="scroll"
        onKeyDown={handleKeyDown}
        yearDropdownItemNumber={15}
        scrollableYearDropdown
      />
      <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
    </div>
  </div>

  <div className="flex flex-col items-start justify-start">
    <label htmlFor="end-date" className="mb-2">
      End Date
    </label>
    <div className="relative w-full">
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        className="w-full h-[35px] border border-[#E8DECF] rounded-[10px] pl-3 pr-10"
        dateFormat="dd MMMM yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="scroll"
        onKeyDown={handleKeyDown}
        yearDropdownItemNumber={15}
        scrollableYearDropdown
      />
      <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
    </div>
  </div>
</div>

<h1 className="flex text-sm px-4">
  Set new daily nutrient ratio goal by tapping the chart below and track
  your foods according to the new macros ratio goal
</h1>




<div
  className="relative"
  style={{
    width: "266.34px",
    height: "174.62px",
    marginTop: "20px",
    marginLeft: "57px",
  }}
>
  <Pie data={data} options={options} />
</div>

<div className="flex flex-col items-start p-4 mt-4">
{data.labels.map((label, index) => (
<div key={index} className="flex items-center mb-2 w-full">
{/* Label section (Left) */}
<div
  className="flex-shrink-0 flex items-center justify-center"
  style={{
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: data.datasets[0].backgroundColor[index],
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
    marginRight: "12px",
  }}
>
  {label[0]}
</div>
<span className="flex-grow text-base font-medium ml-8">{label}</span>

{/* Percentage value section (Middle) */}
<span className="text-lg font-medium mx-4">
  {index === 0 && `${carbsPercent.toFixed(1)}%`}
  {index === 1 && `${fatsPercent.toFixed(1)}%`}
  {index === 2 && `${proteinsPercent.toFixed(1)}%`}
</span>

{/* Grams section (Right) */}
<span className="text-lg font-medium ml-4">
  {data.datasets[0].data[index].toFixed(1)}g
</span>
</div>
))}
</div>






<h1 className="flex px-4 text-black text-sm">
  Tap on box to edit macro nutrient goal
</h1>

<div className="grid grid-cols-2 mt-2 px-4 gap-4">
  <div className="flex flex-col items-baseline text-base ">
    <div className="flex">
      <h1 className="mt-2">Carbs</h1>
    </div>

    <div className="flex py-[3vh]">
      <h1 className="mt-[1rem]">Proteins</h1>
    </div>

    <div className="flex">
      <h1 className="mt-[1rem]">Fats</h1>
    </div>
  </div>

  <div>
    <div className="flex">
      {/* INPU FOR CARBS */}
      <input
        type="text"
        className="w-[100px] h-[41px] border border-[#E8DECF] rounded-[5px] opacity-100 px-3"
        placeholder="set grams"
        value={carbs}
        onChange={handleCarbsChange}
      />
    </div>

    <div className="flex py-3">
      {/* INPUT FOR PROTEINS */}
      <input
        type="text"
        className="w-[100px] h-[41px] border border-[#E8DECF] rounded-[5px] opacity-100 px-3"
         placeholder="Enter fats goal in g"
        value={proteins}
        onChange={handleProteinsChange}
      />
    </div>

    <div className="flex">
      {/* INPUT FOR FATS */}
      <input
        type="text"
        className="w-[100px] h-[41px] border border-[#E8DECF] rounded-[5px] opacity-100 px-3"
        placeholder="set grams"
        value={fats}
        onChange={handleFatsChange}
      />
    </div>
  </div>
 
</div>


      {/* Meal Timing Section */}
      {/* Meal Timing Section */}
<div className="mt-2 px-4">
  <h1 className="text-black text-base mb-2">Select Meal Timings</h1>
  <div className="grid grid-cols-2 gap-4">
    {Array.isArray(mealTimings) && mealTimings.map(timing => (
      <div key={timing.id} className="flex items-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            name={timing.name.toLowerCase()}
            checked={selectedMealTimings.includes(timing.id)}
            onChange={(e) => handleMealTimingChange(e, timing.id)}
            className="form-checkbox h-5 w-5 text-[#008080] rounded"
          />
          <span className="ml-8">{timing.name}</span>
        </label>
      </div>
    ))}
  </div>
</div>

{/* Micro Nutrients Section */}
<div className="mt-4 px-4">
  <h1 className="text-black text-base mb-4">Micro-Nutrients Goal</h1>

  {microNutrients.map((nutrient, index) => (
    <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">{nutrient.name}</h2>
        <span>{nutrient.amount} {nutrient.unit}</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={nutrient.amount}
        onChange={(e) => handleSliderChange(index, Number(e.target.value))}
        className="w-full"
      />
    </div>
  ))}

  <button onClick={addMicroNutrient} className="bg-teal-custom text-white px-4 py-2 rounded-[24px] ">
    Add Micro Nutrients
  </button>
</div>

   {/* Nutrient Selection Pop-up */}
   <PopUp
  showPopUp={showPopUp}
  setShowPopUp={setShowPopUp}
  allNutrients={allNutrients}
  handleNutrientSelection={handleNutrientSelection}
  selectedNutrients={selectedNutrients}
  handleAddSelectedNutrients={handleAddSelectedNutrients}
/>

<button
    onClick={handleAddSelectedNutrients}
    className="w-[380px] h-[41px] mt-2 ml-5 bg-teal-custom text-white border border-[#E8DECF] rounded-[24px] opacity-100 px-3"
 
  >
    SET GOAL
  </button>

      
    </div>
  );
}