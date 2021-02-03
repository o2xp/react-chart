// @flow
import React, { useState, useEffect } from "react";
import { Bar as VerticalBarChart } from "react-chartjs-2";
import { formatData } from "../../utils/formatData";

const VerticalBar = ({ data, options, chartRef }) => {
  const [dataFormated, setDataFormated] = useState({});

  useEffect(() => {
    setDataFormated(formatData({ data }));
  }, [data]);

  return (
    <VerticalBarChart
      ref={chartRef}
      redraw
      data={dataFormated}
      options={options}
    />
  );
};

export default VerticalBar;
