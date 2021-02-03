// @flow
import React, { useState, useEffect } from "react";
import { Scatter as ScatterChart } from "react-chartjs-2";
import { formatDataScatter } from "../../utils/formatData";

const Scatter = ({ data, options, chartRef }) => {
  const [dataFormated, setDataFormated] = useState({});

  useEffect(() => {
    setDataFormated(formatDataScatter({ data }));
  }, [data]);

  return (
    <ScatterChart ref={chartRef} redraw data={dataFormated} options={options} />
  );
};
export default Scatter;
