import { createAsyncThunk } from "@reduxjs/toolkit";
import { SDL11003_Input, SDL11003_Output } from "../../../types/SDLTypes";
import mca, { getMcaHeader } from "../../../apis/clients/McaClient";
import {
  RT_CD_CODE,
  SVC_CD,
  TransferResponseData,
} from "../../../types/InterfaceTypes";

/**
 * SDL11003 Fetch STO 계좌 주식자산평가 조회
 */
const fetch_SDL11003 = createAsyncThunk(
  "stock/SDL11003",
  async (input: SDL11003_Input, thunkAPI) => {
    try {
      const response = await mca.post<TransferResponseData<SDL11003_Output>>(
        "",
        {
          header: getMcaHeader(SVC_CD.SDL11003),
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
export default fetch_SDL11003;
