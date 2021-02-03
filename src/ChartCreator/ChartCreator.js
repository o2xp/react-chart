// @flow
import React, { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import { v4 as uuidv4 } from "uuid";
import Chart from "./Charts";
import DataSelector from "./DataSelector";
import ChartSelector from "./ChartSelector";
import Options from "./Options";
import FavoriteCharts from "./FavoriteCharts";
import { hexColors, rgbaColors } from "./utils/colors";
import "./style/index.css";

const localStorageName = "@o2xp/react-chart";
const uniqDatasetChart = ["doughnut", "pie", "polarArea"];
const disableZoomChart = ["doughnut", "pie", "polarArea", "radar"];
const defaultDatasets = [
  {
    id: uuidv4(),
    displayLabel: true,
    ordinate: "",
    label: "",
    backgroundColor: rgbaColors[0],
    borderColor: hexColors[0]
  }
];
const defaultTitle = "Default Title";
const defaultData = {
  ordinateUnit: "",
  abscissUnit: "",
  labels: [],
  series: []
};
const defaultOrderByColumns = [
  {
    value: "",
    label: "None"
  }
];

const defaultOrderBy = {
  columnId: "",
  order: "asc"
};

const handlePrint = () => {
  window.print();
};

const ChartCreator = ({ open, setOpen, columns, rows }) => {
  const [chart, setChart] = useState("");
  const [title, setTitle] = useState(defaultTitle);
  const [showChart, setShowChart] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [data, setData] = useState(defaultData);
  const [datasets, setDatasets] = useState(cloneDeep(defaultDatasets));
  const [absciss, setAbsciss] = useState("");
  const [abscissType, setAbscissType] = useState(null);
  const [chartRef, setChartRef] = useState(null);
  const [resetZoomDisabled, setResetZoomDisabled] = useState(true);
  const [createDisabled, setCreateDisabled] = useState(false);
  const [displayLabels, setDisplayLabels] = useState(true);

  // Data Selector options
  // Order by
  const [orderByColumns, setOrderByColumns] = useState(cloneDeep(defaultOrderByColumns));
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  // Aggregate
  const [aggregateOperation, setAggregateOperation] = useState("");
  // Axis starting at 0
  const [axesStartingAtZero, setAxesStartingAtZero] = useState({
    x: true,
    y: true
  });

  // Favorites Charts
  const [favoritesChartsData, setFavoritesCharts] = useState([]);

  useEffect(() => {
    setFavoritesCharts(JSON.parse(localStorage.getItem(localStorageName)));
  }, []);

  useEffect(() => {
    let newCreateDisabled = false;
    if (absciss === "") {
      newCreateDisabled = true;
    }

    if (!newCreateDisabled && datasets.filter((dt) => dt.ordinate === "").length > 0) {
      newCreateDisabled = true;
    }

    if (!newCreateDisabled && chart === "") {
      newCreateDisabled = true;
    }

    setCreateDisabled(newCreateDisabled);
  }, [absciss, datasets, chart]);

  useEffect(() => {
    if (datasets.length > 1 && uniqDatasetChart.includes(chart)) {
      setChart("");
    }
  }, [datasets]);

  useEffect(() => {
    const newOrderByColumns = cloneDeep(defaultOrderByColumns);

    if (absciss !== "") {
      const { label } = columns.find((col) => col.id === absciss);

      setOrderBy({
        columnId: absciss,
        order: "asc"
      });

      newOrderByColumns.push({
        value: absciss,
        label
      });
    }

    datasets.forEach(({ ordinate }) => {
      if (ordinate !== "") {
        const { id, label } = columns.find((col) => col.id === ordinate);
        const col = {
          value: id,
          label
        };
        newOrderByColumns.push(col);
      }
    });

    setOrderByColumns(newOrderByColumns);
  }, [absciss, datasets]);

  useEffect(() => {
    if (absciss !== "" && columns.length > 0) {
      const { dataType } = columns.find(({ id }) => id === absciss);
      setAbscissType(dataType);
    }
  }, [absciss]);

  useEffect(() => {
    setResetZoomDisabled(disableZoomChart.includes(chart) || !showChart);
  }, [chart, showChart]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleReset = () => {
    setChart("");
    setShowChart(false);
    setTitle(defaultTitle);
    setData(defaultData);
    setDatasets(cloneDeep(defaultDatasets));
    setAbsciss("");
    setOrderByColumns(cloneDeep(defaultOrderByColumns));
    setOrderBy(defaultOrderBy);
    setAggregateOperation("");
    setAxesStartingAtZero({
      x: true,
      y: true
    });
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
    setData({ ...data });
  };

  const handleCreate = () => {
    const newData = {
      abscissId: absciss,
      abscissLabel: columns.find((col) => col.id === absciss).label,
      ordinateLabels: [],
      rows: [],
      datasets
    };

    datasets.forEach(({ ordinate }) => {
      newData.ordinateLabels.push(columns.find((col) => col.id === ordinate).label);
    });

    newData.rows = rows.map((row) => {
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

  const handleDisplayLabels = (event) => {
    setDisplayLabels(event.target.checked);
    const newDatasets = [...datasets];
    newDatasets.forEach((dataset) => {
      dataset.display = event.target.checked;
    });

    setDatasets(newDatasets);
  };

  const handleSave = ({ name }) => {
    const savedCharts = JSON.parse(localStorage.getItem(localStorageName));

    const newItem = {
      name,
      data: {
        chart,
        title,
        data,
        datasets,
        absciss,
        orderBy,
        aggregateOperation,
        axesStartingAtZero
      }
    };

    let newFavoritesCharts;

    if (savedCharts) {
      newFavoritesCharts = [...savedCharts, newItem];
    } else {
      newFavoritesCharts = [newItem];
    }
    setFavoritesCharts(newFavoritesCharts);
    localStorage.setItem(localStorageName, JSON.stringify(newFavoritesCharts));
  };

  const handleDelete = ({ name }) => {
    const savedCharts = JSON.parse(localStorage.getItem(localStorageName));
    const newFavoritesCharts = savedCharts.filter(
      (savedChart) => savedChart.name !== name
    );

    setFavoritesCharts(newFavoritesCharts);
    localStorage.setItem(localStorageName, JSON.stringify(newFavoritesCharts));
  };

  const handleLoad = ({ name }) => {
    const savedCharts = JSON.parse(localStorage.getItem(localStorageName));
    const chartToLoad = savedCharts.find((savedChart) => savedChart.name === name);
    if (chartToLoad) {
      const {
        chart: loadChart,
        title: loadTitle,
        data: loadData,
        datasets: loadDatasets,
        absciss: loadAbsciss,
        orderBy: loadOrderBy,
        aggregateOperation: loadAggregateOperation,
        axesStartingAtZero: loadAxesStartingAtZero
      } = chartToLoad.data;

      setChart(loadChart);
      setTitle(loadTitle);
      setData(loadData);
      setDatasets(loadDatasets);
      setAbsciss(loadAbsciss);
      setOrderBy(loadOrderBy);
      setAggregateOperation(loadAggregateOperation);
      setAxesStartingAtZero(loadAxesStartingAtZero);
    }
  };
  return (
    <Dialog
      fullWidth
      fullScreen={fullScreen}
      maxWidth="lg"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle disableTypography style={{ maxHeight: "5%" }}>
        <Typography variant="h5">{showChart ? title : "Create Chart"}</Typography>
        <div
          style={{
            position: "absolute",
            right: "8px",
            top: "8px"
          }}
        >
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
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={displayLabels}
                  onChange={handleDisplayLabels}
                  name="displayLabels"
                />
              }
              label="Display Labels"
              labelPlacement="start"
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              position: "relative",
              minHeight: fullScreen ? "80vh" : "50vh"
            }}
          >
            <Chart
              data={data}
              chart={chart}
              chartRef={chartRef}
              setChartRef={setChartRef}
              abscissType={abscissType}
              aggregateOperation={aggregateOperation}
              orderBy={orderBy}
              axesStartingAtZero={axesStartingAtZero}
            />
          </Grid>
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
              <Typography variant="h6">3. Chart Title</Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              justify="space-between"
              alignItems="flex-end"
              spacing={4}
            >
              <Grid item xs={2}>
                <TextField fullWidth value={title} onChange={handleTitleChange} />
              </Grid>
            </Grid>
          </Grid>
          <Grid container style={{ padding: "16px 24px" }}>
            <Grid item xs={12}>
              <Typography variant="h6">4. Options</Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              justify="space-between"
              alignItems="flex-end"
              spacing={4}
            >
              <Options
                orderByColumns={orderByColumns}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                aggregateOperation={aggregateOperation}
                setAggregateOperation={setAggregateOperation}
                abscissType={abscissType}
                axesStartingAtZero={axesStartingAtZero}
                setAxesStartingAtZero={setAxesStartingAtZero}
              />
            </Grid>
          </Grid>
          <Grid container style={{ padding: "16px 24px" }}>
            <FavoriteCharts
              handleSave={handleSave}
              handleLoad={handleLoad}
              handleDelete={handleDelete}
              favoritesChartsData={favoritesChartsData}
            />
          </Grid>
        </>
      )}
      <Grid
        container
        alignItems="flex-end"
        justify="center"
        style={{ padding: "16px 24px" }}
      >
        <Grid container item xs={12} justify="space-between">
          <Grid item>
            <Button
              onClick={handleResetZoom}
              variant="contained"
              className="button-start"
              style={{
                background: !resetZoomDisabled && "#ff9800",
                color: !resetZoomDisabled && "#fff"
              }}
              disabled={resetZoomDisabled}
            >
              Reset Zoom
            </Button>

            <Button
              onClick={handlePrint}
              variant="contained"
              className="button-start"
              style={{
                background: "#795548",
                color: "#fff"
              }}
            >
              Print
            </Button>
          </Grid>

          <Grid item>
            <Button onClick={handleReset} className="button-end" color="secondary">
              Reset
            </Button>

            <Button
              onClick={handleBack}
              color="secondary"
              disabled={!showChart}
              className="button-end"
              variant="contained"
            >
              Back
            </Button>
            <Button
              onClick={handleCreate}
              disabled={showChart || createDisabled}
              color="primary"
              className="button-end"
              variant="contained"
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default ChartCreator;
