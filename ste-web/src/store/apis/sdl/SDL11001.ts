import { createAsyncThunk } from "@reduxjs/toolkit";
import { SDL11001_Input, SDL11001_Output } from "../../../types/SDLTypes";
import mca, { getMcaHeader } from "../../../apis/clients/McaClient";
import {
  RT_CD_CODE,
  SVC_CD,
  TransferResponseData,
} from "../../../types/InterfaceTypes";

/**
 * SDL11001 Fetch 계좌정보 조회
 */
const fetch_SDL11001 = createAsyncThunk(
  "stock/SDL11001",
  async (input: SDL11001_Input, thunkAPI) => {
    try {
      const response = await mca.post<TransferResponseData<SDL11001_Output>>(
        "",
        {
          header: getMcaHeader(SVC_CD.SDL11001),
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
export default fetch_SDL11001;
