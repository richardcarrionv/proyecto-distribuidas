import React from "react";
import FormControl from "@mui/material/FormControl";

import TextField from "@mui/material/TextField";

const BasicInput = ({ value, name, onChange, type = "any", limit = 100 }) => {
  const textId = "outlined-basic-" + name;

  const handleChange = (event) => {
    const value = event.target.value
    if(value.length > limit){
      return;
    }
    if(type === "any"){
      onChange(value);
    }else if(type === "number"){
      if(/^\d+$/.test(value) || value == ""){
        onChange(value);
      }
    }
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
