import { store, stockUnsubscribe } from "../../store/configureStore";
import { StockState } from "../../store/reducers/stockReducer";
import {
  SDT0001M_Output,
  SDT0002T_Output,
  SDT0002T_Output_List,
  SDT0001H_Output,
  SDT0001H_Output_List,
} from "../../types/SDTTypes";
import {
  IExternalDatafeed,
  IDatafeedChartApi,
  DatafeedConfiguration,
  ResolutionString,
  LibrarySymbolInfo,
  Bar,
} from "../../charting_library/datafeed-api";
import {
  convertResolution,
  convertToChartTime,
  fetchDayData,
  fetchMinData,
} from "./Helpers";
import i18n from "../../i18n";

const supportedResolutions: ResolutionString[] = [
  "1" as ResolutionString,
  "5" as ResolutionString,
  "10" as ResolutionString,
  "30" as ResolutionString,
  "60" as ResolutionString,
  "D" as ResolutionString,
  "W" as ResolutionString,
  "M" as ResolutionString,
  "12M" as ResolutionString,
];
const config: DatafeedConfiguration = {
  supports_marks: false,
  supports_timescale_marks: true,
  supported_resolutions: supportedResolutions,
};

type typeHistory = {
  lastChartDate: number;
  lastBar: {
    //[key: string]: number | string
    todate?: number;
    date?: string;
    time?: string;
    open: number;
    high: number;
    low: number;
    close?: number;
    volume?: number;
  };
};
const history: typeHistory = {
  lastChartDate: 0,
  lastBar: { open: 0, high: 0, low: 0 },
};
const historyOption = {
  next_flag: "0", // 0 : Default 조회, 1 : Next 조회
  next_key: "", // 첫 조회후 다음 액션이 있을 때 조회할 키값
};

interface IDatafeed extends IExternalDatafeed, IDatafeedChartApi {
  resetLastDate(): void;
}

