/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { BlockPicker } from "react-color";
import Popover from "@material-ui/core/Popover";
import { hexColors } from "../../../utils/colors";

const ColorPicker = ({
  backgroundColor,
  handleBackgroundColorChange,
  datasets
}) => {
  const disabled = datasets.length === 1;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    if (!disabled) {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorChange = color => {
    const { r, g, b } = color.rgb;
    handleClose();
    handleBackgroundColorChange({
      value: `rgba(${r}, ${g}, ${b}, 0.5)`,
      key: "backgroundColor"
    });
    handleBackgroundColorChange({
      value: `rgba(${r}, ${g}, ${b}, 0.5)`,
      key: "borderColor"
    });
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <div
        style={{
          margin: "8px",
          padding: "4px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.2)",
          display: "inline-block",
          cursor: disabled ? "" : "pointer"
        }}
        onClick={handleClick}>
        <div
          style={{
            width: "36px",
            height: "27px",
            borderRadius: "2px",
            background: disabled ? "rgba(0, 0, 0, 0.26)" : backgroundColor
          }}
          type='button'
        />
      </div>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}>
        <BlockPicker
          color={backgroundColor}
          onChange={handleColorChange}
          colors={hexColors}
        />
      </Popover>
    </div>
  );
};

export default ColorPicker;
