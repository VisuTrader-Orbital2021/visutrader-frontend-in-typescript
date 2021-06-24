import React, { useState, useEffect } from "react";
import { CanvasJSChart } from "canvasjs-react-charts";
import { getDailyChartForSymbol } from "./ApiConnector";

export const AlternativeCandlestickChart = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const result = await getDailyChartForSymbol("TSLA");
      setStockData(formatStockData(result.data["Time Series (Daily)"]));
    };

    fetchStockData();
  }, []);

  return (
    <CanvasJSChart
      options={{
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
          },
          scaleBreaks: {
            spacing: 0,
            fillOpacity: 0,
            lineThickness: 0,
            customBreaks: stockData.reduce((breaks, value, index, array) => {
              if (index === 0) return breaks;
              const currentDataPointUnix = Number(new Date(value.date));
              const previousDataPointUnix = Number(
                new Date(array[index - 1].date)
              );
              const oneDayInMs = 86400000;
              const difference = previousDataPointUnix - currentDataPointUnix;
              return difference === oneDayInMs
                ? breaks
                : [
                    ...breaks,
                    {
                      startValue: currentDataPointUnix,
                      endValue: previousDataPointUnix - oneDayInMs,
                    },
                  ];
            }, []),
          },
        },
        axisY: {
          minimum: Math.min(...stockData.map((data) => data.low)) / 1.1,
          maximum: Math.max(...stockData.map((data) => data.high)) * 1.1,
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
          },
        },
        data: [
          {
            type: "candlestick",
            risingColor: "#04f77e",
            color: "#ff3911",
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
