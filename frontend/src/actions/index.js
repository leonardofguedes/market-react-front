import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
  isLoading: false,
  error: null,
  user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUsername: (state, action) => {
        state.username = action.payload;
      },
      setPassword: (state, action) => {
        state.password = action.payload;
      },
      setLoading: (state, action) => {
        state.isLoading = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
      setUser: (state, action) => {
        state.user = action.payload;
      },
      loginRequest: (state) => {
        state.isLoading = true;
        state.error = null;
      },
      logoutRequest: (state) => {
        state.isLoading = true;
        state.error = null;
      },
      logout: (state) => {
        state.username = '';
        state.password = '';
        state.user = null;
      },
    },
  });
  
  export const {
    setUsername,
    setPassword,
    setLoading,
    setError,
    setUser,
    loginRequest,
    logoutRequest,
    logout,
  } = authSlice.actions;
  
  export default authSlice.reducer;