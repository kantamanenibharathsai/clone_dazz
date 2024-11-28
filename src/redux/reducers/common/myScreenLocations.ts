import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";

interface MyScreenLocationsState {
  loading: boolean;
  error: null | string;
  data: {
    id: number;
    screenGroupName: string;
    image: string;
    latitude: number;
    longitude: number;
    screenCount: number;
    active: boolean;
  }[] | null;
}

const initialState: MyScreenLocationsState = {
  loading: false,
  error: null,
  data: null,
};
export const getMyScreenLocations = createAsyncThunk(
  "getMyScreenLoacations",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.MY_SCREEN_LOCATIONS
      );
      if (error) rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response.data);
      if (response.statusCode === "404") return rejectWithValue(response.message);
      return rejectWithValue(error);
    } catch (error) {
      return rejectWithValue("Something Went Wrong!!");
    }
  }
);
export const MyScreenLocations = createSlice({
  name: "myScreenLocations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyScreenLocations.pending,(state)=>{
        state.loading=true
    })
    builder.addCase(getMyScreenLocations.fulfilled,(state,action)=>{
        state.loading=false
        state.data=action.payload
    })
    builder.addCase(getMyScreenLocations.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload as string
    })
  },
});

export default MyScreenLocations.reducer;
