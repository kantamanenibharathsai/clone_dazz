import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../../../components/superAdmin/common/CommonStyles";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert } from "../../../utils/toastMessage";

export interface HostScreenData {
  id: number;
  screenName: string;
}

interface IPagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
export interface InitialState {
  allApiStatus: { getHostScreens: ApiStatus; uploadMedia: ApiStatus };
  allApiErrors: { getHostScreens: string; uploadMedia: string };
  pagination: IPagination;
  screenData: HostScreenData[];
}
const initialState: InitialState = {
  allApiErrors: { getHostScreens: "", uploadMedia: "" },
  allApiStatus: { getHostScreens: "INITIAL", uploadMedia: "INITIAL" },
  pagination: {
    currentPage: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0,
  },
  screenData: [],
};

export const getScreensHostData = createAsyncThunk(
  "getScreensHostData",
  async (
    {
      page,
      searchInput = "",
    }: {
      page: number;
      searchInput?: string;
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.GET_HOST_SCREENS}?${
          searchInput && `search=${searchInput}`
        }&page=${page}&size=5`,
        "GET"
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response);
      if (response.statusCode === "404") {
        return rejectWithValue(response.message);
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addMediaToScreen = createAsyncThunk(
  "addMediaToScreen",
  async (
    {
      screenIds,
      files,
      isWidget,
    }: {
      screenIds: number[];
      files: File;
      isWidget: boolean;
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    const formData = new FormData();
    for (let each of screenIds) formData.append("screenIds", each.toString());
    formData.append("images", files);
    formData.append(
      "mediaType",
      isWidget ? "Widget" : files.type.includes("video") ? "Video" : "Image"
    );
    try {
      const { response, error } = await networkCall(
        endpoints.POST_MEDIA_HOST,
        "PUT",
        formData,
        { "Content-Type": "null" }
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200")
        return fulfillWithValue(response.message);
      if (response.statusCode === "404") {
        return rejectWithValue(response.message);
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const ScreensSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    clearScreenData: (state) => {
      state.screenData = [];
      state.pagination = initialState.pagination;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getScreensHostData.pending, (state) => {
      state.allApiStatus.getHostScreens = "PENDING";
    });
    builder.addCase(getScreensHostData.fulfilled, (state, action) => {
      state.allApiStatus.getHostScreens = "SUCCESS";
      state.allApiErrors.getHostScreens = "";
      state.pagination = action.payload?.data?.pagination;
      if (action.payload.data.pagination.currentPage === 1)
        state.screenData = action.payload.data.data;
      else
        state.screenData = [...state.screenData, ...action.payload?.data?.data];
    });
    builder.addCase(getScreensHostData.rejected, (state, action) => {
      state.allApiStatus.getHostScreens = "ERROR";
      state.allApiErrors.getHostScreens = String(
        action.payload || "Something Went Wrong"
      );
      state.pagination = initialState.pagination;
      state.screenData = [];
      displayAlert(
        action.payload ? (action.payload as string) : "Something went wrong",
        "error"
      );
    });
    builder
      .addCase(addMediaToScreen.pending, (state) => {
        state.allApiStatus.uploadMedia = "PENDING";
      })
      .addCase(addMediaToScreen.fulfilled, (state, action) => {
        state.allApiStatus.uploadMedia = "SUCCESS";
        displayAlert(action.payload, "success");
      })
      .addCase(addMediaToScreen.rejected, (state, action) => {
        const message = String(action.payload || "Something Went Wrong");
        state.allApiErrors.uploadMedia = message;
        displayAlert(message, "error");
        state.allApiStatus.uploadMedia = "ERROR";
      });
  },
});
export const { clearScreenData } = ScreensSlice.actions;
export default ScreensSlice.reducer;
