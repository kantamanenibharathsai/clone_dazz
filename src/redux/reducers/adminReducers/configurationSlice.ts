import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert } from "../../../utils/toastMessage";
import { ApiStatus } from "./../../../components/superAdmin/common/CommonStyles";

interface IConfigurationState {
  allApiStatus: {
    getConfiguration: ApiStatus;
    updateScreenConfiguration: ApiStatus;
  };
  screenData: BeResponse;
}
export interface BeResponse {
  id: number;
  name: null | string;
  pairingCode: null | string;
  screenName: string;
  tags: string[];
  location: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  area: string | null;
  latitude: number | null;
  longitude: number | null;
  active: boolean | null;
  createdAt: string;
  updatedAt: string | null;
  createdBy: number;
  updatedBy: number | null;
  images: {
    url: string;
    size: string;
    name: string;
    id: number;
  }[];
  screenGroupId: number | null;
  description: string | null;
  screenPrice: number | null;
  livePlaylist: string | null;
  operatingSystem: string | null;
  orientation: string | null;
  resolution: string | null;
  ram: string | null;
  storage: string | null;
  fitContent: boolean | null;
  analytics: boolean | null;
  nativeVideoPlayer: boolean | null;
  enableAction: boolean | null;
  deviceOwner: boolean | null;
  autoStartAtBoot: boolean | null;
  dotIndicators: boolean | null;
  keepOnTop: boolean | null;
  deviceProtection: boolean | null;
  playerSetting: null | string;
  status: boolean | null;
  isSelected: boolean | null;
  deviceVolume: number | null;
  days: string[];
  startTime: string;
  endTime: string;
}

const initialState: IConfigurationState = {
  allApiStatus: {
    getConfiguration: "INITIAL",
    updateScreenConfiguration: "INITIAL",
  },
  screenData: {} as BeResponse,
};
export const getConfiguration = createAsyncThunk(
  "configuration/getConfiguration",
  async (id: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.GET_SCREENS + "/" + id
      );
      if (error) return rejectWithValue(error);
      if (response.status === 400)
        return rejectWithValue("Something Went Wrong");
      if (response.statusCode !== "200")
        return rejectWithValue(response.message);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue("Some thing Went Wrong");
    }
  }
);
export const updateScreenConfiguration = createAsyncThunk(
  "configuration/updateScreenConfiguration",
  async (
    { body, id }: { body: FormData; id: number },
    { fulfillWithValue, rejectWithValue, dispatch }
  ) => {
    try {
      const { response, error } = await networkCall(
        endpoints.GET_SCREENS + "/" + id,
        "PUT",
        body,
        {
          "Content-Type": "null",
        }
      );
      if (error) return rejectWithValue(error);
      if (response.status === 400)
        return rejectWithValue("Something Went Wrong");
      if (response.statusCode !== "200")
        return rejectWithValue(response.message);
      return fulfillWithValue(response.message);
    } catch (error) {
      return rejectWithValue("Some thing Went Wrong");
    }
  }
);
const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    resetSlice() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConfiguration.pending, (state) => {
      state.allApiStatus.getConfiguration = "PENDING";
    });
    builder.addCase(getConfiguration.fulfilled, (state, action) => {
      state.screenData = action.payload;
      state.allApiStatus.getConfiguration = "SUCCESS";
    });
    builder.addCase(getConfiguration.rejected, (state, action) => {
      state.allApiStatus.getConfiguration = "ERROR";
    });
    builder.addCase(updateScreenConfiguration.pending, (state) => {
      state.allApiStatus.updateScreenConfiguration = "PENDING";
    });
    builder.addCase(updateScreenConfiguration.fulfilled, (state, action) => {
      state.allApiStatus.updateScreenConfiguration = "SUCCESS";
      displayAlert(action.payload as string, "success");
    });
    builder.addCase(updateScreenConfiguration.rejected, (state, action) => {
      state.allApiStatus.updateScreenConfiguration = "ERROR";
      displayAlert(action.payload as string, "error");
    });
  },
});
export const { resetSlice } = configurationSlice.actions;
export default configurationSlice.reducer;
