// lib/features/meals/mealsSlice.ts (rename to reflect correct feature)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MealTimings, MicroNutrient } from '@/lib/interfaces'; // Update this import if needed

interface MealsState {
  meals: MealTimings[] | null; // Adjust to array of MealTiming or other type
  nutrients: MicroNutrient[] | null;
}

const initialState: MealsState = {
  meals: null,
  nutrients: null,
};

export const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    setMealTimings: (state, action: PayloadAction<MealTimings[]>) => {
      state.meals = action.payload; // Directly set the array payload
    },
    clearMealTimings: (state) => {
      state.meals = null; // Optionally clear the meal timings
    },
    setNutrients: (state, action: PayloadAction<MicroNutrient[]>) => {
      state.nutrients = action.payload; // Directly set the array payload
    },
    clearNutrients: (state) => {
      state.nutrients = null; // Optionally clear the nutrients
    },
  },
});

export const { 
  setMealTimings, 
  clearMealTimings,
  setNutrients,
  clearNutrients,
 } = mealsSlice.actions;

export default mealsSlice.reducer;
