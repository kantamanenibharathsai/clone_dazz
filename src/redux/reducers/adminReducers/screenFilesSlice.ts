import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../../../components/superAdmin/common/CommonStyles";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
interface EachImage {
  url: string;
  size: string;
  name: string;
}
interface IScreenFilesSlice {
  apiStatus: ApiStatus;
  filesData: EachImage[];
  apiError: string;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}
const initialState: IScreenFilesSlice = {
  apiStatus: "INITIAL",
  apiError: "",
  filesData: [],
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 1,
    totalPages: 1,
  },
};

export const getFiles = createAsyncThunk(
  "screenFilesSlice/getFiles",
  async (
    { id, page, name }: { id: string; page: number; name?: string },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { response, error } = await networkCall(
        endpoints.GET_SCREEN_FILES +
          `?id=${id}&pageSize=10&page=${page}${name && `&name=${name}`}`
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

const ScreenFilesSlice = createSlice({
  name: "screenFilesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFiles.pending, (state) => {
      state.apiStatus = "PENDING";
    });
    builder.addCase(getFiles.fulfilled, (state, action) => {
      state.filesData = action.payload.data;
      state.pagination = action.payload.pagination;
      state.apiStatus = "SUCCESS";
      state.apiError = "";
    });
    builder.addCase(getFiles.rejected, (state, action) => {
      state.filesData = [];
      state.apiStatus = "ERROR";
      state.apiError = action.payload as string;
    });
  },
});

export default ScreenFilesSlice.reducer;
