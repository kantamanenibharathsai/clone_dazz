import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../../config/config";
import networkCall from "../../../utils/networkCall";
import { displayAlert, parseError } from "../../../utils/toastMessage";
import { RootState } from "../../store";
import { IWidget } from "../superAdmin/WidgetsSlice";

export interface Widget {
  id: number;
  name: string;
  type: string;
  html: string;
  url: string;
}

export interface PlaygroundData {
  id: number;
  height: number;
  width: number;
  x: number;
  y: number;
  z: number;
  data: {
    name: string;
    type: string;
    widgetHTML: string;
    path?: string;
    duration?: number;
  };
  zoneData: Array<{
    id?: number;
    name: string;
    type: string;
    widgetHTML: string;
    path?: string;
    duration?: number;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
  }>;
}
export interface MediaData {
  id: number;
  file: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  status: boolean;
  active: boolean;
  mediaId: number;
  createdBy: 21;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
  duriation:number|null;
}

export interface LayoutStateInterface {
  showPreview: boolean;
  layoutData: Array<
    Array<{
      x: number;
      y: number;
      initialWidth: number;
      initialHeight: number;
      name: string;
      isSelected: undefined | boolean;
      isZoned: boolean;
      type: "video";
      zonedMedia: Array<{
        type: "widget" | "video" | "image";
        path: string;
        name: string;
        widgetHTML: string;
        secs: number;
      }>;
    }>
  >;
  widgets: Array<IWidget>;
  subWidgets: {
    id: number;
    name: string;
    text: string;
    subWidgetImage: string|null;
  }[];
  draggingItem: null | {
    id: number;
    name: string;
    type: string;
    html: string;
    url: string;
    duriation?:number
  };
  playgroundData: Array<{
    playlistAdsId?: number | null;
    layoutDataIds: { widgets: string; media: string[] };
    screenId: number;
    layoutName: string;
    containerDimensions: { width: number; height: number };
    isVertical: boolean;
    duration: number;
    startDate?: Date;
    endDate?: Date;
    data: Array<PlaygroundData>;
  }>;
  selectedScreen: number;
  selectedWidget: {
    id: number;
    height: number;
    width: number;
  } | null;
  previewEnabled: boolean;
  containerLayout: {
    height: string;
    width: string;
    isVertical: boolean | null;
  };
  mediaFiles: MediaData[];
  loading: boolean;
  message: string;
  mediaPage: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

const initialState: LayoutStateInterface = {
  showPreview: false,
  layoutData: [],
  widgets: [],
  draggingItem: null,
  playgroundData: [
    {
      playlistAdsId: null,
      layoutDataIds: { widgets: "", media: [] },
      layoutName: "",
      containerDimensions: { width: 731, height: 411 },
      isVertical: false,
      data: [],
      duration: 0,
      screenId: Date.now(),
    },
  ],
  selectedScreen: 0,
  selectedWidget: null,
  previewEnabled: false,
  containerLayout: {
    height: "411",
    width: "731",
    isVertical: false,
  },
  mediaFiles: [],
  loading: false,
  message: "",
  mediaPage: {
    currentPage: 1,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0,
  },
  subWidgets: [{
    id: 0,
    name: "",
    text: "",
    subWidgetImage:null,
  }]
};

const getWidgetInitialValue = (type: string) => {
  switch (type) {
    case "web":
    default:
      return {
        id: -1,
        type: "web",
        name: "Web Widget",
        html: "",
        url: "",
      };
  }
};

export const onSaveLayout = createAsyncThunk(
  "onSaveLayout",
  async (playlistId: number, { fulfillWithValue, getState }) => {
    const { playgroundData } = (getState() as RootState).layoutsSlice;
    try {
      const data = playgroundData.map((item, index) => {
        return {
          playlistAdId: item.playlistAdsId,
          playlistId: playlistId,
          mediaFileIds: item.layoutDataIds.media,
          subWidgetId: 0,
          adInformation: JSON.stringify(item),
        };
      });
      const { response } = await networkCall(
        endpoints.POST_PLAYLIST_ADS,
        "POST",
        JSON.stringify({
          assignAds: data,
          adData: JSON.stringify({
            playlist_id: playlistId,
            duration: null,
            layouts: playgroundData,
            layoutSchedules: [],
          }),
        })
      );
      if (response.statusCode === "200") {
        displayAlert("Layout data successfully updated!");
        return fulfillWithValue(response);
      } else {
        return displayAlert(
          response.message ? response.message : "Something went wrong!",
          "error"
        );
      }
    } catch (error) {
      return displayAlert(error ? (error as string) : "Something went wrong!");
    }
  }
);
export const saveSubWidget = createAsyncThunk(
  "saveSubWidget",
  async ({
      formData,
      type,
  }: {
      formData:FormData
      type:"POST"|"PUT"
  }, { fulfillWithValue }) => {
    try {
      
      const endPoint=endpoints.SUB_WIDGET;
      const { response } = await networkCall(
        endPoint,
        type,
        formData,
        {
          "Content-Type": "null",
        }
      );
      if (response.statusCode === "200") {
        displayAlert("SubWidget successfully updated!");
        return fulfillWithValue(response);
      } else {
        return displayAlert(
          response.message ? response.message : "Something went wrong!",
          "error"
        );
      }
    } catch (error) {
      return displayAlert(error ? (error as string) : "Something went wrong!");
    }
  }
);
export const getLayouts = createAsyncThunk(
  "getLayouts",
  async (playlistId: number, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.GET_PLAYLIST_ADS + playlistId
      );
      if (response.statusCode === "200") {
        return fulfillWithValue(response);
      } else {
        parseError(error);
        return rejectWithValue(
          response.message ? response.message : "Something went wrong!"
        );
      }
    } catch (error) {
      return rejectWithValue(
        error ? (error as string) : "Something went wrong!"
      );
    }
  }
);
export const getLayoutWidgets = createAsyncThunk(
  "getLayoutWidgets",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(endpoints.WIDGET +
        `?page=1&size=20&sort=createdAt&sort=asc`);
      if (response.statusCode === "200") {
        return fulfillWithValue(response);
      } else {
        parseError(error);
        return rejectWithValue(
          response.message ? response.message : "Something went wrong!"
        );
      }
    } catch (error) {
      return rejectWithValue(
        error ? (error as string) : "Something went wrong!"
      );
    }
  }
);
export const getLayoutSubWidgets = createAsyncThunk(
  "getLayoutSubWidgets",
  async (
    { widgetId, page }: { widgetId: number; page: number },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { response, error } = await networkCall(
        endpoints.WIDGET_SUB_WIDGET +
          `?widgetId=${widgetId}&page=${page}&size=20&sort=id&direction=desc`,
        "GET"
      );
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response);
      if (response.statusCode === "404")
        return rejectWithValue(response.message);
      return rejectWithValue(response.message);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const deleteLayoutSubWidget = createAsyncThunk(
  "deleteLayoutSubWidget",
  async (subWidgetId: number, { dispatch, fulfillWithValue }) => {
    try {
      const { response, error } = await networkCall(
        endpoints.DELETE_SUB_WIDGET + `/${subWidgetId}`,
        "DELETE"
      );
      if (response.statusCode === "200") {
        displayAlert(response.message as string, "success");
        return fulfillWithValue(response);
      }
      if (response.statusCode === "404") {
        displayAlert(response.message as string, "error");
      }
      if (response.statusCode === "500") {
        displayAlert(response.message as string, "error");
      }
      if (error) displayAlert(error as string, "error");
    } catch (error) {
      displayAlert(error as string, "error");
    }
  }
);

export const onCreateNewWidget = createAsyncThunk(
  "onCreateNewWidget",
  async (type: string, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      // const { response, error } = await networkCall(
      //   endpoints.USER_UPDATE,
      //   "PUT",
      // );

      // if (response?.statusCode === "200") {
      // displayAlert("Profile Updated Successfully");

      return fulfillWithValue({
        ...getWidgetInitialValue(type),
        id: Date.now(),
      });
      // } else {
      //   parseError(error);
      //   return rejectWithValue("Something went wrong!");
      // }
    } catch (error) {
      return rejectWithValue("Something went wrong!");
    }
  }
);

