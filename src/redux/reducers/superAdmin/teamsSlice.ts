import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert } from "../../../utils/toastMessage";
import { RootState } from "../../store";
interface UpdateGroup {
  id?: number;
  groupName: string;
  image: File;
}
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
interface AssignMemberToGroup {
  userId: number;
  groupId: number;
  roleId: number;
}
interface GetGroupMembers {
  groupId: string;
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
  groups: { id: number; groupName: string; image: string }[];
  loading: boolean;
  groupErrorMessage: string;
  memberPermission: UserPermissionType;
  memberPermissionError: string;
  selectedUserForPermission: {
    fullName: string;
    email: string;
    roleId: string;
    userId: string;
  };
  activeTab: number;
  groupPagination: {
    currentPageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
  selectedGroupId: number | null;
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
  groups: [],
  loading: false,
  activeTab: 0,
  groupErrorMessage: "",
  memberPermission: { id: "", permission: [], userId: "" },
  memberPermissionError: "Click on edit icon in member table",
  selectedUserForPermission: {
    fullName: "",
    email: "",
    roleId: "",
    userId: "",
  },
  groupPagination: {
    currentPageNumber: 1,
    pageSize: 10,
    totalElements: 1,
    totalPages: 1,
  },
  selectedGroupId: null,
  members: [],
  membersErrorMsg: "",
  membersPagination: {
    currentPageNumber: 1,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
  },
};
const generalErrorMsg = "Something went wrong";
export const getAllGroups = createAsyncThunk(
  "getAllGroups",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const query = new URLSearchParams({
        orderBy: "desc",
        sortBy: "id",
        page: "1",
        pageSize: "10",
      });
      const { response } = await networkCall(
        `${endpoints.GROUP}?${query}`,
        "GET"
      );
      const errorMsg = response.message ?? generalErrorMsg;
      switch (response.statusCode) {
        case "200":
          return fulfillWithValue(response.data);
        case "404":
          return rejectWithValue(errorMsg);
        default:
          return rejectWithValue(errorMsg);
      }
    } catch (error) {
      return rejectWithValue(generalErrorMsg);
    }
  }
);
export const updateGroup = createAsyncThunk(
  "updateGroup",
  async (
    { id, groupName, image }: UpdateGroup,
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const form = new FormData();
      form.append("groupName", groupName);
      form.append("image", image);
      const { response } = await networkCall(
        `${endpoints.GROUP}/${id}`,
        "PUT",
        form,
        {
          "Content-Type": "null",
        }
      );
      const errorMsg = response.message ?? generalErrorMsg;
      switch (response.statusCode) {
        case "200":
          return fulfillWithValue(response);
        case "404":
          return rejectWithValue(errorMsg);
        default:
          return rejectWithValue(errorMsg);
      }
    } catch (error) {
      return rejectWithValue(generalErrorMsg);
    }
  }
);
export const deleteGroup = createAsyncThunk(
  "deleteGroup",
  async (id: number, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const { response } = await networkCall(
        `${endpoints.GROUP}/${id}`,
        "DELETE"
      );
      const errorMsg = response.message ?? generalErrorMsg;
      switch (response.statusCode) {
        case "200":
          return fulfillWithValue(response);
        case "404":
          return rejectWithValue(errorMsg);
        default:
          return rejectWithValue(errorMsg);
      }
    } catch (error) {
      return rejectWithValue(generalErrorMsg);
    }
  }
);
export const addNewGroup = createAsyncThunk(
  "addNewGroup",
  async (
    { groupName, image }: UpdateGroup,
    { rejectWithValue, fulfillWithValue }
  ) => {
    const form = new FormData();
    form.append("groupName", groupName);
    form.append("image", image);
    try {
      const { response } = await networkCall(endpoints.GROUP, "POST", form, {
        "Content-Type": "null",
      });
      const errorMsg = response.message ?? generalErrorMsg;
      switch (response.statusCode) {
        case "200":
          return fulfillWithValue(response);
        case "404":
          return rejectWithValue(errorMsg);
        default:
          return rejectWithValue(errorMsg);
      }
    } catch (error) {
      return rejectWithValue(generalErrorMsg);
    }
  }
);
export const assignMemberToGroup = createAsyncThunk(
  "assignMemberToGroup",
  async ({ groupId, roleId, userId }: AssignMemberToGroup) => {
    const form = {
      userId: userId,
      groupId: groupId,
      roleId: roleId,
    };
    try {
      const { response } = await networkCall(
        endpoints.GROUP_MEMBER,
        "POST",
        JSON.stringify(form)
      );
      const errorMsg = response.message ?? generalErrorMsg;
      switch (response.statusCode) {
        case "200":
          displayAlert(errorMsg, "success");
          break;
        case "400":
          displayAlert(errorMsg, "warning");
          break;
        default:
          displayAlert(errorMsg, "error");
      }
    } catch (error) {
      displayAlert(generalErrorMsg, "error");
    }
  }
);
export const deleteMemberFromGroup = createAsyncThunk(
  "deleteMemberFromGroup",
  async (memberId: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { response } = await networkCall(
        `${endpoints.GROUP_MEMBER}/${memberId}`,
        "DELETE"
      );
      const errorMsg = response.message ?? generalErrorMsg;
      switch (response.statusCode) {
        case "200":
          displayAlert(errorMsg, "success");
          break;
        case "404":
          displayAlert(errorMsg, "warning");
          break;
        default:
          displayAlert(generalErrorMsg, "error");
      }
      return fulfillWithValue(response);
    } catch (error) {
      displayAlert(generalErrorMsg, "error");
    }
  }
);
export const getGroupMembers = createAsyncThunk(
  "getGroupMembers",
  async (
    { groupId, page, pageSize }: GetGroupMembers,
    { rejectWithValue, fulfillWithValue }
  ) => {
    const params = new URLSearchParams({
      groupId: groupId,
      orderBy: "desc",
      page: page,
      pageSize: pageSize,
    });
    try {
      const { response } = await networkCall(
        endpoints.GROUP_MEMBER + "?" + params,
        "GET"
      );
      const errorMsg = response.message ?? generalErrorMsg;
      switch (response.statusCode) {
        case "200":
          return fulfillWithValue(response.data);
        case "404":
          return rejectWithValue(errorMsg);
        default:
          return rejectWithValue(errorMsg);
      }
    } catch (error) {
      return rejectWithValue(generalErrorMsg);
    }
  }
);
export const getMemberPermission = createAsyncThunk(
  "getMemberPermission",
  async (
    { userId }: { userId: number },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { response } = await networkCall(
        `${endpoints.MEMBER_PERMISSION}?userId=${userId}`,
        "GET"
      );
      const errorMsg = response.message ?? generalErrorMsg;
      switch (response.statusCode) {
        case "200":
          if (JSON.parse(response.data.permissions)?.length === 0)
            return rejectWithValue("No Permissions Found");
          return fulfillWithValue(response.data);
        case "400":
          return rejectWithValue(errorMsg);
        default:
          return rejectWithValue(errorMsg);
      }
    } catch (error) {
      return rejectWithValue(generalErrorMsg);
    }
  }
);
export const updateMemberPermission = createAsyncThunk(
  "updateMemberPermission",
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
      const errorMsg = response.message ?? generalErrorMsg;
      switch (response.statusCode) {
        case "200":
          return fulfillWithValue(errorMsg);
        case "400":
          return rejectWithValue(errorMsg);
        default:
          return rejectWithValue(errorMsg);
      }
    } catch (error) {
      return rejectWithValue(generalErrorMsg);
    }
  }
);
export const updateUserRole = createAsyncThunk(
  "updateUserRole",
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
      const reduxState = (getState() as RootState).TeamsSlice;
      const groupId = (reduxState.selectedGroupId as number).toString();
      const errorMsg = response.message ?? generalErrorMsg;
      switch (response.statusCode) {
        case "200":
          dispatch(getMemberPermission({ userId: +userId }));
          dispatch(
            getGroupMembers({ groupId: groupId, page: "1", pageSize: "10" })
          );
          break;
        case "400":
          displayAlert(errorMsg, "warning");
          break;
        default:
          displayAlert(errorMsg, "error");
          break;
      }
    } catch (error) {
      displayAlert(generalErrorMsg, "error");
    }
  }
);
const teamSlice = createSlice({
  name: "teamSlice",
  initialState,
  reducers: {
    restoreTeamsPermissionState: (state) => {
      state.selectedUserForPermission = {
        fullName: "",
        email: "",
        roleId: "",
        userId: "",
      };
      state.memberPermissionError = "Click on edit icon in member table";
      state.memberPermission = { id: "", permission: [], userId: "" };
    },
    updateSelectedGroupId: (state, action) => {
      state.selectedGroupId = action.payload;
    },
    updateActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
    updateMembersPagination: (state, action: PayloadAction<number>) => {
      state.membersPagination.currentPageNumber = action.payload;
    },
    updateUserPermissionInfo: (
      state,
      action: PayloadAction<InitialStateType["selectedUserForPermission"]>
    ) => {
      state.selectedUserForPermission = action.payload;
    },
    updateMemberPermissionInfo: (
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
      .addCase(getAllGroups.pending, (state) => {
        state.loading = true;
        state.groupErrorMessage = "";
      })
      .addCase(getAllGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload?.groups;
        state.groupPagination.totalElements = action.payload?.totalElements;
        state.groupPagination.totalPages = action.payload?.totalPages;
        state.groupPagination.pageSize = action.payload?.pageSize;
      })
      .addCase(getAllGroups.rejected, (state, action) => {
        state.loading = false;
        state.groupErrorMessage = action.payload as string;
      });
    builder
      .addCase(updateGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.loading = false;
        displayAlert(action.payload?.message as string, "success");
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.loading = false;
        displayAlert(action.payload as string, "warning");
      });
    builder
      .addCase(deleteGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.loading = false;
        displayAlert(action.payload?.message as string, "success");
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;
        displayAlert(action.payload as string, "warning");
      });
    builder
      .addCase(addNewGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewGroup.fulfilled, (state, action) => {
        state.loading = false;
        displayAlert(action.payload?.message as string, "success");
      })
      .addCase(addNewGroup.rejected, (state, action) => {
        state.loading = false;
        displayAlert(action.payload as string, "warning");
      });
    builder
      .addCase(getGroupMembers.pending, (state) => {
        state.loading = true;
        state.membersErrorMsg = "";
        state.members = [];
        state.membersPagination.pageSize = 10;
        state.membersPagination.totalElements = 0;
        state.membersPagination.totalPages = 0;
      })
      .addCase(getGroupMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload?.members ?? [];
        state.membersPagination.pageSize = action.payload.pageSize;
        state.membersPagination.totalElements = action.payload.totalElements;
        state.membersPagination.totalPages = action.payload.totalPages;
      })
      .addCase(getGroupMembers.rejected, (state, action) => {
        state.loading = false;
        state.membersErrorMsg = action.payload as string;
      });
    builder
      .addCase(getMemberPermission.pending, (state) => {
        state.loading = true;
        state.memberPermissionError = "";
        state.memberPermission.id = "";
        state.memberPermission.permission = [];
        state.memberPermission.userId = "";
      })
      .addCase(getMemberPermission.fulfilled, (state, action) => {
        state.loading = false;
        state.memberPermission.id = action.payload.id;
        state.memberPermission.permission = JSON.parse(
          action.payload.permissions ?? "[]"
        );
        state.memberPermission.userId = action.payload.userId;
      })
      .addCase(getMemberPermission.rejected, (state, action) => {
        state.loading = false;
        state.memberPermissionError = action.payload as string;
      });
    builder
      .addCase(updateMemberPermission.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMemberPermission.fulfilled, (state, action) => {
        state.loading = false;
        displayAlert(action.payload, "success");
      })
      .addCase(updateMemberPermission.rejected, (state, action) => {
        state.loading = false;
        displayAlert(action.payload as string, "error");
      });
  },
});
export const {
  updateSelectedGroupId,
  updateActiveTab,
  updateMembersPagination,
  updateUserPermissionInfo,
  updateMemberPermissionInfo,
  restoreTeamsPermissionState,
} = teamSlice.actions;
export default teamSlice.reducer;
