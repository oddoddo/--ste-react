import { createAsyncThunk } from "@reduxjs/toolkit";
import mca, { getMcaHeader } from "../../../apis/clients/McaClient";
import {
  RT_CD_CODE,
  SVC_CD,
  TransferResponseData,
} from "../../../types/InterfaceTypes";
import { SDT0003M_Input, SDT0003M_Output } from "../../../types/SDTTypes";

/**
 * SDT0003M 종목 리스트 검색
 */
const fetch_SDT0003M = createAsyncThunk(
  "stock/SDT0003M",
  async (input: SDT0003M_Input, thunkAPI) => {
    try {
      const response = await mca.post<TransferResponseData<SDT0003M_Output>>(
        "",
        {
          header: getMcaHeader(SVC_CD.SDT0003M),
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
export default fetch_SDT0003M;
