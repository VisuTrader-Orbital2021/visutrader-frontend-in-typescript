import React, { useState, useEffect } from "react";
import { getDailyStockChart } from "./APIConnector";
import CanvasJSReact from "../assets/canvasjs.stock.react";
let CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

export const CandlestickChart = (props) => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const result = await getDailyStockChart(props.children);
      setStockData(
        formatStockData(result.data["Time Series (Daily)"]).slice(0, 250)
      );
    };
    fetchStockData();
  }, []);

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

export const SplineAreaChart = (props) => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const result = await getDailyStockChart(props.children);
      setStockData(
        formatStockData(result.data["Time Series (Daily)"]).slice(0, 250)
      );
    };
    fetchStockData();
  }, []);

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

function formatStockData(stockData) {
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
