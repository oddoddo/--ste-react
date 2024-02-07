import { createAsyncThunk } from "@reduxjs/toolkit";
import mca, { getMcaHeader } from "../../../apis/clients/McaClient";
import {
  RT_CD_CODE,
  SVC_CD,
  TransferResponseData,
} from "../../../types/InterfaceTypes";
import {
  SDL11008_Input,
  SDL11008_Output,
  SDL11010_Input,
  SDL11010_Output,
} from "../../../types/SDLTypes";

/**
 * SDL11010 Fetch 트랜잭션 조회
 */
const fetch_SDL11010 = createAsyncThunk(
  "stock/SDL11010",
  async (input: SDL11010_Input, thunkAPI) => {
    try {
      const response = await mca.post<TransferResponseData<SDL11010_Output>>(
        "",
        {
          header: getMcaHeader(SVC_CD.SDL11010),
          body: {
            input,
          },
        }
      );
      if (response.data.body.message.rt_cd !== RT_CD_CODE.OK)
        thunkAPI.rejectWithValue(response.data.body.message.err_msg);

      return response.data.body.output;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export default fetch_SDL11010;
