import { ResolutionString } from "../../charting_library/datafeed-api";
import mca, { getMcaHeader } from "../clients/McaClient";
import { SVC_CD, TransferResponseData } from "../../types/InterfaceTypes";
import { SDT0001H_Output, SDT0002T_Output } from "../../types/SDTTypes";

export const convertResolution = function (rs: ResolutionString) {
  // favorite에 1D, 1W, 1M으로 resoution이 셋팅됨
  if (
    rs.length > 1 &&
    (rs.indexOf("D") > -1 || rs.indexOf("W") > -1 || rs.indexOf("M") > -1)
  ) {
    return rs.substring(1);
  } else {
    return rs;
  }
};

export const convertToChartTime = function (
  date: string,
  time: string,
  interval?: string | undefined
) {
  let yyyy = parseInt(date.substring(0, 4));
  let mm = parseInt(date.substring(4, 6));
  let dd = parseInt(date.substring(6, 8));
  let h = 0;
  let m = 0;
  let s = 0;
  if (time && time.length > 5) {
    h = parseInt(time.substring(0, 2));
    m = parseInt(time.substring(2, 4));
    s = parseInt(time.substring(4, 6));
  }

  if (interval) {
    if (interval === "D" || interval === "W" || interval === "M") {
      h = m = s = 0;
      h = 12; // 일봉의 경우 2019/07/24 00:00:00 은 23일로 그려짐. 24시로 세팅시 Date는 Thu Jul 25 2019 00:00:00 GMT+0900 (한국 표준시)
    } else {
      // 분봉은 0:00 시작을 기준으로 계산
      // const strStartEpochTime = parseFloat(new Date(yyyy, mm - 1, dd, '00', '00', '00', '000').getTime(), 10)
      // const strCurrentEpochTime = parseFloat(new Date(yyyy, mm - 1, dd, h, m, '00', '000').getTime(), 10)
      const ntickEpoch = parseInt(interval) * 60 * 1000;
      // const charttime = strStartEpochTime + ((strCurrentEpochTime - strStartEpochTime) - ((strCurrentEpochTime - strStartEpochTime) % ntickEpoch)) + ntickEpoch
      // 분봉은 0:01 시작을 기준으로
      // 24:00:00 -> 23:59:59, 23:00:00 -> 23:00:00, 23:00:01 -> 23:01:00
      let charttime = new Date(yyyy, mm - 1, dd, h, m, 0, 0).getTime();
      if (h === 24 && m === 0 && s === 0) {
        charttime = new Date(yyyy, mm - 1, dd, 23, 59, 0, 0).getTime();
      } else if (s > 0) {
        charttime = charttime + ntickEpoch;
      }
      return charttime;
    }
  }
  mm = mm - 1;
  const newDate = new Date(yyyy, mm, dd, h, m, s, 0).getTime();
  return newDate;
};

export const fetchMinData = (
  code: string,
  min: string,
  next_flag: string,
  next_key: string
) => {
  return mca.post<TransferResponseData<SDT0002T_Output>>("", {
    header: getMcaHeader(SVC_CD.SDT0002T),
    body: {
      input: {
        in_da_shrt_cd: code,
        in_array_cnt: "100",
        in_fake_flag: "1", //허봉
        in_xtick: min,
        in_next_flag: next_flag,
        in_next_key: next_key,
      },
    },
  });
};

export const fetchDayData = (
  code: string,
  min: string,
  next_flag: string,
  next_key: string
) => {
  return mca.post<TransferResponseData<SDT0001H_Output>>("", {
    header: getMcaHeader(SVC_CD.SDT0001H),
    body: {
      input: {
        in_da_shrt_cd: code,
        in_array_cnt: "100",
        in_dwmy_dvd_cd: min,
        in_next_flag: next_flag,
        in_next_key: next_key,
      },
    },
  });
};
