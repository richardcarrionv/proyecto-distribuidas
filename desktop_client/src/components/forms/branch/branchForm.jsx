import { Button, Dialog } from "@mui/material";
import React from "react";
import { useState } from "react";
import BasicInput from "../../inputs/basic/basicInput";
import Maps from "../../maps/Maps";
import "../forms.css"; 

const BranchForm = ({ branch, onSave, onBranchChange }) => {

  const [displayMap, setDisplayMap] = useState(false);

  const handleChange = (key) => (event) => {
    onBranchChange(key)(event);
  };

  const handleSave = () => {
    onSave();
  };

  const handleMapOpen = () => {
    setDisplayMap(true);
  };

  const handleMapClose = () => {
    setDisplayMap(false);
  };

  return (
    <>
    
      <BasicInput
        value={branch.name}
        name="Nombre"
        onChange={handleChange("name")}
      ></BasicInput>

      <BasicInput
        value={branch.code}
        name="Codigo"
        onChange={handleChange("code")}
      ></BasicInput>

      <BasicInput
        value={branch.city}
        name="Ciudad"
        onChange={handleChange("city")}
      ></BasicInput>

      <BasicInput
        value={branch.direction}
        name="Direccion"
        onChange={handleChange("direction")}
      ></BasicInput>

      <Button className="button" variant="contained" onClick={handleMapOpen}>
        Seleccionar Coordenadas
      </Button>

      <Button className="button" color="success" variant="contained" onClick={handleSave}>
        Guardar
      </Button>

      <Dialog fullScreen open={displayMap} onClose={handleMapClose}>
        <Button className="button" variant="contained" color="error" onClick={handleMapClose}>Salir</Button>
        <Maps />
      </Dialog>
    </>
  );
};

export default BranchForm;
