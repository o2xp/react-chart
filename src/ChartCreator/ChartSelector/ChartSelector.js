// @flow
import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ChartBarIcon from "mdi-material-ui/ChartBar";
import ChartBellCurveIcon from "mdi-material-ui/ChartBellCurve";
import ChartScatterPlotIcon from "mdi-material-ui/ChartScatterPlot";
import DonutSmallIcon from "@material-ui/icons/DonutSmall";
import CircleSliceIcon from "mdi-material-ui/CircleSlice1";
import PieChartIcon from "@material-ui/icons/PieChart";
import RadarIcon from "mdi-material-ui/Radar";

const fontSize = 70;
const iconsCharts = [
  {
    type: "verticalBar",
    title: "Vertical Bar",
    icon: <ChartBarIcon style={{ fontSize }} />
  },
  {
    type: "horizontalBar",
    title: "Horizontal Bar",
    icon: (
      <ChartBarIcon
        style={{ fontSize, transform: "rotate(90deg) scaleX(-1)" }}
      />
    )
  },
  {
    type: "line",
    title: "Line",
    icon: <ChartBellCurveIcon style={{ fontSize }} />
  },
  {
    type: "scatter",
    title: "Scatter",
    icon: <ChartScatterPlotIcon style={{ fontSize }} />
  },
  {
    type: "doughnut",
    title: "Doughnut",
    icon: <DonutSmallIcon style={{ fontSize }} />
  },
  {
    type: "pie",
    title: "Pie",
    icon: <PieChartIcon style={{ fontSize }} />
  },
  {
    type: "polarArea",
    title: "Polar Area",
    icon: <CircleSliceIcon style={{ fontSize }} />
  },
  {
    type: "radar",
    title: "Radar",
    icon: <RadarIcon style={{ fontSize }} />
  }
];

const ChartSelector = ({
  datasets,
  chart,
  setChart,
  uniqDatasetChart,
  abscissType
}) => {
  const handleClick = ({ type }) => {
    setChart(type);
  };

  const isDisabled = ({ type }) => {
    return datasets.length > 1 && uniqDatasetChart.includes(type);
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant='h6'>2. Select Chart</Typography>
      </Grid>
      <Grid container item xs={12}>
        {iconsCharts.map(({ type, title, icon }) => {
          const disabled =
            isDisabled({ type }) ||
            (type === "scatter" && abscissType !== "number");

          return (
            <Grid container item xs={2} key={type} justify='center'>
              <Button
                fullWidth
                color='primary'
                disabled={disabled}
                style={{
                  background: chart === type ? "rgba(0, 0, 0, 0.1)" : ""
                }}
                onClick={() => handleClick({ type })}>
                <Grid container item xs={2} key={type} justify='center'>
                  <Grid item>{icon}</Grid>
                  <Grid item>
                    <Typography
                      style={{
                        color: disabled ? "rgba(0, 0, 0, 0.26)" : "black",
                        fontSize: "0.75rem"
                      }}>
                      {title}
                    </Typography>
                  </Grid>
                </Grid>
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default ChartSelector;
