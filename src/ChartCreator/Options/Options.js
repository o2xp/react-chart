// @flow
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import Aggregate from "./Aggregate";
import OrderBy from "./OrderBy";
import AxesStartingAtZero from "./AxesStartingAtZero";

const dateTypes = ["date", "dateTime", "time"];

const Options = ({
  orderByColumns,
  orderBy,
  setOrderBy,
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
  const [isTimeType, setIsTimeType] = useState(false);

  useEffect(() => {
    setIsTimeType(dateTypes.includes(abscissType));
  }, [abscissType]);
  return (
    <Grid container item xs={12}>
      <Aggregate
        aggregateOperation={aggregateOperation}
        setAggregateOperation={setAggregateOperation}
        unitGroupBy={unitGroupBy}
        setUnitGroupBy={setUnitGroupBy}
        valueGroupBy={valueGroupBy}
        setValueGroupBy={setValueGroupBy}
        isTimeType={isTimeType}
      />
      <OrderBy
        orderByColumns={orderByColumns}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        isTimeType={isTimeType}
      />
      <AxesStartingAtZero
        axesStartingAtZero={axesStartingAtZero}
        setAxesStartingAtZero={setAxesStartingAtZero}
      />
    </Grid>
  );
};

export default Options;
