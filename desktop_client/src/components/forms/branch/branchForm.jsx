import { Button, Container, Dialog, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import BasicInput from "../../inputs/basic/basicInput";
import Maps from "../../maps/Maps";
import FormControl from "@mui/material/FormControl";

import "../forms.css";

const BranchForm = ({ branch, onChange, onCoordsChange }) => {
  const [displayMap, setDisplayMap] = useState(false);

  const handleMapOpen = () => {
    setDisplayMap(true);
  };

  const handleMapClose = () => {
    setDisplayMap(false);
  };

  const handleMapSave = (coords) => () => {
    console.log("From form", coords);
    onCoordsChange(coords)();
    setDisplayMap(false);
  };

  return (
    <>
      <BasicInput
        value={branch.name}
        name="Nombre"
        onChange={onChange("name")}
      ></BasicInput>

      <BasicInput
        value={branch.code}
        name="Codigo"
        onChange={onChange("code")}
      ></BasicInput>

      <BasicInput
        value={branch.city}
        name="Ciudad"
        onChange={onChange("city")}
      ></BasicInput>

      <BasicInput
        value={branch.direction}
        name="Direccion"
        onChange={onChange("direction")}
      ></BasicInput>

      <FormControl sx={{ m: 1, width: "25ch" }}>
        <TextField
          id="outlined-multiline-static"
          value={branch.coordinates}
          label="Coordenadas"
          multiline
          rows={2}
          onChange={onChange("coordinates")}
          InputProps={{
            readOnly: true,
          }}
        />
      </FormControl>

      <Button className="button" variant="contained" onClick={handleMapOpen}>
        Seleccionar Coordenadas
      </Button>

      <Dialog fullScreen open={displayMap} onClose={handleMapClose}>
        <Maps onClose={handleMapClose} onSave={handleMapSave} />
      </Dialog>
    </>
  );
};

export default BranchForm;
