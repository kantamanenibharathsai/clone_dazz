import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";

interface DashboardState {
  loading: boolean;
  error: null | string;
  data: {
    totalScreens: number;
    numberOfUsers: number;
    numberOfInvestors: number;
    numberOfHosts: number;
    numberOfAdmins: number;
    numberOfTeams: number;
    userChange: string;
    teamChange: string;
    investorChange: string;
    adminChange: string;
  } | null;
}

const initialState: DashboardState = {
  loading: false,
  error: null,
  data: null,
};

export const getSuperAdminReports = createAsyncThunk(
  "getSuperAdminReports",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.SUPER_ADMIN_REPORTS_DASHBOARD
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response.data);
      if (response.statusCode === "404")
        return rejectWithValue(response.message);
      return rejectWithValue(error);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const ReportsDashboardSlice = createSlice({
  name: "superAdminReports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSuperAdminReports.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSuperAdminReports.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getSuperAdminReports.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default ReportsDashboardSlice.reducer;
