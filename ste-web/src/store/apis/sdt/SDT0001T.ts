import { createAsyncThunk } from "@reduxjs/toolkit";
import mca, { getMcaHeader } from "../../../apis/clients/McaClient";
import {
  RT_CD_CODE,
  SVC_CD,
  TransferResponseData,
} from "../../../types/InterfaceTypes";
import { SDT0001T_Input, SDT0001T_Output } from "../../../types/SDTTypes";

/**
 * SDT0001T Fetch STO 종목 틱/N틱 조회
 */
const fetch_SDT0001T = createAsyncThunk(
  "stock/SDT0001T",
  async (input: SDT0001T_Input, thunkAPI) => {
    try {
      const response = await mca.post<TransferResponseData<SDT0001T_Output>>(
        "",
        {
          header: getMcaHeader(SVC_CD.SDT0001T),
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
export default fetch_SDT0001T;
