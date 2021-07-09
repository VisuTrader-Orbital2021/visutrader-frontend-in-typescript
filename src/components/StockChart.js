import React, { useState, useEffect } from "react";
import { getDailyStockChart, getIntradayStockChart } from "./APIConnector";
import CanvasJSReact from "../assets/canvasjs.stock.react";
let CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const INTRADAY = "INTRADAY";
const DAILY = "DAILY";
const CANDLESTICK = "CANDLESTICK";
const SPLINE_AREA = "SPLINE AREA";

export default function StockChart({ stockType, chartType, company }) {
  if (stockType === INTRADAY) {
    return chartType === CANDLESTICK ? (
      <IntradayCandlestickChart company={company} />
    ) : (
      <IntradaySplineAreaChart company={company} />
    );
  } else {
    return chartType === CANDLESTICK ? (
      <DailyCandlestickChart company={company} />
    ) : (
      <DailySplineAreaChart company={company} />
    );
  }
}

// WORK IN PROGRESS
// Note: CanvasJS doesn't support intraday chart. Consider using react-stockcharts instead.
function formatIntradayStockData(stockData) {
  return Object.entries(stockData).map((entries) => {
    const [dateAndTime, priceData] = entries;
    const array = dateAndTime.split(" ");
    const date = array[0];
    const time = array[1];
    return {
      dateAndTime,
      date,
      time,
      open: Number(priceData["1. open"]),
      high: Number(priceData["2. high"]),
      low: Number(priceData["3. low"]),
      close: Number(priceData["4. close"]),
    };
  });
}

// WORK IN PROGRESS
// Note: CanvasJS doesn't support intraday chart. Consider using react-stockcharts instead.
const IntradayCandlestickChart = ({ company }) => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const result = await getIntradayStockChart(company);
      setStockData(formatIntradayStockData(result.data["Time Series (30min)"]));
      console.log(formatIntradayStockData(result.data["Time Series (30min)"])); // to be removed
    };
    fetchStockData();
  }, [company]);

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
              },
              // scaleBreaks: {
              //   spacing: 0,
              //   fillOpacity: 0,
              //   lineThickness: 0,
              //   customBreaks: stockData.reduce(
              //     (breaks, value, index, array) => {
              //       if (index === 0) return breaks;
              //       const currentDataPointUnix = Number(new Date(value.date));
              //       const previousDataPointUnix = Number(
              //         new Date(array[index - 1].date)
              //       );
              //       const oneDayInMs = 86400000;
              //       const difference =
              //         previousDataPointUnix - currentDataPointUnix;
              //       return difference === oneDayInMs
              //         ? breaks
              //         : [
              //             ...breaks,
              //             {
              //               startValue: currentDataPointUnix,
              //               endValue: previousDataPointUnix - oneDayInMs,
              //             },
              //           ];
              //     },
              //     []
              //   ),
              // },
            },
            axisY: {
              prefix: "$",
              tickLength: 0,
              crosshair: {
                enabled: true,
                // snapToDataPoint: true,
              },
            },
            // toolTip: {
            //   shared: true,
            // },
            data: [
              {
                name: "Price (in USD)",
                yValueFormatString: "$#,###.##",
                type: "candlestick",
                risingColor: "#04f77e",
                fallingColor: "#ff3911",
                dataPoints: stockData.map((stockData) => ({
                  // x: new Date(stockData.date),
                  x: stockData.time,
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
                // x: new Date(stockData.date),
                x: stockData.time,
                y: stockData.close,
              })),
            },
          ],
        },
      }}
    />
  );
};

// WORK IN PROGRESS
// Note: CanvasJS doesn't support intraday chart. Consider using react-stockcharts instead.
const IntradaySplineAreaChart = ({ company }) => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const result = await getDailyStockChart(company);
      setStockData(
        formatIntradayStockData(result.data["Time Series (Daily)"]).slice(
          0,
          250
        )
      );
    };
    fetchStockData();
  }, [company]);

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

function formatDailyStockData(stockData) {
  return Object.entries(stockData).map((entries) => {
    const [date, priceData] = entries;
    return {
      date,
      open: Number(priceData["1. open"]),
      high: Number(priceData["2. high"]),
      low: Number(priceData["3. low"]),
      close: Number(priceData["4. close"]),
    };
  });
}

const DailyCandlestickChart = ({ company }) => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const result = await getDailyStockChart(company);
      setStockData(
        formatDailyStockData(result.data["Time Series (Daily)"]).slice(0, 250)
      );
    };
    fetchStockData();
  }, [company]);

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

const DailySplineAreaChart = ({ company }) => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const result = await getDailyStockChart(company);
      setStockData(
        formatDailyStockData(result.data["Time Series (Daily)"]).slice(0, 250)
      );
    };
    fetchStockData();
  }, [company]);

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
