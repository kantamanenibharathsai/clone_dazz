import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert } from "../../../utils/toastMessage";

interface IDeviceInfo {
  androidDeviceDateTime: string;
  androidDeviceDateTimeMillis: number;
  androidDeviceTimeZoneGmt: string;
  androidDeviceTimeZoneLocation: string;
  board: string;
  brand: string;
  deviceHeight: number;
  deviceIpAddress: string;
  deviceWidth: number;
  id: number;
  isAndroidDefaultLauncher: boolean;
  isCameraPermissionGranted: boolean;
  isDeviceOwnerEnabled: boolean;
  isDeviceRooted: boolean;
  screenId: number;
  [key: string]: string | number | boolean;
}
export interface IScreen {
  id: number;
  name: string;
  pairingCode: number;
  screenName: string;
  tags: string;
  location: string;
  city: string;
  state: string;
  country: number;
  area: string;
  images: { url: string; size: string; name: string; id: number }[];
  screenGroupId: 1;
  description: string;
  screenPrice: string;
  currentlyPlaying: string;
  isSelected: boolean;
  status: boolean;
  orientation: string;
  updatedAt: string;
}
interface IPagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
export interface ScreenType {
  message: string | null;
  additionalInfoData: null | IDeviceInfo;
  additionalInfoLoader: "started" | "success" | "failed";
  loading: boolean;
  pagination: IPagination | null;

  screenData: IScreen[];
  screenGroupData:
    | {
        id: number;
        name: string;
        screenGroupImage: string;
        screenGroupName: string;
        subCategoryId: number;
        screenImages: string[];
        screenImagesCount: number;
        createdAt: string;
        currentlyPlaying: string;
        description: string;
        orientation: string;
        status: string;
        updatedAt: string;
      }[]
    | null;
  selectedScreensInGroup: {
    screensData: IScreen[] | null;
    pagination: IPagination | null;
    loading: boolean;
    message: string | null;
  };
  notExistedScreens: {
    screensData: IScreen[] | null;
    pagination: IPagination | null;
    loading: boolean;
    message: string | null;
  };
  selectedPlaylist: {
    id: number;
    name: string;
    screenName: string;
    active: string;
    livePlaylist: string;
    operatingSystem: string;
    orientation: string;
    resolution: string;
    ram: string;
    storage: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    status: boolean;
  } | null;
  selectedImage: {
    url: string;
    size: string;
    name: string;
    id: number;
  } | null;
}
const initialState: ScreenType = {
  message: null,
  loading: false,
  pagination: null,
  screenData: [],
  screenGroupData: [],
  additionalInfoData: null,
  additionalInfoLoader: "started",
  selectedPlaylist: null,
  selectedImage: null,
  selectedScreensInGroup: {
    screensData: null,
    pagination: null,
    loading: false,
    message: "",
  },
  notExistedScreens: {
    screensData: null,
    pagination: null,
    loading: false,
    message: "",
  },
};

