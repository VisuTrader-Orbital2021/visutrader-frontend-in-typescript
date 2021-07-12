import React from "react";
import CanvasJSReact from "../assets/canvasjs.stock.react";
let CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const DAILY = "DAILY";
const INTRADAY = "INTRADAY";
const CANDLESTICK = "CANDLESTICK";
const SPLINE_AREA = "SPLINE AREA";

export default function StockChart({ stockType, stockData, chartType }) {
  if (stockType === DAILY) {
    return chartType === CANDLESTICK ? (
      <DailyCandlestickChart stockData={stockData} />
    ) : (
      <DailySplineAreaChart stockData={stockData} />
    );
  } else {
    return chartType === CANDLESTICK ? (
      <IntradayCandlestickChart stockData={stockData} />
    ) : (
      <IntradaySplineAreaChart stockData={stockData} />
    );
  }
}

const DailyCandlestickChart = ({ stockData }) => {
  return (
    <CanvasJSStockChart
      options={{
        theme: "light2",
        charts: [
          {
            axisX: {
              tickLength: 0,
              labelFormatter: function (e) {
                return "";
              },
              crosshair: {
                enabled: true,
                snapToDataPoint: true,
                labelFormatter: function (e) {
                  return "";
                },
              },
              scaleBreaks: {
                spacing: 0,
                fillOpacity: 0,
                lineThickness: 0,
                customBreaks: stockData.reduce(
                  (breaks, value, index, array) => {
                    if (index === 0) return breaks;
                    const currentDataPointUnix = Number(new Date(value.date));
                    const previousDataPointUnix = Number(
                      new Date(array[index - 1].date)
                    );
                    const oneDayInMs = 86400000;
                    const difference =
                      previousDataPointUnix - currentDataPointUnix;
                    return difference === oneDayInMs
                      ? breaks
                      : [
                          ...breaks,
                          {
                            startValue: currentDataPointUnix,
                            endValue: previousDataPointUnix - oneDayInMs,
                          },
                        ];
                  },
                  []
                ),
              },
            },
            axisY: {
              prefix: "$",
              tickLength: 0,
            },
            toolTip: {
              shared: true,
            },
            data: [
              {
                name: "Price (in USD)",
                yValueFormatString: "$#,###.##",
                type: "candlestick",
                risingColor: "#04f77e",
                fallingColor: "#ff3911",
                dataPoints: stockData.map((stockData) => ({
                  x: new Date(stockData.date),
                  y: [
                    stockData.open,
                    stockData.high,
                    stockData.low,
                    stockData.close,
                  ],
                })),
              },
            ],
          },
        ],
        navigator: {
          data: [
            {
              dataPoints: stockData.map((stockData) => ({
                x: new Date(stockData.date),
                y: stockData.close,
              })),
            },
          ],
        },
      }}
    />
  );
};

const DailySplineAreaChart = ({ stockData }) => {
  return (
    <CanvasJSStockChart
      options={{
        theme: "light2",
        charts: [
          {
            axisX: {
              crosshair: {
                enabled: true,
                snapToDataPoint: true,
                valueFormatString: "MMM DD YYYY",
              },
            },
            axisY: {
              prefix: "$",
              crosshair: {
                enabled: true,
                snapToDataPoint: true,
                valueFormatString: "$#,###.##",
              },
            },
            toolTip: {
              shared: true,
            },
            data: [
              {
                name: "Price (in USD)",
                type: "splineArea",
                color: "#3a4cb1",
                yValueFormatString: "$#,###.##",
                xValueFormatString: "MMM DD YYYY",
                dataPoints: stockData.map((stockData) => ({
                  x: new Date(stockData.date),
                  y: stockData.close,
                })),
              },
            ],
          },
        ],
      }}
    />
  );
};

// WORK IN PROGRESS
// Note: CanvasJS doesn't support intraday chart. Consider using react-stockcharts instead.
const IntradayCandlestickChart = ({ stockData }) => {
  return null;
}

// WORK IN PROGRESS
// Note: CanvasJS doesn't support intraday chart. Consider using react-stockcharts instead.
const IntradaySplineAreaChart = ({ stockData }) => {
  return null;
};