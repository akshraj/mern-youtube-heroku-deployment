import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  loading: false,
  user: null,
  error: false,
  errorMessage: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    loginStart(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    logout(state) {
      state.user = null;
      state.loading = false;
      state.error = false;
      state.errorMessage = ''
    },
    subscribeUser(state, action) {
      if (state.user?.subscribedUsers?.includes(action.payload)) {
        state.user?.subscribedUsers?.splice(state.user?.subscribedUsers?.findIndex(userId => userId === action.payload), 1);
      } else {
        state.user?.subscribedUsers?.push(action.payload);
      }
    }
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, subscribeUser } = userSlice.actions

export default userSlice.reducer