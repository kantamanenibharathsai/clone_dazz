import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert } from "../../../utils/toastMessage";
export type LoadingStatus = "IDLE" | "PENDING" | "FULFILLED" | "REJECTED";
export interface ILayOut {
  id: number;
  playlistName: string;
  description: string;
  layoutImages: never[];
  layoutCount: number;
  createdAt: string;
}
export interface HostState {
  myAds: {
    id: number;
    userId: number;
    fullName: string;
    email: string;
    userImage: string | null;
    screenNames: string[];
    createdAt: string;
    url: string;
    status: string;
    fileType: string;
  }[];
  pagination: {
    currentPage:number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  }|null,
  loadingStatus:"IDLE" | "PENDING" | "FULFILLED" | "REJECTED";
  message:string;
}
const initialState: HostState = {
  myAds: [],
  pagination:null,
  loadingStatus:"PENDING",
  message:""
};
export const hostGetMyAds = createAsyncThunk(
  "hostGetMyAds",
  async (param: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.SCREEN_SCREENMEDIA + "?" + param + "&sortBy=id&size=12",
        "GET"
      );

      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") {
        return fulfillWithValue(response);
      }
      if (response.statusCode === "404")
        return rejectWithValue(response.message);
      if (response.statusCode === "500")
        return rejectWithValue("Something went wrong");
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const hostDeleteMyAd = createAsyncThunk(
  "hostDeleteMyAd",
  async (id: number, { dispatch }) => {
    try {
      const { response } = await networkCall(
        `${endpoints.PLAYLIST}/${id}`,
        "DELETE"
      );
      if (response?.statusCode === "200") {
        dispatch(hostGetMyAds(""));
        displayAlert(response.message, "success");
      } else if (response.statusCode === "404") {
        displayAlert(response.message, "warning");
      } else {
        displayAlert("Oops something went wrong", "warning");
      }
      return response;
    } catch (error) {
      displayAlert("Oops something went wrong", "warning");
    }
  }
);
export const hostSlice = createSlice({
  name: "hostSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hostGetMyAds.pending, (state) => {
        state.loadingStatus = "PENDING";
        state.message =""
      })
      .addCase(hostGetMyAds.fulfilled, (state, action) => {
        state.loadingStatus = "FULFILLED";
        if (action.payload?.data?.data) {
          state.myAds = action.payload.data.data;
          state.pagination = action.payload.data.pagination;
          state.message =""
        } else {
          state.myAds = [];
          state.pagination = null;
          state.message ="Data Not Found";
        }
      })
      .addCase(hostGetMyAds.rejected, (state, action) => {
        state.loadingStatus = "REJECTED";
        state.message = action.payload as string;
        displayAlert(action.payload as string, "error");
      });
  },
});

export default hostSlice.reducer;
