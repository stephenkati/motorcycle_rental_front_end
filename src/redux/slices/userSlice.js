import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customApi from "../../api/axios";

const makeApiCall = async (endpoint, user, thunkAPI) => {
  try {
    const response = await customApi.post(endpoint, { user: user });

    const data = await response.data;

    if (response.status === 200) {
      localStorage.setItem('token', data.token);
      return { user: data.user, token: data.token };
    }

  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 422)) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue(error.response?.data.message || "Unknown error");
  }
};

const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => makeApiCall('/users', user, thunkAPI)
);

const logInUser = createAsyncThunk(
  'user/logInUser',
  async (user, thunkAPI) => makeApiCall('/login', user, thunkAPI)
);

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })

      .addCase(logInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export { registerUser, logInUser };
export default userSlice.reducer;
