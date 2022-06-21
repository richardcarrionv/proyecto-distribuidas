import { Button } from "@mui/material";
import React from "react";
import BasicInput from "../../inputs/basic/basicInput";
import "../forms.css"; 

const UserForm = ({ user, onChange }) => {

  return (
    <>
      <BasicInput
        value={user.username}
        name="Usuario"
        onChange={onChange("branch")}
      ></BasicInput>

      <BasicInput
        value={user.password}
        name="Contraseña"
        onChange={onChange("phone")}
      ></BasicInput>

      <BasicInput
        value={user.role}
        name="Rol"
        onChange={onChange("phone")}
      ></BasicInput>
    </>
  );
};

export default UserForm;
