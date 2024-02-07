import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { APICommonPath } from "../../../apis/clients/ApiClient";
import { APIResponse } from "../../../types/InterfaceTypes";

/**
 * Common Controller Fetch : 코드리스트
 */
const fetch_code = createAsyncThunk(
  "common/code",
  async (input: undefined, thunkAPI) => {
    try {
      const response = await api.get<APIResponse<any>>(APICommonPath.GET_CODE, {
        params: input,
      });

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export default fetch_code;
