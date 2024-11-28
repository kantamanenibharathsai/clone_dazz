import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";

interface DashboardData {
  loading: boolean;
  error: string | null;
  data: {
    onlineScreens: number;
    offlineScreen: number;
    totalScreen: number;
    totalAds: number;
    wallet: number;
    commission: string;
    amountOrPercentage: string;
    onlineScreenChange: string;
    offlineScreenChange: string;
    expectedIncome: number;
    expectedIncomeChange:string
  } | null;
}

export const getUserDashboardData = createAsyncThunk(
  "dashboard/getDashboardData",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(endpoints.USER_DASHBOARD);
      if (error) rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response.data);
      if (response.statusCode === "404")
        return rejectWithValue(response.message);
      return rejectWithValue(error);
    } catch (error) {
      return rejectWithValue("Something Went Wrong!!");
    }
  }
);

const initialState: DashboardData = {
  loading: false,
  error: null,
  data: null,
};

export const UserDashboardSlice = createSlice({
  name: "userDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDashboardData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserDashboardData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getUserDashboardData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default UserDashboardSlice.reducer;
