import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../../../components/superAdmin/common/CommonStyles";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert } from "../../../utils/toastMessage";

export interface UserType {
  id: number;
  fullName: string;
  email: string;
  mobileNumber: string;
  password: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  countryCode: null;
  commission: null | string;
  amountOrPercentage: null | number;
  organizationName: null;
  image: string;
  twoStepVerificationEnabled: boolean;
  wallet: null;
  status: string;
  screenCount: number;
  isDeleted: boolean;
  investedAmount:null|number
}
export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

interface IState {
  allApiStatuses: AllApiStatuses;
  readApiError: string;
  userData: UserType[];
  userDatadelete: UserType[];
  pagination: Pagination;
  screenGroupOptions: EachScreenGroupOption[];
  screenOptions: EachScreenOption[];
  screenGroupPagination: Pagination;
  screensPagination: Pagination;
}
export interface EachScreenGroupOption {
  id: number;
  screenGroupName: string;
  contains?: boolean;
}
export interface EachScreenOption {
  id: number;
  screenName: string;
  contains?: boolean;
  screenGroupId: number;
}
export interface ExistingScreensBE {
  screenId: number;
  screenName: string;
  contains?: boolean;
  screenGroupId: number;
}

const initialState: IState = {
  allApiStatuses: {
    createAndUpdate: "INITIAL",
    read: "INITIAL",
    delete: "INITIAL",
    getScreenGroups: "INITIAL",
    getScreens: "INITIAL",
    getExistingScreenGroups: "INITIAL",
    getExistingScreens: "INITIAL",
  },
  userData: [],
  userDatadelete: [],
  readApiError: "",
  screenGroupOptions: [],
  screenOptions: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 1,
    pageSize: 2,
  },
  screenGroupPagination: {
    currentPage: 0,
    totalPages: 1,
    totalItems: 1,
    pageSize: 5,
  },
  screensPagination: {
    currentPage: 0,
    totalPages: 1,
    totalItems: 1,
    pageSize: 5,
  },
};
interface GetMyUserType {
  search: string;
  page: string;
  roleId: string;
  sortDirection: string | undefined;
}
interface GetMyUserDeleteType {
  userId: number | null;
}
interface AllApiStatuses {
  createAndUpdate: ApiStatus;
  read: ApiStatus;
  delete: ApiStatus;
  getScreenGroups: ApiStatus;
  getScreens: ApiStatus;
  getExistingScreenGroups: ApiStatus;
  getExistingScreens: ApiStatus;
}
export const getExistingScreenGroups = createAsyncThunk(
  "usersSlice/getExistingScreenGroups",
  async (id: number, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.SIGN_UP + `?id=${id}`
      );
      if (error || response.status === 400)
        return rejectWithValue("Something Went Wrong");
      if (response.statusCode === "200")
        return fulfillWithValue(
          response.data.screenGroups as EachScreenGroupOption[]
        );
      else return rejectWithValue(response.message);
    } catch (error) {
      rejectWithValue("Something Went Wrong");
    }
  }
);
export const getExistingScreens = createAsyncThunk(
  "usersSlice/getExistingScreens",
  async (
    { id, groupIds }: { id: number; groupIds: number[] },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const tailUrl = new URLSearchParams();
      tailUrl.append("id", id.toString());
      for (let each of groupIds) {
        tailUrl.append("screenGroupIds", each.toString());
      }
      const { response, error } = await networkCall(
        endpoints.GET_SCREENS_WITH_EXISTING + "?" + tailUrl
      );

      if (error || response.status === 400)
        return rejectWithValue("Something Went Wrong");
      if (response.statusCode === "200")
        return fulfillWithValue(
          response.data.screens.map((each: ExistingScreensBE) => ({
            id: each.screenId,
            screenName: each.screenName,
            contains: each.contains,
          })) as EachScreenOption[]
        );
      else return rejectWithValue(response.message);
    } catch (error) {
      rejectWithValue("Something Went Wrong");
    }
  }
);
export const getScreenGroups = createAsyncThunk(
  "usersSlice/getScreenGroups",
  async (
    {
      page,
      searchInput,
      isHost,
    }: { page: number; searchInput?: string; isHost: boolean },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const urlObject = Object.create({});
      urlObject.pageSize = "10";
      urlObject.page = page.toString();
      if (isHost) {
        urlObject.availableHostScreenGroups = "true";
      } else {
        urlObject.availableInvestorScreenGroups = "true";
      }
      searchInput && (urlObject.screenGroupName = searchInput);
      const tailUrl = new URLSearchParams(urlObject);
      const { response, error } = await networkCall(
        endpoints.GET_SCREEN_GROUPS + "?" + tailUrl
      );
      if (response.status === 400 || error) {
        return rejectWithValue(error);
      }
      if (response.statusCode === "200") {
        return fulfillWithValue(response.data);
      }
      return rejectWithValue(response.statusCode);
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);
export const getScreens = createAsyncThunk(
  "usersSlice/getScreens",
  async (
    {
      page,
      searchInput,
      groupIds,
    }: { page: number; groupIds: number[]; searchInput?: string },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const urlObject = Object.create({});
      urlObject.pageSize = "5";
      urlObject.page = page.toString();
      searchInput && (urlObject.screenGroupName = searchInput);
      const tailUrl = new URLSearchParams(urlObject);
      for (let each of groupIds) {
        tailUrl.append("screenGroupIds", each.toString());
      }
      const { response, error } = await networkCall(
        endpoints.GET_SCREENS + "?" + tailUrl
      );
      if (response.status === 400 || error) {
        return rejectWithValue(error);
      }
      if (response.statusCode === "200") {
        return fulfillWithValue(response.data);
      }
      return rejectWithValue(response.statusCode);
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);
export const userClient = createAsyncThunk(
  "users/client",
  async (
    { page, search, sortDirection, roleId }: GetMyUserType,
    { fulfillWithValue, rejectWithValue }
  ) => {
    const object = Object.create({});
    object.size = "10";
    object.statuses = "ACCEPTED";
    page && (object.page = page);
    search && (object.search = search);
    roleId && (object.roleId = roleId);
    sortDirection&&(object.sortBy="created_at");
    sortDirection&&(object.sortDirection = sortDirection)


    const url = new URLSearchParams(object);
    try {
      const { response, error } = await networkCall(
        `${endpoints.GET_USERS_Accepted}?${url}`,
        "GET"
      );
      if (error) return rejectWithValue(error);
      if (response?.statusCode === "200") {
        return fulfillWithValue(response?.data);
      } else if (response.statusCode === "404") {
        return rejectWithValue("Userlist Not Found");
      } else {
        return rejectWithValue("Something Went Wrong");
      }
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);
export const userClientdelete = createAsyncThunk(
  "users/delete",
  async (
    { userId }: GetMyUserDeleteType,
    { fulfillWithValue, rejectWithValue }
  ) => {
    const object = Object.create({});
    object.userId = userId;
    object.isDelete = true;
    const form = new FormData();
    const url = new URLSearchParams(object);
    try {
      const { response, error } = await networkCall(
        `${endpoints.SIGN_UP}?${url}`,
        "PUT",
        form,
        {
          "Content-Type": "null",
        }
      );
      if (error) return rejectWithValue(error);
      if (response?.statusCode === "200") {
        return fulfillWithValue(response?.data);
      } else if (response.statusCode === "404") {
        return rejectWithValue("Userlist Not Found");
      } else {
        return rejectWithValue("Something Went Wrong");
      }
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);
export const userCreationAndUpdation = createAsyncThunk(
  "userSlice/userCreationAndUpdation",
  async (
    { body, method }: { body: FormData; method: "PUT" | "POST" },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { response, error } = await networkCall(
        endpoints.SIGN_UP,
        method,
        body,
        {
          "Content-Type": "null",
        }
      );
      if (error || response.status === 400)
        return rejectWithValue("Something Went Wrong");
      if (response?.statusCode === "200")
        return fulfillWithValue(response?.message);
      return rejectWithValue(response?.message);
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);
const userSlice = createSlice({
  name: "adsSlice",
  initialState,
  reducers: {
    partialResetStore: (state) => {
      state.allApiStatuses = {
        ...state.allApiStatuses,
        getExistingScreenGroups: "INITIAL",
        getExistingScreens: "INITIAL",
        getScreenGroups: "INITIAL",
        getScreens: "INITIAL",
      };
      state.screenGroupPagination = initialState.screenGroupPagination;
      state.screensPagination = initialState.screensPagination;
      state.screenGroupOptions = [];
      state.screenOptions = [];
    },
    resetScreenOptions: (state) => {
      state.screenOptions = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userClient.pending, (state) => {
      state.allApiStatuses.read = "PENDING";
    });
    builder.addCase(userClient.fulfilled, (state, action) => {
      state.userData = action.payload?.data || [];
      state.allApiStatuses.read = "SUCCESS";
      state.readApiError = "";
      state.pagination = action.payload?.pagination || initialState.pagination;
    });
    builder.addCase(userClient.rejected, (state, action) => {
      state.allApiStatuses.read = "ERROR";
      state.readApiError = action.payload as string;
      state.pagination = initialState.pagination
    });
    builder.addCase(userClientdelete.pending, (state) => {
      state.allApiStatuses.delete = "PENDING";
    });
    builder.addCase(userClientdelete.fulfilled, (state, action) => {
      state.userDatadelete = action.payload?.data || [];
      state.allApiStatuses.delete = "SUCCESS";
    });
    builder.addCase(userClientdelete.rejected, (state, action) => {
      state.allApiStatuses.delete = "ERROR";
    });
    builder.addCase(userCreationAndUpdation.pending, (state) => {
      state.allApiStatuses.createAndUpdate = "PENDING";
    });
    builder.addCase(userCreationAndUpdation.fulfilled, (state, action) => {
      state.allApiStatuses.createAndUpdate = "SUCCESS";
      displayAlert(action.payload as string, "success");
    });
    builder.addCase(userCreationAndUpdation.rejected, (state, action) => {
      state.allApiStatuses.createAndUpdate = "ERROR";
      displayAlert(action.payload as string, "error");
    });
    builder.addCase(getScreenGroups.pending, (state) => {
      state.allApiStatuses.getScreenGroups = "PENDING";
    });
    builder.addCase(getScreenGroups.fulfilled, (state, action) => {
      if (action.payload?.pagination.currentPage === 1)
        state.screenGroupOptions = action.payload?.data || [];
      else
        state.screenGroupOptions = [
          ...state.screenGroupOptions,
          ...(action.payload?.data ?? []),
        ];
      state.screenGroupPagination = action.payload?.pagination || {};
      state.allApiStatuses.getScreenGroups = "SUCCESS";
    });
    builder.addCase(getScreenGroups.rejected, (state, action) => {
      state.allApiStatuses.getScreenGroups = "ERROR";
    });
    builder.addCase(getScreens.pending, (state) => {
      state.allApiStatuses.getScreens = "PENDING";
    });
    builder.addCase(getScreens.fulfilled, (state, action) => {
      if (action.payload?.pagination.currentPage === 1)
        state.screenOptions = action.payload?.data || [];
      else
        state.screenOptions = [
          ...state.screenOptions,
          ...(action.payload?.data ?? []),
        ];
      state.screensPagination = action.payload?.pagination || {};
      state.allApiStatuses.getScreens = "SUCCESS";
    });
    builder.addCase(getScreens.rejected, (state, action) => {
      state.allApiStatuses.getScreens = "ERROR";
    });
    builder.addCase(getExistingScreenGroups.pending, (state) => {
      state.allApiStatuses.getExistingScreenGroups = "PENDING";
    });
    builder.addCase(getExistingScreenGroups.fulfilled, (state, action) => {
      state.screenGroupOptions =
        action.payload?.filter(
          (each, index, self) =>
            index === self.findIndex((t) => t.id === each.id)
        ) || [];
      state.allApiStatuses.getExistingScreenGroups = "SUCCESS";
    });
    builder.addCase(getExistingScreenGroups.rejected, (state, action) => {
      state.allApiStatuses.getExistingScreenGroups = "ERROR";
      state.screenGroupPagination = initialState.screenGroupPagination
    });
    builder.addCase(getExistingScreens.pending, (state) => {
      state.allApiStatuses.getExistingScreens = "PENDING";
    });
    builder.addCase(getExistingScreens.fulfilled, (state, action) => {
      state.screenOptions = action.payload || [];
      state.allApiStatuses.getExistingScreens = "SUCCESS";
    });
    builder.addCase(getExistingScreens.rejected, (state, action) => {
      state.allApiStatuses.getExistingScreens = "ERROR";
      state.screensPagination = initialState.screensPagination
    });
  },
});
export const { partialResetStore, resetScreenOptions } = userSlice.actions;
export default userSlice.reducer;
