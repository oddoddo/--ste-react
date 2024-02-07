import { createAsyncThunk } from "@reduxjs/toolkit";
import { SDT0002M_Input, SDT0002M_Output } from "../../../types/SDTTypes";
import mca, { getMcaHeader } from "../../../apis/clients/McaClient";
import {
  RT_CD_CODE,
  SVC_CD,
  TransferResponseData,
} from "../../../types/InterfaceTypes";

/**
 * SDT0002M Fetch
 */
const fetch_SDT0002M = createAsyncThunk(
  "stock/SDT0002M",
  async (input: SDT0002M_Input, thunkAPI) => {
    try {
      const response = await mca.post<TransferResponseData<SDT0002M_Output>>(
        "",
        {
          header: getMcaHeader(SVC_CD.SDT0002M),
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
export default fetch_SDT0002M;
