// @flow
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const compareString = (firstString, secondString) =>
  firstString.toString().replace(/\s/g, "").toUpperCase() ===
  secondString.toString().replace(/\s/g, "").toUpperCase();

const Save = ({ favoritesChartsData, handleSave }) => {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const [error, setError] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState(false);

  useEffect(() => {
    let newSavedDisabled = error;
    if (!newSavedDisabled) {
      newSavedDisabled = /^\s*$/.test(name);
    }
    setSaveDisabled(newSavedDisabled);
  }, [error, name]);

  useEffect(() => {
    const newNames = favoritesChartsData.map((fcd) => fcd.name);
    const newError = newNames.find((el) => compareString(el, name)) != null;
    setError(newError);
    setNames(newNames);
  }, [favoritesChartsData]);

  const handleNameChange = (event) => {
    const newName = event.target.value;
    const newError = names.find((el) => compareString(el, newName)) != null;

    setName(newName);
    setError(newError);
  };

  const handleSaveClick = () => {
    handleSave({ name });
    setName("");
  };

  return (
    <>
      <Grid item xs={2}>
        <TextField
          error={error}
          fullWidth
          value={name}
          onChange={handleNameChange}
          label="Name"
          helperText={error && "Already taken"}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          fullWidth
          disabled={saveDisabled}
          onClick={handleSaveClick}
          variant="contained"
          style={{
            background: !saveDisabled && "#ffc400",
            color: !saveDisabled && "white"
          }}
        >
          Save
        </Button>
      </Grid>
    </>
  );
};

export default Save;
