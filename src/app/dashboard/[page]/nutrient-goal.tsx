import Link from "next/link";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import NutrientPopUp from "./nutrientpopup";
import PopUp from "./nutrientpopup";

// Register necessary chart components
Chart.register(ArcElement, Tooltip, Legend);

interface MicroNutrient {
    name: string;
    amount: number;
    unit: string;
  }

export default function NutrientGoal() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [mealTimings, setMealTimings] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
    snack: false,
  });
  const [microNutrients, setMicroNutrients] = useState<MicroNutrient[]>([
    { name: "Calcium", amount: 120, unit: "mg" },
  ]);

  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedNutrients, setSelectedNutrients] = useState<MicroNutrient[]>(
    []
  );

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
    setMicroNutrients((prevNutrients) => [
      ...prevNutrients,
      ...selectedNutrients,
    ]);
  
    // Clear selected nutrients to prevent re-adding them
    setSelectedNutrients([]);
  
    // Close the pop-up
    setShowPopUp(false);
  };
  





  const handleMealTimingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMealTimings({
      ...mealTimings,
      [e.target.name]: e.target.checked,
    });
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

  const data = {
    labels: ["Carbs", "Fats", "Proteins"],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ["#FFA500", "#800080", "#1E90FF"],
        hoverBackgroundColor: ["#FFA500", "#800080", "#1E90FF"],
        borderWidth: 0,
        cutout: "70%", // Makes the center transparent (donut-like chart)
      },
    ],
  };

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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-plusJakarta mb-[4rem] overflow-y-auto ">
      <h2 className="flex mt-4 ml-4 items-start justify-start">
        <Link href="/dashboard/nutrition">
          <FaArrowLeft className="text-gray-600 hover:text-gray-800 font-bold mr-2 mt-[0.1rem]" />
        </Link>
        Set Nutrient Goal
      </h2>
      <h1 className="flex mt-4 ml-4 text-2xl font-bold items-start">
        Set Daily Nutrient Goal
      </h1>

      <h2 className="flex mt-2 ml-5 items-start">Enter Goal Name</h2>

      <input
        type="text"
        className="w-[392px] h-[41px] mt-2 ml-5 border border-[#E8DECF] rounded-[10px] opacity-100 px-3"
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
            <span className="flex-grow text-lg font-medium ml-8">{label}</span>
            <span className="text-lg font-medium mr-12">
              {data.datasets[0].data[index]}%
            </span>
            <span className="text-lg font-medium mr-4 ">
              {data.datasets[0].data[index]}g
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
            <input
              type="text"
              className="w-[100px] h-[41px] border border-[#E8DECF] rounded-[5px] opacity-100 px-3"
              placeholder="set grams"
            />
          </div>

          <div className="flex py-3">
            <input
              type="text"
              className="w-[100px] h-[41px] border border-[#E8DECF] rounded-[5px] opacity-100 px-3"
              placeholder="set grams"
            />
          </div>

          <div className="flex">
            <input
              type="text"
              className="w-[100px] h-[41px] border border-[#E8DECF] rounded-[5px] opacity-100 px-3"
              placeholder="set grams"
            />
          </div>
        </div>
       
      </div>

 {/* Meal Timing Section */}
 <div className="mt-2 px-4">
        <h1 className="text-black text-base  mb-2">Select Meal Timings</h1>
        <div className="grid grid-cols-2 gap-4">
          {/* Column for Checkboxes */}
          <div className="flex flex-col ">
            <label className="flex items-center ">
              <input
                type="checkbox"
                name="breakfast"
                checked={mealTimings.breakfast}
                onChange={handleMealTimingChange}
                className="form-checkbox h-5 w-5 text-[#008080] rounded"
              />
              <span className="ml-8">Breakfast</span>
            </label>
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                name="lunch"
                checked={mealTimings.lunch}
                onChange={handleMealTimingChange}
                className="form-checkbox h-5 w-5 text-[#008080] rounded"
              />
              <span className="ml-8">Lunch</span>
            </label>
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                name="dinner"
                checked={mealTimings.dinner}
                onChange={handleMealTimingChange}
                className="form-checkbox h-5 w-5 text-[#008080] rounded"
              />
              <span className="ml-8">Dinner</span>
            </label>
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                name="snack"
                checked={mealTimings.snack}
                onChange={handleMealTimingChange}
                className="form-checkbox h-5 w-5 text-[#008080] bg-teal-custom rounded"
              />
              <span className="ml-8">Snack</span>
            </label>
          </div>
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
          Add Nutrients
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
          className="mt-4 px-2 w-full bg-[#008080] text-lg rounded-[24px] text-white py-2 "
        >
          SET GOAL
        </button>
      
      
    </div>
  );
}