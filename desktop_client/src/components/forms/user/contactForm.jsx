import React from "react";
import BasicInput from "../../inputs/basic/basicInput";
import "../forms.css";

const UserForm = ({ user, onChange }) => {
  return (
    <>
      <BasicInput
        value={user.username}
        name=""
        onChange={onChange("branch")}
      ></BasicInput>

      <BasicInput
        value={user.password}
        name="Telefono"
        onChange={onChange("phone")}
      ></BasicInput>

      <BasicInput
        value={user.role}
        name="Telefono"
        onChange={onChange("phone")}
      ></BasicInput>
    </>
  );
};

export default UserForm;
