// @flow
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Publish from "@material-ui/icons/Publish";

const Load = ({ favoritesChartsData, handleLoad, handleDelete }) => (
  <TableContainer style={{ maxHeight: "400px" }}>
    <Table stickyHeader size="small">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {favoritesChartsData.map(({ name }) => (
          <TableRow key={name}>
            <TableCell component="th" scope="row">
              {name}
            </TableCell>
            <TableCell align="right" onClick={() => handleLoad({ name })}>
              <IconButton color="primary">
                <Publish />
              </IconButton>
              <IconButton color="secondary" onClick={() => handleDelete({ name })}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default Load;
