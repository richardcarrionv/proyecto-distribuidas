import React from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const UserDropbox = ({ user, onChange }) => {

  const handleChange = (event) => { 
      onChange("role")(event.target.value)
  } 
  return (
    <FormControl sx={{m: 1, width: "25ch"}}>
      <InputLabel id="demo-simple-select-label">Rol</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={user.role}
        label="Rol"
        onChange={handleChange}
      >
        <MenuItem value={"CLIENT"}>Cliente</MenuItem>
        <MenuItem value={"SUPERADMIN"}>Administrador</MenuItem>
      </Select>
    </FormControl>
  );
};

export default UserDropbox; 
