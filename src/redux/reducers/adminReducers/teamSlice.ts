import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert } from "../../../utils/toastMessage";
interface MemberType {
  groupMemberId: number;
  userId: number;
  fullName: string;
  email: string;
  image: string;
  roleId: number;
  roleName: string;
  groupId: number;
  createdAt: string;
}
interface GetGroupMembersInAdmin {
  page: string;
  pageSize: string;
}

interface PermissionType {
  userId: number;
  moduleName: string;
  create: boolean;
  update: boolean;
  delete: boolean;
  view: boolean;
}
interface UserPermissionType {
  id: string;
  userId: string;
  permission: PermissionType[];
}
interface UpdatePermissionType {
  id: string;
  permission: string;
}
export interface InitialStateType {
  loading: boolean;
  memberPermission: UserPermissionType;
  memberPermissionError: string;
  selectedUserForPermission: {
    fullName: string;
    email: string;
    roleId: string;
    userId: string;
  };
  activeTab: number;
  members: MemberType[];
  membersErrorMsg: string;
  membersPagination: {
    currentPageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
}
const initialState: InitialStateType = {
  loading: false,
  activeTab: 0,
  memberPermission: { id: "", permission: [], userId: "" },
  memberPermissionError: "Click on edit in members",
  selectedUserForPermission: {
    fullName: "",
    email: "",
    roleId: "",
    userId: "",
  },
  members: [],
  membersErrorMsg: "",
  membersPagination: {
    currentPageNumber: 1,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
  },
};

export const deleteMemberFromGroupInAdmin = createAsyncThunk(
  "deleteMemberFromGroupInAdmin",
  async (memberId: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { response } = await networkCall(
        `${endpoints.GROUP_MEMBER}/${memberId}`,
        "DELETE"
      );
      switch (response.statusCode) {
        case "200":
          displayAlert(response.message, "success");
          break;
        case "404":
          displayAlert(response.message, "warning");
          break;
        default:
          displayAlert("Something went wrong", "error");
      }
      return fulfillWithValue(response);
    } catch (error) {
      displayAlert("Something went wrong", "error");
    }
  }
);
export const getGroupMembersInAdmin = createAsyncThunk(
  "getGroupMembersInAdmin",
  async (
    { page, pageSize }: GetGroupMembersInAdmin,
    { rejectWithValue, fulfillWithValue }
  ) => {
    const params = new URLSearchParams({
      orderBy: "desc",
      page: page,
      pageSize: pageSize,
    });
    try {
      const { response } = await networkCall(
        endpoints.GROUP_MEMBER + "?" + params,
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
export const getMemberPermissionInAdmin = createAsyncThunk(
  "getMemberPermissionInAdmin",
  async (
    { userId }: { userId: number },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { response } = await networkCall(
        `${endpoints.MEMBER_PERMISSION}?userId=${userId}`,
        "GET"
      );
      switch (response.statusCode) {
        case "200":
          if (JSON.parse(response.data.permissions)?.length === 0)
            return rejectWithValue("No Permissions Found");
          return fulfillWithValue(response.data);
        case "400":
          return rejectWithValue(response.message);
        default:
          return rejectWithValue("Something Went Wrong");
      }
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);
export const updateMemberPermissionInAdmin = createAsyncThunk(
  "updateMemberPermissionInAdmin",
  async (
    { id, permission }: UpdatePermissionType,
    { fulfillWithValue, rejectWithValue }
  ) => {
    const form = new FormData();
    form.append("permissions", permission);
    try {
      const { response } = await networkCall(
        endpoints.MEMBER_PERMISSION + "/" + id,
        "PUT",
        form,
        {
          "Content-Type": "null",
        }
      );
      switch (response.statusCode) {
        case "200":
          return fulfillWithValue(response.message);
        case "400":
          return rejectWithValue(response.message);
        default:
          return rejectWithValue("Something Went Wrong");
      }
    } catch (error) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);
export const updateUserRoleInAdmin = createAsyncThunk(
  "updateUserRoleInAdmin",
  async (
    { userId, roleId }: { userId: string; roleId: string },
    { dispatch, getState }
  ) => {
    const form = new FormData();
    form.append("userId", userId);
    form.append("roleId", roleId);
    try {
      const { response } = await networkCall(endpoints.SIGN_UP, "PUT", form, {
        "Content-Type": "null",
      });
      switch (response.statusCode) {
        case "200":
          dispatch(getMemberPermissionInAdmin({ userId: +userId }));
          dispatch(getGroupMembersInAdmin({ page: "1", pageSize: "10" }));
          break;
        case "400":
          displayAlert(response.message, "warning");
          break;
        default:
          displayAlert("Something went wrong", "error");
          break;
      }
    } catch (error) {
      displayAlert("Something went wrong", "error");
    }
  }
);

const teamSlice = createSlice({
  name: "teamSlice",
  initialState,
  reducers: {
    updateActiveTabInAdmin: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
    updateUserPermissionInfoInAdmin: (
      state,
      action: PayloadAction<InitialStateType["selectedUserForPermission"]>
    ) => {
      state.selectedUserForPermission = action.payload;
    },
    updateMemberPermissionInfoInAdmin: (
      state,
      action: PayloadAction<{ name: string; key: string; state: boolean }>
    ) => {
      const key = action.payload
        .key as keyof (typeof state.memberPermission.permission)[0];
      const moduleName = action.payload.name;
      const boolean = action.payload.state;
      const permissionToBeEdit = state.memberPermission.permission.find(
        (item) => item.moduleName === moduleName
      ) as InitialStateType["memberPermission"]["permission"][0];
      //@ts-ignore
      permissionToBeEdit[key] = boolean;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getGroupMembersInAdmin.pending, (state) => {
        state.loading = true;
        state.membersErrorMsg = "";
        state.members = [];
        state.membersPagination.pageSize = 10;
        state.membersPagination.totalElements = 0;
        state.membersPagination.totalPages = 0;
      })
      .addCase(getGroupMembersInAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload?.members ?? [];
        state.membersPagination.pageSize = action.payload.pageSize;
        state.membersPagination.totalElements = action.payload.totalElements;
        state.membersPagination.totalPages = action.payload.totalPages;
        state.membersPagination.currentPageNumber =
          action.payload.currentPageNumber;
      })
      .addCase(getGroupMembersInAdmin.rejected, (state, action) => {
        state.loading = false;
        state.membersErrorMsg = action.payload as string;
      });
    builder
      .addCase(getMemberPermissionInAdmin.pending, (state) => {
        state.loading = true;
        state.memberPermissionError = "";
        state.memberPermission.id = "";
        state.memberPermission.permission = [];
        state.memberPermission.userId = "";
      })
      .addCase(getMemberPermissionInAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.memberPermission.id = action.payload.id;
        state.memberPermission.permission = JSON.parse(
          action.payload.permissions ?? "[]"
        );
        state.memberPermission.userId = action.payload.userId;
      })
      .addCase(getMemberPermissionInAdmin.rejected, (state, action) => {
        state.loading = false;
        state.memberPermissionError = action.payload as string;
      });
    builder
      .addCase(updateMemberPermissionInAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMemberPermissionInAdmin.fulfilled, (state, action) => {
        state.loading = false;
        displayAlert(action.payload, "success");
      })
      .addCase(updateMemberPermissionInAdmin.rejected, (state, action) => {
        state.loading = false;
        displayAlert(action.payload as string, "error");
      });
  },
});
export const {
  updateActiveTabInAdmin,
  updateUserPermissionInfoInAdmin,
  updateMemberPermissionInfoInAdmin,
} = teamSlice.actions;
export default teamSlice.reducer;
