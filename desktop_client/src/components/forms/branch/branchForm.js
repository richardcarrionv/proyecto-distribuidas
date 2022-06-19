import { Button, Dialog } from "@mui/material";
import React from "react";
import { useState } from "react";
import DialogContainer from "../../dialog/dialogContainer";
import BasicInput from "../../inputs/basic/basicInput";
import Maps from "../../maps/Maps";
import Container from "@mui/material/Container";
import "./branchform.css"; 

const BranchForm = ({ onSave }) => {
  const [branch, setBranch] = useState({
    name: "",
    code: "",
    city: "",
    direction: "",
    coordinates: "",
  });

  const [displayMap, setDisplayMap] = useState(false);

  const handleChange = (key) => (event) => {
    console.log(branch);
    setBranch({ ...branch, [key]: event });
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
        <Button className="button" onClick={handleMapClose}>Salir</Button>
        <Maps />
      </Dialog>
    </>
  );
};

export default BranchForm;
