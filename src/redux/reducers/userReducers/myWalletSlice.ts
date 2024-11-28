import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../../../components/superAdmin/common/CommonStyles";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { RootState } from "../../store";
import { updateWalletBalance } from "../auth";
interface EachTransaction {
  amount: 1500;
  transactionType: string;
  transactionDate: string;
  orderId: string;
  paymentStatus: string;
}
interface IMyWalletSlice {
  loading: boolean;
  allApiStatus: {
    getBalance: ApiStatus;
    getTransactions: ApiStatus;
    getOrderId: ApiStatus;
    addAmount: ApiStatus;
  };
  allApiError: {
    getBalance: string;
    getTransactions: string;
    getOrderId: string;
    addAmount: string;
  };
  orderId: string;
  balance: number;
  transactions: EachTransaction[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}
const initialState: IMyWalletSlice = {
  loading: false,
  allApiError: {
    getBalance: "",
    getTransactions: "",
    getOrderId: "",
    addAmount: "",
  },
  allApiStatus: {
    getBalance: "INITIAL",
    getTransactions: "INITIAL",
    getOrderId: "INITIAL",
    addAmount: "INITIAL",
  },
  orderId: "",
  balance: 0,
  transactions: [],
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 1,
    totalPages: 1,
  },
};
export const getBalance = createAsyncThunk(
  "myWalletSlice/getBalance",
  async (_, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    try {
      const userId = (getState() as RootState).Auth.user.id;
      const { response, error } = await networkCall(
        endpoints.GET_WALLET_DETAILS + `?userId=${userId}`
      );
      if (error || response.status === 400)
        return rejectWithValue("Something Went Wrong");
      if (response.statusCode === "200") {
        dispatch(updateWalletBalance(response.data.balance));
        return fulfillWithValue(response.data.balance);
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);
export const getTransactions = createAsyncThunk(
  "myWalletSlice/getTransactions",
  async (page: number, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const userId = (getState() as RootState).Auth.user.id;
      const { response, error } = await networkCall(
        endpoints.GET_WALLET_TRANSACTIONS +
          `?userId=${userId}&&sortBy=transactionDate&sortDir=desc&page=${page}`
      );
      if (error || response.status === 400)
        return rejectWithValue("Something Went Wrong");
      if (response.statusCode === "200") return fulfillWithValue(response.data);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);
export const getOrderId = createAsyncThunk(
  "myWallet/getOrderId",
  async (amount: string, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const userId = (getState() as RootState).Auth.user.id;
      const body = new FormData();
      body.append("userId", userId.toString());
      body.append("amount", amount);
      const { response, error } = await networkCall(
        endpoints.GET_ORDER_ID,
        "POST",
        body,
        {
          "Content-Type": "null",
        }
      );
      if (error) rejectWithValue("Something Went Wrong");
      if (response.status === 400 || error)
        return rejectWithValue("Something Went Wrong");
      if (response.statusCode === "200")
        return fulfillWithValue(response.data.orderId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const addAmount = createAsyncThunk(
  "myWallet/addAmount",
  async (
    { paymentId, orderId }: { paymentId: string; orderId: string },
    { rejectWithValue, fulfillWithValue, dispatch }
  ) => {
    try {
      const body = new FormData();
      body.append("orderId", orderId);
      body.append("paymentId", paymentId);
      const { response, error } = await networkCall(
        endpoints.POST_PAYMENT_ID,
        "POST",
        body,
        { "Content-Type": "null" }
      );
      if (error || response.status === 400)
        return rejectWithValue("Something Went Wrong");
      if (response.statusCode === "200") {
        await dispatch(getTransactions(1));
        await dispatch(getBalance());
        return fulfillWithValue(response.data.orderId);
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);

const myWalletSlice = createSlice({
  name: "myWalletSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBalance.pending, (state) => {
      state.loading = true;
      state.allApiStatus.getBalance = "PENDING";
    });
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.loading = false;
      state.balance = action.payload;
      state.allApiStatus.getBalance = "SUCCESS";
    });
    builder.addCase(getBalance.rejected, (state, action) => {
      state.loading = false;
      state.allApiStatus.getBalance = "SUCCESS";
      state.allApiError.getBalance = action.payload as string;
    });
    builder.addCase(getTransactions.pending, (state) => {
      state.loading = true;
      state.allApiStatus.getTransactions = "PENDING";
    });
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.allApiStatus.getTransactions = "SUCCESS";
      state.transactions = action.payload.data;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(getTransactions.rejected, (state, action) => {
      state.loading = false;
      state.allApiStatus.getTransactions = "ERROR";
      state.allApiError.getTransactions = action.payload as string;
    });
    builder.addCase(getOrderId.pending, (state) => {
      state.loading = true;
      state.allApiStatus.getOrderId = "PENDING";
    });
    builder.addCase(getOrderId.fulfilled, (state, action) => {
      state.loading = false;
      state.allApiStatus.getOrderId = "SUCCESS";
      state.orderId = action.payload!;
      state.allApiError.getOrderId = "";
    });
    builder.addCase(getOrderId.rejected, (state, action) => {
      state.loading = false;
      state.allApiError.getOrderId = action.payload as string;
      state.allApiStatus.getOrderId = "ERROR";
    });
    builder.addCase(addAmount.pending, (state) => {
      state.loading = true;
      state.allApiStatus.addAmount = "PENDING";
    });
    builder.addCase(addAmount.fulfilled, (state, action) => {
      state.loading = false;
      state.allApiStatus.addAmount = "SUCCESS";
      state.allApiError.addAmount = "";
    });
    builder.addCase(addAmount.rejected, (state, action) => {
      state.loading = false;
      state.allApiError.addAmount = action.payload as string;
      state.allApiStatus.addAmount = "ERROR";
    });
  },
});
export default myWalletSlice.reducer;
