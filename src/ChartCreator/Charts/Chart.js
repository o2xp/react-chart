// @flow
import React, { useEffect, useState, createRef } from "react";
import orderByFnc from "lodash/orderBy";

import "chartjs-plugin-datalabels";
import "chartjs-plugin-zoom";
import VerticalBar from "./VerticalBar";
import HorizontalBar from "./HorizontalBar";
import Line from "./Line";
import Scatter from "./Scatter";
import Doughnut from "./Doughnut";
import Pie from "./Pie";
import PolarArea from "./PolarArea";
import Radar from "./Radar";

const defaultOptions = {
  plugins: {
    zoom: {
      pan: {
        enabled: true,
        mode: "xy"
      },
      zoom: {
        enabled: true,
        mode: "xy"
      }
    },
    datalabels: {
      align: "end",
      backgroundColor: (context) => context.dataset.borderColor,
      borderRadius: 4,
      color: "white",
      padding: 4,
      offset: 8,
      display: (context) => context.dataset.display
    }
  },
  responsive: true,
  maintainAspectRatio: false
};

const getChart = ({ chart, data, options, chartRef }) => {
  switch (chart) {
    case "verticalBar":
      return <VerticalBar data={data} options={options} chartRef={chartRef} />;
    case "horizontalBar":
      return <HorizontalBar data={data} options={options} chartRef={chartRef} />;
    case "line":
      return <Line data={data} options={options} chartRef={chartRef} />;
    case "scatter":
      return <Scatter data={data} options={options} chartRef={chartRef} />;
    case "doughnut":
      return <Doughnut data={data} options={defaultOptions} chartRef={chartRef} />;
    case "pie":
      return <Pie data={data} options={defaultOptions} chartRef={chartRef} />;
    case "polarArea":
      return <PolarArea data={data} options={defaultOptions} chartRef={chartRef} />;
    case "radar":
      return <Radar data={data} options={defaultOptions} chartRef={chartRef} />;
    default:
      return <></>;
  }
};

const dateTypes = ["date", "dateTime", "time"];

const sum = ({ arr }) => {
  // https://stackoverflow.com/questions/588004/is-floating-point-math-broken/51723472#51723472
  const res = parseFloat(arr.reduce((a, b) => a + b, 0).toFixed(10));

  return res;
};

const avg = ({ arr }) => {
  // https://stackoverflow.com/questions/588004/is-floating-point-math-broken/51723472#51723472
  const res = parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(10));

  return res;
};

const median = ({ arr }) => {
  const middle = (arr.length + 1) / 2;
  const sorted = [...arr].sort((a, b) => a - b); // you have to add sorting function for numbers
  const isEven = sorted.length % 2 === 0;
  const res = isEven
    ? (sorted[middle - 1.5] + sorted[middle - 0.5]) / 2
    : sorted[middle - 1];
  // https://stackoverflow.com/questions/588004/is-floating-point-math-broken/51723472#51723472
  return parseFloat(res).toFixed(10);
};

const aggregateCalc = ({ rows, id, calc }) => {
  const res = [...rows];
  res.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (key !== id) {
        // https://stackoverflow.com/questions/588004/is-floating-point-math-broken/51723472#51723472
        row[key] = calc({ arr: row[key] });
      }
    });
  });

  return res;
};

const aggregateRows = ({ rows, id, aggregateOperation }) => {
  // Creating indexed object
  const resIndexed = {};
  rows.forEach((row) => {
    // Creating first index of each value
    if (resIndexed[row[id]] == null) {
      resIndexed[row[id]] = {};
      resIndexed[row[id]][id] = row[id];
    }

    // Populating each key
    Object.keys(row).forEach((key) => {
      if (key !== id) {
        if (resIndexed[row[id]][key] == null) {
          resIndexed[row[id]][key] = [row[key]];
        } else {
          resIndexed[row[id]][key].push(row[key]);
        }
      }
    });
  });

  // Transform indexed object to array
  let newRows = Object.keys(resIndexed).map((key) => resIndexed[key]);
  switch (aggregateOperation) {
    case "sum":
      newRows = aggregateCalc({ rows: newRows, id, calc: sum });
      break;
    case "avg":
      newRows = aggregateCalc({ rows: newRows, id, calc: avg });
      break;
    case "median":
      newRows = aggregateCalc({ rows: newRows, id, calc: median });
      break;
    default:
      break;
  }

  return newRows;
};

const Chart = ({
  chart,
  data,
  chartRef,
  setChartRef,
  aggregateOperation,
  abscissType,
  orderBy,
  axesStartingAtZero
}) => {
  const [options, setOptions] = useState({});
  const [formatedData, setFormatedData] = useState(data);
  const { ordinateLabels, abscissLabel } = data;

  useEffect(() => {
    const { abscissId, rows } = data;

    let newRows = [...rows];
    const { columnId, order } = orderBy;
    if (columnId.length > 0) {
      if (dateTypes.includes(abscissType)) {
        newRows.sort((a, b) => new Date(b[abscissId]) - new Date(a[abscissId]));
      } else {
        newRows = newRows.sort((a, b) =>
          new Intl.Collator(undefined, {
            numeric: true,
            sensitivity: "base"
          }).compare(a[columnId], b[columnId])
        );

        if (order === "desc") {
          newRows = newRows.reverse();
        }
      }
    }

    if (aggregateOperation !== "") {
      newRows = aggregateRows({
        rows: newRows,
        id: abscissId,
        aggregateOperation
      });
    }

    setFormatedData({
      ...formatedData,
      rows: newRows
    });
  }, [data, orderBy, aggregateOperation]);

  useEffect(() => {
    setChartRef(createRef());
  }, [chart]);

  useEffect(() => {
    const { x, y } = axesStartingAtZero;

    const typeSpread = {};
    if (dateTypes.includes(abscissType) && chart !== "horizontalBar") {
      typeSpread.type = "time";
    }

    setOptions({
      ...defaultOptions,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: y
            },
            scaleLabel: {
              display: true,
              labelString: ordinateLabels.join(" / ")
            }
          }
        ],
        xAxes: [
          {
            ...typeSpread,
            ticks: {
              beginAtZero: x
            },
            scaleLabel: {
              display: true,
              labelString: abscissLabel
            }
          }
        ]
      }
    });
  }, [ordinateLabels, abscissLabel, axesStartingAtZero, abscissType, chart]);

  return getChart({
    chart,
    data: formatedData,
    options,
    chartRef
  });
};

export default Chart;