const Datafeed: IDatafeed = {
  /* mandatory methods for realtime chart */
  onReady: (cb) => {
    // console.log("=====onReady running");
    setTimeout(() => cb(config), 0);
  },

  // only need searchSymbols when search is enabled
  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    // console.log("====Search Symbols running");
  },

  resolveSymbol: (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) => {
    // expects a symbolInfo object in response
    // console.log("======resolveSymbol running");
    const stockState: StockState = store.getState().stock;
    const stock = stockState.stock as SDT0001M_Output;
    const symbolStub = {
      name: symbolName,
      ticker: i18n.language === "en" ? stock.da_eng_is_nm : stock.da_hngl_is_nm,
      description: "",
      session: "24x7",
      minmov: 1,
      minmove2: 0,
      // pointvalue: 1,
      pricescale: 1,
      has_daily: true,
      has_weekly_and_monthly: true,
      has_intraday: true,
      // has_no_volume: false,
      supported_resolutions: supportedResolutions,
      volume_precision: 4,
      timezone: "Asia/Seoul",
      data_status: "streaming",
    } as LibrarySymbolInfo;

    setTimeout(function () {
      onSymbolResolvedCallback(symbolStub);
      // console.log("Resolving that symbol....", symbolStub);
    }, 0);
  },

  getBars: (symbolInfo, resolution, periodParams, onResult, onError) => {
    // console.log("=====getBars running");
    const interval = convertResolution(resolution);

    function updateBar(rdata: SDT0002T_Output | SDT0001H_Output) {
      let bars: Bar[] = [];
      let data = {
        v: [] as number[],
        t: [] as number[],
        o: [] as number[],
        h: [] as number[],
        l: [] as number[],
        c: [] as number[],
      };
      let chartdata: SDT0002T_Output_List[] | SDT0001H_Output_List[] | any[] =
        rdata["Array_List"] || [];
      // 데이터가 desc 정렬 상태이기 때문에 reverse 해준다.
      for (let i = chartdata.length - 1; i >= 0; i--) {
        var date = chartdata[i]["da_bsnss_dt"];
        var time = chartdata[i]["da_fnl_ccls_tm"] || "000000";
        var open = parseFloat(chartdata[i]["da_opn_prc"]);
        var high = parseFloat(chartdata[i]["da_hgh_prc"]);
        var low = parseFloat(chartdata[i]["da_lw_prc"]);
        var close = parseFloat(
          chartdata[i]["da_cls_prc"] || chartdata[i]["da_ccls_prc"]
        );
        var volume = parseFloat(chartdata[i]["da_acml_vlm"]);
        let todate =
          interval === "D" || interval === "W" || interval === "M"
            ? convertToChartTime(date, time, interval)
            : convertToChartTime(date, time);
        // console.log(date, time, volume, (new Date(todate)).toString())
        data.t.push(todate); // times
        data.o.push(open); // opens
        data.h.push(high); // highs
        data.l.push(low); // lows
        data.c.push(close); // closes
        data.v.push(volume); // volumes

        // if (i === 0) {
        //   console.log(
        //     "last time getbar",
        //     history.lastChartDate,
        //     new Date(history.lastChartDate).toString(),
        //     history
        //   );
        // }
        if (i === 0 && history.lastChartDate < todate) {
          // console.log("lastbar setting in getBar-------------------");
          history.lastChartDate = todate;
          history.lastBar = {
            todate: todate,
            date: date,
            time: time,
            open: open,
            high: high,
            low: low,
            close: close,
            volume: volume,
          };
        }
      }

      var volumePresent = typeof data.v !== "undefined";
      var ohlPresent = typeof data.o !== "undefined";

      for (var i = 0; i < chartdata.length; ++i) {
        var barValue = {
          time: data.t[i],
          close: data.c[i],
          volume: 0,
          open: 0,
          high: 0,
          low: 0,
        };
        if (volumePresent) {
          barValue.volume = data.v[i];
        }
        var valueCheck =
          data.o[i] === 0 ||
          data.h[i] === 0 ||
          data.l[i] === 0 ||
          data.c[i] === 0; // 가끔 데이터가 0으로 들어옴
        if (ohlPresent && !valueCheck) {
          barValue.open = data.o[i];
          barValue.high = data.h[i];
          barValue.low = data.l[i];
        } else {
          barValue.open =
            barValue.high =
            barValue.low =
            barValue.close =
              data.c[i - 1];
          barValue.volume = 0;
        }
        bars.push(barValue);
      }
      // console.error('bars lastdate', new Date(history.lastChartDate).toString())
      // console.log(bars);
      onResult(bars, { noData: false });
    }

    if (periodParams.from > 0 && (periodParams.from + "").length > 10) {
      onError(
        "Got a JS time instead of Unix one. " +
          periodParams.from +
          "~" +
          periodParams.to
      );
    }

    if (periodParams.firstDataRequest) {
      historyOption.next_flag = "0";
      historyOption.next_key = "";
    } else if (historyOption.next_flag === "0") {
      // 다음조회 액션에서 다음데이터가 없다면
      onResult([], { noData: true });
      return;
    }

    const symbol = symbolInfo.name;
    var callFunc = null;

    if (interval === "D" || interval === "W" || interval === "M") {
      callFunc = fetchDayData(
        symbol,
        interval,
        historyOption.next_flag,
        historyOption.next_key
      );
    } else {
      callFunc = fetchMinData(
        symbol,
        interval,
        historyOption.next_flag,
        historyOption.next_key
      );
    }
    callFunc
      .then((response) => {
        if (response.data.body.message.rt_cd === "0") {
          const rdata = response.data.body.output;
          historyOption.next_flag = rdata["next_flag"];
          historyOption.next_key = rdata["next_key"];
          updateBar(rdata);
        }
      })
      .catch(function (error) {
        onError(error);
      });
  },

  subscribeBars: (
    symbolInfo,
    resolution,
    onTick,
    listenerGuid,
    onResetCacheNeededCallback
  ) => {
    // console.log("=====subscribeBars runnning", listenerGuid, resolution);
    const interval = convertResolution(resolution);
    function updateBar(data: SDT0001M_Output) {
      if (!data) return;
      var todate = convertToChartTime(
        data["da_bsnss_dt"],
        data["da_fnl_ccls_tm"],
        interval
      );

      var close = parseFloat(data["da_now_prc"]);
      // var open = parseFloat(data["da_opn_prc"]);
      var high = parseFloat(data["da_hgh_prc"]);
      var low = parseFloat(data["da_lw_prc"]);
      var vol = parseFloat(data["da_acml_vlm"]);

      // console.log(
      //   "last time",
      //   history.lastChartDate,
      //   new Date(history.lastChartDate).toString(),
      //   history
      // );
      if (history.lastChartDate !== todate) {
        if (history.lastChartDate > todate) return; // getBar에서 가져온 데이터보다 이전 데이터가 넘어올 때가 있다.
        // 봉 추가
        history.lastChartDate = todate;
        history.lastBar = {
          todate: todate,
          date: data["da_bsnss_dt"],
          time: data["da_fnl_ccls_tm"],
          open: close,
          high: close,
          low: close,
          close: close,
          volume: vol,
        };
      } else {
        history.lastBar.close = close;
        if (interval === "D") {
          history.lastBar.high = high;
          history.lastBar.low = low;
        } else if (interval === "W" || interval === "M" || interval === "Y") {
          if (high > history.lastBar.high) history.lastBar.high = high;
          if (low < history.lastBar.low) history.lastBar.low = low;
        } else {
          if (close > history.lastBar.high) history.lastBar.high = close;
          if (close < history.lastBar.low) history.lastBar.low = close;
        }
        history.lastBar.volume = vol;
      }

      const _lastBar: Bar = {
        time: todate,
        close: close,
        open: history.lastBar.open,
        high: history.lastBar.high,
        low: history.lastBar.low,
        volume: history.lastBar.volume,
      };
      // console.log(interval, new Date(_lastBar.time).toString(), _lastBar);
      // console.log(
      //   df(new Date(_lastBar.time)),
      //   data["da_fnl_ccls_tm"],
      //   _lastBar.volume,
      //   "시",
      //   _lastBar.open,
      //   "고",
      //   _lastBar.high,
      //   "저",
      //   _lastBar.low,
      //   "종",
      //   _lastBar.close
      // );
      // function df(date) {
      //   return (
      //     date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
      //   );
      // }
      onTick(_lastBar);
    }

    store.subscribe(() => {
      const stockState: StockState = store.getState().stock;
      const stock = stockState.stock as SDT0001M_Output;
      updateBar(stock);
    });
  },

  unsubscribeBars: (listenerGuid) => {
    // console.log("=====unsubscribeBars running", listenerGuid);
    stockUnsubscribe({ cancelActive: true });
  },

  resetLastDate: () => {
    history.lastChartDate = 0;
    historyOption.next_flag = "0";
    historyOption.next_key = "";
  },
};

export default Datafeed;
