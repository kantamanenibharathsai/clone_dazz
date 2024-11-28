import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EachCard } from "../../../components/superAdmin/categories/types";
import { ApiStatus } from "../../../components/superAdmin/common/CommonStyles";
import networkCall from "../../../utils/networkCall";
import { displayAlert } from "../../../utils/toastMessage";

interface ICategoriesState {
  allApiStatus: {
    readApi: ApiStatus;
    createAndUpdateApi: ApiStatus;
    deleteApi: ApiStatus;
  };
  allApiErrors: {
    readApi: string;
    createAndUpdateApi: string;
    deleteApi: string;
  };
  currentPage: number;
  totalPages: number;
  cardsData: EachCard[];
}
const initialState: ICategoriesState = {
  allApiStatus: {
    readApi: "INITIAL",
    createAndUpdateApi: "INITIAL",
    deleteApi: "INITIAL",
  },
  allApiErrors: {
    readApi: "",
    createAndUpdateApi: "",
    deleteApi: "",
  },
  cardsData: [],
  currentPage: 1,
  totalPages: 1,
};
export const createNewCard = createAsyncThunk(
  "categories/createNewCard",
  async () => {}
);
export const readAllCards = createAsyncThunk(
  "categories/readAllCards",
  async (url: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(url, "GET");
      if (response.status === 400) {
        return rejectWithValue(response.error);
      }
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") {
        return fulfillWithValue(response.data);
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const createAndUpdateCard = createAsyncThunk(
  "categories/updateCard",
  async (
    {
      body,
      endPoint,
      method,
    }: { body: FormData; endPoint: string; method: "PUT" | "POST" },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { response, error } = await networkCall(endPoint, method, body, {
        "Content-Type": "null",
      });
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") {
        return fulfillWithValue(response.message);
      } else return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteCard = createAsyncThunk(
  "categories/deleteCard",
  async (url: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(url, "DELETE");
      if (error) {
        return rejectWithValue(error);
      }
      if (response.statusCode === "200") {
        return fulfillWithValue(response.message);
      } else return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const CategoriesSlice = createSlice({
  name: "CategoriesSlice",
  initialState,
  reducers: {
    resetSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(readAllCards.pending, (state) => {
      state.allApiStatus.readApi = "PENDING";
    });
    builder.addCase(readAllCards.fulfilled, (state, action) => {
      state.allApiStatus.readApi = "SUCCESS";
      state.currentPage = action.payload.pagination.currentPage;
      state.totalPages = action.payload.pagination.totalPages;
      state.cardsData = action.payload.data;
      state.allApiErrors.readApi = "";
    });
    builder.addCase(readAllCards.rejected, (state, action) => {
      state.allApiStatus.readApi = "ERROR";
      state.allApiErrors.readApi = action.payload as string;
    });
    builder.addCase(createAndUpdateCard.pending, (state) => {
      state.allApiStatus.createAndUpdateApi = "PENDING";
    });
    builder.addCase(createAndUpdateCard.fulfilled, (state, action) => {
      state.allApiStatus.createAndUpdateApi = "SUCCESS";
      displayAlert(action.payload as string, "success");
    });
    builder.addCase(createAndUpdateCard.rejected, (state, action) => {
      state.allApiStatus.createAndUpdateApi = "ERROR";
      displayAlert(action.payload as string, "error");
    });
    builder.addCase(deleteCard.pending, (state) => {
      state.allApiStatus.deleteApi = "PENDING";
    });
    builder.addCase(deleteCard.fulfilled, (state, action) => {
      state.allApiStatus.deleteApi = "SUCCESS";
      displayAlert(action.payload as string, "success");
    });
    builder.addCase(deleteCard.rejected, (state, action) => {
      state.allApiStatus.deleteApi = "ERROR";
      displayAlert(action.payload as string, "error");
    });
  },
});

export default CategoriesSlice.reducer;
export const { resetSlice } = CategoriesSlice.actions;
