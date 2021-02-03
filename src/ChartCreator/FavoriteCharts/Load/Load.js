// @flow
import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Publish from "@material-ui/icons/Publish";

const Load = ({ favoritesChartsData, handleLoad, handleDelete }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(favoritesChartsData);
  }, [favoritesChartsData]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ name }) => (
            <TableRow key={name}>
              <TableCell component="th" scope="row">
                {name}
              </TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => handleLoad({ name })}>
                  <Publish />
                </IconButton>
                <IconButton color="secondary">
                  <Delete onClick={() => handleDelete({ name })} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Load;
