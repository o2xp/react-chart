// @flow
import React, { useState, useEffect } from "react";
import { Pie as PieChart } from "react-chartjs-2";
import { rgbaColorsComplete, hexColorsComplete } from "../../utils/colors";
import { formatData } from "../../utils/formatData";

const datasetOptions = {
  backgroundColor: rgbaColorsComplete,
  borderColor: hexColorsComplete
};

const Pie = ({ data, options, chartRef }) => {
  const [dataFormated, setDataFormated] = useState({});

  useEffect(() => {
    setDataFormated(formatData({ data, datasetOptions }));
  }, [data]);

  return <PieChart id="pie-chart" ref={chartRef} data={dataFormated} options={options} />;
};

export default Pie;
