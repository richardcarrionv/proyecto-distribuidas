import { Button } from "@mui/material";
import React from "react";
import BasicInput from "../../inputs/basic/basicInput";
import Dropbox from "../../dropbox/Dropbox.jsx";

const UserForm = ({ user, onChange }) => {

  return (
    <>
      <BasicInput
        value={user.username}
        name="Usuario"
        onChange={onChange("username")}
      ></BasicInput>

      <BasicInput
        value={user.password}
        name="Contraseña"
        onChange={onChange("password")}
      ></BasicInput>

      <Dropbox user={user} onChange={onChange}/>
    </>
  );
};

export default UserForm;
