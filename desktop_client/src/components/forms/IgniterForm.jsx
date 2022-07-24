import React from "react";
import BranchesDropbox from "../dropbox/BranchesDropbox";
import BasicInput from "../inputs/BasicInput";

const IgniterForm = ({ igniter, onChange }) => {
  return (
    <>
      <BasicInput
        value={igniter.name}
        name="Nombre"
        onChange={onChange("name")}
      ></BasicInput>

      <BasicInput
        value={igniter.surname}
        name="Apellido"
        onChange={onChange("surname")}
      ></BasicInput>

      <BasicInput
        value={igniter.ci}
        name="Cedula"
        onChange={onChange("ci")}
      ></BasicInput>

      <BasicInput
        value={igniter.password}
        name="Contraseña"
        onChange={onChange("password")}
      ></BasicInput>

      <BasicInput
        value={igniter.phone}
        name="Telefono"
        onChange={onChange("phone")}
      ></BasicInput>
    </>
  );
};

export default IgniterForm;
