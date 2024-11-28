import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL, endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert } from "../../../utils/toastMessage";
import { RootState } from "../../store";

interface AdsType {
  id: number;
  campaignName: string;
  screenCount: number;
  totalAmount: number;
  updatedAt: string;
  createdAt: string;
  paymentReceived: boolean;
  status: string;
  latitude: number;
  longitude: number;
  startDate: string;
  endDate: string;
  userName: string;
  roleName: string;
  poReceived: string;
  mediaFiles: {
    url: string;
    size: string;
    name: string;
    id: number;
  }[];
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
    totalItems: 0,
    pageSize: 10,
  },
};

interface GetMyUserAdsType {
  userId: string;
  searchValue: string;
  page: number;
  order: string;
  sortBy: string;
  pageSize: number;
}

export const getMyUserAds = createAsyncThunk(
  "getMyUserAds",
  async (
    { searchValue, page, order, userId, sortBy, pageSize }: GetMyUserAdsType,
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const params = new URLSearchParams({
      userId: userId,
      name: searchValue,
      orderBy: order,
      sortBy: sortBy,
      pageSize: pageSize.toString(),
      page: page.toString(),
    });
    if (!searchValue) params.delete("name");
    const pageValueBeforeSearch = (getState() as RootState).MyAdsSlice
      .pagination.currentPage;
    try {
      const { response } = await networkCall(
        `${baseURL}/${endpoints.CAMPAIGN}?${params}`,
        "GET"
      );
      switch (response?.statusCode) {
        case "200":
          if (searchValue)
            response.data.pagination.currentPage = pageValueBeforeSearch;
          return fulfillWithValue(response?.data);
        case "404":
          return rejectWithValue(response?.message ?? "Not Found");
        default:
          return rejectWithValue("Something Went Wrong");
      }
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);

export const deleteMyUserAd = createAsyncThunk(
  "deleteMyUserAd",
  async (id: number, { fulfillWithValue, rejectWithValue }) => {
    const errorTxt = "Oops something went wrong";
    try {
      const { response } = await networkCall(
        `${baseURL}/${endpoints.CAMPAIGN}/${id}`,
        "DELETE"
      );
      switch (response?.statusCode) {
        case "200":
          displayAlert(response.message, "success");
          return fulfillWithValue(response);
        case "404":
          displayAlert(response.message, "warning");
          return fulfillWithValue(response);
        default:
          displayAlert(errorTxt, "warning");
          return fulfillWithValue(response);
      }
    } catch (error) {
      displayAlert(errorTxt, "warning");
      return fulfillWithValue(errorTxt);
    }
  }
);

export const getSingleCampaign = createAsyncThunk(
  "getSingleCampaign",
  async (id: number, { fulfillWithValue, rejectWithValue }) => {
    const errorTxt = "Something went wrong";
    try {
      const { response } = await networkCall(
        `${baseURL}/${endpoints.CAMPAIGN}/${id}`,
        "GET"
      );
      switch (response?.statusCode) {
        case "200":
          return fulfillWithValue(response);
        case "404":
          displayAlert(response.message, "warning");
          return rejectWithValue(response);
        default:
          displayAlert(response.message ?? errorTxt, "error");
          return rejectWithValue(response);
      }
    } catch (error) {
      displayAlert(errorTxt, "error");
      return rejectWithValue(errorTxt);
    }
  }
);

const myAdsSlice = createSlice({
  name: "My Ads Slice",
  initialState,
  reducers: {
    updatePageNumber: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyUserAds.pending, (state) => {
      state.loading = true;
      state.errorMessage = "";
    });
    builder.addCase(getMyUserAds.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(getMyUserAds.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload as string;
    });
    builder.addCase(deleteMyUserAd.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteMyUserAd.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteMyUserAd.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getSingleCampaign.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSingleCampaign.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getSingleCampaign.rejected, (state) => {
      state.loading = false;
    });
  },
});
export const { updatePageNumber } = myAdsSlice.actions;
export default myAdsSlice.reducer;
