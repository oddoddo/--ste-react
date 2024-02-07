import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { APIUserPath } from "../../../apis/clients/ApiClient";
import { APIResponse } from "../../../types/InterfaceTypes";

/**
 * USERS Controller Fetch ID중복체크
 */
const fetch_resetPw = createAsyncThunk(
  "users/find/pass",
  async (
    input: { id: string; idenToken: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await api.post<APIResponse<any>>(
        APIUserPath.RESET_PW,
        input
      );

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export default fetch_resetPw;
