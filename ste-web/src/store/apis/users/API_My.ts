import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { APIUserPath } from "../../../apis/clients/ApiClient";
import { APIResponse, RES_CD } from "../../../types/InterfaceTypes";

/**
 * USERS Controller Fetch : 사용자 찾기
 */
const fetch_my = createAsyncThunk("users/my", async (_, thunkAPI) => {
  try {
    const response = await api.get<APIResponse<any>>(APIUserPath.FIND_USER);
    if (response?.data?.code !== RES_CD.R0000) {
      throw Error(response?.data?.code);
    }
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});
export default fetch_my;
