import { createAsyncThunk } from "@reduxjs/toolkit";
import { SDL11002_Input, SDL11002_Output } from "../../../types/SDLTypes";
import mca, { getMcaHeader } from "../../../apis/clients/McaClient";
import {
  RT_CD_CODE,
  SVC_CD,
  TransferResponseData,
} from "../../../types/InterfaceTypes";

/**
 * SDL11002 Fetch 계좌 주식매수주문가능금액 조회
 */
const fetch_SDL11002 = createAsyncThunk(
  "stock/SDL11002",
  async (input: SDL11002_Input, thunkAPI) => {
    try {
      const response = await mca.post<TransferResponseData<SDL11002_Output>>(
        "",
        {
          header: getMcaHeader(SVC_CD.SDL11002),
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
export default fetch_SDL11002;
