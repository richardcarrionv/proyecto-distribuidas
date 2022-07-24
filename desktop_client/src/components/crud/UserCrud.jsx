import React, { useEffect, useState } from "react";

import {
  list,
  create,
  del,
  findById, 
  update,
  headers,
  newUser,
} from "../../services/userService";
import UserForm from "../forms/UserForm";
import Crud from "./Crud";

const UserCrud = () => {
  const [display, setDisplay] = useState(false);
  const [user, setUser] = useState({ ...newUser });
  const [tableRows, setTableRows] = useState([]);
  const tableHeaders = headers;

  useEffect(() => {
    list().then((res) => {
      if (res.status === 200) {
        var users = res.data;
        users = users.map(user => { 
          return {...user, presentable_role: user.role == "CLIENT" ? "Cliente" : "Administrador"}
        })
        setTableRows(users);
        console.log(tableRows)
      }
    });
  }, []);

  const handleChange = (key) => (event) => {
    setUser({ ...user, [key]: event });
  };

  const handleSave = () => {
    if (user.id == null) {
      create(user).then((res) => console.log(res));
    } else {
      update(user).then((res) => console.log("Actualizado: ", res));
    }
    setDisplay(false);
  };

  const handleEdit = (row) => () => {
    setUser(row);
    setDisplay(true);
  };

  const handleDelete = (id) => () => {
    return findById(id).then(res => { 
      if(res.data.role != "SUPERADMIN"){ 
        return del(id).then((res) => res == 200);
      }
      return false
    })
  };

  const handleCreate = () => {
    setUser({ ...newUser, role: "CLIENT" });
    setDisplay(true);
  };

  const handleDialogDisplay = (value) => () => {
    setDisplay(value);
  };

  return (
    <Crud
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
    </Crud>
  );
};

export default UserCrud;
