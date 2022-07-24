import React, { useEffect, useState, useContext } from "react";

import ContactForm from "../forms/ContactForm";
import {
  list,
  create,
  headers,
  newIgniter,
} from "../../services/contactService";
import Crud from "./Crud";
import { UserContext } from "../../UserContext";

const ContactCrud = () => {

  const user = useContext(UserContext);
  const [tableRows, setTableRows] = useState([]);
  const [display, setDisplay] = useState(false);
  const [igniter, setIgniter] = useState({ ...newIgniter });
  const tableHeaders = headers;

  useEffect(() => {
    list().then((res) => {
      if (res.status === 200) {
        var igniters = res.data; 
        igniters = igniters.map( e => {
         return {...e,  branchId: e.branch.id}
        })
        setTableRows(igniters);
      }
    });
  }, []);

  const handleChange = (key) => (value) => {
    setIgniter({ ...igniter, [key]: value });
  };

  const handleSave = () => {
    if (igniter.id == null) {
      create(igniter).then((res) => console.log(res));
    }
    setDisplay(false);
  };

  const handleEdit = (row) => () => {
    console.log(row)
    setIgniter(row);
    setDisplay(true);
  };

  const handleDelete = (id) => () => {
  };

  const handleCreate = () => {
    setIgniter({ ...newIgniter, branchId: user.id });
    console.log(user.id)
    console.log(igniter)
    setDisplay(true);
  };

  const handleDialogDisplay = (value) => () => {
    setDisplay(value);
  };

  return (
    <Crud
      init={igniter}
      title="Contactos"
      tableRows={tableRows}
      tableHeaders={tableHeaders}
      display={display}
      onToggleDisplay={handleDialogDisplay}
      onSave={handleSave}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
    >
      <ContactForm
        igniter={igniter}
        onSave={handleSave}
        onChange={handleChange}
      />
    </Crud>
  );
};

export default ContactCrud;
