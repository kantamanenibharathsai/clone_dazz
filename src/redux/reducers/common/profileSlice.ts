import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert, parseError } from "../../../utils/toastMessage";

interface IState {
  loading: "started" | "completed" | "error";
}

const initialState: IState = {
  loading: "started",
};

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async (
    formData: FormData,
    { rejectWithValue, fulfillWithValue, dispatch }
  ) => {
    try {
      const { response, error } = await networkCall(
        endpoints.USER_UPDATE,
        "PUT",
        formData,
        {
          "Content-Type": "null",
        }
      );

      if (response?.statusCode === "200") {
        displayAlert("Profile Updated Successfully");

        return fulfillWithValue(response);
      } else {
        parseError(error);
        return rejectWithValue("Something went wrong!");
      }
    } catch (error) {
      parseError(error);
      return rejectWithValue("Something went wrong!");
    }
  }
);
const profileReducer = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = "started";
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = "completed";
    });
    builder.addCase(updateProfile.rejected, (state) => {
      state.loading = "error";
    });
  },
});

export default profileReducer.reducer;
