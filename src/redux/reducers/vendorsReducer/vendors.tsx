import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import networkCall from "../../../utils/networkCall";
import { endpoints } from "../../../config/config";
import { displayAlert } from "../../../utils/toastMessage";
import { formatDataYtoD } from "../../../utils/utils";

export type LoadingStatus = "IDLE" | "PENDING" | "FULFILLED" | "REJECTED";
export interface IPayments {
  id: number;
  razorpayPaymentId: number;
  amount: number;
  transactionDate: string;
  paymentStatus: string;
  memberName: string;
  image: string;
}
interface IPagination {
  currentPage: 1;
  pageSize: 10;
  totalItems: 33;
  totalPages: 4;
}

export interface AuthDataType {
  message: string | null;
  loadingStatus: LoadingStatus;
  qrCodesData:
    | {
        id: number;
        discountType: string;
        discountValue: number;
        qrCodePath: string;
        createdBy: number;
        createdAt: string;
      }[]
    | null;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  scans: {
    data: {
      totalScans: number;
      scansPending: number;
      paymentReceived: number;
      expectedRevenue: number;
    } | null;

    loadingStatus: LoadingStatus;
    message: string;
  };
  stats: {
    data: {
      totalScans: number;
      wallet: number;
    } | null;
    loadingStatus: LoadingStatus;
    message: string;
  };
  payments: {
    paymentsData: IPayments[];
    message: string;
    loadingStatus: LoadingStatus;
    pagination: IPagination | null;
  };
}

const initialState: AuthDataType = {
  message: null,
  loadingStatus: "IDLE",
  qrCodesData: null,
  pagination: {
    currentPage: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0,
  },
  scans: {
    data: null,
    loadingStatus: "IDLE",
    message: "",
  },
  stats: {
    data: null,
    loadingStatus: "IDLE",
    message: "",
  },
  payments: {
    paymentsData: [],
    message: "",
    loadingStatus: "IDLE",
    pagination: null,
  },
};
export const getVendorQrCodes = createAsyncThunk(
  "getVendorQrCodes",
  async (param: string | undefined, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.GET_VENDOR_QR_CODES +
          `?${param}&size=10&sortBy=id&sortOrder=desc`,
        "GET"
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getVendorScans = createAsyncThunk(
  "getVendorScans",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.VENDOR_SCANS,
        "GET"
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getVendorStats = createAsyncThunk(
  "getVendorStats",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.VENDOR_STATS,
        "GET"
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getVendorPayments = createAsyncThunk(
  "getVendorPayments",
  async (
    {
      page,
      fromDate,
      toDate,
      status,
    }: {
      page: number;
      fromDate: string | null;
      toDate: string | null;
      status: string;
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    const urlSearchParams = new URLSearchParams({
      sortBy: "id",
      orderBy: "desc",
      page: String(page),
      pageSize: String(10),
    });
    if (fromDate) {
      urlSearchParams.append("from", String(fromDate));
      if (!toDate) {
        urlSearchParams.append("to", String(formatDataYtoD(new Date())));
      }
    }
    if (toDate) {
      urlSearchParams.append("to", String(toDate));
    }
    if (status) {
      urlSearchParams.append("status", status);
    }
    try {
      const { response, error } = await networkCall(
        endpoints.PAYMENTS_DATA + `?${urlSearchParams}`,
        "GET"
      );
      if (error) return rejectWithValue(error);
      switch (response.statusCode) {
        case "200":
          return fulfillWithValue(response);
        case "404":
          return rejectWithValue(response.message);
        case "500":
          return rejectWithValue(response.message);
        default:
          return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const vendorSlice = createSlice({
  name: "vendorSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVendorQrCodes.pending, (state, action) => {
      state.loadingStatus = "PENDING";
    });
    builder.addCase(getVendorQrCodes.fulfilled, (state, action) => {
      state.loadingStatus = "FULFILLED";
      state.qrCodesData = action.payload?.data?.data;
      state.pagination = action.payload?.data?.pagination;
    });
    builder.addCase(getVendorQrCodes.rejected, (state, action) => {
      state.loadingStatus = "REJECTED";
      displayAlert(action.payload as string, "error");
    });
    builder
      .addCase(getVendorScans.pending, (state, action) => {
        state.scans.loadingStatus = "PENDING";
      })
      .addCase(getVendorScans.fulfilled, (state, action) => {
        state.scans.loadingStatus = "FULFILLED";
        state.scans.data = action.payload?.data;
      })
      .addCase(getVendorScans.rejected, (state, action) => {
        state.scans.loadingStatus = "REJECTED";
        state.scans.message = action.payload as string;
        displayAlert(action.payload as string, "error");
      });
    builder
      .addCase(getVendorStats.pending, (state, action) => {
        state.stats.loadingStatus = "PENDING";
      })
      .addCase(getVendorStats.fulfilled, (state, action) => {
        state.stats.loadingStatus = "FULFILLED";
        state.stats.data = action.payload?.data;
      })
      .addCase(getVendorStats.rejected, (state, action) => {
        state.stats.loadingStatus = "REJECTED";
        state.stats.message = action.payload as string;
        displayAlert(action.payload as string, "error");
      });
    builder
      .addCase(getVendorPayments.pending, (state, action) => {
        state.payments.loadingStatus = "PENDING";
      })
      .addCase(getVendorPayments.fulfilled, (state, action) => {
        state.payments.loadingStatus = "FULFILLED";
        state.payments.paymentsData = action.payload?.data?.data;
        state.payments.pagination = action.payload?.data?.pagination;
      })
      .addCase(getVendorPayments.rejected, (state, action) => {
        state.payments.loadingStatus = "REJECTED";
        state.payments.message = action.payload as string;
      });
  },
});
export default vendorSlice.reducer;
