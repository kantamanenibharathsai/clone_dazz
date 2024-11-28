import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert } from "../../../utils/toastMessage";
type ApiStatus = "INITIAL" | "PENDING" | "SUCCESS" | "ERROR";
export interface BeCoupon {
  id: number;
  code: string;
  minCartValue: number;
  discountPercentage: number;
  flatDiscount: number;
  expiryDate: string;
  startDate: string;
  status: boolean;
  createdBy: number;
  updatedBy: null | number;
  createdAt: string;
  updatedAt: string;
}
interface ICouponsState {
  allApis: {
    deleteApi: ApiStatus;
    createAndUpdateApi: ApiStatus;
    readApi: ApiStatus;
  };
  couponsData: BeCoupon[];
  readApiError: string;
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

const initialState: ICouponsState = {
  allApis: {
    deleteApi: "INITIAL",
    createAndUpdateApi: "INITIAL",
    readApi: "INITIAL",
  },
  couponsData: [],
  readApiError: "",
  totalItems: 1,
  currentPage: 1,
  totalPages: 1,
};
export const readCoupons = createAsyncThunk(
  "coupons/readCoupons",
  async (
    { page, text, sort }: { page: number; text: string; sort: string },
    { rejectWithValue, fulfillWithValue }
  ) => {
    const url =
      endpoints.GET_COUPONS +
      `?page=${page}${text !== "" ? `&code=${text}` : ""}${
        sort !== "All"
          ? `&status=${sort === "Active"}`
          : ""
      }`;
    try {
      const { response, error } = await networkCall(url);
      if (error) return rejectWithValue(error);
      if (response.status === 400)
        return rejectWithValue("Something Went Wrong");
      if (response.statusCode === "200") return fulfillWithValue(response.data);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);
export const addAndUpdateCoupons = createAsyncThunk(
  "coupons/addAndUpdateCoupons",
  async (
    {
      url,
      method,
      body,
    }: { url: string; method: "PUT" | "POST"; body: string },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { response, error } = await networkCall(url, method, body);
      if (error) return rejectWithValue(error);
      if (response.status === 400)
        return rejectWithValue("Something Went Wrong");
      if (response.statusCode === "200")
        return fulfillWithValue(response.message);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);
export const deleteCoupons = createAsyncThunk(
  "coupons/deleteCoupons",
  async (id: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.GET_COUPONS + "/" + id,
        "DELETE"
      );
      if (error) return rejectWithValue("Something Went Wrong");
      if (response.status === 400)
        return rejectWithValue("Something Went Wrong");
      if (response.statusCode === "200")
        return fulfillWithValue(response.message);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);

const CouponsSlice = createSlice({
  name: "Coupons",
  initialState,
  reducers: {
    resetSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(readCoupons.pending, (state) => {
      state.allApis.readApi = "PENDING";
    });
    builder.addCase(readCoupons.fulfilled, (state, action) => {
      const { totalItems, currentPage, totalPages } = action.payload.pagination;
      state.allApis.readApi = "SUCCESS";
      state.couponsData = action.payload.data;
      state.totalItems = totalItems;
      state.currentPage = currentPage;
      state.totalPages = totalPages;
      state.readApiError = "";
    });
    builder.addCase(readCoupons.rejected, (state, action) => {
      state.allApis.readApi = "ERROR";
      state.couponsData = [];
      state.totalItems = initialState.totalItems;
      state.totalPages = initialState.totalPages;
      state.currentPage = initialState.currentPage;
      state.readApiError = action.payload as string;
    });
    builder.addCase(addAndUpdateCoupons.pending, (state) => {
      state.allApis.createAndUpdateApi = "PENDING";
    });
    builder.addCase(addAndUpdateCoupons.fulfilled, (state, action) => {
      state.allApis.createAndUpdateApi = "SUCCESS";
      displayAlert(action.payload as string, "success");
    });
    builder.addCase(addAndUpdateCoupons.rejected, (state, action) => {
      state.allApis.createAndUpdateApi = "ERROR";
      displayAlert(action.payload as string, "error");
    });
    builder.addCase(deleteCoupons.pending, (state) => {
      state.allApis.deleteApi = "PENDING";
    });
    builder.addCase(deleteCoupons.fulfilled, (state, action) => {
      state.allApis.deleteApi = "SUCCESS";
      displayAlert(action.payload as string, "success");
    });
    builder.addCase(deleteCoupons.rejected, (state, action) => {
      state.allApis.deleteApi = "ERROR";
      displayAlert(action.payload as string, "error");
    });
  },
});

export default CouponsSlice.reducer;
export const { resetSlice } = CouponsSlice.actions;
