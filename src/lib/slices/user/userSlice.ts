// lib/features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/lib/types';

interface UserState {
  user: User | null; // The user state follows the User interface
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload; // Payload should conform to User interface
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        // Update only the fields provided in the action payload
        state.user = { ...state.user, ...action.payload };
      }
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const 
{ initializeUser, 
  updateUser,
  logoutUser  
} = userSlice.actions;

export default userSlice.reducer;
