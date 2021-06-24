import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.stock.react";
let CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

// TODO: Change to React Hooks + cache the stock data
export default class CandlestickChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: [],
      dataPoints1: [], // price
      dataPoints2: [], // volume
      dataPoints3: [], // navigator
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&outputsize=full&apikey=Z3LIIQZIE0HPQWAQ"
    )
      .then((res) => res.json())
      .then((data) => {
        const stockData = formatStockData(data["Time Series (Daily)"]).slice(
          0,
          250
        );
        let dps1 = [];
        let dps2 = [];
        let dps3 = [];
        for (let item of stockData) {
          dps1.push({
            x: new Date(item.date),
            y: [
              Number(item.open),
              Number(item.high),
              Number(item.low),
              Number(item.close),
            ],
          });
          dps2.push({ x: new Date(item.date), y: Number(item.volume) });
          dps3.push({ x: new Date(item.date), y: Number(item.close) });
        }
        this.setState({
          stockData: stockData,
          dataPoints1: dps1,
          dataPoints2: dps2,
          dataPoints3: dps3,
          isLoaded: true,
        });
      });
  }

  render() {
    const options = {
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
              customBreaks: this.state.stockData.reduce(
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
              dataPoints: this.state.dataPoints1,
            },
          ],
        },
      ],
      navigator: {
        data: [
          {
            dataPoints: this.state.dataPoints3,
          },
        ],
        // slider: {
        //   minimum: new Date("2018-05-01"),
        //   maximum: new Date("2018-07-01")
        // }
      },
    };

    const containerProps = {
      width: "100%",
      height: "450px",
      margin: "auto",
    };

    return (
      <div>
        <div>
          {this.state.isLoaded && (
            <CanvasJSStockChart
              // containerProps={containerProps}
              options={options}
              // onRef = {ref => this.chart = ref}
            />
          )}
        </div>
      </div>
    );
  }
}

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
