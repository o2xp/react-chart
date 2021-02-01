// @flow
import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import DatasetCreator from "./DatasetCreator";
import Options from "./Options";

const DataSelector = ({
  columns,
  datasets,
  setDatasets,
  absciss,
  setAbsciss,
  orderByColumns,
  orderBy,
  setOrderBy,
  availableYAxes,
  setYAxes,
  aggregateOperation,
  setAggregateOperation,
  unitGroupBy,
  setUnitGroupBy,
  valueGroupBy,
  setValueGroupBy,
  abscissType,
  axesStartingAtZero,
  setAxesStartingAtZero
}) => {
  const handleAbscissChange = event => {
    setAbsciss(event.target.value);
  };

  const buildMenuItems = ({ filterType } = { filterType: null }) =>
    columns
      .filter(({ dataType }) => !filterType || dataType === filterType)
      .map(({ id, label }) => (
        <MenuItem key={id} value={id}>
          {label}
        </MenuItem>
      ));

  return (
    <>
      <Grid item xs={12}>
        <Typography variant='h6'>1. Select data</Typography>
      </Grid>
      <Grid container item xs={12} alignItems='flex-end' spacing={4}>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel>Absciss</InputLabel>
            <Select value={absciss} onChange={handleAbscissChange}>
              {buildMenuItems()}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {datasets.map(dataset => (
        <DatasetCreator
          key={dataset.id}
          dataset={dataset}
          datasets={datasets}
          setDatasets={setDatasets}
          buildMenuItems={buildMenuItems}
        />
      ))}
      <Options
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
    </>
  );
};

export default DataSelector;
