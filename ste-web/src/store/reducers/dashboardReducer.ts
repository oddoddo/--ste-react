import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DashboardState,
  Item,
} from "../../components/dashboard/DashboardTypes";

const initialState: DashboardState = {
  items: [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
  },
});

export default dashboardSlice.reducer;
