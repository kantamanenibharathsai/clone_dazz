import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../../../components/superAdmin/common/CommonStyles";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert } from "../../../utils/toastMessage";
import { RootState } from "../../store";
interface UpdateDetails {
  userId: number;
  status: string;
  rejectionReason: string;
}
export interface CampaignDetails {
  id: number;
  campaignName: string;
  pricingModelName: string;
  adTypeName: string;
  slot: string;
  updatedAt: string;
  createdBy: number;
  memberName: string;
  totalAmount: number;
  genres: Genre[];
  categories: Category[];
  subCategories: SubCategory[];
  screenGroups: ScreenGroup[];
  screens: Screen[];
  totalScreens: number;
  mediaFiles: MediaFile[];
  locationName: string;
  approvedStatus: boolean;
}

export interface Genre {
  id: number;
  genreName: string;
}

export interface Category {
  id: number;
  categoryName: string;
}

export interface SubCategory {
  id: number;
  subCategoryName: string;
}

export interface ScreenGroup {
  id: number;
  screenGroupName: string;
}

export interface Screen {
  id: number;
  screenName: string;
}

export interface Image {
  url: string;
  size: string;
  name: string;
  id: number;
}

export interface MediaFile {
  id: number;
  campaignMediaFileId: number;
  image: string;
  imageSize: string;
  imageName: string;
  active: boolean;
}

interface UpdateCampDetails {
  campaignId: number;
  status: boolean;
  reason: string;
}
export interface EachTeamGroup {
  groupName: string;
  id: number;
}
export interface EachTeamMember {
  memberName: string;
  id: number;
}

export interface InitialStateType {
  data: {
    id: number;
    fullName: string;
    email: string;
    mobileNumber: string;
    roleId: number;
    createdAt: string;
    image: string;
    campaignName: string;
    screenCount: number;
    totalAmount: number;
    updatedAt: string;
    userName: string;
    roleName: string;
    paymentReceived: boolean;
    poReceived: boolean;
    status: string;
  }[];
  loading: boolean;
  errorMessage: string;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  allApiStatus: {
    getTeamGroupsApi: ApiStatus;
    getTeamMembersApi: ApiStatus;
    getCampaignDetails: ApiStatus;
    assignCampaignAndCallbackBack: ApiStatus;
    changeStatusByTeamMember: ApiStatus;
  };
  allApiError: {
    getTeamsApi: string;
    getTeamMembers: string;
    getCampaignDetails: string;
    assignCampaignAndCallbackBack: string;
    changeStatusByTeamMember: string;
  };
  teamGroupData: EachTeamGroup[];
  teamMembersData: EachTeamMember[];
  campaignDetails: CampaignDetails;
}
const initialState: InitialStateType = {
  data: [],
  loading: false,
  errorMessage: "",
  pagination: {
    currentPage: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0,
  },
  allApiStatus: {
    getTeamGroupsApi: "INITIAL",
    getTeamMembersApi: "INITIAL",
    getCampaignDetails: "INITIAL",
    assignCampaignAndCallbackBack: "INITIAL",
    changeStatusByTeamMember: "INITIAL",
  },
  allApiError: {
    getTeamMembers: "",
    getTeamsApi: "",
    getCampaignDetails: "",
    assignCampaignAndCallbackBack: "",
    changeStatusByTeamMember: "",
  },
  teamGroupData: [],
  teamMembersData: [],
  campaignDetails: {
    id: 0,
    campaignName: "",
    pricingModelName: "",
    adTypeName: "",
    slot: "",
    updatedAt: "",
    createdBy: 0,
    memberName: "",
    totalAmount: 0,
    genres: [],
    categories: [],
    subCategories: [],
    screenGroups: [],
    screens: [],
    totalScreens: 0,
    mediaFiles: [],
    locationName: "",
    approvedStatus: false,
  },
};

