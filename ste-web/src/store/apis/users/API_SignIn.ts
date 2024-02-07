import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { APIUserPath } from "../../../apis/clients/ApiClient";
import { APIResponse, RES_CD, RT_CD_CODE } from "../../../types/InterfaceTypes";

/**
 * USERS Controller Fetch : 로그인
 */
const fetch_signin = createAsyncThunk(
  "users/signin",
  async (input: { id: string; password: string }, thunkAPI) => {
    try {
      const response = await api.post<APIResponse<any>>(
        APIUserPath.SIGN_IN,
        input
      );

      if (response.data.code !== RES_CD.R0000) {
        console.log("RES NOT 0000");
        thunkAPI.rejectWithValue(response.data);
      }
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export default fetch_signin;
