import React, { useEffect, useState } from "react";

import {
  list,
  create,
  del,
  update,
  headers,
  newUser,
} from "../../../services/userService";
import UserForm from "../../forms/user/userForm";
import CRUD from "../CRUD";

const UserCRUD = () => {
  const [display, setDisplay] = useState(false);
  const [user, setUser] = useState({ ...newUser });
  const [tableRows, setTableRows] = useState([]);
  const tableHeaders = headers;

  useEffect(() => {
    list().then((res) => {
      if (res.status === 200) {
        setTableRows(res.data);
      }
    });
  });

  const handleChange = (key) => (event) => {
    setUser({ ...user, [key]: event });
  };

  const handleSave = () => {
    if(user.id == null){ 
      create(user).then(res => console.log(res))
    }else{ 
      update(user).then(res => console.log(res))
    }
    setDisplay(false)
  };

  const handleEdit = (row) => () => {
    setUser(row);
    setDisplay(true);
  };

  const handleDelete = (id) => () => {};

  const handleCreate = () => {
    setUser({ ...newUser });
    setDisplay(true);
  };

  const handleDialogDisplay = (value) => () => {
    setDisplay(value);
  };

  return (
    <CRUD
      init={user}
      title="Usuarios"
      tableRows={tableRows}
      tableHeaders={tableHeaders}
      display={display}
      onToggleDisplay={handleDialogDisplay}
      onSave={handleSave}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
    >
      <UserForm user={user} onSave={handleSave} onChange={handleChange} />
    </CRUD>
  );
};

export default UserCRUD;
