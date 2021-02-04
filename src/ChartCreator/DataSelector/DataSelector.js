// @flow
import React from "react";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DatasetCreator from "./DatasetCreator";

const DataSelector = ({ columns, datasets, setDatasets, absciss, setAbsciss }) => {
  const handleAbscissChange = (event) => {
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
        <Typography variant="h6">1. Select data</Typography>
      </Grid>
      <Grid container item xs={12} alignItems="flex-end" spacing={4}>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel>Absciss</InputLabel>
            <Select value={absciss} onChange={handleAbscissChange}>
              {buildMenuItems()}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {datasets.map((dataset) => (
        <DatasetCreator
          key={dataset.id}
          dataset={dataset}
          datasets={datasets}
          setDatasets={setDatasets}
          buildMenuItems={buildMenuItems}
        />
      ))}
    </>
  );
};

export default DataSelector;
