// @flow
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Save from "./Save";
import Load from "./Load";

const FavoriteCharts = ({
  handleSave,
  handleDelete,
  handleLoad,
  favoritesChartsData
}) => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <Grid container item xs={12} alignItems="center">
        <Button
          onClick={() => setChecked(!checked)}
          endIcon={<ArrowDownward className={checked ? "icon-rotate" : "icon"} />}
          style={{ textTransform: "none" }}
        >
          <Typography variant="h6">Favorites Charts </Typography>
        </Button>
      </Grid>
      <Collapse in={checked} style={{ width: "100%" }}>
        <Grid container item xs={12} justify="space-between" alignItems="flex-end">
          <Grid container spacing={4}>
            <Grid container item xs={12} spacing={4}>
              <Save favoritesChartsData={favoritesChartsData} handleSave={handleSave} />
            </Grid>
            <Grid container item xs={12}>
              <Load
                favoritesChartsData={favoritesChartsData}
                handleLoad={handleLoad}
                handleDelete={handleDelete}
              />
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
};

export default FavoriteCharts;
