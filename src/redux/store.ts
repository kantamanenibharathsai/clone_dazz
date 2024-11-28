import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./unifiedReducers";

export const store = configureStore({
  reducer: {
    ...reducers.common,
    ...reducers.adAgency,
    ...reducers.admin,
    ...reducers.superAdmin,
    ...reducers.host,
    ...reducers.vendor,
    ...reducers.user,
    ...reducers.investor,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
