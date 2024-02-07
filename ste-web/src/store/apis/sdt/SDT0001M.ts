import { createAsyncThunk } from "@reduxjs/toolkit";
import mca, { getMcaHeader } from "../../../apis/clients/McaClient";
import {
  RT_CD_CODE,
  SVC_CD,
  TransferResponseData,
} from "../../../types/InterfaceTypes";
import { SDT0001M_Output } from "../../../types/SDTTypes";

/**
 * SDT0001M Fetch STO 종목 현재가 조회
 */
const fetch_SDT0001M = createAsyncThunk(
  "stock/SDT0001M",
  async (shortCode: string, thunkAPI) => {
    try {
      const response = await mca.post<TransferResponseData<SDT0001M_Output>>(
        "",
        {
          header: getMcaHeader(SVC_CD.SDT0001M),
          body: {
            input: {
              in_da_shrt_cd: shortCode,
            },
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
export default fetch_SDT0001M;
