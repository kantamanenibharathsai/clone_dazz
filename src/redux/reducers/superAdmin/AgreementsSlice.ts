import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../../../components/superAdmin/common/CommonStyles";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert } from "../../../utils/toastMessage";

export interface EachDocument {
  roleId: number;
  document: string;
}
export interface ArgumentType {
  keyOfEndPoint: keyof typeof endpoints;
  keyInState:
    | "privacyPolicy"
    | "aboutUs"
    | "agreementDocument"
    | "termsAndConditions";
}
export interface BodyType {
  keyInEndPoint: ArgumentType["keyOfEndPoint"];
  document: string;
  roleId: number;
}
interface IAgreements {
  privacyPolicy: EachDocument[];
  aboutUs: EachDocument[];
  agreementDocument: EachDocument[];
  termsAndConditions: EachDocument[];
  getDocumentsApiStatus: ApiStatus;
  updateDocumentsApiStatus: ApiStatus;
}
const initialState: IAgreements = {
  privacyPolicy: [],
  aboutUs: [],
  agreementDocument: [],
  termsAndConditions: [],
  getDocumentsApiStatus: "INITIAL",
  updateDocumentsApiStatus: "INITIAL",
};

export const getDocuments = createAsyncThunk(
  "agreements/all",
  async (
    {
      keyOfEndPoint,
      keyInState,
    }: {
      keyOfEndPoint: keyof typeof endpoints;
      keyInState:
        | "privacyPolicy"
        | "aboutUs"
        | "agreementDocument"
        | "termsAndConditions";
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { response, error } = await networkCall(
        endpoints[keyOfEndPoint],
        "GET"
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200")
        return fulfillWithValue({ data: response.data, keyInState });
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateDocuments = createAsyncThunk(
  "agreements/update",
  async (
    { document, keyInEndPoint, roleId }: BodyType,
    { rejectWithValue, fulfillWithValue }
  ) => {
    const keyInBody = (() => {
      switch (keyInEndPoint) {
        case "GET_AGREEMENT_DOCUMENT":
          return "agreementDocument";
        case "GET_PRIVACY_POLICY":
          return "privacyPolicy";
        case "GET_ABOUT_US":
          return "aboutUs";
        default:
          return "termsAndConditions";
      }
    })();
    try {
      const body = new FormData();
      body.append(keyInBody, document);
      const { response, error } = await networkCall(
        endpoints[keyInEndPoint] + "/" + roleId,
        "PUT",
        body,
        {
          "Content-Type": "null",
        }
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
interface EachResponseType {
  roleId: number;
  termsAndConditions?: string;
  privacyPolicy?: string;
  agreementDocument?: string;
  aboutUs?: string;
}
export const AgreementsSlice = createSlice({
  name: "agreements",
  initialState,
  reducers: {
    resetSlice: (_state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getDocuments.pending, (state) => {
      state.getDocumentsApiStatus = "PENDING";
    });
    builder.addCase(getDocuments.fulfilled, (state, action) => {
      state[action.payload.keyInState] = action.payload.data.map(
        (each: EachResponseType) => ({
          roleId: each.roleId,
          document: each[action.payload.keyInState],
        })
      );
      state.getDocumentsApiStatus = "SUCCESS";
    });
    builder.addCase(getDocuments.rejected, (state) => {
      state.getDocumentsApiStatus = "ERROR";
    });
    builder.addCase(updateDocuments.pending, (state) => {
      state.updateDocumentsApiStatus = "PENDING";
    });
    builder.addCase(updateDocuments.fulfilled, (state, action) => {
      state.updateDocumentsApiStatus = "SUCCESS";
      displayAlert(action.payload as string, "success");
    });
    builder.addCase(updateDocuments.rejected, (state, action) => {
      state.updateDocumentsApiStatus = "ERROR";
      displayAlert(action.payload as string, "error");
    });
  },
});

export default AgreementsSlice.reducer;
export const { resetSlice } = AgreementsSlice.actions;
