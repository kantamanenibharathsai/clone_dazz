import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";

interface NetworkUptimeState {
  loading: boolean;
  error: null | string;
  data: {
    screenId: number | undefined;
    date: string;
    uptimePercentage: number;
    totalHaltTimeInMillis: number;
    totalUptimeInMillis: number;
    interval: string;
  } | null;
}

const initialState: NetworkUptimeState = {
  loading: false,
  error: null,
  data: null,
};

export const getNetWorUptimeData = createAsyncThunk(
  "getNetWorUptimeData",
  async (
    {
      screenId,
      interval,
    }: { screenId: number | undefined; interval: string;},
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.SCREEN_UPTIME}?interval=${interval}&screenId=${screenId}`
      );
      if (error) rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response.data);
      if (response.statusCode === "404") return rejectWithValue(error);
      return rejectWithValue(error);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const NetworkUptime = createSlice({
  name: "NetWorkUptime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNetWorUptimeData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getNetWorUptimeData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getNetWorUptimeData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default NetworkUptime.reducer;
