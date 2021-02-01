// @flow
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Aggregate from "./Aggregate";
import OrderBy from "./OrderBy";
import MultiYAxes from "./MultiYAxes";
import AxesStartingAtZero from "./AxesStartingAtZero";

const Options = ({
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
  const [open, setOpen] = useState(false);
  const handleOpenChange = () => {
    setOpen(!open);
  };

  return (
    <Grid item xs={12}>
      <Accordion
        open={open}
        onChange={handleOpenChange}
        style={{ boxShadow: "none" }}>
        <AccordionSummary>
          <Typography variant='button'>More options</Typography>
          <ExpandMoreIcon className={`icon${open ? "-rotate" : ""}`} />
        </AccordionSummary>
        <Grid container>
          <Aggregate
            aggregateOperation={aggregateOperation}
            setAggregateOperation={setAggregateOperation}
            unitGroupBy={unitGroupBy}
            setUnitGroupBy={setUnitGroupBy}
            valueGroupBy={valueGroupBy}
            setValueGroupBy={setValueGroupBy}
            abscissType={abscissType}
          />
          <OrderBy
            orderByColumns={orderByColumns}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
          />
          <MultiYAxes availableYAxes={availableYAxes} setYAxes={setYAxes} />
          <AxesStartingAtZero
            axesStartingAtZero={axesStartingAtZero}
            setAxesStartingAtZero={setAxesStartingAtZero}
          />
        </Grid>
      </Accordion>
    </Grid>
  );
};

export default Options;
