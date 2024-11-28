import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  value: number;
}

const initialState: InitialStateType = {
  value: 0,
};

const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState,
  reducers: {
    updateUserSetting: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateUserSetting } = settingsSlice.actions;
export default settingsSlice.reducer;