export const screensSaveGroup = createAsyncThunk(
  "screensSaveGroup",
  async (
    {
      screenGroupId,
      screens,
    }: {
      screenGroupId?: string;
      screens: IScreen[];
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    const formData = new FormData();
    formData.append("screenGroupId", String(screenGroupId));
    screens.forEach((screen) =>
      formData.append("screenIds", String(screen.id))
    );
    try {
      const { response, error } = await networkCall(
        endpoints.SCREEN_SAVE_GROUP,
        "PUT",
        formData,
        {
          "Content-Type": "null",
        }
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response);
      if (response.statusCode === "404") {
        displayAlert(response.message as string, "error");
        return rejectWithValue(response.message);
      }
      displayAlert(response.message as string, "error");
      return rejectWithValue(response.message);
    } catch (error) {
      displayAlert(error as string, "error");
      return rejectWithValue(error);
    }
  }
);
export const getScreensData = createAsyncThunk(
  "getScreensData",
  async (
    {
      page,
      searchInput = "",
      sort = "desc",
      screenGroupId,
    }: {
      page: number;
      searchInput?: string;
      sort?: string;
      screenGroupId?: string;
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.SCREEN}?screenGroupIds=${
          screenGroupId ?? ""
        }&screenName=${searchInput}&orderBy=${sort}&sortBy=id&page=${page}&pageSize=10`,
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

export const notExistScreensData = createAsyncThunk(
  "notExistScreensData",
  async (
    {
      page,
      searchInput = "",
      sort = "desc",
    }: {
      page: number;
      searchInput?: string;
      sort?: string;
      notScreenGroupId: string;
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.SCREEN}?withOutGroup=true&screenName=${searchInput}&orderBy=${sort}&sortBy=id&page=${page}&pageSize=10`,
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
export const getSelectedScreensInGroup = createAsyncThunk(
  "getSelectedScreensInGroup",
  async (
    {
      page,
      screenGroupId,
    }: {
      page: number;
      screenGroupId: string;
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.SCREEN}?screenGroupIds=${screenGroupId}&orderBy=desc&sortBy=id&page=${page}&pageSize=10`,
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
export const updateScreenSelected = createAsyncThunk(
  "updateScreenSelected",
  async (
    { screenId, isSelect }: { screenId: number; isSelect: boolean },
    { rejectWithValue, fulfillWithValue }
  ) => {
    const formData = new FormData();
    formData.append("isSelect", String(!isSelect));
    try {
      const { response, error } = await networkCall(
        `${endpoints.SCREEN_SELECT}/${screenId}`,
        "PUT",
        formData,
        {
          "Content-Type": "null",
        }
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
export const deleteScreen = createAsyncThunk(
  "deleteScreen",
  async (
    {
      screenId,
      page,
      searchInput,
      sort,
    }: {
      screenId: number | null;
      page: number;
      searchInput: string;
      sort: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch }
  ) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.SCREEN}/${screenId}`,
        "DELETE"
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") {
        await dispatch(getScreensData({ page, searchInput, sort }));
        displayAlert(response.message);
        return fulfillWithValue(response);
      }
      if (response.statusCode === "404")
        return rejectWithValue(response.message);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getScreenGroupData = createAsyncThunk(
  "getScreenGroupData",
  async (
    {
      page,
      searchGroupInput = "",
      sort = "desc",
    }: { page: number; searchGroupInput?: string; sort?: string },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.SCREENGROUP}?screenGroupName=${searchGroupInput}&orderBy=${sort}&sortBy=id&page=${page}&pageSize=10`,
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
export const deleteScreenGroup = createAsyncThunk(
  "deleteScreenGroup",
  async (
    {
      screenGroupId,
      page,
      searchGroupInput,
      sort,
    }: {
      screenGroupId: number | null;
      page: number;
      searchGroupInput: string;
      sort: string;
    },
    { rejectWithValue, fulfillWithValue, dispatch }
  ) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.SCREENGROUP}/${screenGroupId}`,
        "DELETE"
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") {
        await dispatch(getScreenGroupData({ page, searchGroupInput, sort }));
        displayAlert(response.message);
        return fulfillWithValue(response);
      }
      if (response.statusCode === "404")
        return rejectWithValue(response.message);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const createNewScreen = createAsyncThunk(
  "createNewScreen",
  async (
    {
      body,
      endPoint,
      method,
    }: { body: FormData; endPoint: string; method: "POST" },
    { rejectWithValue, fulfillWithValue, dispatch }
  ) => {
    try {
      const { response, error } = await networkCall(endPoint, method, body, {
        "Content-Type": "null",
      });
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") {
        dispatch(getScreensData({ page: 1 }));
        return fulfillWithValue(response.message);
      } else return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteScreenFromGroup = createAsyncThunk(
  "deleteScreenFromGroup",
  async (
    screenId: number | undefined,
    { rejectWithValue, fulfillWithValue, dispatch }
  ) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.REMOVE_SCREEN_FROM_GROUP}/${screenId}`,
        "PUT"
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
export const updateGroupData = createAsyncThunk(
  "updateGroupData",
  async (
    {
      screenGroupId,
      groupName,
      file,
      page,
      searchGroupInput,
      sort,
    }: {
      screenGroupId: number | null;
      groupName: string;
      file?: File[] | string[];
      page: number;
      searchGroupInput: string;
      sort: string;
    },
    { fulfillWithValue, dispatch }
  ) => {
    const formData = new FormData();
    formData.append("groupName", groupName);
    file?.forEach((each) => formData.append("image", each));

    try {
      const { response, error } = await networkCall(
        `${endpoints.SCREENGROUP}/${screenGroupId}`,
        "PUT",
        formData,
        { "Content-Type": "null" }
      );
      if (error) return displayAlert(error as string, "error");
      if (response.statusCode === "200") {
        await dispatch(getScreenGroupData({ page, searchGroupInput, sort }));
        displayAlert(response.message);
        return fulfillWithValue(response);
      }
      if (response.statusCode === "404")
        return displayAlert(response.message, "error");
      return displayAlert(response.message, "error");
    } catch (error) {
      return displayAlert(error as string, "error");
    }
  }
);

export const additionalInfo = createAsyncThunk(
  "additionalInfo",
  async (
    { screenId }: { screenId: number | undefined | string },
    { rejectWithValue, fulfillWithValue, dispatch }
  ) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.GET_ADDITIONAL_INFO+screenId}`
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") {
        return fulfillWithValue(response?.data);
      }
      if (response.statusCode === "404")
        return rejectWithValue(response.message);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPlaylistById = createAsyncThunk(
  "getPlaylistById",
  async (screenId: number, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.SCREEN}/${screenId}`
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response.data);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getPlaylistImage = createAsyncThunk(
  "getPlaylistImage",
  async (screenId: number, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.SCREEN_IMAGE}?id=${screenId}`
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response.data);
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
    addScreen: (state, action: PayloadAction<IScreen>) => {
      const screens = state.selectedScreensInGroup.screensData ?? [];
      if (Boolean(screens?.find((scr) => scr.id === action.payload.id))) {
        state.selectedScreensInGroup.screensData = screens!.filter(
          (scr) => scr.id !== action.payload.id
        );
      } else if (screens.length === 0) {
        state.selectedScreensInGroup.screensData = [action.payload];
      } else {
        state.selectedScreensInGroup.screensData?.unshift(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getScreensData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getScreensData.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.pagination = action.payload?.data?.pagination;
      state.screenData = action.payload?.data?.data;
    });
    builder.addCase(getScreensData.rejected, (state, action) => {
      state.loading = false;
      state.pagination = null;
      state.screenData = [];
      state.message = action.payload as string;
    });
    builder.addCase(getScreenGroupData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getScreenGroupData.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.pagination = action.payload?.data.pagination;
      state.screenGroupData = action.payload?.data.data;
    });
    builder.addCase(getScreenGroupData.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as string;
      state.pagination = null;
      state.screenGroupData = null;
      displayAlert(
        action.payload ? (action.payload as string) : "Something went wrong",
        "error"
      );
    });
    builder.addCase(getSelectedScreensInGroup.pending, (state) => {
      state.selectedScreensInGroup.loading = true;
      state.selectedScreensInGroup.message = null;
    });
    builder.addCase(getSelectedScreensInGroup.fulfilled, (state, action) => {
      state.selectedScreensInGroup.loading = false;
      state.selectedScreensInGroup.message = null;
      state.selectedScreensInGroup.pagination = action.payload?.data.pagination;
      state.selectedScreensInGroup.screensData = action.payload?.data.data;
    });
    builder.addCase(getSelectedScreensInGroup.rejected, (state, action) => {
      state.selectedScreensInGroup.loading = false;
      state.selectedScreensInGroup.message = action.payload as string;
      state.selectedScreensInGroup.pagination = null;
      state.selectedScreensInGroup.screensData = null;
      displayAlert(
        action.payload ? (action.payload as string) : "Something went wrong",
        "error"
      );
    });
    builder.addCase(notExistScreensData.pending, (state) => {
      state.notExistedScreens.loading = true;
      state.notExistedScreens.message = null;
    });
    builder.addCase(notExistScreensData.fulfilled, (state, action) => {
      state.notExistedScreens.loading = false;
      state.notExistedScreens.message = null;
      state.notExistedScreens.pagination = action.payload?.data.pagination;
      state.notExistedScreens.screensData = action.payload?.data.data ?? [];
    });
    builder.addCase(notExistScreensData.rejected, (state, action) => {
      state.notExistedScreens.loading = false;
      state.notExistedScreens.message = action.payload as string;
      state.notExistedScreens.pagination = null;
      state.notExistedScreens.screensData = [];
    });
    builder.addCase(additionalInfo.pending, (state) => {
      state.additionalInfoData = null;
      state.additionalInfoLoader = "started";
    });
    builder.addCase(additionalInfo.fulfilled, (state, action) => {
      state.additionalInfoLoader = "success";
      if (action?.payload) {
        state.additionalInfoData = action?.payload;
      } else {
        state.additionalInfoData = null;
      }
    });
    builder.addCase(additionalInfo.rejected, (state, action) => {
      state.additionalInfoLoader = "failed";
    });
    builder.addCase(getPlaylistById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPlaylistById.fulfilled, (state, action) => {
      state.loading = false;
      state.message = null;
      state.selectedPlaylist = action.payload;
    });
    builder.addCase(getPlaylistById.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload
        ? (action.payload as string)
        : "Failed to fetch playlist.";
      displayAlert(
        action.payload ? (action.payload as string) : "Something went wrong",
        "error"
      );
    });
    builder.addCase(getPlaylistImage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPlaylistImage.fulfilled, (state, action) => {
      state.loading = false;
      state.message = null;
      state.selectedImage = action.payload.data[0];
    });
    builder.addCase(getPlaylistImage.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload
        ? (action.payload as string)
        : "Failed to fetch playlist.";
      displayAlert(
        action.payload ? (action.payload as string) : "Something went wrong",
        "error"
      );
    });
    builder.addCase(createNewScreen.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNewScreen.fulfilled, (state, action) => {
      state.loading = false;
      displayAlert(action.payload as string, "success");
    });
    builder.addCase(createNewScreen.rejected, (state, action) => {
      state.loading = false;
      displayAlert(action.payload as string, "error");
    });
  },
});
export const { addScreen } = ScreensSlice.actions;
export default ScreensSlice.reducer;
