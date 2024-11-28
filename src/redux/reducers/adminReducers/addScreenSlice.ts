import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert } from "../../../utils/toastMessage";

export interface ScreenType {
  message: string | null;
  loading: boolean;
  mediaData: {
    id: number;
    category: string;
    active: boolean;
    createdBy: number;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
  }[];
}
const initialState: ScreenType = {
  message: null,
  loading: false,
  mediaData: [],
};

export const createNewGroup = createAsyncThunk(
  "createGroup",
  async ({
    groupName,
    file,
  }: {
    groupName: string;
    file: File[] | string[];
  }) => {
    const formData = new FormData();
    formData.append("groupName", groupName);
    for (let each of file) formData.append("files", each);
    try {
      const { response, error } = await networkCall(
        `${endpoints.SCREENGROUP}`,
        "POST",
        formData,
        { "Content-Type": "null" }
      );
      if (error) return displayAlert(error as string, "error");
      if (response.statusCode === "200") return displayAlert(response.message);
      if (response.statusCode === "404") {
        return displayAlert(response.message, "error");
      }
      return displayAlert(response.message, "error");
    } catch (error) {
      return displayAlert(error as string, "error");
    }
  }
);
type createNewPlaylistType = {
  groupName: string;
  description: string;
};
export const createNewPlaylist = createAsyncThunk(
  "createNewPlaylist",
  async ({ groupName, description }: createNewPlaylistType) => {
    const formData = new FormData();
    formData.append("playlistName", groupName);
    formData.append("description", description);
    try {
      const { response, error } = await networkCall(
        `${endpoints.PLAYLIST}`,
        "POST",
        formData,
        { "Content-Type": "null" }
      );
      if (error) return displayAlert(error as string, "error");
      if (response.statusCode === "200") return displayAlert(response.message);
      if (response.statusCode === "404") {
        return displayAlert(response.message, "error");
      }
      return displayAlert(response.message, "error");
    } catch (error) {
      return displayAlert(error as string, "error");
    }
  }
);
export const getSelectOptionsData = createAsyncThunk(
  "getSelectOptionsData",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.MEDIA}`,
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
export const uploadLibraryFiles = createAsyncThunk(
  "uploadLibraryFiles",
  async ({ files }: { files: (string | File)[] }) => {
    try {
      const formData = new FormData();
      for (let each of files) formData.append("files", each);
      const { response, error } = await networkCall(
        `${endpoints.MEDIA}/files`,
        "POST",
        formData,
        { "Content-Type": "null" }
      );
      if (error) return displayAlert(error as string, "error");
      if (response.statusCode === "200") {
        return displayAlert(response.message);
      }
      if (response.statusCode === "404") {
        return displayAlert(response.message, "error");
      }
      return displayAlert(response.message, "error");
    } catch (error) {
      return displayAlert(error as string, "error");
    }
  }
);
export const AddScreenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSelectOptionsData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSelectOptionsData.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.mediaData = action.payload.data;
    });
    builder.addCase(getSelectOptionsData.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as string;
      displayAlert(
        action.payload ? (action.payload as string) : "Something went wrong",
        "error"
      );
    });
  },
});

export default AddScreenSlice.reducer;
