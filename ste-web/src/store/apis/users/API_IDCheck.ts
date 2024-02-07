import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { APIUserPath } from "../../../apis/clients/ApiClient";
import { APIResponse } from "../../../types/InterfaceTypes";

/**
 * USERS Controller Fetch ID중복체크
 */
const fetch_idcheck = createAsyncThunk(
  "users/idcheck",
  async (input: { id: string; usage?: "FINDID" }, thunkAPI) => {
    try {
      const response = await api.post<APIResponse<any>>(
        APIUserPath.ID_CHECK,
        input
      );

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export default fetch_idcheck;
