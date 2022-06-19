import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import BasicInput from "../../inputs/basic/basicInput";

const BranchForm = ({ onSave }) => {
  const [branch, setBranch] = useState({
    name: "",
    code: "",
    city: "", 
    direction: "",
    coordinates: "",
  });

  const handleChange = (key) => (event) => {
    console.log(branch);
    setBranch({ ...branch, [key]: event });
  };

  const handleSave = () => {
    onSave();
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

      <BasicInput
        value={branch.coordinates}
        name="Coordenadas"
        onChange={handleChange("coordinates")}
      ></BasicInput>

      <Button className="button" variant="contained" onClick={handleSave}>
        Guardar
      </Button>
    </>
  );
};

export default BranchForm;
