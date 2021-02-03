// @flow
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Save from "./Save";
import Load from "./Load";

const FavoriteCharts = ({
  handleSave,
  handleDelete,
  handleLoad,
  favoritesChartsData
}) => {
  console.log(favoritesChartsData);
  return (
    <Grid container>
      <Grid container item xs={12} spacing={4}>
        <Save handleSave={handleSave} />
      </Grid>
      <Grid item xs={12}>
        <Load
          favoritesChartsData={favoritesChartsData}
          handleLoad={handleLoad}
          handleDelete={handleDelete}
        />
      </Grid>
    </Grid>
  );
};

export default FavoriteCharts;
