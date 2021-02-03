// @flow
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const Save = ({ handleSave }) => {
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSaveClick = () => {
    handleSave({ name });
    setName("");
  };

  return (
    <>
      <Grid item xs={2}>
        <TextField fullWidth value={name} onChange={handleNameChange} label="Name" />
      </Grid>
      <Grid item xs={2}>
        <Button
          fullWidth
          onClick={handleSaveClick}
          variant="contained"
          style={{ background: "#ffc400", color: "white" }}
        >
          Save
        </Button>
      </Grid>
    </>
  );
};

export default Save;
