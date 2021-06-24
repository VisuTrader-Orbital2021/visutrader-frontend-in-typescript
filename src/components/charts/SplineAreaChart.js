import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.stock.react";
let CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

export default class SplineAreaChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPoints: [],
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
        let dps = [];
        for (let item of stockData) {
          dps.push({
            x: new Date(item.date),
            y: Number(item.close),
          });
        }
        this.setState({
          isLoaded: true,
          dataPoints: dps,
        });
      });
  }

  render() {
    const options = {
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
              color: "#3576a8",
              yValueFormatString: "$#,###.##",
              xValueFormatString: "MMM DD YYYY",
              dataPoints: this.state.dataPoints,
            },
          ],
        },
      ],
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
