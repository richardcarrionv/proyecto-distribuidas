import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";

const BasicInput = ({ value, name, onChange }) => {
  const textId = "outlined-basic-" + name;

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, width: "25ch" }}>
      <TextField
        id={textId}
        label={name}
        value={value}
        onChange={handleChange}
        variant="outlined"
      />
    </FormControl>
  );
};

export default BasicInput;
