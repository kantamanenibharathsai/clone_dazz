import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert } from "../../../utils/toastMessage";
import { RootState } from "../../store";

type EachApiStatus = "INITIAL" | "LOADING" | "SUCCESS" | "ERROR";
interface AllApiStatus {
  sentOtp: EachApiStatus;
  verifyOtp: EachApiStatus;
  updatePassword: EachApiStatus;
}
interface IForgotPasswordState {
  emailOrmobile: string;
  otp: string;
  password: string;
  allApiStatus: AllApiStatus;
}

const initialState: IForgotPasswordState = {
  emailOrmobile: "",
  otp: "",
  password: "",
  allApiStatus: {
    sentOtp: "INITIAL",
    verifyOtp: "INITIAL",
    updatePassword: "INITIAL",
  },
};
export const sendingOtp = createAsyncThunk(
  "forgotPassword/sendingOtp",
  async (
    emailOrmobile: string,
    { rejectWithValue, fulfillWithValue, dispatch }
  ) => {
    dispatch(emailSetter({ emailOrmobile }));
    const body = {
      emailOrmobile,
    };
    try {
      const { response, error } = await networkCall(
        endpoints.SENT_OTP,
        "POST",
        JSON.stringify(body)
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200")
        return fulfillWithValue(response.message);
      if (response.statusCode === "404")
        return rejectWithValue(response.message);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "forgotPassword/verifyOtp",
  async (
    otp: string,
    { rejectWithValue, fulfillWithValue, getState, dispatch }
  ) => {
    const { emailOrmobile } = (getState() as RootState).forgotPasswordSlice;
    dispatch(otpSetter({ otp }));
    try {
      const { response, error } = await networkCall(
        endpoints.VERIFY_OTP,
        "POST",
        JSON.stringify({ emailOrmobile, otp })
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200" || response.statusCode === "Success")
        return fulfillWithValue(response.message);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updatePassword = createAsyncThunk(
  "forgotPassword/updatePassword",
  async (password: string, { rejectWithValue, fulfillWithValue, getState }) => {
    const { emailOrmobile, otp } = (getState() as RootState)
      .forgotPasswordSlice;
    try {
      const { response, error } = await networkCall(
        endpoints.UPDATE_PASSWORD,
        "PUT",
        JSON.stringify({ email: emailOrmobile, otp, password })
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200")
        return fulfillWithValue(response.message);
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    emailSetter: (state, action: { payload: { emailOrmobile: string } }) => {
      state.emailOrmobile = action.payload.emailOrmobile;
    },
    otpSetter: (state, action: { payload: { otp: string } }) => {
      state.otp = action.payload.otp;
    },
    resetSlice: (_state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendingOtp.pending, (state) => {
      state.allApiStatus.sentOtp = "LOADING";
    });
    builder.addCase(sendingOtp.fulfilled, (state, action) => {
      state.allApiStatus.sentOtp = "SUCCESS";
      displayAlert(action.payload as string, "success");
    });
    builder.addCase(sendingOtp.rejected, (state, action) => {
      state.allApiStatus.sentOtp = "ERROR";
      displayAlert(String(action.payload) || "Something went wrong", "error");
    });
    builder.addCase(verifyOtp.pending, (state) => {
      state.allApiStatus.verifyOtp = "LOADING";
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.allApiStatus.verifyOtp = "SUCCESS";
      displayAlert(action.payload as string, "success");
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.allApiStatus.verifyOtp = "ERROR";
      displayAlert(action.payload as string, "error");
    });
    builder.addCase(updatePassword.pending, (state) => {
      state.allApiStatus.updatePassword = "LOADING";
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.allApiStatus.updatePassword = "SUCCESS";
      displayAlert(action.payload as string, "success");
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.allApiStatus.updatePassword = "ERROR";
      displayAlert(action.payload as string, "error");
    });
  },
});

export default forgotPasswordSlice.reducer;
export const { emailSetter, otpSetter, resetSlice } =
  forgotPasswordSlice.actions;
