import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import {MicroNutrient} from '@/lib/types'

// interface MicroNutrient {
//   name: string;
//   amount: number;
//   unit: string;
// }

interface PopUpProps {
  showPopUp: boolean;
  setShowPopUp: (show: boolean) => void;
  allNutrients: MicroNutrient[];
  handleNutrientSelection: (nutrient: MicroNutrient) => void;
  selectedNutrients: MicroNutrient[];
  handleAddSelectedNutrients: () => void;
}

const PopUp: React.FC<PopUpProps> = ({
  showPopUp,
  setShowPopUp,
  allNutrients,
  handleNutrientSelection,
  selectedNutrients,
  handleAddSelectedNutrients,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!showPopUp) return null;

  // Filter nutrients based on the search query
  const filteredNutrients = allNutrients.filter(nutrient =>
    nutrient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSelected = (nutrient: MicroNutrient) =>
    selectedNutrients.some(selected =>
      selected.name === nutrient.name && selected.amount === nutrient.amount && selected.unit === nutrient.unit
    );

  const selectedCount = selectedNutrients.length;

  const handleSectionClick = (nutrient: MicroNutrient) => {
    // Toggle nutrient selection
    handleNutrientSelection(nutrient);
  };

  const handleOverlayClick = () => {
    setShowPopUp(false);
  };

  const handlePopupClick = (e: React.MouseEvent) => {
    // Stop click events from propagating to the overlay
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div 
        className="bg-white rounded-lg p-6 relative w-[400px]"
        onClick={handlePopupClick}
      >
        {/* Close (Cancel) Button */}
        <button
          onClick={() => setShowPopUp(false)}
          className="absolute top-3 left-3 text-gray-600"
        >
          <FaTimes />
        </button>

        {/* Pop-up Title */}
        <h2 className="text-center font-bold text-lg">Add to My List</h2>

        {/* Subheading */}
        <p className="text-center text-sm mt-1">Select a Nutrient</p>

        {/* Selected Items Count */}
        <p className="text-center text-sm mt-2">
          {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
        </p>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search Nutrients"
          className="w-full mt-4 mb-4 px-3 py-2 border border-[#D1DBE8] rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Nutrient Sections */}
        <div className="overflow-y-auto max-h-[280px] space-y-4">
          {filteredNutrients.length > 0 ? (
            filteredNutrients.map((nutrient, index) => (
              <div
                key={index}
                className={`flex justify-between items-center w-[358px] h-[74px] border border-[#D1DBE8] rounded-md p-[15px_0px_0px_0px] gap-[16px] px-3 cursor-pointer ${
                  isSelected(nutrient) ? 'bg-[#E0F2F1]' : ''
                }`}
                onClick={() => handleSectionClick(nutrient)}
              >
                <div>
                  {/* Nutrient Name */}
                  <h3 className="font-bold text-md">{nutrient.name}</h3>
                </div>
                {/* Rounded Checkbox */}
                <div
                  className={`w-6 h-6 rounded-full ${
                    isSelected(nutrient) ? "bg-[#008080]" : "bg-white border border-[#D1DBE8]"
                  }`}
                ></div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-500">No nutrients found</p>
          )}
        </div>

        {/* ADD Button */}
        <button
          onClick={handleAddSelectedNutrients}
          className="mt-4 w-full bg-[#008080] rounded-[24px] text-white py-2 "
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default PopUp;
