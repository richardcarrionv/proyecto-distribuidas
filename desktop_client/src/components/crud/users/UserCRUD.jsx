import { Box, Button } from "@mui/material";
import React, { useState } from "react";

import UserForm from "../../forms/user/userForm";
import UserService from "../../../services/user/userService";
import CRUD from "../CRUD"; 

const UserCRUD = () => {
  let service = new UserService();
  const [display, setDisplay] = useState(false);
  const [user, setUser] = useState({
    name: "",
    code: "",
    city: "",
    direction: "",
    coordinates: "",
  });

  const handleChange = (key) => (event) => {
    setUser({ ...user, [key]: event });
  };

  const handleSave = (event) => {
    setDisplay(false);
  };

  const handleEdit = (row) => (event) => {
    setUser(row);
    setDisplay(true);
  };

  const handleDelete = (id) => (event) => {};

  const handleCreate = (event) => {
    setUser({
      name: "",
      code: "",
      city: "",
      direction: "",
      coordinates: "",
    });
    setDisplay(true);
  };

  const handleDialogDisplay = (value) => (event) => {
    setDisplay(value);
  };

  return (
    <CRUD
      init={user}
      title="Sucursales"

      display={display}
      onToggleDisplay={handleDialogDisplay}

      service={service}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
    >
      <UserForm
        user={user}
        onSave={handleSave}
        onUserChange={handleChange}
      />
    </CRUD>
  );
};

export default UserCRUD;
