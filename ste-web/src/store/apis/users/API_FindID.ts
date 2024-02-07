import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { APIUserPath } from "../../../apis/clients/ApiClient";
import { APIResponse, RES_CD, RT_CD_CODE } from "../../../types/InterfaceTypes";

/**
 * USERS Controller Fetch : 로그인
 */
const fetch_findId = createAsyncThunk(
  "users/find/id",
  async (input: { idenToken: string }, thunkAPI) => {
    const response = await api.post<APIResponse<any>>(
      APIUserPath.FIND_ID,
      input
    );
    if (response.data.code !== RES_CD.R0000) {
      thunkAPI.rejectWithValue(response.data);
    }
    return response.data.data;
  }
);
export default fetch_findId;
