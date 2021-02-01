// @flow
import React, { useState, useEffect } from "react";
import { PolarArea as PolarAreaChart } from "@reactchartjs/react-chart.js";
import { rgbaColorsComplete, hexColorsComplete } from "../../utils/colors";
import { formatData } from "../../utils/formatData";

const datasetOptions = {
  backgroundColor: rgbaColorsComplete,
  borderColor: hexColorsComplete
};

const PolarArea = ({ data, options, chartRef }) => {
  const [dataFormated, setDataFormated] = useState({});

  useEffect(() => {
    setDataFormated(formatData({ data, datasetOptions }));
  }, [data]);

  return (
    <PolarAreaChart ref={chartRef} data={dataFormated} options={options} />
  );
};

export default PolarArea;
