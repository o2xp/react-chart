// @flow
import React, { useState, useEffect } from "react";
import { Doughnut as DoughnutChart } from "react-chartjs-2";
import { rgbaColorsComplete, hexColorsComplete } from "../../utils/colors";
import { formatData } from "../../utils/formatData";

const datasetOptions = {
  backgroundColor: rgbaColorsComplete,
  borderColor: hexColorsComplete
};

const Doughnut = ({ data, options, chartRef }) => {
  const [dataFormated, setDataFormated] = useState({});

  useEffect(() => {
    setDataFormated(formatData({ data, datasetOptions }));
  }, [data]);

  return <DoughnutChart ref={chartRef} data={dataFormated} options={options} />;
};

export default Doughnut;
