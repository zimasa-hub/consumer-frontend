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
import { setMealTimings, setNutrients } from "@/lib/slices/nutrition/nutrition_goal";
import { useAppDispatch } from "@/lib/hooks";
import router from "next/router";



// Register necessary chart components
Chart.register(ArcElement, Tooltip, Legend);



export default function NutrientCSR() {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch()
  const token = user?.accessToken
  const userId = user?.id;
  const [goalStart, setGoalStart] = useState<Date | null>(new Date());
  const [goalEnd, setGoalEnd] = useState<Date | null>(new Date());
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedMealTimings, setSelectedMealTimings] = useState<number[]>([]); // Store selected meal timing IDs
  const [description,setDescription] = useState<string>()


  
  const mealTimings = useSelector((state: RootState) => state.meals.meals) || [];
  const allNutrients = useSelector((state: RootState) => state.meals.nutrients) || [];


  console.log("mealTimings : ", selectedMealTimings)


  const [microNutrients, setMicroNutrients] = useState<MicroNutrient[]>([
   
  ]);

   // Use states for Carbs, Fats, and Proteins instead of hardcoded values
   const [carbs, setCarbs] = useState<number>(0);
   const [fats, setFats] = useState<number>(0);
   const [proteins, setProteins] = useState<number>(0);

  const [macroNutrients, setMacroNutrients] = useState<MicroNutrient[]>([
    { id: 1, name: 'Protein', unit: 'g', amount: proteins, macro: true },
    { id: 2, name: 'Carbohydrates', unit: 'g', amount: carbs, macro: true },
    { id: 3, name: 'Fats', unit: 'g', amount: 0, macro: true }
  ]);
  

  



  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedNutrients, setSelectedNutrients] = useState<MicroNutrient[]>(
    []
  );

 

  


   const fetchNutrients = async (): Promise<MicroNutrient[]> => {
    try {
      const response = await axios.get<MicroNutrient[]>(`/api/user/nutrients`, {
        headers: {
          Authorization: ` ${token}`, // Include the token in the Authorization header
        }
      });
      const data = response.data;
      dispatch(setNutrients(data));
  
      console.log("NUTRIENTS :", data);
  
      return data; // Return the data
    } catch (error: unknown) {
      handleError(error);
      return []; // Return an empty array in case of error
    }
  };
  


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
      handleError(error);
    return []; // Return an empty array or handle this appropriately
    } finally {
      // setLoading(false);
    }
  };

 
  

useEffect(() => {

  fetchNutrients();
  fetchMealTimings();
}, [userId,token]);



console.log("MACRO : ", macroNutrients)



  // Error handling utility
  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching user data:', error.response?.data?.message || error.message);
    } else if (error instanceof Error) {
      console.error('Error fetching user data:', error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
  };



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
    const carbsValue = value === "" ? 0 : parseFloat(value);
    setCarbs(carbsValue);

    // Update macroNutrients state by ID
  setMacroNutrients(prevNutrients => 
    prevNutrients.map(nutrient => 
      nutrient.id === 2 ? { ...nutrient, amount: carbsValue } : nutrient
    )
  );
};

 const handleFatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.trim();
  const fatsValue = value === "" ? 0 : parseFloat(value);
  setFats(fatsValue);

 // Update macroNutrients state by ID
 setMacroNutrients(prevNutrients => 
  prevNutrients.map(nutrient => 
    nutrient.id === 3 ? { ...nutrient, amount: fatsValue } : nutrient
  )
);
};

const handleProteinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.trim();
  const proteinsValue = value === "" ? 0 : parseFloat(value);
  setProteins(proteinsValue);

  // Update macroNutrients state by ID
  setMacroNutrients(prevNutrients => 
    prevNutrients.map(nutrient => 
      nutrient.id === 1 ? { ...nutrient, amount: proteinsValue } : nutrient
    )
  );
};

console.log("MICRONUTRIENTS : ", microNutrients)

 // Ensure to create a new copy of the microNutrients array and update the state properly
