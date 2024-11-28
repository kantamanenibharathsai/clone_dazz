import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../../../components/superAdmin/common/CommonStyles";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert } from "../../../utils/toastMessage";

export interface BeResponse {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  userImage: null | string;
  screenNames: string[];
  createdAt: string;
  url: string;
  fileType: string | null;
}

export interface Image {
  id: number;
  image: string;
}

interface InitialState {
  allApiStatus: {
    getApi: ApiStatus;
    update: ApiStatus;
  };
  allApiErrors: {
    getApi: string;
    update: string;
  };
  pendingMediaData: BeResponse[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export const getHostMediaData = createAsyncThunk(
  "getHostMediadata",
  async (page: number, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.GET_PENDING_MEDIA + `?page=${page}`
      );
      if (response.status === 400 || error)
        return rejectWithValue("Something Went Wrong");
      if (response.statusCode !== "200")
        return rejectWithValue(response.message);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);

export const updateHostMediaRequest = createAsyncThunk(
  "updateHostMediaRequest",
  async (
    { id, type }: { id: number; type: "Approved" | "Rejected" },
    { rejectWithValue, fulfillWithValue, dispatch }
  ) => {
    try {
      const body = new FormData();
      body.append("statusCode", type);
      const { response, error } = await networkCall(
        endpoints.UPDATE_HOST_AD_REQUEST + id,
        "PUT",
        body,
        {
          "Content-Type": "null",
        }
      );
      if (response.status === 400 || error)
        return rejectWithValue("Something Went Wrong");
      if (response.statusCode !== "200")
        return rejectWithValue(response.message);
      return fulfillWithValue(response.message);
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);

const initialState: InitialState = {
  allApiErrors: {
    getApi: "",
    update: "",
  },
  allApiStatus: {
    getApi: "INITIAL",
    update: "INITIAL",
  },
  pendingMediaData: [],
  pagination: {
    currentPage: 0,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },
};

const HostAdsSlice = createSlice({
  name: "Host Ads Slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHostMediaData.pending, (state, action) => {
        state.allApiErrors.getApi = "";
        state.allApiStatus.getApi = "PENDING";
      })
      .addCase(getHostMediaData.fulfilled, (state, action) => {
        state.allApiErrors.getApi = "";
        state.allApiStatus.getApi = "SUCCESS";
        state.pendingMediaData = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getHostMediaData.rejected, (state, action) => {
        state.allApiErrors.getApi = String(
          action.payload || "Something Went Wrong"
        );
        state.allApiStatus.getApi = "ERROR";
      });
    builder
      .addCase(updateHostMediaRequest.pending, (state) => {
        state.allApiStatus.update = "PENDING";
      })
      .addCase(updateHostMediaRequest.fulfilled, (state, action) => {
        state.allApiStatus.update = "SUCCESS";
        state.allApiErrors.update = "";
        displayAlert(action.payload, "success");
      })
      .addCase(updateHostMediaRequest.rejected, (state, action) => {
        state.allApiStatus.update = "ERROR";
        const message = String(action.payload || "Something Went Wrong");
        state.allApiErrors.update = message;
        displayAlert(message, "error");
      });
  },
});

export default HostAdsSlice.reducer;
