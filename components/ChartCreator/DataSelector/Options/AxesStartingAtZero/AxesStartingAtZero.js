// @flow
import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const AxesStartingAtZero = ({ axesStartingAtZero, setAxesStartingAtZero }) => {
  const { x, y } = axesStartingAtZero;

  const handleAxesStartingAtZeroChange = event => {
    const { value, checked } = event.target;
    setAxesStartingAtZero({ ...axesStartingAtZero, [value]: checked });
  };

  return (
    <FormControl style={{ width: "100%", paddingTop: "16px" }} fullWidth>
      <Typography variant='subtitle2'>Axis Starting At Zero</Typography>
      <Grid container item xs={12} alignItems='flex-end' spacing={4}>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                value='x'
                checked={x}
                onChange={handleAxesStartingAtZeroChange}
              />
            }
            label='X Axis'
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                value='y'
                checked={y}
                onChange={handleAxesStartingAtZeroChange}
              />
            }
            label='Y Axis'
          />
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default AxesStartingAtZero;
