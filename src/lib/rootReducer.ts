import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './slices/user/userSlice'

const rootReducer = combineReducers({
  user: userSlice.reducer,

})

export default rootReducer
