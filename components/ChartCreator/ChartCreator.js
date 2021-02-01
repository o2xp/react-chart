// @flow
import React, { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import { v4 as uuidv4 } from "uuid";
import Chart from "./Charts";
import DataSelector from "./DataSelector";
import ChartSelector from "./ChartSelector";
import { hexColors, rgbaColors } from "./utils/colors";
import "./style/index.css";

const uniqDatasetChart = ["doughnut", "pie", "polarArea"];
const disableZoomChart = ["doughnut", "pie", "polarArea", "radar"];
const defaultDatasets = [
  {
    id: uuidv4(),
    ordinate: "score",
    label: "Prod score",
    backgroundColor: rgbaColors[0],
    borderColor: hexColors[0]
  },
  {
    id: uuidv4(),
    ordinate: "propdLMrktScore",
    label: "Prod score",
    backgroundColor: rgbaColors[1],
    borderColor: hexColors[1]
  }
];
const defaultTitle = "Default Title";
const defaultData = {
  ordinateUnit: "",
  abscissUnit: "",
  labels: [],
  series: []
};
const defaultOrderByColumn = {
  value: null,
  label: "None"
};
const defaultAvailableYAxes = {
  value: null,
  label: "None"
};
const defaultOrderBy = {
  columnId: "",
  order: "asc"
};

const handlePrint = () => {
  window.print();
};

const ChartCreator = ({ open, setOpen, columns, rows }) => {
  const [chart, setChart] = useState("line");
  const [title, setTitle] = useState(defaultTitle);
  const [showChart, setShowChart] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [data, setData] = useState(defaultData);
  const [datasets, setDatasets] = useState(cloneDeep(defaultDatasets));
  const [absciss, setAbsciss] = useState("finSecCatId");
  const [abscissType, setAbscissType] = useState(null);
  const [chartRef, setChartRef] = useState(null);
  const [resetZoomDisabled, setResetZoomDisabled] = useState(true);

  // Data Selector options
  // Order by
  const [orderByColumns, setOrderByColumns] = useState([defaultOrderByColumn]);
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  // Multi Y Axes
  const [yAxes, setYAxes] = useState([]);
  const [availableYAxes, setAvailableYAxes] = useState([]);
  // Aggregate
  const [aggregateOperation, setAggregateOperation] = useState(null);
  const [unitGroupBy, setUnitGroupBy] = useState("days");
  const [valueGroupBy, setValueGroupBy] = useState(1);
  // Axis starting at 0
  const [axesStartingAtZero, setAxesStartingAtZero] = useState({
    x: true,
    y: true
  });

  useEffect(() => {
    if (datasets.length > 1 && uniqDatasetChart.includes(chart)) {
      setChart("");
    }
  }, [datasets]);

  useEffect(() => {
    const newAvailableYAxes = [defaultAvailableYAxes];
    const newOrderByColumns = [defaultOrderByColumn];

    if (absciss !== "") {
      newOrderByColumns.push({
        value: absciss,
        label: columns.find(col => col.id === absciss).label
      });
    }

    datasets.forEach(({ ordinate }) => {
      if (ordinate !== "") {
        const { id, label } = columns.find(col => col.id === ordinate);
        const col = {
          value: id,
          label
        };
        newOrderByColumns.push(col);
        newAvailableYAxes.push(col);
      }
    });

    setOrderByColumns(newOrderByColumns);
    setAvailableYAxes(newAvailableYAxes);
  }, [absciss, datasets]);

  useEffect(() => {
    const { dataType } = columns.find(({ id }) => id === absciss);
    setAbscissType(dataType);
  }, [absciss]);

  useEffect(() => {
    setResetZoomDisabled(disableZoomChart.includes(chart) || !showChart);
  }, [chart, showChart]);

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleReset = () => {
    setChart("");
    setTitle(defaultTitle);
    setShowChart(false);
    setData(defaultData);
    setDatasets(cloneDeep(defaultDatasets));
    setAbsciss("");
  };

  const handleResetZoom = () => {
    setData({ ...data });
  };

  const handleClose = () => {
    // handleReset();
    setOpen(false);
  };

  const handleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  const handleCreate = () => {
    const newData = {
      abscissId: absciss,
      abscissLabel: columns.find(col => col.id === absciss).label,
      ordinateLabels: [],
      rows: [],
      datasets
    };

    datasets.forEach(({ ordinate }) => {
      newData.ordinateLabels.push(
        columns.find(col => col.id === ordinate).label
      );
    });

    newData.rows = rows.map(row => {
      const t = {
        [absciss]: row[absciss]
      };
      datasets.forEach(({ ordinate }) => {
        t[ordinate] = row[ordinate];
      });

      return t;
    });

    setShowChart(true);
    setData(newData);
  };

  const handleBack = () => {
    setShowChart(false);
  };

  return (
    <Dialog
      fullWidth
      fullScreen={fullScreen}
      maxWidth='lg'
      open={open}
      onClose={handleClose}>
      <DialogTitle disableTypography>
        <Typography variant='h5'>
          {showChart ? title : "Create Chart"}
        </Typography>
        <div
          style={{
            position: "absolute",
            right: "8px",
            top: "8px"
          }}>
          <IconButton onClick={handleFullScreen}>
            {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      {showChart ? (
        <Grid container style={{ padding: "16px 24px" }}>
          <Chart
            data={data}
            chart={chart}
            chartRef={chartRef}
            setChartRef={setChartRef}
            abscissType={abscissType}
            aggregateOperation={aggregateOperation}
            yAxes={yAxes}
            orderBy={orderBy}
            unitGroupBy={unitGroupBy}
            valueGroupBy={valueGroupBy}
            axesStartingAtZero={axesStartingAtZero}
          />
        </Grid>
      ) : (
        <>
          <Grid container style={{ padding: "16px 24px" }}>
            <DataSelector
              columns={columns}
              datasets={datasets}
              setDatasets={setDatasets}
              absciss={absciss}
              setAbsciss={setAbsciss}
              orderByColumns={orderByColumns}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              availableYAxes={availableYAxes}
              setYAxes={setYAxes}
              aggregateOperation={aggregateOperation}
              setAggregateOperation={setAggregateOperation}
              unitGroupBy={unitGroupBy}
              setUnitGroupBy={setUnitGroupBy}
              valueGroupBy={valueGroupBy}
              setValueGroupBy={setValueGroupBy}
              abscissType={abscissType}
              axesStartingAtZero={axesStartingAtZero}
              setAxesStartingAtZero={setAxesStartingAtZero}
            />
          </Grid>
          <Grid container style={{ padding: "16px 24px" }}>
            <ChartSelector
              datasets={datasets}
              chart={chart}
              setChart={setChart}
              uniqDatasetChart={uniqDatasetChart}
              abscissType={abscissType}
            />
          </Grid>
          <Grid container style={{ padding: "16px 24px" }}>
            <Grid item xs={12}>
              <Typography variant='h6'>3. Chart Title</Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              justify='space-between'
              alignItems='flex-end'
              spacing={4}>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  value={title}
                  onChange={handleTitleChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
      <Grid
        container
        alignItems='flex-end'
        justify='center'
        style={{ height: "100%", width: "100%", padding: "16px 24px" }}>
        <Grid container item xs={12} justify='space-between'>
          <Grid item>
            <Button
              onClick={handleResetZoom}
              variant='contained'
              className='button-start'
              style={{
                background: !resetZoomDisabled && "#ff9800",
                color: !resetZoomDisabled && "#fff"
              }}
              disabled={resetZoomDisabled}>
              Reset Zoom
            </Button>

            <Button
              onClick={handlePrint}
              variant='contained'
              className='button-start'
              style={{
                background: "#795548",
                color: "#fff"
              }}>
              Print
            </Button>
          </Grid>

          <Grid item>
            <Button
              onClick={handleReset}
              className='button-end'
              color='secondary'>
              Reset
            </Button>

            <Button
              onClick={handleBack}
              color='secondary'
              disabled={!showChart}
              className='button-end'
              variant='contained'>
              Back
            </Button>
            <Button
              onClick={handleCreate}
              disabled={showChart}
              color='primary'
              className='button-end'
              variant='contained'>
              Create
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default ChartCreator;
