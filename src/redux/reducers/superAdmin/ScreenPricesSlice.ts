import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoadingStatus } from "../common/logsSlice";
import networkCall from "../../../utils/networkCall";
import { endpoints } from "../../../config/config";
import { RootState } from "../../store";

interface InitialState {
  screenPrices: {
    id: number;
    cycleTime: number;
    fullLoopTime: number;
    cpmPrice: number;
    active: boolean;
    createdBy: number;
    updatedBy: number;
    createdAt: string;
    updatedAt: string;
  } | null;
  loading: LoadingStatus;
  message: string;
}

const initialState: InitialState = {
  screenPrices: null,
  loading: "IDLE",
  message: "",
};
export const getScreenPrices = createAsyncThunk(
  "getScreenPrices",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response } = await networkCall(endpoints.SCREEN_PRICING, "GET");
      switch (response.statusCode) {
        case "200":
          return fulfillWithValue(response);
        case "404":
          return rejectWithValue(response.message);
        case "500":
          return rejectWithValue(response.message);
        default:
          return rejectWithValue("Something Went Wrong");
      }
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);
export const updateScreenPrices = createAsyncThunk(
  "updateScreenPrices",
  async (
    formData: FormData,
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    try {
      const screenPriceId = (getState() as RootState).screenPrices.screenPrices
        ?.id;
      const { response } = await networkCall(
        endpoints.SCREEN_PRICING + "/" + screenPriceId,
        "PUT",
        formData,
        {
          "Content-Type": "null",
        }
      );
      switch (response.statusCode) {
        case "200":
          return fulfillWithValue(response);
        case "404":
          return rejectWithValue(response.message);
        case "500":
          return rejectWithValue(response.message);
        default:
          return rejectWithValue("Something Went Wrong");
      }
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);
const screenPriceSlice = createSlice({
  name: "priceSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getScreenPrices.pending, (state, action) => {
        state.loading = "PENDING";
      })
      .addCase(getScreenPrices.fulfilled, (state, action) => {
        state.loading = "FULFILLED";
        state.screenPrices = action.payload?.data;
      })
      .addCase(getScreenPrices.rejected, (state, action) => {
        state.loading = "PENDING";
        state.message = action.payload as string;
      });
  },
});

export default screenPriceSlice.reducer;
