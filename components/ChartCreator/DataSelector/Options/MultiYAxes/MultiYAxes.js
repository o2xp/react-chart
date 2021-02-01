// @flow
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const buildAxes = ({ stateAvailableYAxes }) => {
  return stateAvailableYAxes.map(({ value, label }) => (
    <MenuItem key={value} value={value}>
      {label}
    </MenuItem>
  ));
};

const defaultAvailableYAxes = {
  value: null,
  label: "None"
};

const MultiYAxes = ({ availableYAxes, setYAxes }) => {
  const [firstYAxis, setFirstYAxis] = useState(null);
  const [secondYAxis, setSecondYAxis] = useState(null);
  // State variable is used to avoid out of range value in select
  const [stateAvailableYAxes, setStateAvailableYAxes] = useState([
    defaultAvailableYAxes
  ]);

  useEffect(() => {
    if (availableYAxes.find(yAxis => yAxis.value === firstYAxis) == null) {
      setFirstYAxis(null);
    }

    if (availableYAxes.find(yAxis => yAxis.value === secondYAxis) == null) {
      setSecondYAxis(null);
    }

    setStateAvailableYAxes(availableYAxes);
  }, [availableYAxes]);

  useEffect(() => {
    setYAxes([firstYAxis, secondYAxis]);
  }, [firstYAxis, secondYAxis]);

  const handleFirstYAxisChange = event => {
    setFirstYAxis(event.target.value);
  };

  const handleSecondYAxisChange = event => {
    setSecondYAxis(event.target.value);
  };

  return (
    <FormControl style={{ width: "100%", paddingTop: "16px" }} fullWidth>
      <Typography variant='subtitle2'>Multi Y Axes</Typography>
      <Grid container item xs={12} alignItems='flex-end' spacing={4}>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel>First Axis</InputLabel>
            <Select value={firstYAxis} onChange={handleFirstYAxisChange}>
              {buildAxes({ stateAvailableYAxes })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel>Second Axis</InputLabel>
            <Select value={secondYAxis} onChange={handleSecondYAxisChange}>
              {buildAxes({ stateAvailableYAxes })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default MultiYAxes;
