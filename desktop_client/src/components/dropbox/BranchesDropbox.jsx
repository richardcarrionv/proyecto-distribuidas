import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { useEffect } from "react";
import { list } from "../../services/branchService";

export default function BranchesDropbox({ igniter, onChange }) {
  const [branches, setBranches] = useState([]);

  const [inputValue, setInputValue] = React.useState("");


  useEffect(() => {
    list().then((res) => {
      if (res.status === 200) {
        var branchesResponse = res.data;
        branchesResponse = branchesResponse.map((branch) => {
          return { label: branch.name, id: branch.id };
        });
        setBranches(branchesResponse);
      }
    });
  }, []);

  const handleChange = (event, branch) => { 
    onChange("branchId")(branch.id)
    onChange("branchName")(branch.label)
  }

  const handleInputChange = (event, branch) => { 
    setInputValue(branch)
  }

  return (
    <Autocomplete
      value={igniter.branchName}
      options={branches}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      isOptionEqualToValue={(option, value) => option.label == value.branchName}
      id="combo-box-demo"
      sx={{ width: "25ch" }}
      renderInput={(params) => <TextField {...params} label="Sucursal" />}
    />
  );
}
