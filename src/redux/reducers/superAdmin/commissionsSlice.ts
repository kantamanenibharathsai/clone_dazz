import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";

export const postCommissions = createAsyncThunk(
  "postCommissions",
  async (data: CommissionData[], { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.POST_COMMISSIONS,
        "POST",
        JSON.stringify(data)
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200")
        return fulfillWithValue(response.message);
      if (response.statusCode === "404")
        return rejectWithValue(response.message);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCommissions = createAsyncThunk(
  "getCommissions",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(endpoints.POST_COMMISSIONS);
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response.data);
      if (response.statusCode === "404")
        return rejectWithValue(response.message);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface CommissionData {
  commission: string;
  value: number;
  roleId: number;
}

interface CommissionState {
  commissions: CommissionState[] | null;
  loading: boolean;
  error: string | null;
  roleId: number | null;
  commission: string;
  value: number | null;
}
const initialState: CommissionState = {
  commissions: null,
  loading: false,
  error: null,
  roleId: null,
  commission: "",
  value: null,
};
export const commissionsSlice = createSlice({
  name: "commissions",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getCommissions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getCommissions.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        const filteredCommissions = action.payload.filter(
          (item: CommissionData) =>
            item.roleId === 8 || item.roleId === 11 || item.roleId === 12
        );
        state.commissions = filteredCommissions;
      } else {
        state.commissions = null;
      }
    });

    builder.addCase(getCommissions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default commissionsSlice.reducer;