export const onSaveWidget = createAsyncThunk(
  "onSaveWidget",
  async (payload: any, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      // const { response, error } = await networkCall(
      //   endpoints.USER_UPDATE,
      //   "PUT",
      // );

      // if (response?.statusCode === "200") {
      // displayAlert("Profile Updated Successfully");

      return fulfillWithValue(payload);
      // } else {
      //   parseError(error);
      //   return rejectWithValue("Something went wrong!");
      // }
    } catch (error) {
      return rejectWithValue("Something went wrong!");
    }
  }
);

export const onRemoveWidget = createAsyncThunk(
  "onRemoveWidget",
  async (widgetId: number, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      // const { response, error } = await networkCall(
      //   endpoints.USER_UPDATE,
      //   "PUT",
      // );

      // if (response?.statusCode === "200") {
      // displayAlert("Profile Updated Successfully");

      return fulfillWithValue(widgetId);
      // } else {
      //   parseError(error);
      //   return rejectWithValue("Something went wrong!");
      // }
    } catch (error) {
      return rejectWithValue("Something went wrong!");
    }
  }
);
export const getMediaFilesData = createAsyncThunk(
  "getMediaFilesData",
  async (
    { tab }: { tab?: string },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { mediaPage } = (getState() as RootState).layoutsSlice;
    const endpoint = `${endpoints.MEDIA}/file/category?page=${
      mediaPage.currentPage
    }&size=18&sort=created_at&sort=desc&status=true${tab ? `&fileType=${tab}` : ""}`;
    try {
      const { response, error } = await networkCall(endpoint, "GET");
      if (error) return rejectWithValue(error);
      if (response.statusCode === "200") return fulfillWithValue(response);
      if (response.statusCode === "404") {
        return rejectWithValue(response.message);
      }
      return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const layoutsSlice = createSlice({
  name: "layoutsSlice",
  initialState,
  reducers: {
    onDragStart: (state, action) => {
      state.draggingItem = action.payload;
    },
    onClearDrop: (state) => {
      state.draggingItem = null;
    },
    onDropAndAdd: (state, action) => {
      const checkDragItem=state.playgroundData[state.selectedScreen].data.find((item)=>item.id===state.draggingItem?.id);
      const checkItem=state.playgroundData[state.selectedScreen].data.find((item)=>item.id===action.payload.id);
      if(!checkDragItem&&!checkItem){
        if (action.payload.mediaType || state.draggingItem?.id) {
          state.playgroundData[state.selectedScreen].data = [
            ...state.playgroundData[state.selectedScreen].data,
            {
              id: state.draggingItem?.id ?? action.payload.id,
              x: action.payload.x || 0,
              y: action.payload.y || 0,
              height: 160,
              width: 250,
              z: state.playgroundData.length,
              data: {
                name: action.payload.name
                  ? action.payload.name
                  : state.draggingItem?.name,
                type: action.payload.mediaType
                  ? action.payload.mediaType
                  : state.draggingItem?.type,
                widgetHTML: "",
                duration: 2,
                path: action.payload.path
                  ? action.payload.path
                  : state.draggingItem?.url,
              },
              zoneData: [],
            },
          ];
         state.playgroundData[state.selectedScreen].duration=state.draggingItem?.duriation??action.payload.duriation;
        }
        state.draggingItem = null;
      }
      state.draggingItem = null;
    },
    onAddZoneData: (state, action) => {
      const checkMedia=state.playgroundData[state.selectedScreen].data.find(item=>item.id===action.payload.id)?.zoneData.find(item=>item.id===action.payload.mediaId);
      if(checkMedia)return;
      state.playgroundData[state.selectedScreen].data = state.playgroundData[
        state.selectedScreen
      ].data.map((item) => {
        return (item.id === action.payload.id&&item.id !== action.payload.mediaId)
          ? {
              ...item,
              zoneData: [
                ...item.zoneData,
                {
                  id: action.payload.mediaId,
                  name: action.payload.name ? action.payload.name : "",
                  type: action.payload.mediaType
                    ? action.payload.mediaType
                    : state.draggingItem?.type,
                  widgetHTML: "",
                  duration: 2,
                  path: action.payload.path
                    ? action.payload.path
                    : state.draggingItem?.url,
                },
              ],
            }
          : item;
      });
    },
    updatePosition: (state, action) => {
      state.playgroundData[state.selectedScreen].data = state.playgroundData[
        state.selectedScreen
      ].data.map((item) => {
        return item.id === action.payload.id
          ? {
              ...item,
              x: action.payload.x,
              y: action.payload.y,
              ...(action.payload.height && {
                height: action.payload.height,
                width: action.payload.width,
              }),
            }
          : item;
      });
    },
    setSelectedWidget: (state, action) => {
      state.selectedWidget = action.payload;
    },
    setSelectedSreen: (state, action) => {
      state.selectedScreen = action.payload;
      state.selectedWidget = null;
    },
    addLayoutScreen: (state) => {
      state.playgroundData = [
        ...state.playgroundData,
        {
          layoutDataIds: { widgets: "", media: [] },
          layoutName: "",
          containerDimensions: { width: 731, height: 411 },
          isVertical: false,
          playlistAdsId: null,
          data: [],
          duration: 0,
          screenId: Date.now(),
        },
      ];
      state.selectedScreen = state.playgroundData.length - 1;
    },
    removeLayoutScreen: (state, action) => {
      if (action.payload === 0) {
        state.selectedScreen = 0;
      } else {
        state.selectedScreen = state.selectedScreen - 1;
      }
      state.playgroundData.splice(action.payload, 1);
    },
    onChangeWidgetField: (state, action) => {
      state.playgroundData[state.selectedScreen].data = state.playgroundData[
        state.selectedScreen
      ].data.map((item) => {
        return item.id === action.payload.id
          ? {
              ...item,
              data: {
                ...item.data,
                [action.payload.name]: action.payload.value,
              },
            }
          : item;
      });
    },
    onChangeWidgeZonetField: (state, action) => {
      const index = state.playgroundData[state.selectedScreen].data.findIndex(
        (item) => item.id === action.payload.id
      );
      let _temp = state.playgroundData[state.selectedScreen].data[index];
      _temp.zoneData[action.payload.zoneIndex][action.payload.name as "name"] =
        action.payload.value;
    },
    onChangeLayoutField: (state, action) => {
      state.playgroundData[state.selectedScreen][
        action.payload.name as "layoutName"
      ] = action.payload.value;
    },
    onDeleteFromPlayground: (state, action) => {
      state.selectedWidget=null;
      state.playgroundData[state.selectedScreen].data = state.playgroundData[
        state.selectedScreen
      ].data.filter((item) => item.id !== action.payload.id);
      state.playgroundData[state.selectedScreen].layoutDataIds.media =
        state.playgroundData[state.selectedScreen].layoutDataIds.media.filter(
          (item) => item !== action.payload.id
        );
    },
    onDeleteFromPlaygroundZone: (state, action) => {
      const index = state.playgroundData[state.selectedScreen].data.findIndex(
        (item) => item.id === action.payload.id
      );
      let _temp =
        state.playgroundData[state.selectedScreen].data[index].zoneData;
      state.playgroundData[state.selectedScreen].data[index].zoneData =
        _temp.filter((_, index) => index !== action.payload.zoneIndex);

      state.playgroundData[state.selectedScreen].layoutDataIds.media =
        state.playgroundData[state.selectedScreen].layoutDataIds.media.filter(
          (item) => item !== action.payload.zoneItemId
        );
    },
    onUpAndBackword: (state, action: { payload: "up" | "back" }) => {
      const index = state.playgroundData[state.selectedScreen].data.findIndex(
        (item) => item.id === state.selectedWidget?.id
      );
      let data = state.playgroundData[state.selectedScreen].data;
      if (action.payload === "back" && index > 0) {
        let tmp = data[index];
        data[index] = data[index - 1];
        data[index - 1] = tmp;
      } else if (action.payload === "up" && index < data.length - 1) {
        let tmp = data[index];
        data[index] = data[index + 1];
        data[index + 1] = tmp;
      }
    },
    togglePreviewEnable: (state) => {
      state.previewEnabled = !state.previewEnabled;
    },
    setContainerLayout: (state, action) => {
      const obj = action.payload;
      const updatedObj = {
        width: obj.width
          ? obj.width
          : state.playgroundData[state.selectedScreen].containerDimensions
              .width,
        height: obj.height
          ? obj.height
          : state.playgroundData[state.selectedScreen].containerDimensions
              .height,
      };
      state.playgroundData[state.selectedScreen].containerDimensions =
        updatedObj;
      state.playgroundData[state.selectedScreen].isVertical =
        action.payload.isVertical;
    },
    clearPage: (state, action) => {
      state.mediaPage.currentPage = action.payload;
    },
    clearMediaData: (state) => {
      state.mediaFiles = [];
    },
    selectedMedia: (state, action) => {
      if (action.payload.type === "widget") {
        state.playgroundData[state.selectedScreen].layoutDataIds.widgets =
          action.payload.id;
      } else {
        const value = state.playgroundData[
          state.selectedScreen
        ].layoutDataIds.media.find((item) => item === action.payload.id);
        !value &&
          (state.playgroundData[state.selectedScreen].layoutDataIds.media = [
            ...state.playgroundData[state.selectedScreen].layoutDataIds.media,
            action.payload.id,
          ]);
      }
    },
    clearData: () => initialState,
    setShowLayoutPreview: (state, action) => {
      state.showPreview = action.payload.show;
    },
    setAdjustedLayoutDimensions: (state, action) => {
      state.playgroundData = action.payload.adjustDimensions;
    },
    addSubWidgets:(state, action)=>{
      state.subWidgets=[...state.subWidgets,action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLayoutWidgets.pending, (state, action) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(getLayoutWidgets.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.widgets = action.payload.data.data;
      state.mediaPage = action.payload.data.pagination;
    });
    builder.addCase(getLayoutWidgets.rejected, (state, action) => {
      state.loading = false;
      state.message = (action.payload as string).toLowerCase().includes("error")
        ? "Something went wrong"
        : (action.payload as string);
    });
    builder.addCase(getLayoutSubWidgets.pending, (state, action) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(getLayoutSubWidgets.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      state.subWidgets = action.payload.data.data;
      state.mediaPage = action.payload.data.pagination;
    });
    builder.addCase(getLayoutSubWidgets.rejected, (state, action) => {
      state.loading = false;
      state.message = (action.payload as string).toLowerCase().includes("error")
        ? "Something went wrong"
        : (action.payload as string);
    });
    builder.addCase(onSaveWidget.pending, (state, action) => {});
    builder.addCase(onSaveWidget.fulfilled, (state, action) => {
      state.subWidgets=state.subWidgets.map((item)=>
        item.id === action.payload.id ? action.payload : item
    );
    });
    builder.addCase(onSaveWidget.rejected, (state, action) => {});
    builder.addCase(onRemoveWidget.pending, (state, action) => {});
    builder.addCase(onRemoveWidget.fulfilled, (state, action) => {
      state.subWidgets = state.subWidgets.filter(
        (item) => item.id !== action.payload
      );
    });
    builder.addCase(onRemoveWidget.rejected, (state, action) => {});

    builder.addCase(getMediaFilesData.pending, (state) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(getMediaFilesData.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "";
      if(state.mediaFiles.length>0&&state.mediaFiles[0]?.id!==action.payload.data.data[0].id){
        state.mediaFiles = [...state.mediaFiles, ...action.payload.data.data];
        state.mediaPage = action.payload.data.pagination;
      }else{
        state.mediaFiles = action.payload.data.data;
        state.mediaPage = action.payload.data.pagination;
      }
    });
    builder.addCase(getMediaFilesData.rejected, (state, action) => {
      state.loading = false;
      state.message = (action.payload as string).toLowerCase().includes("error")
        ? "Something went wrong"
        : (action.payload as string);
      state.mediaFiles = [];
    });
    builder.addCase(getLayouts.fulfilled, (state, action) => {
      if (action.payload.data) {
        const layouts = action.payload.data;
        state.playgroundData = layouts.map((item: any) => {
          const layout = JSON.parse(item.adInformation);
          return {
            ...layout,
            playlistAdsId: item.playlistAdsId,
          };
        });
      }
    });
  },
});

export const {
  onDragStart,
  onClearDrop,
  onDropAndAdd,
  updatePosition,
  setSelectedWidget,
  addLayoutScreen,
  removeLayoutScreen,
  setSelectedSreen,
  onChangeWidgetField,
  onAddZoneData,
  onChangeWidgeZonetField,
  onChangeLayoutField,
  onDeleteFromPlayground,
  onDeleteFromPlaygroundZone,
  onUpAndBackword,
  togglePreviewEnable,
  setContainerLayout,
  setShowLayoutPreview,
  setAdjustedLayoutDimensions,
  clearPage,
  clearMediaData,
  selectedMedia,
  clearData,
  addSubWidgets
} = layoutsSlice.actions;

export default layoutsSlice.reducer;
