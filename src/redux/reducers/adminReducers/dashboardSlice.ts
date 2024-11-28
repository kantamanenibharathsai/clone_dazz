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
    licenceExpired: number;
    licenceExpiringSoon: number;
  } | null;
}
const initialState: DashboardState = {
  loading: false,
  error: null,
  data: null,
};

export const getAdminDashboardData = createAsyncThunk(
  "dashboard/getDashboardData",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(endpoints.ADMIN_DASHBOARD);
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
export const AdminDashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAdminDashboardData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdminDashboardData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getAdminDashboardData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default AdminDashboardSlice.reducer;