export const getPendingRequests = createAsyncThunk(
  "getPendingRequests",
  async (param: string | undefined, { rejectWithValue, fulfillWithValue }) => {
    try {
      const query = new URLSearchParams({
        size: "10",
        statuses: "PENDING",
      });
      const { response } = await networkCall(
        `${endpoints.GET_PENDING_REQUEST}?${param}&${query}`,
        "GET"
      );
      switch (response.statusCode) {
        case "200":
          return fulfillWithValue(response.data);
        case "404":
          return rejectWithValue(response.message);
        default:
          return rejectWithValue("Something Went Wrong");
      }
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);
export const getCampaignDetails = createAsyncThunk(
  "getCampaignDetails",
  async (campaignId: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.GET_CAMPAIGN_DETAILS + campaignId
      );
      if (response.status === 400 || error)
        return rejectWithValue("Something Went Wrong");
      if (response.statusCode !== "200") {
        return rejectWithValue(response.message);
      }
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);
export const campaignStatusChangeByTeamMember = createAsyncThunk(
  "campaignStatusChangeByTeamMember",
  async (
    {
      mediaFiles,
      id,
      acceptStatus,
      rejectedReason,
      isCallBack,
    }: {
      mediaFiles: (string | File)[];
      id: number;
      acceptStatus: boolean;
      rejectedReason: string;
      isCallBack: boolean;
    },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    try {
      const deleteIds = (
        getState() as RootState
      ).PendingRequestsSlice.campaignDetails.mediaFiles
        .filter((each) => !mediaFiles.includes(each.image))
        .map((each) => each.id);
      const newMediaFiles = mediaFiles.filter(
        (each) => typeof each !== "string"
      );
      const body = new FormData();
      for (let each of deleteIds) {
        body.append("imageIdsToDelete", each.toString());
      }
      for (let each of newMediaFiles) {
        body.append("mediaFiles", each);
      }
      if (rejectedReason.length > 0)
        body.append("rejectedReason", rejectedReason);
      body.append("campaignId", id.toString());
      body.append("acceptStatus", acceptStatus.toString());
      if (!acceptStatus) {
        body.delete("mediaFiles");
        body.delete("imageIdsToDelete");
      }
      body.append("isCallback", isCallBack.toString());
      const { response, error } = await networkCall(
        endpoints.CAMPAIGN_STATUS_CHANGE_BY_TEAM_MEMBER,
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

export const updateRequests = createAsyncThunk(
  "updateRequests",
  async (
    { userId, status, rejectionReason }: UpdateDetails,
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const form = new FormData();
      form.append("status", status);
      if (rejectionReason?.length > 0) {
        form.append("rejectionReason", rejectionReason);
      }
      const { response } = await networkCall(
        `${endpoints.UPDATE_USER_ACTION}?userId=${userId}`,
        "PUT",
        form,
        {
          "Content-Type": "null",
        }
      );
      switch (response.statusCode) {
        case "200":
          return fulfillWithValue(response);
        case "404":
          return rejectWithValue(response.message);
        default:
          return rejectWithValue("Something Went Wrong");
      }
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);
export const getCampaignRequests = createAsyncThunk(
  "getCampaignRequests",
  async (
    param: string | undefined,
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    try {
      const query = new URLSearchParams({
        pageSize: "10",
      });
      const { response } = await networkCall(
        `${endpoints.GET_CAMPAIGN_REQUEST}?${param}&${query}`,
        "GET"
      );
      switch (response.statusCode) {
        case "200":
          return fulfillWithValue(response.data);
        case "404":
          return rejectWithValue(response.message);
        default:
          return rejectWithValue("Something Went Wrong");
      }
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);
export const campaignApproveAndRejectionBySuperAdmin = createAsyncThunk(
  "campaignApproveAndRejectionBySuperAdmin",
  async (
    { campaignId, status, reason }: UpdateCampDetails,
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const form = new FormData();
      form.append("status", `${status}`);
      if (reason.length > 0) {
        form.append("reason", reason);
      }
      const { response } = await networkCall(
        `${endpoints.UPDATE_CAMPAIGN_ACTION}?campaignId=${campaignId}`,
        "PUT",
        form,
        {
          "Content-Type": "null",
        }
      );
      switch (response.statusCode) {
        case "200":
          return fulfillWithValue(response);
        case "404":
          return rejectWithValue(response.message);
        default:
          return rejectWithValue("Something Went Wrong");
      }
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);
export const getTeamGroups = createAsyncThunk(
  "getTeamGroups",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { response, error } = await networkCall(
        `${endpoints.GET_TEAM_GROUPS}?pageSize=1000`
      );
      if (response.status === 400 || error) {
        return rejectWithValue("Something Went Wrong");
      }
      if (response.statusCode !== "200") {
        return rejectWithValue(response.message);
      }
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);
export const getTeamMembers = createAsyncThunk(
  "getTeamMembers",
  async (groupId: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.GET_GROUP_MEMBERS + `?groupId=${groupId}`
      );
      if (response.status === 400 || error)
        return rejectWithValue("Something Went Wrong");
      if (response.statusCode !== "200")
        return rejectWithValue(response.message);
      return fulfillWithValue(response.data.members);
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);

export const assignCampaignAndCallbackBack = createAsyncThunk(
  "assign Campaign",
  async (
    {
      requestId,
      teamMemberId,
      isCallBack,
      groupId,
    }: {
      requestId: number;
      teamMemberId: number;
      isCallBack: boolean;
      groupId: number;
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const body = new FormData();
      body.append("campaignId", requestId.toString());
      body.append("memberId", teamMemberId.toString());
      body.append("isCallBack", isCallBack.toString());
      body.append("groupId", groupId.toString());
      const { response, error } = await networkCall(
        endpoints.CAMPAIGN_ASSIGN,
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

const pendingRequestsSlice = createSlice({
  name: "pendingReuestsSlice",
  initialState,
  reducers: {
    resetData: (state, action) => {
      state.data = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPendingRequests.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getPendingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data;
        state.pagination = action.payload?.pagination;
      })
      .addCase(getPendingRequests.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
        state.pagination = initialState.pagination;
        state.data = [];
      });
    builder
      .addCase(updateRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRequests.fulfilled, (state, action) => {
        state.loading = false;
        displayAlert(action.payload?.message as string, "success");
      })
      .addCase(updateRequests.rejected, (state, action) => {
        state.loading = false;
        displayAlert(action.payload as string, "warning");
      });
    builder
      .addCase(getCampaignRequests.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(getCampaignRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data;
        state.pagination = action.payload?.pagination;
      })
      .addCase(getCampaignRequests.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
        state.pagination = initialState.pagination;
        state.data = [];
      });
    builder
      .addCase(campaignApproveAndRejectionBySuperAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        campaignApproveAndRejectionBySuperAdmin.fulfilled,
        (state, action) => {
          state.loading = false;
          displayAlert(action.payload?.message as string, "success");
        }
      )
      .addCase(
        campaignApproveAndRejectionBySuperAdmin.rejected,
        (state, action) => {
          state.loading = false;
          displayAlert(action.payload as string, "warning");
        }
      );
    builder
      .addCase(getTeamGroups.pending, (state) => {
        state.allApiStatus.getTeamGroupsApi = "PENDING";
      })
      .addCase(getTeamGroups.fulfilled, (state, action) => {
        state.allApiStatus.getTeamGroupsApi = "SUCCESS";
        state.teamGroupData = action.payload.groups;
      })
      .addCase(getTeamGroups.rejected, (state, action) => {
        state.allApiError.getTeamsApi = String(
          action.payload || "Something Went Wrong"
        );
        state.teamGroupData = [];
      });
    builder
      .addCase(getTeamMembers.pending, (state) => {
        state.allApiStatus.getTeamMembersApi = "PENDING";
      })
      .addCase(getTeamMembers.fulfilled, (state, action) => {
        state.allApiStatus.getTeamMembersApi = "SUCCESS";
        state.allApiError.getTeamMembers = "";
        state.teamMembersData = action.payload.map(
          (each: { userId: number; fullName: string }) => ({
            id: each.userId,
            memberName: each.fullName,
          })
        );
      })
      .addCase(getTeamMembers.rejected, (state, action) => {
        state.allApiStatus.getTeamMembersApi = "ERROR";
        state.allApiError.getTeamMembers = String(
          action.payload || "Something Went Wrong"
        );
        state.teamMembersData = [];
      });
    builder
      .addCase(getCampaignDetails.pending, (state) => {
        state.allApiStatus.getCampaignDetails = "PENDING";
      })
      .addCase(getCampaignDetails.fulfilled, (state, action) => {
        state.allApiError.getCampaignDetails = "";
        state.allApiStatus.getCampaignDetails = "SUCCESS";
        state.campaignDetails = action.payload;
      })
      .addCase(getCampaignDetails.rejected, (state, action) => {
        state.allApiError.getCampaignDetails = String(
          action.payload || "Something Went Wrong"
        );
        state.allApiStatus.getCampaignDetails = "ERROR";
      });
    builder
      .addCase(assignCampaignAndCallbackBack.pending, (state) => {
        state.allApiStatus.assignCampaignAndCallbackBack = "PENDING";
      })
      .addCase(assignCampaignAndCallbackBack.fulfilled, (state, action) => {
        state.allApiError.assignCampaignAndCallbackBack = "";
        state.allApiStatus.assignCampaignAndCallbackBack = "SUCCESS";
        displayAlert(action.payload, "success");
      })
      .addCase(assignCampaignAndCallbackBack.rejected, (state, action) => {
        const error = String(action.payload || "Something Went Wrong");
        state.allApiError.assignCampaignAndCallbackBack = error;
        displayAlert(error, "error");
      });
    builder
      .addCase(campaignStatusChangeByTeamMember.pending, (state) => {
        state.allApiStatus.changeStatusByTeamMember = "PENDING";
        state.allApiError.changeStatusByTeamMember = "";
      })
      .addCase(campaignStatusChangeByTeamMember.fulfilled, (state, action) => {
        state.allApiError.changeStatusByTeamMember = "";
        state.allApiStatus.changeStatusByTeamMember = "SUCCESS";
        displayAlert((action.payload || "Success") as string, "success");
      })
      .addCase(campaignStatusChangeByTeamMember.rejected, (state, action) => {
        state.allApiStatus.changeStatusByTeamMember = "ERROR";
        state.allApiError.changeStatusByTeamMember = (action.payload ||
          "Something Went Wrong") as string;
      });
  },
});

export const { resetData } = pendingRequestsSlice.actions;

export default pendingRequestsSlice.reducer;
