import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";
import { AuthState, UserState } from "@/lib/types";

const initialState: Partial<AuthState> = {}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserState>) => {
      state.userInfo = action.payload
    },
    resetUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Logged in successfully';
        state.userInfo = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});

export const { updateUser, resetUser } = authSlice.actions;
export default authSlice.reducer;