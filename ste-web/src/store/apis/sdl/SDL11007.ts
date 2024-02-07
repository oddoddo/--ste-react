import { createAsyncThunk } from "@reduxjs/toolkit";
import { SDL11007_Input, SDL11007_Output } from "../../../types/SDLTypes";
import mca, { getMcaHeader } from "../../../apis/clients/McaClient";
import {
  RT_CD_CODE,
  SVC_CD,
  TransferResponseData,
} from "../../../types/InterfaceTypes";

/**
 * SDL11007 계좌 주식매도 주문가능 잔고 조회
 */
const fetch_SDL11007 = createAsyncThunk(
  "stock/SDL11007",
  async (input: SDL11007_Input, thunkAPI) => {
    try {
      const response = await mca.post<TransferResponseData<SDL11007_Output>>(
        "",
        {
          header: getMcaHeader(SVC_CD.SDL11007),
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
export default fetch_SDL11007;