const handleSliderChange = (index: number, value: number) => {
  // Create a new array by mapping over the existing microNutrients array
  const updatedNutrients = microNutrients.map((nutrient, i) => 
    i === index ? { ...nutrient, amount: value } : nutrient
  );
  
  // Update the state with the new array
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
        // Check if the nutrient is already in microNutrients
        const isInMicroNutrients = microNutrients.some(
          existing =>
            existing.name === nutrient.name &&
            existing.amount === nutrient.amount &&
            existing.unit === nutrient.unit
        );
  
        if (isInMicroNutrients) {
          // Nutrient is already in microNutrients, so do not add it to selectedNutrients
          return prevSelected;
        } else {
          // Select the nutrient
          return [...prevSelected, nutrient];
        }
      }
    });
  };
  

  const handleAddSelectedNutrients = () => {
    // Combine selectedNutrients with existing microNutrients, avoiding duplicates
    setMicroNutrients(prevNutrients => {
      const updatedNutrients = new Map<string, MicroNutrient>();
      
      prevNutrients.forEach(nutrient => {
        updatedNutrients.set(`${nutrient.name}-${nutrient.amount}-${nutrient.unit}`, nutrient);
      });
      
      selectedNutrients.forEach(nutrient => {
        updatedNutrients.set(`${nutrient.name}-${nutrient.amount}-${nutrient.unit}`, nutrient);
      });
      
      return Array.from(updatedNutrients.values());
    });
    
    setSelectedNutrients([]); // Clear selected nutrients
    setShowPopUp(false); // Close the pop-up
  };
  
  
  





  const handleMealTimingChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked) {
      setSelectedMealTimings(prev => [...prev, id]);
    } else {
      setSelectedMealTimings(prev => prev.filter(item => item !== id));
    }
  };

  const handleStartDateChange = (date: Date | null) => {
    setGoalStart(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setGoalEnd(date);
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

 
 
  const [dietPlan, setDietPlan] = useState(null) 

  const handleSetGoal = async () => {
    // Ensure goalStart and goalEnd are formatted in ISO strings
    const formattedGoalStart = goalStart ? goalStart.toISOString() : null;
    const formattedGoalEnd = goalEnd ? goalEnd.toISOString() : null;
  
    // Create the `nutrientTargets` by combining macro and micro nutrients
    const nutrientTargets = [
      ...macroNutrients.map(({ id, amount }) => ({ nutrientID: id, dailyTarget: amount })),
      ...microNutrients.map(({ id, amount }) => ({ nutrientID: id, dailyTarget: amount }))
    ];
  
    // Ensure that `mealSchedules` is an array of selectedMealTimings
    const mealSchedules = selectedMealTimings.map(id => ({ mealTimingId: id }));
  
    // Map selectedMealTimings to the format expected by mealTimings
    const mealTimings = selectedMealTimings.map(id => ({ id }));
  
    // Log values before sending
    console.log('Sending payload to API:', {
      nutritionTarget: {
        description,
        goalStart: formattedGoalStart,
        goalEnd: formattedGoalEnd,
        dietPlan
      },
      nutrientTargets,
      mealTimings,
      mealSchedules
    });
  
    try {
      // Send the payload to the backend API
      const response = await axios.post('/api/user/setgoal', {
        nutritionTarget: {
          description,
          goalStart: formattedGoalStart,
          goalEnd: formattedGoalEnd,
          dietPlan
        },
        nutrientTargets,
        mealTimings,
        mealSchedules
      }, {
        headers: {
          Authorization: `${token}`, // Use Bearer token format for Authorization
          'Content-Type': 'application/json'
        }
      });
  
      // Handle successful response
      console.log('Goal Saved:', response.data);
      router.push('/dashboard/nutrient-goal'); // Redirect after saving goal
    } catch (error: any) {
      console.error('Error updating goal:', error.response?.data?.message || error.message);
    }
  };
  
  

  
  const handleSetDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  

    return(
        <div>
              <h2 className="flex mt-2 ml-5 items-start">Enter Goal Name</h2>

<input
value={description}
  type="text"
  onChange={handleSetDescription}
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
        selected={goalStart}
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
        selected={goalEnd}
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
        max="1000"
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
  addedNutrients={microNutrients} // Add this line
/>


<button
    onClick={handleSetGoal}
    className="w-[380px] h-[41px] mt-2 ml-5 bg-teal-custom text-white border border-[#E8DECF] rounded-[24px] opacity-100 px-3"
  >
    SET GOAL
  </button>
    </div>
  );
}