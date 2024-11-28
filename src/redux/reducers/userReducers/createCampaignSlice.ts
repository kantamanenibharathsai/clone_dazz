import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Value } from "../../../components/userFlow/userLayout/UserLayout";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert } from "../../../utils/toastMessage";
import { RootState } from "../../store";
interface CreateNewCampaignType {
  campaignName: string;
  step: string;
}
interface UpdateCampaignDetails {
  id: string;
  campaignName?: string;
  latitude?: string;
  longitude?: string;
  locationId?: string;
  locationName?: string;
  startDate?: string;
  endDate?: string;
  pricingModelId?: string;
  adTypeId?: string;
  genreIds?: string[];
  categoryIds?: string[];
  subCategoryIds?: string[];
  screenGroupsIds?: string[];
  screenIds?: string[];
  step?: string;
  mediaFile?: File[];
}
interface GenreListType {
  id: number;
  genreName: string;
  image: {
    url: string;
    size: string;
    name: string;
    id: string;
  };
}
interface AdTypeOptions {
  id: string;
  name: string;
  pricingId: string;
}
interface PricingModelType {
  id: string;
  name: string;
}
interface GetCategories {
  genreIds: string[];
  categoryName: string;
  page: string;
  pageSize: string;
}
interface GetGenreType {
  pageSize: number;
  page: number;
}
interface Pagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
interface CategoryListType {
  id: number;
  categoryName: string;
  image: {
    url: string;
    size: string;
    name: string;
    id: number;
  };
  genreId: number;
}
interface GetSubCategoriesType {
  categoryIds: string[];
  subCategoryName: string;
  page: string;
  pageSize: string;
}
interface GetScreenGroupsIdType {
  groupName: string;
  genreIds: string[];
  categoryIds: string[];
  subCategoryIds: string[];
  latitude: string;
  longitude: string;
  radius: string;
  startDate: string;
  endDate: string;
  page: string;
  pageSize: string;
}
export interface Form {
  campaignName: string;
  location: {
    locationId: string;
    locationName: string;
    lat: string;
    lng: string;
  };
  selectedDates: Value;
  pricingModelId: string;
  adTypeId: string;
  selectedGenre: string;
  selectedCategory: string[];
  numberOfSpots: string;
  CPM: string;
  price: string;
  selectedSubCategory: string[];
  selectedScreenGroup: string[];
  selectedScreens: string[];
  uploadedMedia: (File | string)[];
  paymentMode: "Online" | "Wallet";
}
interface SubCategoryList {
  id: number;
  subCategoryName: string;
  image: {
    url: string;
    size: string;
    name: string;
    id: number;
  };
  categoryId: number;
}
interface GroupScreenType {
  id: number;
  screenimages: {
    name: string;
    size: string;
    url: string;
  };
  screenname: string;
}
interface GroupScreenImageType {
  url: string;
  size: string;
  name: string;
}
interface GroupListType {
  screenGroupId: number;
  screenGroupName: string;
  screenGroupImage: GroupScreenImageType;
  screens: GroupScreenType[];
  screenCount: number;
}
interface CouponType {
  id: number;
  code: string;
  minCartValue: number;
  discountPercentage: number;
  flatDiscount: number;
  startDate: string;
  expiryDate: string;
  status: boolean;
  active: boolean;
  createdBy: number;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}
