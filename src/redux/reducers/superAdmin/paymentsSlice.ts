import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
export type LoadingStatus = "IDLE" | "PENDING" | "FULFILLED" | "REJECTED";
export interface PaymentData {
  id: number;
  razorpayPaymentId: string | null;
  amount: number;
  transactionDate: string;
  paymentStatus: string;
  memberName: string;
  image: string | null;
}
interface IState {
  loading: boolean;
  error: null;
  paymentsData: null | PaymentData[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  loadingStatus: LoadingStatus;
  message: null | string;
}

const initialState: IState = {
  loading: false,
  error: null,
  paymentsData: null,
  currentPage: 1,
  totalPages: 0,
  totalElements: 0,
  pageSize: 0,
  loadingStatus: "IDLE",
  message: null,
};

export const getSuperAdminPaymentsData = createAsyncThunk(
  "getSuperAdminPaymentsData",
  async (
    {
      orderedBy,
      sortBy,
      pageNumber,
      fromDate,
      toDate,
    }: {
      orderedBy?: string;
      sortBy?: string | number;
      pageNumber: number;
      fromDate?: string;
      toDate?: string;
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    const sort = sortBy ? `&sortBy=${sortBy}` : "";
    const order = orderedBy ? `orderBy=${orderedBy}` : "";
    const from = fromDate ? `&from=${fromDate}` : "";
    const to = toDate ? `&to=${toDate}` : "";
    try {
      const { response, error } = await networkCall(
        `${endpoints.PAYMENTS_DATA}?${order}&page=${pageNumber}&pageSize=10${sort}${from}${to}`
      );
      if (error) rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response.data);
      if (response.statusCode === "404")
        return rejectWithValue(response.message);
      return rejectWithValue(error);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const paymentsSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    changeCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSuperAdminPaymentsData.pending, (state) => {
      state.loadingStatus = "PENDING";
    });
    builder.addCase(getSuperAdminPaymentsData.fulfilled, (state, action) => {
      state.loadingStatus = "FULFILLED";
      state.paymentsData = action?.payload?.data;
      state.currentPage = action?.payload?.pagination?.currentPage;
      state.totalPages = action?.payload?.pagination?.totalPages;
      state.totalElements = action?.payload?.pagination?.totalItems;
      state.pageSize = action?.payload?.pagination?.pageSize;
    });
    builder.addCase(getSuperAdminPaymentsData.rejected, (state, action) => {
      state.loadingStatus = "REJECTED";
    });
  },
});
export const { changeCurrentPage } = paymentsSlice.actions;

export default paymentsSlice.reducer;
