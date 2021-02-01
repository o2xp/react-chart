// @flow
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const operations = [
  {
    value: null,
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

// const dates = [
//   {
//     value: "milliseconds",
//     label: "Millisecond(s)"
//   },
//   {
//     value: "seconds",
//     label: "Second(s)"
//   },
//   {
//     value: "minutes",
//     label: "Minute(s)"
//   },
//   {
//     value: "hours",
//     label: "Hour(s)"
//   },
//   {
//     value: "days",
//     label: "Day(s)"
//   },
//   {
//     value: "weeks",
//     label: "Week(s)"
//   },
//   {
//     value: "months",
//     label: "Month(s)"
//   },
//   {
//     value: "years",
//     label: "Year(s)"
//   }
// ];

const buildOperations = () => {
  return operations.map(({ value, label }) => (
    <MenuItem key={value} value={value}>
      {label}
    </MenuItem>
  ));
};

// const buildDates = () => {
//   return dates.map(({ value, label }) => (
//     <MenuItem key={value} value={value}>
//       {label}
//     </MenuItem>
//   ));
// };

const dateTypes = ["date", "dateTime", "time"];

const Aggregate = ({
  aggregateOperation,
  setAggregateOperation,
  // unitGroupBy,
  // setUnitGroupBy,
  // valueGroupBy,
  // setValueGroupBy,
  abscissType
}) => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const newDisabled = dateTypes.includes(abscissType);
    setDisabled(newDisabled);
    if (aggregateOperation !== "" && newDisabled) {
      setAggregateOperation("");
    }
  }, [abscissType]);

  const handleAggregateOperationChange = event => {
    setAggregateOperation(event.target.value);
  };

  // const handleUnitGroupByChange = event => {
  //   setUnitGroupBy(event.target.value);
  // };

  // const handleValueGroupByChange = event => {
  //   setValueGroupBy(event.target.value);
  // };

  return (
    <FormControl style={{ width: "100%" }} fullWidth>
      <Typography variant='subtitle2'>Aggregate</Typography>
      <Grid container item xs={12} alignItems='flex-end' spacing={4}>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel>Operation</InputLabel>
            <Select
              disabled={disabled}
              value={aggregateOperation}
              onChange={handleAggregateOperationChange}>
              {buildOperations()}
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid container item xs={3}>
          <Grid item xs={4}>
            <TextField
              disabled={disabled}
              type='number'
              label='Number'
              value={valueGroupBy}
              onChange={handleValueGroupByChange}
            />
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel>Unit</InputLabel>
              <Select
                disabled={disabled}
                value={unitGroupBy}
                onChange={handleUnitGroupByChange}>
                {buildDates()}
              </Select>
            </FormControl>
          </Grid>
        </Grid> */}
      </Grid>
    </FormControl>
  );
};

export default Aggregate;
