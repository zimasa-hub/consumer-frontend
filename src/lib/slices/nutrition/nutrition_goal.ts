// lib/features/meals/mealsSlice.ts (rename to reflect correct feature)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MealTimings } from '@/lib/interfaces'; // Update this import if needed

interface MealsState {
  meals: MealTimings[] | null; // Adjust to array of MealTiming or other type
}

const initialState: MealsState = {
  meals: null,
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
  },
});

export const { setMealTimings, clearMealTimings } = mealsSlice.actions;

export default mealsSlice.reducer;
