// @flow
import React, { useState, useEffect } from "react";
import { HorizontalBar as HorizontalBarChart } from "react-chartjs-2";
import { formatData } from "../../utils/formatData";

const HorizontalBar = ({ data, options, chartRef }) => {
  const [dataFormated, setDataFormated] = useState({});

  useEffect(() => {
    setDataFormated(formatData({ data }));
  }, [data]);

  return (
    <HorizontalBarChart
      ref={chartRef}
      redraw
      data={dataFormated}
      options={options}
    />
  );
};
export default HorizontalBar;
