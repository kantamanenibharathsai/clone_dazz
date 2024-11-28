import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseURL, endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert } from "../../../utils/toastMessage";
import { IScreen } from "../adminReducers/screenSlice";
import { LoadingStatus } from "../hostReducers/HostSlice";

export interface IAd {
  playlistAdsId: number;
  files: {
    file: string;
    fileName: string;
    fileType: string;
  }[];
  widget: null;
  adInformation: string;
}
interface IPagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface IGroup {
  id: number;
  name: null;
  screenGroupImage: {
    url: string;
    size: string;
    name: string;
    id: null;
  };
  screenGroupName: string;
  subCategoryId: null;
  screenImages: never[];
  screenImagesCount: number;
  createdAt: string;
  currentlyPlaying: null;
  description: null;
  cpmValue: null;
}

export interface IPlaylistSchedule {
  playlistId: number;
  startDate: string;
  endDate: string;
  screenCount: number;
}

interface InitialState {
  ads: { loadingStatus: LoadingStatus; message: string; data: IAd[] | null };
  existScreensInAd: {
    screensData: IScreen[] | null;
    pagination: IPagination | null;
    loadingStatus: LoadingStatus;
    message: string | null;
  };
  notExistScreensInAd: {
    screensData: IScreen[] | null;
    pagination: IPagination | null;
    loadingStatus: LoadingStatus;
    message: string | null;
  };
  existGroupsInAd: {
    groupsData: IGroup[] | null;
    pagination: IPagination | null;
    loadingStatus: LoadingStatus;
    message: string | null;
  };
  notExistGroupsInAd: {
    groupsData: IGroup[] | null;
    pagination: IPagination | null;
    loadingStatus: LoadingStatus;
    message: string | null;
  };
  playListSchedule: {
    schedule: IPlaylistSchedule | null;
    loadingStatus: LoadingStatus;
    message: string | null;
  };
}
const initialState: InitialState = {
  ads: {
    loadingStatus: "IDLE",
    message: "",
    data: null,
  },
  existScreensInAd: {
    screensData: null,
    pagination: null,
    loadingStatus: "IDLE",
    message: "",
  },
  notExistScreensInAd: {
    screensData: null,
    pagination: null,
    loadingStatus: "IDLE",
    message: "",
  },
  existGroupsInAd: {
    groupsData: null,
    pagination: null,
    loadingStatus: "IDLE",
    message: "",
  },
  notExistGroupsInAd: {
    groupsData: null,
    pagination: null,
    loadingStatus: "IDLE",
    message: "",
  },
  playListSchedule: {
    schedule: null,
    loadingStatus: "IDLE",
    message: "",
  },
};

