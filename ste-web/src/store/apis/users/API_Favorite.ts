import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { APIUserPath } from "../../../apis/clients/ApiClient";
import { APIResponse, RES_CD } from "../../../types/InterfaceTypes";
import { Favorites } from "../../../types/APITypes";

/**
 * USERS Controller Fetch 즐겨찾기 종목 조회
 */
export const fetch_favorite = createAsyncThunk(
  "users/favorite/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await api.get<APIResponse<Favorites>>(
        APIUserPath.FAVORITE
      );
      if (response.data.code !== RES_CD.R0000) {
        throw Error(response.data.code);
      }
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

/**
 * USERS Controller Fetch 즐겨찾기 종목 추가
 */
export const save_favorite = createAsyncThunk(
  "users/favorite/save",
  async (symbol: string, thunkAPI) => {
    try {
      const response = await api.post<APIResponse<any>>(APIUserPath.FAVORITE, {
        symbol,
      });
      thunkAPI.dispatch(fetch_favorite());
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

/**
 * USERS Controller Fetch 즐겨찾기 종목 삭제
 */
export const delete_favorite = createAsyncThunk(
  "users/favorite/delete",
  async (symbol: string, thunkAPI) => {
    try {
      const response = await api.delete<APIResponse<any>>(
        APIUserPath.FAVORITE,
        {
          data: { symbol },
        }
      );
      thunkAPI.dispatch(fetch_favorite());
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