interface InitialState {
  loading: boolean;
  campaign: boolean;
  campaignId: number | null;
  campaignMode: "ADD" | "EDIT";
  currentStep: number;
  form: Form;
  adTypeOptions: AdTypeOptions[];
  pricingModelOptions: PricingModelType[];
  optionsErrorMsg: string;
  genreList: GenreListType[];
  genreListErrorTxt: string;
  genrePagination: Pagination;
  categoryList: CategoryListType[];
  categoryErrorTxt: string;
  categoryPagination: Pagination;
  subCategoryList: SubCategoryList[];
  subCategoryPagination: Pagination;
  subCategoryErrorTxt: string;
  groupList: GroupListType[];
  groupListErrorTxt: string;
  groupListPagination: Pagination;
  coupons: CouponType[];
  couponErrorTxt: string;
  couponPagination: Pagination;
  checkout: {
    price: string;
    commissionAmount: string;
    commissionPercentage: string;
    gstAmount: string;
    gstPercentage: string;
    couponCode: string;
    couponAmount: string;
    totalAmount: string;
    totalAmountBeforeApplyCoupon: string;
    razorpayOrderId: string;
  };
}
interface ApplyCouponType {
  campaignId: string;
  couponId: string;
}
interface GetAvailableCouponsType {
  page: string;
  pageSize: string;
  totalPrice: string;
}
interface DoCheckoutType {
  paymentMode: "Wallet" | "Online";
  campaignId: string;
  step: string;
}
const initialState: InitialState = {
  loading: false,
  campaign: false,
  campaignId: null,
  campaignMode: "ADD",
  currentStep: 1,
  form: {
    campaignName: "",
    location: {
      lat: "",
      lng: "",
      locationName: "",
      locationId: "",
    },
    selectedDates: null,
    pricingModelId: "2", //By default selected as spots
    numberOfSpots: "",
    adTypeId: "",
    CPM: "",
    price: "",
    selectedGenre: "",
    selectedCategory: [],
    selectedSubCategory: [],
    selectedScreenGroup: [],
    selectedScreens: [],
    uploadedMedia: [],
    paymentMode: "Online",
  },
  adTypeOptions: [],
  pricingModelOptions: [],
  optionsErrorMsg: "",
  genreList: [],
  genreListErrorTxt: "",
  genrePagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },
  categoryList: [],
  categoryErrorTxt: "",
  categoryPagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },
  subCategoryList: [],
  subCategoryPagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },
  subCategoryErrorTxt: "",
  groupList: [],
  groupListErrorTxt: "",
  groupListPagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },
  coupons: [],
  couponErrorTxt: "",
  couponPagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },
  checkout: {
    price: "",
    commissionAmount: "",
    commissionPercentage: "",
    gstAmount: "",
    gstPercentage: "",
    couponCode: "",
    couponAmount: "",
    totalAmount: "",
    totalAmountBeforeApplyCoupon: "",
    razorpayOrderId: "",
  },
};
const errorTxt = "Something went wrong try later";
export const getPricingModelOptions = createAsyncThunk(
  "getPricingModelOptions",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response } = await networkCall(endpoints.PRICING_MODEL, "GET");
      const msg = response?.message ? response.message : errorTxt;
      switch (response.statusCode) {
        case "200":
          return fulfillWithValue(response.data);
        case "404":
          return rejectWithValue(msg);
        default:
          return rejectWithValue(msg);
      }
    } catch (error) {
      return rejectWithValue(errorTxt);
    }
  }
);

export const getAdTypeOptions = createAsyncThunk(
  "getAdTypeOptions",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { response } = await networkCall(endpoints.AD_TYPE, "GET");
      const msg = response?.message ? response.message : errorTxt;
      switch (response.statusCode) {
        case "200":
          return fulfillWithValue(response.data);
        case "404":
          return rejectWithValue(msg);
        default:
          return rejectWithValue(msg);
      }
    } catch (error) {
      return rejectWithValue(errorTxt);
    }
  }
);

