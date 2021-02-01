// @flow
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { v4 as uuidv4 } from "uuid";
import ColorPicker from "./ColorPicker";
import { hexColors, rgbaColors } from "../../utils/colors";

const DatasetCreator = ({ dataset, datasets, setDatasets, buildMenuItems }) => {
  const [index, setIndex] = useState(0);
  const [deleteDisabled, setDeleteDisabled] = useState(false);
  const [addDisabled, setAddDisabled] = useState(false);
  const { id, ordinate, label, backgroundColor } = dataset;

  useEffect(() => {
    setIndex(datasets.findIndex(dt => dt.id === id));
  }, [id, datasets]);

  useEffect(() => {
    setDeleteDisabled(datasets.length === 1);
    setAddDisabled(datasets.length > 1 && index !== datasets.length - 1);
  }, [datasets, index]);

  const handleDatasetChange = ({ value, key }) => {
    const newDataSets = [...datasets];
    newDataSets[index][key] = value;
    setDatasets(newDataSets);
  };

  const handleDeleteDatasetClick = () => {
    const newDataSets = datasets.filter(dt => dt.id !== id);
    setDatasets(newDataSets);
  };

  const handleAddDatasetClick = () => {
    const i = datasets.length;
    const newDataSets = [
      ...datasets,
      {
        id: uuidv4(),
        ordinate: "",
        label: "",
        backgroundColor: rgbaColors[i],
        borderColor: hexColors[i]
      }
    ];
    setDatasets(newDataSets);
  };

  return (
    <Grid container item xs={12} spacing={4} style={{ paddingTop: "16px" }}>
      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel>Ordinate</InputLabel>
          <Select
            value={ordinate}
            onChange={event =>
              handleDatasetChange({
                value: event.target.value,
                key: "ordinate"
              })
            }>
            {buildMenuItems({ filterType: "number" })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={2}>
        <TextField
          fullWidth
          label='Label'
          value={label}
          onChange={event =>
            handleDatasetChange({ value: event.target.value, key: "label" })
          }
        />
      </Grid>
      <Grid container item xs={2} justify='center'>
        <Grid item>
          <ColorPicker
            backgroundColor={backgroundColor}
            handleBackgroundColorChange={handleDatasetChange}
            datasets={datasets}
          />
        </Grid>

        <Grid item>
          <IconButton
            color='secondary'
            onClick={handleDeleteDatasetClick}
            disabled={deleteDisabled}>
            <DeleteIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            color='primary'
            onClick={handleAddDatasetClick}
            disabled={addDisabled}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DatasetCreator;
