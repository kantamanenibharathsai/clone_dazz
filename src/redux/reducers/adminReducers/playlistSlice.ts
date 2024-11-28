import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EachImage } from "../../../components/superAdmin/categories/types";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert } from "./../../../utils/toastMessage";
interface EachBeResponse {
  id: number;
  playlistName: string;
  description: string;
  layoutImages: string[];
  layoutCount: number;
  createdAt: string;
  status: string;
}

export interface PlaylistType {
  message: string | null;
  loading: boolean;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  } | null;
  playlistData:
    | {
        id: number;
        playlistName: string;
        description: string;
        layoutImages: EachImage[];
        layoutCount: number;
        createdAt: string;
        status: string;
      }[]
    | null;
}

const initialState: PlaylistType = {
  message: null,
  loading: false,
  pagination: null,
  playlistData: [],
};

export const getPlaylistData = createAsyncThunk(
  "getPlaylistData",
  async (
    {
      searchInput,
      page,
      sort = "desc",
    }: { searchInput: string; page: number; sort?: string },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.PLAYLIST}?playlistName=${searchInput}&orderBy=${sort}&sortBy=id&page=${page}&pageSize=10`,
        "GET"
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response);
      if (response.statusCode === "404")
        return rejectWithValue(response.message);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deletePlaylist = createAsyncThunk(
  "deletePlaylist",
  async (
    {
      playlistId,
      page,
      searchInput,
    }: { playlistId: number; page: number; searchInput: string },
    { rejectWithValue, fulfillWithValue, dispatch }
  ) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.PLAYLIST}/${playlistId}`,
        "DELETE"
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") {
        await dispatch(getPlaylistData({ searchInput, page }));
        return fulfillWithValue(response.message);
      }
      if (response.statusCode === "404")
        return rejectWithValue(response.message);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePlaylistData = createAsyncThunk(
  "updatePlaylistData",
  async (
    { formData, layOutId }: { formData: FormData; layOutId: number | null },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.UPDATE_PLAYLISTDATA}/${layOutId}`,
        "PUT",
        formData,
        {
          "Content-Type": "null",
        }
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") {
        displayAlert(response.message);
        return fulfillWithValue(response);
      }
      if (response.statusCode === "400")
        displayAlert(response.message, "error");

      if (response.statusCode === "404")
        displayAlert(response.message, "error");
      if (response.statusCode === "500")
        displayAlert(response.message, "error");
    } catch (error) {
      displayAlert(error as string, "error");
    }
  }
);

export const PlaylistSlice = createSlice({
  name: "playlistSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPlaylistData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPlaylistData.fulfilled, (state, action) => {
      state.loading = false;
      state.message = null;
      state.playlistData = action?.payload?.data?.data?.map(
        (each: EachBeResponse) => ({
          ...each,
          layoutImages: (each.layoutImages ?? []).map((each) =>
            JSON.parse(each ?? "{}")
          ),
        })
      );
      state.pagination = action.payload.data.pagination;
    });
    builder.addCase(getPlaylistData.rejected, (state, action) => {
      state.loading = false;
      state.playlistData = [];
      state.message = action.payload
        ? (action.payload as string)
        : "Internal server error";
      displayAlert(
        action.payload ? (action.payload as string) : "Something went wrong",
        "error"
      );
    });
    builder.addCase(deletePlaylist.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(deletePlaylist.fulfilled, (state, action) => {
      state.loading = false;
      displayAlert(action.payload);
    });
    builder.addCase(deletePlaylist.rejected, (state, action) => {
      state.loading = false;
      displayAlert(
        action.payload ? (action.payload as string) : "Something went wrong",
        "error"
      );
    });
  },
});

export default PlaylistSlice.reducer;
