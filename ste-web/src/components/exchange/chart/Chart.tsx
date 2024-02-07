import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import {
  ChartingLibraryWidgetOptions,
  LibrarySymbolInfo,
  ResolutionString,
  widget,
} from "../../../charting_library";
import { Box } from "@chakra-ui/react";
import Datafeed from "../../../apis/tv/Datafeed";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../../../utils";
import { useStockName } from "../../../hooks/useStockName";

const Chart: React.FC = () => {
  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const code = useSelector((state: RootState) => state.stock.code);
  const stockName = useStockName();

  const { i18n } = useTranslation();

  useEffect(() => {
    if (!stockName || code === "") return;

    const defaultProps: Omit<ChartContainerProps, "container"> = {
      symbol: code || "",
      interval: "D" as ResolutionString,
      datafeedUrl: "https://demo_feed.tradingview.com",
      libraryPath: "/charting_library/",
      chartsStorageUrl: "https://saveload.tradingview.com",
      chartsStorageApiVersion: "1.1",
      clientId: "tradingview.com",
      userId: "public_user_id",
      fullscreen: false,
      autosize: true,
      studiesOverrides: {},
    };

    const widgetOptions: any = {
      symbol: code as string,
      // tslint:disable-next-line:no-any
      datafeed: Datafeed,
      interval:
        defaultProps.interval as ChartingLibraryWidgetOptions["interval"],
      container: chartContainerRef.current,
      library_path: defaultProps.libraryPath as string,
      locale: i18n.language || "en",
      disabled_features: [
        "volume_force_overlay",
        "header_undo_redo",
        "header_saveload",
        "header_fullscreen_button",
        "header_symbol_search",
        "symbol_search_hot_key",
        "adaptive_logo",
        "go_to_date",
        "header_compare",
        "compare_symbol",
        "timeframes_toolbar",
        // "use_localstorage_for_settings",
        "study_templates",
      ],
      enabled_features: ["hide_left_toolbar_by_default"],
      charts_storage_url: "",
      charts_storage_api_version: "",
      client_id: defaultProps.clientId,
      user_id: defaultProps.userId,
      fullscreen: defaultProps.fullscreen,
      autosize: defaultProps.autosize,
      overrides: {
        // "paneProperties.legendProperties.showStudyArguments": false,
        "mainSeriesProperties.style": 1,
        "mainSeriesProperties.candleStyle.upColor": "#ed3738",
        "mainSeriesProperties.candleStyle.downColor": "#0a7df3",
        "mainSeriesProperties.candleStyle.drawWick": true,
        // "mainSeriesProperties.candleStyle.drawBorder": true,
        // "mainSeriesProperties.candleStyle.borderColor": "#378658",
        "mainSeriesProperties.candleStyle.wickUpColor": "#ed3738",
        "mainSeriesProperties.candleStyle.wickDownColor": "#0a7df3",
        "mainSeriesProperties.candleStyle.borderUpColor": "#ed3738",
        "mainSeriesProperties.candleStyle.borderDownColor": "#0a7df3",
        "mainSeriesProperties.candleStyle.barColorsOnPrevClose": true,

        "mainSeriesProperties.hollowCandleStyle.upColor": "#ed3738",
        "mainSeriesProperties.hollowCandleStyle.downColor": "#0a7df3",
        "mainSeriesProperties.hollowCandleStyle.wickUpColor": "#ed3738",
        "mainSeriesProperties.hollowCandleStyle.wickDownColor": "#0a7df3",
        "mainSeriesProperties.hollowCandleStyle.borderUpColor": "#ed3738",
        "mainSeriesProperties.hollowCandleStyle.borderDownColor": "#0a7df3",

        "mainSeriesProperties.haStyle.upColor": "#ed3738",
        "mainSeriesProperties.haStyle.downColor": "#0a7df3",
        "mainSeriesProperties.haStyle.wickUpColor": "#ed3738",
        "mainSeriesProperties.haStyle.wickDownColor": "#0a7df3",
        "mainSeriesProperties.haStyle.borderUpColor": "#ed3738",
        "mainSeriesProperties.haStyle.borderDownColor": "#0a7df3",

        "study_Overlay@tv-basicstudies.style": 1,
        "study_Overlay@tv-basicstudies.lineStyle.color": "#351c75",
        "symbolWatermarkProperties.transparency": 90,
        volumePaneSize: "medium",
      },
      studies_overrides: {
        "volume.volume.plottype": "columns",
        "volume.volume.color.0": "#0a7df3",
        "volume.volume.color.1": "#ed3738",
        "volume.volume.transparency": 50,
        // "volume.volume ma.plottype": "line",
        // "volume.volume ma.color": "#9bba8e",
        // "volume.volume ma.transparency": 50,
        // "volume.volume ma.linewidth": 2,
        // "volume.MA length": 15,
        // "volume.show ma": true,
      },
      favorites: {
        intervals: ["1", "10", "30", "60", "D", "W", "M"],
      },
      time_frames: [],
      timezone: "Asia/Seoul",
      custom_translate_function: (
        key: string,
        options: any,
        isTranslated: boolean
      ) => {
        if (key === "오픈") {
          return "시가";
        } else if (key === "클로즈") {
          return "종가";
        } else if (
          i18n.language === "ko" &&
          (key === "Moving Average" || key === "MA")
        ) {
          return "이동평균";
        }
        return null;
      },
      custom_formatters: {
        // https://www.tradingview.com/charting-library-docs/latest/api/interfaces/Charting_Library.ChartingLibraryWidgetOptions/#custom_formatters
        priceFormatterFactory: (
          symbolInfo: LibrarySymbolInfo,
          minTick: string
        ) => {
          return {
            format: (price: number, signPositive?: boolean) => {
              if (price > 999 || price < -999) {
                return formatPrice(price);
              } else return price;
            },
          };
        },
      },
    };

    const tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      tvWidget.chart().createStudy("Volume", false, false, undefined, {
        showLabelsOnPriceScale: false,
      });
      tvWidget.activeChart().createStudy(
        "Moving Average",
        false,
        false,
        { length: 5 },
        {
          "Plot.color": "#58BF40",
        }
      );
      tvWidget.activeChart().createStudy(
        "Moving Average",
        false,
        false,
        { length: 20 },
        {
          "Plot.color": "#EE4747",
        }
      );
      tvWidget.activeChart().createStudy(
        "Moving Average",
        false,
        false,
        { length: 60 },
        {
          "Plot.color": "#F48416",
        }
      );
      tvWidget.activeChart().createStudy(
        "Moving Average",
        false,
        false,
        { length: 120 },
        {
          "Plot.color": "#9E5CCD",
        }
      );
      tvWidget
        .activeChart()
        .onDataLoaded()
        .subscribe(
          {},
          function () {
            if (tvWidget.chart().symbol() !== code) {
              tvWidget.setSymbol(
                code,
                defaultProps.interval as ChartingLibraryWidgetOptions["interval"],
                function () {}
              );
              tvWidget.chart().executeActionById("timeScaleReset");
            }
          },
          true
        );
      tvWidget
        .activeChart()
        .onIntervalChanged()
        .subscribe({}, function (interval, obj) {
          Datafeed.resetLastDate();
          tvWidget.setSymbol(code, interval, function () {});
          tvWidget.chart().executeActionById("timeScaleReset");
        });
    });
    return () => {
      if (tvWidget) tvWidget.remove();
    };
  }, [code, stockName, i18n.language]);

  return (
    <Box width="100%" height="100%">
      <Box
        ref={chartContainerRef}
        style={{ height: "100%", width: "100%" }}
      ></Box>
    </Box>
  );
};
export default Chart;

export interface ChartContainerProps {
  symbol: ChartingLibraryWidgetOptions["symbol"];
  interval: ChartingLibraryWidgetOptions["interval"];
  datafeedUrl: string;
  libraryPath: ChartingLibraryWidgetOptions["library_path"];
  chartsStorageUrl: ChartingLibraryWidgetOptions["charts_storage_url"];
  chartsStorageApiVersion: ChartingLibraryWidgetOptions["charts_storage_api_version"];
  clientId: ChartingLibraryWidgetOptions["client_id"];
  userId: ChartingLibraryWidgetOptions["user_id"];
  fullscreen: ChartingLibraryWidgetOptions["fullscreen"];
  autosize: ChartingLibraryWidgetOptions["autosize"];
  studiesOverrides: ChartingLibraryWidgetOptions["studies_overrides"];
  container: ChartingLibraryWidgetOptions["container"];
}