export const getGenre = createAsyncThunk(
  "getGenre",
  async (
    { page, pageSize }: GetGenreType,
    { fulfillWithValue, rejectWithValue }
  ) => {
    const params = new URLSearchParams({
      orderBy: "desc",
      sortBy: "id",
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
    try {
      const { response } = await networkCall(
        `${endpoints.GET_GENRES}?${params}`,
        "GET"
      );
      const msg = response?.message ? response.message : errorTxt;
      switch (response.statusCode) {
        case "200":
          return fulfillWithValue(response?.data);
        case "404":
          return rejectWithValue(msg);
        default:
          return rejectWithValue(msg);
      }
    } catch (error) {
      return rejectWithValue(errorTxt);
    }
  }
);

export const getCategories = createAsyncThunk(
  "getCategories",
  async (
    { categoryName, genreIds, page, pageSize }: GetCategories,
    { fulfillWithValue, rejectWithValue, getState }
  ) => {
    const pageValueBeforeSearch = (getState() as RootState).Campaign
      .categoryPagination.currentPage;
    try {
      const param = new URLSearchParams({
        orderBy: "desc",
        sortBy: "id",
        pageSize: pageSize,
        page: page,
      });
      if (categoryName.length) param.append("categoryName", categoryName);
      if (genreIds.length > 0)
        for (let id of genreIds) {
          param.append("genreIds", id);
        }
      const { response } = await networkCall(
        `${endpoints.GET_CATEGORIES}?${param}`,
        "GET"
      );
      const msg = response?.message ? response.message : errorTxt;
      switch (response.statusCode) {
        case "200":
          if (categoryName) {
            response.data.pagination.currentPage = pageValueBeforeSearch;
          }
          return fulfillWithValue(response.data);
        case "404":
          return rejectWithValue(msg);
        default:
          return rejectWithValue(msg);
      }
    } catch (error) {
      return rejectWithValue(errorTxt);
    }
  }
);

export const getSubCategories = createAsyncThunk(
  "getSubCategories",
  async (
    { categoryIds, subCategoryName, page, pageSize }: GetSubCategoriesType,
    { fulfillWithValue, rejectWithValue, getState }
  ) => {
    const pageValueBeforeSearch = (getState() as RootState).Campaign
      .subCategoryPagination.currentPage;
    try {
      const param = new URLSearchParams({
        orderBy: "desc",
        sortBy: "id",
        pageSize: pageSize,
        page: page,
      });
      if (subCategoryName.length)
        param.append("subCategoryName", subCategoryName);
      if (categoryIds.length > 0) {
        for (let id of categoryIds) {
          param.append("categoryIds", id);
        }
      }
      const { response } = await networkCall(
        `${endpoints.GET_SUB_CATEGORIES}?${param}`,
        "GET"
      );
      const msg = response?.message ? response.message : errorTxt;
      switch (response.statusCode) {
        case "200":
          if (subCategoryName)
            response.data.pagination.currentPage = pageValueBeforeSearch;
          return fulfillWithValue(response.data);
        case "404":
          return rejectWithValue(msg);
        default:
          return rejectWithValue(msg);
      }
    } catch (error) {
      return rejectWithValue(errorTxt);
    }
  }
);

export const getScreenGroups = createAsyncThunk(
  "getScreenGroups",
  async (
    data: GetScreenGroupsIdType,
    { fulfillWithValue, rejectWithValue, getState }
  ) => {
    const param = new URLSearchParams({});
    for (let [key, value] of Object.entries(data)) {
      if (value.length === 0) continue;
      if (Array.isArray(value)) {
        value.forEach((val) => {
          param.append(key, val);
        });
      } else {
        param.append(key, value);
      }
    }
    const searchName = data.groupName;
    const pageValueBeforeSearch = (getState() as RootState).Campaign
      .groupListPagination.currentPage;
    try {
      const { response } = await networkCall(
        `${endpoints.GET_GROUPS}?${param}`,
        "GET"
      );
      const msg = response?.message ? response.message : errorTxt;
      switch (response.statusCode) {
        case "200":
          if (searchName)
            response.data.pagination.currentPage = pageValueBeforeSearch;
          return fulfillWithValue(response);
        case "404":
          return rejectWithValue(msg);
        default:
          return rejectWithValue(msg);
      }
    } catch (error) {
      return rejectWithValue(errorTxt);
    }
  }
);

export const createNewCampaign = createAsyncThunk(
  "createNewCampaign",
  async (
    { campaignName, step }: CreateNewCampaignType,
    { fulfillWithValue, rejectWithValue }
  ) => {
    const form = new FormData();
    form.append("campaignName", campaignName);
    form.append("step", step);
    try {
      const { response } = await networkCall(endpoints.CAMPAIGN, "POST", form, {
        "Content-Type": "null",
      });
      const msg = response?.message ? response.message : errorTxt;
      switch (response.statusCode) {
        case "200":
          displayAlert(msg);
          return fulfillWithValue(response);
        case "409":
          displayAlert(msg, "warning");
          return rejectWithValue(msg);
        case "400":
          displayAlert(msg, "info");
          return rejectWithValue(msg);
        default:
          displayAlert(msg, "error");
          return rejectWithValue(msg);
      }
    } catch (error) {
      displayAlert(errorTxt, "error");
      return rejectWithValue(errorTxt);
    }
  }
);

export const updateCampaignDetails = createAsyncThunk(
  "updateCampaignDetails",
  async (data: UpdateCampaignDetails) => {
    const form = new FormData();
    for (let [key, value] of Object.entries(data)) {
      if (value.length === 0) continue;
      if (Array.isArray(value)) {
        value.forEach((val) => {
          form.append(key, val);
        });
      } else {
        form.append(key, value);
      }
    }
    const campaignId = data.id;
    form.delete("id");
    try {
      const { response } = await networkCall(
        `${endpoints.CAMPAIGN}/${campaignId}`,
        "PUT",
        form,
        {
          "Content-Type": "null",
        }
      );
      const msg = response?.message ? response.message : errorTxt;
      if (response?.statusCode !== "200") {
        displayAlert(msg, "warning");
      }
      return response;
    } catch (error) {
      displayAlert(errorTxt, "error");
    }
  }
);

export const getAvailableCoupons = createAsyncThunk(
  "getAvailableCoupons",
  async (
    { page, totalPrice, pageSize }: GetAvailableCouponsType,
    { rejectWithValue, fulfillWithValue }
  ) => {
    const param = new URLSearchParams({
      status: "true",
      page: page,
      size: pageSize,
      cartValue: totalPrice,
      orderBy: "desc",
      sortBy: "createdAt",
    });
    try {
      const { response } = await networkCall(
        `${endpoints.GET_COUPONS}?${param}`,
        "GET"
      );
      const msg = response?.message ? response.message : errorTxt;
      switch (response.statusCode) {
        case "200":
          return fulfillWithValue(response.data);
        case "404":
          return rejectWithValue(msg);
        default:
          return rejectWithValue(msg);
      }
    } catch (error) {
      return rejectWithValue(errorTxt);
    }
  }
);

export const applyCoupon = createAsyncThunk(
  "applyCoupon",
  async (
    { campaignId, couponId }: ApplyCouponType,
    { rejectWithValue, fulfillWithValue }
  ) => {
    const form = new FormData();
    form.append("couponId", couponId);
    form.append("campaignId", campaignId);
    try {
      const { response } = await networkCall(
        endpoints.APPLY_COUPON,
        "POST",
        form,
        {
          "Content-Type": "null",
        }
      );
      const msg = response?.message ? response.message : errorTxt;
      switch (response.statusCode) {
        case "200":
          displayAlert(msg, "success");
          return fulfillWithValue(response);
        case "404":
          displayAlert(msg, "warning");
          return rejectWithValue(msg);
        default:
          displayAlert(msg, "error");
          return rejectWithValue(errorTxt);
      }
    } catch (error) {
      displayAlert(errorTxt, "error");
      return rejectWithValue(errorTxt);
    }
  }
);

export const removeAppliedCoupon = createAsyncThunk(
  "removeAppliedCoupon",
  async (
    { campaignId }: { campaignId: string },
    { rejectWithValue, fulfillWithValue }
  ) => {
    const form = new FormData();
    form.append("campaignId", campaignId);
    try {
      const { response } = await networkCall(
        endpoints.REMOVE_COUPON,
        "POST",
        form,
        {
          "Content-Type": "null",
        }
      );
      const msg = response?.message ? response.message : errorTxt;
      switch (response.statusCode) {
        case "200":
          displayAlert(msg, "success");
          return fulfillWithValue(response);
        case "404":
          displayAlert(msg, "warning");
          return rejectWithValue(msg);
        default:
          displayAlert(msg, "error");
          return rejectWithValue(errorTxt);
      }
    } catch (error) {
      displayAlert(errorTxt, "error");
      return rejectWithValue(errorTxt);
    }
  }
);

export const doCheckout = createAsyncThunk(
  "doCheckout",
  async (
    { campaignId, paymentMode, step }: DoCheckoutType,
    { fulfillWithValue, rejectWithValue }
  ) => {
    const form = new FormData();
    form.append("paymentMode", paymentMode);
    form.append("campaignId", campaignId);
    form.append("step", step);
    try {
      const { response } = await networkCall(endpoints.CHECKOUT, "POST", form, {
        "Content-Type": "null",
      });
      const msg = response?.message ? response.message : errorTxt;
      switch (response.statusCode) {
        case "200":
          if (paymentMode === "Wallet") {
            displayAlert(msg, "success");
            return fulfillWithValue(response);
          }
          return fulfillWithValue(response.data);
        case "400":
          displayAlert(msg, "warning");
          return rejectWithValue(msg);
        default:
          displayAlert(msg, "error");
          return rejectWithValue(errorTxt);
      }
    } catch (error) {
      displayAlert(errorTxt, "error");
      return rejectWithValue(errorTxt);
    }
  }
);

export const savePaymentOrder = createAsyncThunk(
  "savePaymentOrder",
  async (
    { orderId, paymentId }: { orderId: string; paymentId: string },
    { fulfillWithValue, rejectWithValue }
  ) => {
    const data = {
      razorpayOrderId: orderId,
      paymentId: paymentId,
    };
    try {
      const { response } = await networkCall(
        endpoints.PAYMENT,
        "POST",
        JSON.stringify(data)
      );
      const msg = response?.message ? response.message : errorTxt;
      if (response.statusCode === "200") {
        displayAlert(msg, "success");
        return fulfillWithValue(response);
      } else {
        displayAlert(msg, "warning");
        return rejectWithValue(msg);
      }
    } catch (error) {
      displayAlert(errorTxt, "error");
      return rejectWithValue(errorTxt);
    }
  }
);

export const doCallbackRequest = createAsyncThunk(
  "doCallbackRequest",
  async (campaignId: string, { rejectWithValue, fulfillWithValue }) => {
    const form = new FormData();
    form.append("campaignId", campaignId);
    form.append("step", "10");
    try {
      const { response } = await networkCall(endpoints.CALLBACK, "POST", form, {
        "Content-Type": "null",
      });
      const msg = response?.message ? response.message : errorTxt;
      switch (response.statusCode) {
        case "200":
          displayAlert(msg, "success");
          return fulfillWithValue(response);
        case "400":
          displayAlert(msg, "warning");
          return rejectWithValue(msg);
        default:
          displayAlert(msg, "error");
          return rejectWithValue(msg);
      }
    } catch (error) {
      displayAlert(errorTxt, "error");
      return rejectWithValue(errorTxt);
    }
  }
);

export const createCampaign = createSlice({
  name: "createCampaign",
  initialState,
  reducers: {
    setForm: (state, action) => {
      state.form = action.payload;
    },
    setCategoryPagination: (state) => {
      state.categoryPagination = {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
      };
    },
    setSubCategoryPagination: (state) => {
      state.subCategoryPagination = {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
      };
    },
    setGroupPagination: (state) => {
      state.groupListPagination = {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
      };
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setCampaign: (state) => {
      state.campaign = !state.campaign;
    },
    restoreStateToInitial: () => {
      return initialState;
    },
    fillCheckoutDetails: (state, action) => {
      const price = action.payload?.price;
      const commissionAmount = action.payload?.commissionAmount;
      const gstAmount = action.payload.gstAmount;
      const commissionPercentage = action.payload.commissionPercentage;
      const gstPercentage = action.payload.gstPercentage;
      const couponAmount = action.payload.couponDiscount;
      const couponCode = action.payload.couponCode;
      const totalAmount = action.payload.totalAmount;
      const totalAmountBeforeApplyCoupon =
        action.payload.totalAmountBeforeApplyCoupon;
      const checkOut = {
        price: price,
        commissionAmount: commissionAmount,
        commissionPercentage: commissionPercentage,
        gstAmount: gstAmount,
        gstPercentage: gstPercentage,
        couponCode: couponCode,
        couponAmount: couponAmount,
        totalAmount: totalAmount,
        totalAmountBeforeApplyCoupon: totalAmountBeforeApplyCoupon,
        razorpayOrderId: "",
      };
      state.checkout = checkOut;
    },
    removeRazorPayOrderId: (state) => {
      state.checkout.razorpayOrderId = "";
    },
    handleEditingCampaign: (state, action) => {
      const payload = action.payload;
      state.campaign = payload.campaign;
      state.campaignId = payload.campaignId;
      state.campaignMode = payload.campaignMode;
      state.currentStep = payload.currentStep;
      state.checkout = payload.checkout;
      state.form = payload.form;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getGenre.pending, (state) => {
        state.loading = true;
        state.genreListErrorTxt = "";
      })
      .addCase(getGenre.fulfilled, (state, action) => {
        state.loading = false;
        state.genreList = action.payload.data ?? [];
        state.genrePagination = action.payload.pagination;
      })
      .addCase(getGenre.rejected, (state, action) => {
        state.loading = false;
        state.genreListErrorTxt = action.payload as string;
      });
    builder
      .addCase(getPricingModelOptions.pending, (state) => {
        state.loading = true;
        state.optionsErrorMsg = "";
      })
      .addCase(getPricingModelOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.pricingModelOptions = action.payload;
      })
      .addCase(getPricingModelOptions.rejected, (state, action) => {
        state.loading = false;
        state.optionsErrorMsg = action.payload as string;
      });
    builder
      .addCase(getAdTypeOptions.pending, (state) => {
        state.loading = true;
        state.optionsErrorMsg = "";
      })
      .addCase(getAdTypeOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.adTypeOptions = action.payload;
      })
      .addCase(getAdTypeOptions.rejected, (state, action) => {
        state.loading = false;
        state.optionsErrorMsg = action.payload as string;
      });
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.categoryErrorTxt = "";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryList = action.payload?.data ?? [];
        state.categoryPagination = action.payload.pagination;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.categoryErrorTxt = action.payload as string;
      });
    builder
      .addCase(getSubCategories.pending, (state) => {
        state.loading = true;
        state.subCategoryErrorTxt = "";
      })
      .addCase(getSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategoryList = action.payload?.data ?? [];
        state.subCategoryPagination = action.payload.pagination;
      })
      .addCase(getSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.subCategoryErrorTxt = action.payload as string;
      });
    builder
      .addCase(getScreenGroups.pending, (state) => {
        state.loading = true;
        state.groupListErrorTxt = "";
      })
      .addCase(getScreenGroups.fulfilled, (state, action) => {
        state.loading = false;
        const list = action.payload.data.data.map(
          (item: { screenGroupImage: string; screens: string }) => ({
            ...item,
            screenGroupImage: JSON.parse(item.screenGroupImage),
            screens: JSON.parse(item.screens),
          })
        );
        state.groupList = list;
        state.groupListPagination = action.payload.data.pagination;
      })
      .addCase(getScreenGroups.rejected, (state, action) => {
        state.loading = false;
        state.groupListErrorTxt = action.payload as string;
      });
    builder
      .addCase(createNewCampaign.pending, (state) => {
        state.loading = true;
        state.campaignId = null;
        state.campaignMode = "ADD";
      })
      .addCase(createNewCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.campaignId = action.payload.data.id;
        state.campaignMode = "EDIT";
      })
      .addCase(createNewCampaign.rejected, (state, action) => {
        state.loading = false;
        state.campaignId = null;
        state.campaignMode = "ADD";
      });
    builder
      .addCase(getAvailableCoupons.pending, (state) => {
        state.loading = true;
        state.categoryErrorTxt = "";
      })
      .addCase(getAvailableCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload.data;
        state.couponPagination = action.payload.pagination;
      })
      .addCase(getAvailableCoupons.rejected, (state, action) => {
        state.loading = false;
        state.couponErrorTxt = action.payload as string;
      });
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyCoupon.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(applyCoupon.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(removeAppliedCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeAppliedCoupon.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeAppliedCoupon.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(doCheckout.pending, (state) => {
        state.loading = true;
        state.checkout.razorpayOrderId = "";
      })
      .addCase(doCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout.razorpayOrderId = action.payload?.razorpayOrderId ?? "";
      })
      .addCase(doCheckout.rejected, (state) => {
        state.loading = false;
        state.checkout.razorpayOrderId = "";
      });
    builder
      .addCase(doCallbackRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(doCallbackRequest.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(doCallbackRequest.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setForm,
  setSubCategoryPagination,
  setCategoryPagination,
  setCurrentStep,
  setCampaign,
  setGroupPagination,
  restoreStateToInitial,
  fillCheckoutDetails,
  removeRazorPayOrderId,
  handleEditingCampaign,
} = createCampaign.actions;
export default createCampaign.reducer;
