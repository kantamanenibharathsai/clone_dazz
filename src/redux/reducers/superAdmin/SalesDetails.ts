import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";

export interface SalesDataPoint {
  loading: boolean;
  error: null | string;
  salesData: {
    monthName: string;
    revenue: number;
  }[];
}
const initialState: SalesDataPoint = {
  loading: false,
  error: null,
  salesData: [],
};
export const getSuperAdminSalesDetails = createAsyncThunk(
  "getSuperAdminSalesDetails",
  async (params: { year: number }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const headers = {
        year: params.year.toString(),
      };
      const { response, error } = await networkCall(
        endpoints.SUPER_ADMIN_SALES_DETAILS,
        "GET",
        null,
        headers
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response.data);
      return rejectWithValue(response.statusText);
    } catch (error) {
      return rejectWithValue(error || "An error occurred");
    }
  }
);

export const SalesDetails = createSlice({
  name: "superAdminReports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSuperAdminSalesDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSuperAdminSalesDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.salesData = action.payload;
    });
    builder.addCase(getSuperAdminSalesDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default SalesDetails.reducer;
