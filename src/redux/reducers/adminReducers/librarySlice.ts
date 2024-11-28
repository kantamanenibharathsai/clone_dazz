import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert } from "../../../utils/toastMessage";
import { RootState } from "../../store";
export interface ScreenType {
  message: string | null;
  mediaMessage: string | null;
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
  selectedMedia: {
    id: number;
    category: string;
    active: boolean;
    createdBy: number;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  mediaFiles: {
    id: number;
    file: string;
    fileName: string;
    fileType: string;
    fileSize: string;
    status: boolean;
    active: boolean;
    mediaId: number;
    createdBy: 21;
    updatedBy: number;
    createdAt: string;
    updatedAt: string;
  }[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  } | null;
  currentPage: number;
  tabValue: string;
}
const initialState: ScreenType = {
  message: null,
  mediaMessage: null,
  loading: false,
  mediaData: [],
  mediaFiles: [],
  pagination: null,
  currentPage: 1,
  selectedMedia: null,
  tabValue: "",
};

export const uploadMedia = createAsyncThunk(
  "uploadMedia",
  async (categoryName: string, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("mediaCategory", categoryName);
      const { response, error } = await networkCall(
        endpoints.MEDIA,
        "POST",
        formData,
        { "Content-Type": "null" }
      );
      if (error) return displayAlert(error as string, "error");
      if (response.statusCode === "200") {
        dispatch(getMediaData());
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
export const getMediaData = createAsyncThunk(
  "getMediaData",
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
export const deleteMediaData = createAsyncThunk(
  "deleteMediaData",
  async (id: number, { dispatch }) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.MEDIA}/${id}`,
        "DELETE"
      );
      if (error) return displayAlert(error as string);
      if (response.statusCode === "200") {
        dispatch(getMediaData());
        return displayAlert(response.message);
      }
      if (response.statusCode === "404") {
        return displayAlert(response.message, "error");
      }
      return displayAlert(response.message, "error");
    } catch (error) {
      return displayAlert(error as string);
    }
  }
);
export const uploadMediaFiles = createAsyncThunk(
  "upload/media",
  async ({ files }: { files: (string | File)[] }, { dispatch, getState }) => {
    const { currentPage, selectedMedia } = (getState() as RootState)
      .LibrarySlice;
    try {
      const formData = new FormData();

      selectedMedia?.id &&
        formData.append("mediaId", selectedMedia.id.toString());
      for (let each of files) formData.append("files", each);
      const { response, error } = await networkCall(
        `${endpoints.MEDIA}/files`,
        "POST",
        formData,
        { "Content-Type": "null" }
      );
      if (error) return displayAlert(error as string, "error");
      if (response.statusCode === "200") {
        selectedMedia
          ? dispatch(getMediaFiles({ id: selectedMedia.id }))
          : dispatch(getMediaFiles({ page: currentPage }));
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
export const getMediaFiles = createAsyncThunk(
  "getMediaFiles",
  async (
    { page = 1, id, type }: { page?: number; id?: number; type?: string },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { tabValue } = (getState() as RootState).LibrarySlice;
    const endpoint = `${endpoints.MEDIA}/file/category?${
      id ? `mediaId=${id}&` : ""
    }page=${page}&sort=created_at&sort=desc${
      type ? `&fileType=${type}` : `&fileType=${tabValue}`
    }`;
    try {
      const { response, error } = await networkCall(endpoint, "GET");
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
export const deleteMediaFile = createAsyncThunk(
  "deleteMediaFile",
  async (id: number, { dispatch, getState }) => {
    const { currentPage, selectedMedia } = (getState() as RootState)
      .LibrarySlice;
    try {
      const { response, error } = await networkCall(
        `${endpoints.MEDIA}/file/${id}`,
        "DELETE"
      );
      if (error) return displayAlert(error as string);
      if (response.statusCode === "200") {
        selectedMedia
          ? dispatch(getMediaFiles({ id: selectedMedia.id }))
          : dispatch(getMediaFiles({ page: currentPage }));
        return displayAlert(response.message);
      }
      if (response.statusCode === "404") {
        return displayAlert(response.message, "error");
      }
      return displayAlert(response.message, "error");
    } catch (error) {
      return displayAlert(error as string);
    }
  }
);
export const updateMedia = createAsyncThunk(
  "updateMedia",
  async (
    { id, mediaCategory }: { id: number; mediaCategory: string },
    { dispatch, getState }
  ) => {
    const { selectedMedia } = (getState() as RootState).LibrarySlice;
    try {
      const formData = new FormData();
      formData.append("mediaCategory", mediaCategory);
      const { response, error } = await networkCall(
        `${endpoints.MEDIA}/${id}`,
        "PUT",
        formData,
        { "Content-Type": "null" }
      );
      if (error) return displayAlert(error as string, "error");
      if (response.statusCode === "200") {
        dispatch(getSingleMedia(selectedMedia!.id));
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
export const getSingleMedia = createAsyncThunk(
  "getSingleMedia",
  async (id: number, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.MEDIA}/category/${id}`,
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
export const updateMediaFiles = createAsyncThunk(
  "updateMediaFiles",
  async (
    {
      id,
      mediaId,
      files,
    }: { id: number; mediaId: number; files: (string | File)[] },
    { dispatch, getState }
  ) => {
    const { currentPage, selectedMedia } = (getState() as RootState)
      .LibrarySlice;
    try {
      const formData = new FormData();
      mediaId && formData.append("mediaId", mediaId.toString());
      for (let each of files) formData.append("file", each);
      const { response, error } = await networkCall(
        `${endpoints.MEDIA}/file/${id}`,
        "PUT",
        formData,
        { "Content-Type": "null" }
      );
      if (error) return displayAlert(error as string, "error");
      if (response.statusCode === "200") {
        selectedMedia
          ? dispatch(getMediaFiles({ id: selectedMedia.id }))
          : dispatch(getMediaFiles({ page: currentPage }));
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

export const LibrarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    handlePage(state, action) {
      state.currentPage = action.payload;
    },
    clearSelectedMedia(state) {
      state.selectedMedia = null;
    },
    handleTabs(state, action) {
      state.tabValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMediaData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMediaData.fulfilled, (state, action) => {
      state.loading = false;
      state.mediaMessage = "";
      state.mediaData = action.payload.data;
    });
    builder.addCase(getMediaData.rejected, (state, action) => {
      state.loading = false;
      state.mediaMessage = (action.payload as string).toLowerCase().includes("error")?"Something went wrong":action.payload as string;
      displayAlert(
        action.payload ? (action.payload as string) : "Something went wrong",
        "error"
      );
    });

    builder.addCase(getMediaFiles.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMediaFiles.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.mediaFiles = action.payload.data.data;
      state.pagination = action.payload.data.pagination;
    });
    builder.addCase(getMediaFiles.rejected, (state, action) => {
      state.loading = false;
      state.message = (action.payload as string).toLowerCase().includes("error")?"Something went wrong":action.payload as string;
      state.mediaFiles = [];
      state.pagination = null;
      displayAlert(
        action.payload ? (action.payload as string) : "Something went wrong",
        "error"
      );
    });

    builder.addCase(getSingleMedia.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSingleMedia.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedMedia = action.payload.data;
    });
    builder.addCase(getSingleMedia.rejected, (state, action) => {
      state.loading = false;
      displayAlert(
        action.payload ? (action.payload as string) : "Something went wrong",
        "error"
      );
    });
  },
});
export const { handlePage, clearSelectedMedia, handleTabs } =
  LibrarySlice.actions;
export default LibrarySlice.reducer;
