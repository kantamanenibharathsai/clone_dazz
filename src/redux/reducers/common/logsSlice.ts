import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import networkCall from "../../../utils/networkCall";
import { endpoints } from "../../../config/config";
import { displayAlert } from "../../../utils/toastMessage";
import Storage from "../../../utils/Storage";

export type LoadingStatus = "IDLE" | "PENDING" | "FULFILLED" | "REJECTED";
export interface ILogs {
  logs: {
    data:
      | {
          id: number;
          name: string;
          mobile: string;
          email: string;
          createdat: string;
          updatedat: string;
          status: boolean;
          userId: number;
          category: string;
          message: string;
        }[]
      | null;
    message: string | null;
    pagination: {
      currentPage: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    } | null;
    loadingStatus: LoadingStatus;
  };
}

const initialState: ILogs = {
  logs: {
    data: null,
    pagination: null,
    loadingStatus: "IDLE",
    message: null,
  },
};

export const getLogs = createAsyncThunk(
  "getLogs",
  async (param: string | undefined, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.USER_LOGS +
          `?${param}&pageSize=10&sortBy=updatedat&sortOrder=desc`,
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
export const exportLogs = createAsyncThunk(
  "exportLogs",
  async (
    param: string | undefined,
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    try {
      const { response, error } = await networkCall(
        endpoints.EXPORT_USER_LOGS + `?${param}`,
        "GET"
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") {
        const token = Storage.get("token");
        const anchor = document.createElement("a");
        anchor.href = response.data + "/" + token;
        anchor.download = "file.xlsx";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        displayAlert(response.message as string, "success");
        return fulfillWithValue(response);
      }
      if (response.statusCode === "404") {
        displayAlert(response.message as string, "error");
        return rejectWithValue(response.message);
      }
      if (response.statusCode === "500") {
        displayAlert(response.message as string, "error");
        return rejectWithValue(response.message);
      } else {
        displayAlert(response.message as string, "error");
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const logsSlice = createSlice({
  name: "logsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLogs.pending, (state, action) => {
      state.logs.loadingStatus = "PENDING";
    });
    builder.addCase(getLogs.fulfilled, (state, action) => {
      state.logs.loadingStatus = "FULFILLED";
      state.logs.data = action.payload?.data?.data;
      state.logs.pagination = action.payload?.data?.pagination;
    });
    builder.addCase(getLogs.rejected, (state, action) => {
      state.logs.loadingStatus = "REJECTED";
      state.logs.message = action.payload as string;
      displayAlert(action.payload as string, "error");
      state.logs.data = [];
    });
  },
});
export default logsSlice.reducer;
