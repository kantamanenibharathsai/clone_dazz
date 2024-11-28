import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";

interface AdsType {
  createdAt: string;
  description: string;
  id: number;
  layoutCount: number;
  layoutImages: string[];
  playlistName: string;
}

interface IState {
  loading: boolean;
  data: AdsType[];
  errorMessage: string;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
  };
}

const initialState: IState = {
  loading: false,
  data: [],
  errorMessage: "",
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 1,
    pageSize: 1,
  },
};
interface GetMyUserAdsType {
  searchValue: string | undefined;
  page: number;
  order: string;
}

export const gettingAds = createAsyncThunk(
  "ads/gettingAds",
  async (
    { searchValue, page, order }: GetMyUserAdsType,
    { rejectWithValue, fulfillWithValue }
  ) => {
    const url = new URLSearchParams({
      playlistName: searchValue ?? "",
      orderBy: order,
      sortBy: "id",
      pageSize: "9",
      page: page.toString(),
    });
    try {
      const { response, error } = await networkCall(
        `${endpoints.AD_AGENCY_ADS}?${url}`,
        "GET"
      );
      if (error) return rejectWithValue(error);
      if (response?.statusCode === "200") {
        return fulfillWithValue(response?.data);
      } else if (response.statusCode === "404") {
        return rejectWithValue("Playlist Not Found");
      } else {
        return rejectWithValue("Something Went Wrong");
      }
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);

export const deleteAd = createAsyncThunk(
  "ads/deleteAd",
  async (adId: number, { getState, rejectWithValue, dispatch }) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.AD_AGENCY_ADS}/${adId}`,
        "DELETE"
      );
      if (error) return rejectWithValue(error);
      if (response?.statusCode === "200") {
        const currentState = getState() as { adsSlice: IState };
        const { currentPage, pageSize } = currentState.adsSlice.pagination;

        const filteredAds = currentState.adsSlice.data.filter(
          (ad) => ad.id !== adId
        );
        dispatch({ type: "adsSlice/deleteAd", payload: filteredAds });
        const remainingItems = currentState.adsSlice.pagination.totalItems - 1;
        const totalPages = Math.ceil(remainingItems / pageSize);
        if (currentPage > totalPages) {
          dispatch(updatePageNumber(currentPage - 1));
        }
        return { id: adId };
      } else if (response?.statusCode === "404") {
        return rejectWithValue("Not Found");
      } else {
        return rejectWithValue("Something Went Wrong");
      }
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);

const adsSlice = createSlice({
  name: "adsSlice",
  initialState,
  reducers: {
    updatePageNumber: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(gettingAds.pending, (state) => {
      state.loading = true;
      state.errorMessage = "";
    });
    builder.addCase(gettingAds.fulfilled, (state, action) => {
      state.data = action.payload?.data || [];
      state.errorMessage = "";
      state.loading = false;
      state.pagination = action.payload?.pagination || initialState.pagination;
    });
    builder.addCase(gettingAds.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(deleteAd.pending, (state) => {
      state.loading = true;
      state.errorMessage = "";
    });
    builder.addCase(deleteAd.fulfilled, (state, action) => {
      const deletedId = action.payload.id;
      state.data = state.data.filter((ad) => ad.id !== deletedId);
      state.loading = false;
      state.errorMessage = "";
      state.pagination.totalItems -= 1;
      state.pagination.totalPages = Math.ceil(
        state.pagination.totalItems / state.pagination.pageSize
      );
    });
    builder.addCase(deleteAd.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload as string;
    });
  },
});
export default adsSlice.reducer;
export const { updatePageNumber } = adsSlice.actions;
