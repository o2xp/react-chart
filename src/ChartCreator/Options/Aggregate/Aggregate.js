// @flow
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const operations = [
  {
    value: "",
    label: "None"
  },
  {
    value: "sum",
    label: "Sum"
  },
  {
    value: "avg",
    label: "Average"
  },
  {
    value: "median",
    label: "Median"
  }
];

const buildOperations = () =>
  operations.map(({ value, label }) => (
    <MenuItem key={value} value={value}>
      {label}
    </MenuItem>
  ));

const Aggregate = ({ aggregateOperation, setAggregateOperation, isTimeType }) => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(isTimeType);
    if (isTimeType && !!aggregateOperation) {
      setAggregateOperation("");
    }
  }, [isTimeType]);

  const handleAggregateOperationChange = (event) => {
    setAggregateOperation(event.target.value);
  };

  return (
    <FormControl style={{ width: "100%" }} fullWidth>
      <Typography variant="subtitle2">Aggregate</Typography>
      <Grid container item xs={12} alignItems="flex-end" spacing={4}>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel>Operation</InputLabel>
            <Select
              disabled={disabled}
              value={aggregateOperation}
              onChange={handleAggregateOperationChange}
            >
              {buildOperations()}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default Aggregate;
