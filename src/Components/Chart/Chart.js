import React from "react";
import { Chart } from "react-google-charts";

const Chart_component = (props) => {
  const options = {
    legend: "none",
    vAxis: {
      textPosition: "none",
    },
    hAxis: {
      textPosition: "none",
    },
    chartArea: { width: "100%", height: "80%" },
    lineWidth: props.lineWidth,
    series: {
      0: { color: props.increasing ? "#16c784" : "#ea3943" },
    },
  };

  return (
    <Chart
      chartType="LineChart"
      options={options}
      data={[["Time", "Price"], ...props.chart_data]}
      width="100%"
      height={props.chart_height}
      legendToggle
    />
  );
};

export default Chart_component;
