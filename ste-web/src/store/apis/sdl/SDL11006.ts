import { createAsyncThunk } from "@reduxjs/toolkit";
import mca, { getMcaHeader } from "../../../apis/clients/McaClient";
import {
  RT_CD_CODE,
  SVC_CD,
  TransferResponseData,
} from "../../../types/InterfaceTypes";
import { SDL11006_Input, SDL11006_Output } from "../../../types/SDLTypes";

/**
 * SDL11006 Fetch STO 거래내역 조회
 */
const fetch_SDL11006 = createAsyncThunk(
  "stock/SDL11006",
  async (input: SDL11006_Input, thunkAPI) => {
    try {
      const response = await mca.post<TransferResponseData<SDL11006_Output>>(
        "",
        {
          header: getMcaHeader(SVC_CD.SDL11006),
          body: {
            input: input,
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
export default fetch_SDL11006;
