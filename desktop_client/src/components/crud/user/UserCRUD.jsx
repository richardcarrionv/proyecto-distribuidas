import React, { useEffect, useState } from "react";

import UserForm from "../../forms/user/userForm";
import UserService from "../../../services/userService";
import CRUD from "../CRUD"; 

const UserCRUD = () => {
  let service = new UserService();
  const voidUser = { 
    name: "",
    surname: "",
    branch: "",
    phone: "",
  }
  const [display, setDisplay] = useState(false);
  const tableHeaders = service.headers(); 
  //const [tableRows, setTableRows] = useState([]);
  const tableRows = service.list(); 

  //useEffect(() => { 
    //setTableRows([
      //{ name: "Richard", surname: "Carrion", branch: "Sucursal 1", phone: "123" }
    //])
  //})

  const [user, setUser] = useState({...voidUser});

  const handleChange = (key) => (event) => {
    setUser({ ...user, [key]: event });
  };

  const handleSave = () => {
    console.log("saving"); 
    setDisplay(false);
  };

  const handleEdit = (row) => () => {
    setUser(row);
    setDisplay(true);
  };

  const handleDelete = (id) => () => {
    console.log("Deleting")
  };

  const handleCreate = () => {
    setUser({...voidUser});
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
      <UserForm
        user={user}
        onSave={handleSave}
        onChange={handleChange}
      />
    </CRUD>
  );
};

export default UserCRUD;

