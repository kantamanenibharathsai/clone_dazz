import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import networkCall from "../../../utils/networkCall";
import { endpoints } from "../../../config/config";
import { displayAlert } from "../../../utils/toastMessage";
type LoadingStatus = "IDLE" | "PENDING" | "FULFILLED" | "REJECTED";
export interface IWidget {
  id: number;
  widgetName: string;
  widgetImage: string;
  active: boolean;
  createdBy: number;
  updatedBy: null;
  createdAt: string;
  updatedAt: string;
}
export interface ISubWidget {
  id: number;
  name: string;
  text: string;
  subWidgetImage: null;
}
interface InitialState {
  widgets: {
    widgetsData: IWidget[];
    pagination: {
      currentPage: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    } | null;
    loadingStatus: LoadingStatus;
    message: string;
  };
  subWidgets: {
    subWidgetsData: ISubWidget[];
    pagination: {
      currentPage: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    } | null;
    loadingStatus: LoadingStatus;
    message: string;
  };
}
const initialState: InitialState = {
  widgets: {
    widgetsData: [],
    pagination: null,
    loadingStatus: "IDLE",
    message: "",
  },
  subWidgets: {
    subWidgetsData: [],
    pagination: null,
    loadingStatus: "IDLE",
    message: "",
  },
};
export const getWidgets = createAsyncThunk(
  "getWidgets",
  async (
    { searchWidget, page }: { searchWidget: string; page: number },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { response, error } = await networkCall(
        endpoints.WIDGET +
          `?name=${searchWidget}&page=${page}&size=10&sort=createdAt&sort=desc`,
        "GET"
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response);
      if (response.statusCode === "404")
        return rejectWithValue(response.message);
      return rejectWithValue(response.message);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const getSubWidgets = createAsyncThunk(
  "getSubWidgets",
  async (
    { subWidgetId, page }: { subWidgetId: number; page: number },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { response, error } = await networkCall(
        endpoints.WIDGET_SUB_WIDGET +
          `?widgetId=${subWidgetId}&page=${page}&size=10&sort=id&direction=desc`,
        "GET"
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response);
      if (response.statusCode === "404")
        return rejectWithValue(response.message);
      return rejectWithValue(response.message);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const deleteWidget = createAsyncThunk(
  "deleteWidget",
  async (widgetId: number, { dispatch, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.WIDGET + `/${widgetId}`,
        "DELETE"
      );
      if (response.statusCode === "200") {
        await dispatch(getWidgets({ searchWidget: "", page: 1 }));
        displayAlert(response.message as string, "success");
        return fulfillWithValue(response);
      }
      if (response.statusCode === "404") {
        displayAlert(response.message as string, "error");
      }
      if (response.statusCode === "500") {
        displayAlert(response.message as string, "error");
      }
      if (error) displayAlert(error as string, "error");
    } catch (error) {
      displayAlert(error as string, "error");
    }
  }
);
export const deleteSubWidget = createAsyncThunk(
  "deleteSubWidget",
  async (subWidgetId: number, { dispatch, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.DELETE_SUB_WIDGET + `/${subWidgetId}`,
        "DELETE"
      );
      if (response.statusCode === "200") {
        displayAlert(response.message as string, "success");
        return fulfillWithValue(response);
      }
      if (response.statusCode === "404") {
        displayAlert(response.message as string, "error");
      }
      if (response.statusCode === "500") {
        displayAlert(response.message as string, "error");
      }
      if (error) displayAlert(error as string, "error");
    } catch (error) {
      displayAlert(error as string, "error");
    }
  }
);
export const uploadOrUpdateWidget = createAsyncThunk(
  "uploadOrUpdateWidget",
  async (
    {
      formData,
      type,
      widgetId,
    }: { formData: FormData; type: string; widgetId: number },
    { rejectWithValue }
  ) => {
    try {
      const { response, error } = await networkCall(
        type === "UPDATE"
          ? `${endpoints.WIDGET}/${widgetId}`
          : endpoints.WIDGET,
        type === "UPLOAD" ? "POST" : "PUT",
        formData,
        { "Content-Type": "null" }
      );

      if (response.statusCode === "200") {
        displayAlert(response.message as string, "success");
      }
      if (response.statusCode === "404") {
        displayAlert(response.message as string, "error");
        return rejectWithValue(response);
      }
      if (response.statusCode === "500") {
        displayAlert(response.message as string, "error");
        return rejectWithValue(response);
      }
      if (response.statusCode === "400") {
        displayAlert(response.message as string, "error");
        return rejectWithValue(response);
      }
      if (error) {
        displayAlert(error as string, "error");
        return rejectWithValue(error);
      }
    } catch (error) {
      displayAlert(error as string, "error");
      return rejectWithValue(error);
    }
  }
);
export const uploadOrUpdateSubWidget = createAsyncThunk(
  "uploadOrUpdateSubWidget",
  async (
    { formData, type }: { formData: FormData; type: string },
    { rejectWithValue }
  ) => {
    try {
      const { response, error } = await networkCall(
        endpoints.SUB_WIDGET,
        type === "UPLOAD" ? "POST" : "PUT",
        formData,
        { "Content-Type": "null" }
      );

      if (response.statusCode === "200") {
        displayAlert(response.message as string, "success");
      }
      if (response.statusCode === "404") {
        displayAlert(response.message as string, "error");
        return rejectWithValue(response);
      }
      if (response.statusCode === "500") {
        displayAlert(response.message as string, "error");
        return rejectWithValue(response);
      }
      if (response.statusCode === "400") {
        displayAlert(response.message as string, "error");
        return rejectWithValue(response);
      }
      if (error) {
        displayAlert(error as string, "error");
        return rejectWithValue(error);
      }
    } catch (error) {
      displayAlert(error as string, "error");
      return rejectWithValue(error);
    }
  }
);
const widgetSlice = createSlice({
  name: "widgetSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWidgets.pending, (state, action) => {
        state.widgets.loadingStatus = "PENDING";
      })
      .addCase(getWidgets.fulfilled, (state, action) => {
        state.widgets.loadingStatus = "FULFILLED";
        state.widgets.widgetsData = action.payload.data?.data;
        state.widgets.pagination = action.payload.data?.pagination;
      })
      .addCase(getWidgets.rejected, (state, action) => {
        state.widgets.widgetsData = [];
        state.widgets.pagination = null;
        state.widgets.message = action.payload as string;
        state.widgets.loadingStatus = "REJECTED";
        displayAlert(action.payload as string, "error");
      });
    builder
      .addCase(getSubWidgets.pending, (state, action) => {
        state.subWidgets.loadingStatus = "PENDING";
      })
      .addCase(getSubWidgets.fulfilled, (state, action) => {
        state.subWidgets.loadingStatus = "FULFILLED";
        state.subWidgets.subWidgetsData = action.payload.data?.data;
        state.subWidgets.pagination = action.payload.data?.pagination;
      })
      .addCase(getSubWidgets.rejected, (state, action) => {
        state.subWidgets.subWidgetsData = [];
        state.subWidgets.pagination = null;
        state.subWidgets.message = action.payload as string;
        state.subWidgets.loadingStatus = "REJECTED";
        displayAlert(action.payload as string, "error");
      });
  },
});
export default widgetSlice.reducer;
