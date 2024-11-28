import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { endpoints } from "../../config/config";
import Storage from "../../utils/Storage";
import { navigation } from "../../utils/navigation";
import networkCall from "../../utils/networkCall";
import { displayAlert } from "../../utils/toastMessage";
export interface Submenu {
  id: number;
  name: string;
  path: string;
  image: string;
  permission: Permission;
}

export interface SidebarMenuItem {
  id: number;
  name: string;
  submenus: Submenu[];
  tabs: [];
  path: string;
  iconImage: string;
  permission: Permission;
}
interface Permission {
  moduleName: string;
  userId: number;
  create: boolean;
  update: boolean;
  view: boolean;
  delete: boolean;
}

export interface Sidebar {
  id: number;
  sidemenu: SidebarMenuItem[];
  path: string | null;
  sidebar: null;
}

export interface IUser {
  id: number;
  fullName: string;
  email: string;
  mobileNumber: string;
  password: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  countryCode: null | string;
  commission: null | string;
  amountOrPercentage: null | string;
  organizationName: null | string;
  image: null | string;
  twoStepVerificationEnabled: boolean;
  wallet: {
    id: number;
    balance: number | null;
    createdAt: string;
    updatedAt: string;
  } | null;
}
interface IRoles {
  id: number;
  roleName: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface AuthDataType {
  message: string | null;
  loading: boolean;
  token: string | null;
  user: IUser;
  roles: IRoles[] | null;
  sidebar: null | Sidebar;
  isGroupMember: boolean;
}
const initialState: AuthDataType = {
  message: null,
  loading: false,
  user: {
    id: 0,
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    roleId: 0,
    createdAt: "",
    updatedAt: "",
    active: true,
    countryCode: null,
    commission: null,
    amountOrPercentage: null,
    organizationName: null,
    image: null,
    twoStepVerificationEnabled: false,
    wallet: null,
  },
  isGroupMember: false,
  roles: null,
  token: Storage.get("token") || null,
  sidebar: Storage.get("sidebar") || null,
};

export const rolesAction = createAsyncThunk(
  "rolesAction",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(endpoints.ROLES, "GET");
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response);
      if (response.statusCode === "404")
        return rejectWithValue(response.message);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const signUpAction = createAsyncThunk(
  "signUpAction",
  async (formData: FormData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.SIGN_UP,
        "POST",
        formData,
        {
          "Content-Type": "null",
        }
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response);
      if (response.statusCode === "404")
        return rejectWithValue(response.message);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const signUpEmailVerify = createAsyncThunk(
  "signUpEmailVerify",
  async (
    { emailOrmobile, otp }: { emailOrmobile: string; otp: string },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const data = {
        emailOrmobile: emailOrmobile,
        otp: otp,
      };
      const { response, error } = await networkCall(
        endpoints.SIGNUP_VERIFY_OTP,
        "POST",
        JSON.stringify(data)
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response);
      if (response.statusCode === "404")
        return rejectWithValue(response.message);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const sendOtpEmailOrMobile = createAsyncThunk(
  "sendOtpEmailOrMobile",
  async (emailOrmobile: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = {
        emailOrmobile,
      };
      const { response, error } = await networkCall(
        endpoints.SEND_OTP_EMAIL_OR_MOBILE,
        "POST",
        JSON.stringify(data)
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response);
      if (response.statusCode === "404")
        return rejectWithValue(response.message);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const signInAction = createAsyncThunk(
  "signInAction",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue, fulfillWithValue }
  ) => {
    const data = {
      email: email,
      password: password,
      deviceToken: "string",
      deviceType: "string",
      deviceDetails: {
        deviceName: "string",
        androidVersion: "string",
        latitude: "string",
        longitude: "string",
        mobileModel: "string",
      },
    };
    try {
      const { response, error } = await networkCall(
        endpoints.SIGN_IN,
        "POST",
        JSON.stringify(data)
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") {
        Storage.set("token", response?.token);
        Storage.set("user", response?.data);
        Storage.set("sidebar", response?.sidebar);
        Storage.set("isGroupMember", response.isGroupMember);
        const tokenExpireTime = new Date();
        const hours = 10; // ten hours time
        tokenExpireTime.setTime(
          tokenExpireTime.getTime() + hours * 60 * 60 * 1000
        );
        Storage.set("tokenExpiry", tokenExpireTime.toISOString());
        return fulfillWithValue(response);
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    actionLogout: (state) => {
      state.token = null;
      navigation.navigate("/");
      Storage.clearAll();
      displayAlert("You have been successfully logged out!");
    },
    setUserData: (state) => {
      state.token = Storage.get("token") ?? "";
      state.user = Storage.get("user") ?? {};
      state.sidebar = Storage.get("sidebar") ?? null;
      state.isGroupMember = Storage.get("isGroupMember") ?? false;
    },
    userLoggedIn: (state) => {
      state.token = "logged successfully";
    },
    updateWalletBalance: (state, action: PayloadAction<number>) => {
      if (state.user.wallet && state.user.wallet.balance) {
        state.user.wallet.balance = action.payload;
        Storage.set("user", state.user);
      }
    },
    loadingStatusChange: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(rolesAction.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(rolesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.message = null;
        state.roles = action.payload?.data;
        if (action.payload?.data) {
          state.roles = action.payload?.data?.filter(
            (item: IRoles) => item.id > 7
          );
        } else {
          state.roles = [];
        }
      })
      .addCase(rolesAction.rejected, (state, action) => {
        state.loading = false;
        displayAlert(action.payload as string, "error");
      });
    builder
      .addCase(signUpAction.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(signUpAction.fulfilled, (state) => {
        state.loading = false;
        state.message = null;
      })
      .addCase(signUpAction.rejected, (state, action) => {
        state.loading = false;
        displayAlert(action.payload as string, "error");
      });
    builder
      .addCase(sendOtpEmailOrMobile.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(sendOtpEmailOrMobile.fulfilled, (state) => {
        state.loading = false;
        state.message = null;
      })
      .addCase(sendOtpEmailOrMobile.rejected, (state, action) => {
        state.loading = false;
        displayAlert(action.payload as string, "error");
      });
    builder
      .addCase(signUpEmailVerify.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(signUpEmailVerify.fulfilled, (state) => {
        state.loading = false;
        state.message = null;
      })
      .addCase(signUpEmailVerify.rejected, (state, action) => {
        state.loading = false;
        displayAlert(action.payload as string, "error");
      });
    builder
      .addCase(signInAction.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(signInAction.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.data) {
          state.user = action.payload.data;
          state.token = action.payload.token;
          state.isGroupMember = action.payload.isGroupMember;
          if (action.payload?.sidebar?.sidemenu) {
            const sortedSidemenu = action.payload.sidebar.sidemenu.sort(
              (a: SidebarMenuItem, b: SidebarMenuItem) => a.id - b.id
            );
            state.sidebar = {
              ...action.payload.sidebar,
              sidemenu: sortedSidemenu,
            };
          } else {
            state.sidebar = action.payload.sidebar;
          }
        }
        state.message = null;
      })
      .addCase(signInAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload !== "Please verify your OTP before logging in.")
          displayAlert(action.payload as string, "error");
      });
  },
});
export const {
  actionLogout,
  userLoggedIn,
  setUserData,
  updateWalletBalance,
  loadingStatusChange,
} = AuthSlice.actions;
export default AuthSlice.reducer;
