import React from "react";
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
        type="number"
        limit={10}
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
        type="number"
        limit={10}
      ></BasicInput>
    </>
  );
};

export default IgniterForm;
