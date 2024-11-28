import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";

interface DashboardState {
  loading: boolean;
  error: null | string;
  data: {
    onlineScreens: number;
    offlineScreens: number;
    totalScreens: number;
    onlineScreenChange: string;
    offlineScreenChange: string;
    numberOfAdmins: number;
    franchisePartners: number;
    totalAdAgency: number;
    totalVendors: number;
    totalAmountReceived:number;
    totalAmountToBeReceived:number;
    totalAmountChange:string;
    totalAmountToReceive:string;
    screenLicence:number
  } | null;
}
const initialState: DashboardState = {
  loading: false,
  error: null,
  data: null,
};

export const getDashboardData = createAsyncThunk(
  "dashboard/getDashboardData",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.SUPER_ADMIN_DASHBOARD
      );
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
export const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDashboardData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDashboardData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getDashboardData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default DashboardSlice.reducer;