export const getPlayListAds = createAsyncThunk(
  "getPlayListAds",
  async (
    playListId: string | undefined,
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { response, error } = await networkCall(
        `${baseURL}/${endpoints.PLAYLIST_ADS}?playlistId=${playListId}`,
        "GET"
      );

      if (error) return rejectWithValue(error);
      switch (response?.statusCode) {
        case "200":
          return fulfillWithValue(response);
        case "404":
          return rejectWithValue(response.message);
        default:
          return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getExistScreensInAd = createAsyncThunk(
  "getExistScreensInAd",
  async (
    {
      page,
      sort = "desc",
      adId,
    }: {
      page: number;
      searchInput?: string;
      sort?: string;
      adId: number | null;
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const urlParams = new URLSearchParams({
        playListAdId: String(adId),
        orderBy: sort,
        sortBy: "id",
        page: String(page),
        pageSize: "5",
      });
      const { response, error } = await networkCall(
        `${endpoints.SCREEN}?${urlParams}`,
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
export const getNotExistScreensInAd = createAsyncThunk(
  "getNotExistScreensInAd",
  async (
    {
      page,
      searchInput = "",
      sort = "desc",
      adId,
    }: {
      page: number;
      searchInput?: string;
      sort?: string;
      adId: number | null;
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const urlParams = new URLSearchParams({
        withOutplayListAdId: String(adId),
        screenName: searchInput,
        orderBy: sort,
        sortBy: "id",
        page: String(page),
        pageSize: "10",
      });
      const { response, error } = await networkCall(
        `${endpoints.SCREEN}?${urlParams}`,
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

export const getExistGroupsInAd = createAsyncThunk(
  "getExistGroupsInAd",
  async (
    {
      page,
      sort = "desc",
      adId,
    }: {
      page: number;
      searchInput?: string;
      sort?: string;
      adId: number | null;
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const urlParams = new URLSearchParams({
        playListAdId: String(adId),
        orderBy: sort,
        sortBy: "id",
        page: String(page),
        pageSize: "10",
      });
      const { response, error } = await networkCall(
        `${endpoints.SCREENGROUP}?${urlParams}`,
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
export const getNotExistGroupsInAd = createAsyncThunk(
  "getNotExistGroupsInAd",
  async (
    {
      page,
      searchInput = "",
      sort = "desc",
      adId,
    }: {
      page: number;
      searchInput?: string;
      sort?: string;
      adId: number | null;
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const urlParams = new URLSearchParams({
        withOutplayListAdId: String(adId),
        screenGroupName: searchInput,
        orderBy: sort,
        sortBy: "id",
        page: String(page),
        pageSize: "10",
      });
      const { response, error } = await networkCall(
        `${endpoints.SCREENGROUP}?${urlParams}`,
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
export const getPlayListSchedule = createAsyncThunk(
  "getPlayListSchedule",
  async (adId: number | null, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.GET_PLAYLIST_SCHEDULE}?playlistAdId=${adId}`,
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
export const updateOrDeletePlayListSchedule = createAsyncThunk(
  "updateOrDeletePlayListSchedule",
  async (
    {
      playlistAdId,
      startDate,
      endDate,
      isDelete,
    }: {
      playlistAdId: number | null;
      startDate?: string | null;
      endDate?: string | null;
      isDelete?: boolean;
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("playlistAdId", String(playlistAdId));
      if (startDate && endDate) {
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
      }
      if (isDelete) {
        formData.append("isDelete", String(isDelete));
      }
      const { response, error } = await networkCall(
        `${endpoints.PLAYLIST_SCHEDULE}`,
        "PUT",
        formData,
        {
          "Content-Type": "null",
        }
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") {
        displayAlert(response.message as string, "success");
        return fulfillWithValue(response);
      }
      if (response.statusCode === "404") {
        return rejectWithValue(response.message);
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const saveScreensToAd = createAsyncThunk(
  "saveScreensToAd",
  async (
    {
      playlistAdId,
      screens,
    }: {
      playlistAdId: number | null;
      screens: IScreen[];
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("playListAdId", String(playlistAdId));
      screens.forEach((screen) =>
        formData.append("screenIds", String(screen.id))
      );
      const { response, error } = await networkCall(
        `${endpoints.PLAYLIST_SAVE_SCREENS}`,
        "PUT",
        formData,
        {
          "Content-Type": "null",
        }
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") {
        return fulfillWithValue(response);
      }
      if (response.statusCode === "404") {
        return rejectWithValue(response.message);
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const saveGroupsToAd = createAsyncThunk(
  "saveGroupsToAd",
  async (
    {
      playlistAdId,
      groups,
    }: {
      playlistAdId: number | null;
      groups: IGroup[];
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("playListAdId", String(playlistAdId));
      groups.forEach((group) =>
        formData.append("screenGroupIds", String(group.id))
      );
      const { response, error } = await networkCall(
        `${endpoints.PLAYLIST_SAVE_GROUPS}`,
        "PUT",
        formData,
        {
          "Content-Type": "null",
        }
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") {
        displayAlert(response.message as string, "success");
        return fulfillWithValue(response);
      }
      if (response.statusCode === "404") {
        return rejectWithValue(response.message);
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const removeScreenOrGroupFromAd = createAsyncThunk(
  "removeScreenOrGroupFromAd",
  async (
    {
      playlistAdId,
      removeItemId,
      isScreen,
    }: {
      playlistAdId: number | null;
      removeItemId?: number;
      isScreen: boolean;
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("playListAdId", String(playlistAdId));
      if (isScreen) {
        formData.append("screenId", String(removeItemId));
      } else {
        formData.append("screengroupId", String(removeItemId));
      }
      const { response, error } = await networkCall(
        isScreen
          ? endpoints.REMOVE_SCREEN_FROM_AD
          : endpoints.REMOVE_GROUP_FROM_AD,
        "DELETE",
        formData,
        {
          "Content-Type": "null",
        }
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") {
        return fulfillWithValue(response);
      }
      if (response.statusCode === "404") {
        return rejectWithValue(response.message);
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const canvasNextSlice = createSlice({
  name: "canvasNextSlice",
  initialState,
  reducers: {
    addScreenToAdScreens: (state, action: PayloadAction<IScreen>) => {
      const screensData = state.existScreensInAd.screensData;
      if (Boolean(screensData!.find((scr) => scr.id === action.payload.id))) {
        state.existScreensInAd.screensData = screensData!.filter(
          (scr) => scr.id !== action.payload.id
        );
      } else {
        state.existScreensInAd.screensData?.unshift(action.payload);
      }
      state.existScreensInAd.loadingStatus = "FULFILLED";
    },
    addGroupToAdGroups: (state, action: PayloadAction<IGroup>) => {
      const groupsData = state.existGroupsInAd.groupsData;
      if (
        Boolean(groupsData!.find((group) => group.id === action.payload.id))
      ) {
        state.existGroupsInAd.groupsData = groupsData!.filter(
          (group) => group.id !== action.payload.id
        );
      } else {
        state.existGroupsInAd.groupsData?.unshift(action.payload);
      }
      state.existGroupsInAd.loadingStatus = "FULFILLED";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlayListAds.pending, (state, action) => {
        state.ads.loadingStatus = "PENDING";
      })
      .addCase(getPlayListAds.fulfilled, (state, action) => {
        state.ads.loadingStatus = "FULFILLED";
        state.ads.data = action.payload.data;
      })
      .addCase(getPlayListAds.rejected, (state, action) => {
        state.ads.loadingStatus = "REJECTED";
        state.ads.message = action.payload as string;
      });
    builder
      .addCase(getExistScreensInAd.pending, (state) => {
        state.existScreensInAd.loadingStatus = "PENDING";
      })
      .addCase(getExistScreensInAd.fulfilled, (state, action) => {
        state.existScreensInAd.loadingStatus = "FULFILLED";
        state.existScreensInAd.pagination = action.payload?.data.pagination;
        state.existScreensInAd.screensData = action.payload?.data.data ?? [];
      })
      .addCase(getExistScreensInAd.rejected, (state, action) => {
        state.existScreensInAd.loadingStatus = "REJECTED";
        state.existScreensInAd.message = action.payload as string;
        state.existScreensInAd.pagination = null;
        state.existScreensInAd.screensData = [];
      });
    builder
      .addCase(getNotExistScreensInAd.pending, (state) => {
        state.notExistScreensInAd.loadingStatus = "PENDING";
      })
      .addCase(getNotExistScreensInAd.fulfilled, (state, action) => {
        state.notExistScreensInAd.loadingStatus = "FULFILLED";
        state.notExistScreensInAd.pagination = action.payload?.data.pagination;
        state.notExistScreensInAd.screensData = action.payload?.data.data ?? [];
      })
      .addCase(getNotExistScreensInAd.rejected, (state, action) => {
        state.notExistScreensInAd.loadingStatus = "REJECTED";
        state.notExistScreensInAd.message = action.payload as string;
        state.notExistScreensInAd.pagination = null;
        state.notExistScreensInAd.screensData = [];
      });
    builder
      .addCase(getExistGroupsInAd.pending, (state) => {
        state.existGroupsInAd.loadingStatus = "PENDING";
      })
      .addCase(getExistGroupsInAd.fulfilled, (state, action) => {
        state.existGroupsInAd.loadingStatus = "FULFILLED";
        state.existGroupsInAd.pagination = action.payload?.data.pagination;
        state.existGroupsInAd.groupsData = action.payload?.data.data ?? [];
      })
      .addCase(getExistGroupsInAd.rejected, (state, action) => {
        state.existGroupsInAd.loadingStatus = "REJECTED";
        state.existGroupsInAd.message = action.payload as string;
        state.existGroupsInAd.pagination = null;
        state.existGroupsInAd.groupsData = [];
      });
    builder
      .addCase(getNotExistGroupsInAd.pending, (state) => {
        state.notExistGroupsInAd.loadingStatus = "PENDING";
      })
      .addCase(getNotExistGroupsInAd.fulfilled, (state, action) => {
        state.notExistGroupsInAd.loadingStatus = "FULFILLED";
        state.notExistGroupsInAd.pagination = action.payload?.data.pagination;
        state.notExistGroupsInAd.groupsData = action.payload?.data.data ?? [];
      })
      .addCase(getNotExistGroupsInAd.rejected, (state, action) => {
        state.notExistGroupsInAd.loadingStatus = "REJECTED";
        state.notExistGroupsInAd.message = action.payload as string;
        state.notExistGroupsInAd.pagination = null;
        state.notExistGroupsInAd.groupsData = [];
      });
    builder
      .addCase(getPlayListSchedule.pending, (state) => {
        state.playListSchedule.loadingStatus = "PENDING";
      })
      .addCase(getPlayListSchedule.fulfilled, (state, action) => {
        state.playListSchedule.loadingStatus = "FULFILLED";
        state.playListSchedule.schedule = action.payload?.data ?? null;
      })
      .addCase(getPlayListSchedule.rejected, (state, action) => {
        state.playListSchedule.loadingStatus = "REJECTED";
        state.playListSchedule.message = action.payload as string;
        state.playListSchedule.schedule = null;
      });
  },
});
export const { addScreenToAdScreens, addGroupToAdGroups } =
  canvasNextSlice.actions;
export default canvasNextSlice.reducer;
