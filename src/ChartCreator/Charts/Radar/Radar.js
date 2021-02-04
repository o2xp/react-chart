// @flow
import React, { useState, useEffect } from "react";
import { Radar as RadarChart } from "react-chartjs-2";
import { formatData } from "../../utils/formatData";

const Radar = ({ data, options, chartRef }) => {
  const [dataFormated, setDataFormated] = useState({});

  useEffect(() => {
    setDataFormated(formatData({ data }));
  }, [data]);

  return (
    <RadarChart
      id="radar-chart"
      ref={chartRef}
      redraw
      data={dataFormated}
      options={options}
    />
  );
};

export default Radar;
