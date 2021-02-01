// @flow
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import { Typography } from "@material-ui/core";

const buildOperations = ({ orderByColumns }) => {
  return orderByColumns.map(({ value, label }) => (
    <MenuItem key={value} value={value}>
      {label}
    </MenuItem>
  ));
};

const OrderBy = ({ orderByColumns, orderBy, setOrderBy }) => {
  const [columnId, setColumnId] = useState("");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const { columnId: newColumnId, order: newOrder } = orderBy;
    setColumnId(newColumnId);
    setOrder(newOrder);
  }, [orderBy]);

  const handleColumnChange = event => {
    setOrderBy({ ...orderBy, columnId: event.target.value });
  };

  const handleOrderChange = event => {
    setOrderBy({ ...orderBy, order: event.target.value });
  };

  return (
    <FormControl style={{ width: "100%", paddingTop: "16px" }} fullWidth>
      <Typography variant='subtitle2'>Order by</Typography>
      <Grid container item xs={12} alignItems='flex-end' spacing={4}>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel>Column</InputLabel>
            <Select value={columnId} onChange={handleColumnChange}>
              {buildOperations({ orderByColumns })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <RadioGroup row value={order} onChange={handleOrderChange}>
            <FormControlLabel
              value='asc'
              control={<Radio />}
              label='Ascendant'
            />
            <FormControlLabel
              value='desc'
              control={<Radio />}
              label='Descendant'
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default OrderBy;
