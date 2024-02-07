import { createAsyncThunk } from "@reduxjs/toolkit";
import mca, { getMcaHeader } from "../../../apis/clients/McaClient";
import { SVC_CD, TransferResponseData } from "../../../types/InterfaceTypes";
import { SDT0001H_Input, SDT0001H_Output } from "../../../types/SDTTypes";

/**
 * SDT0001H Fetch STO 종목 일/주/월/년 조회
 */
const fetch_SDT0001H = createAsyncThunk(
  "stock/SDT0001H",
  async (input: SDT0001H_Input, thunkAPI) => {
    try {
      const response = await mca.post<TransferResponseData<SDT0001H_Output>>(
        "",
        {
          header: getMcaHeader(SVC_CD.SDT0001H),
          body: {
            input: input,
          },
        }
      );
      if (response.data.body.message.rt_cd !== "0")
        thunkAPI.rejectWithValue(response.data.body.message.err_msg);

      return response.data.body.output;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export default fetch_SDT0001H;
