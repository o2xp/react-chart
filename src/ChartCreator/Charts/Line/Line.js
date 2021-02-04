// @flow
import React, { useState, useEffect } from "react";
import { Line as LineChart } from "react-chartjs-2";
import { formatData } from "../../utils/formatData";

const datasetOptions = {
  fill: false,
  lineTension: 0
};

const Line = ({ data, options, chartRef }) => {
  const [dataFormated, setDataFormated] = useState({});

  useEffect(() => {
    setDataFormated(formatData({ data, datasetOptions }));
  }, [data, options]);

  return (
    <LineChart
      id="line-chart"
      redraw
      ref={chartRef}
      data={dataFormated}
      options={options}
    />
  );
};

export default Line;
