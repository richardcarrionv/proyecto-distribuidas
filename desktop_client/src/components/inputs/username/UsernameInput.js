import React from "react";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";

const UsernameInput = ({ username, onUsernameChange }) => {
  var username = username;

  const handleChange = (event) => {
    onUsernameChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-username">Usuario</InputLabel>
      <OutlinedInput
        id="outlined-adornment-username"
        value={username}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end">
              <AccountCircle> </AccountCircle>
            </IconButton>
          </InputAdornment>
        }
        label="Usuario"
      />
    </FormControl>
  );
};

export default UsernameInput;
