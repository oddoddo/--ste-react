import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { APIUserPath } from "../../../apis/clients/ApiClient";
import { APIResponse } from "../../../types/InterfaceTypes";

/**
 * USERS Controller Fetch : 회원가입
 */
const fetch_signup = createAsyncThunk(
  "users/signup",
  async (
    input: {
      id: string;
      password: string;
      idenToken: string;
      term1: string;
      term2: string;
      term3: string;
      term4: string;
      term5: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await api.post<APIResponse<any>>(
        APIUserPath.SIGN_UP,
        input
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export default fetch_signup;
