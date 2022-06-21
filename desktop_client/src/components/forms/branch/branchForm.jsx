import { Button, Container, Dialog } from "@mui/material";
import React from "react";
import { useState } from "react";
import BasicInput from "../../inputs/basic/basicInput";
import Maps from "../../maps/Maps";
import "../forms.css";

const BranchForm = ({ branch, onChange }) => {
  const [displayMap, setDisplayMap] = useState(false);

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

        <Button className="button" variant="contained" onClick={handleMapOpen}>
          Seleccionar Coordenadas
        </Button>

        <Dialog fullScreen open={displayMap} onClose={handleMapClose}>
          <Button
            className="button"
            variant="contained"
            color="error"
            onClick={handleMapClose}
          >
            Salir
          </Button>
          <Maps />
        </Dialog>
    </>
  );
};

export default BranchForm;
