import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './slices/user/userSlice'
import { mealsSlice } from './slices/nutrition/nutrition_goal'

const rootReducer = combineReducers({
  user: userSlice.reducer,
  meals: mealsSlice.reducer,

})

export default rootReducer
