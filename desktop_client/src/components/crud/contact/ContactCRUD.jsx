import React, { useEffect, useState } from "react";

import ContactForm from "../../forms/contact/contactForm";
import {
  list,
  create,
  headers,
  newIgniter,
} from "../../../services/contactService";
import CRUD from "../CRUD";

const ContactCRUD = () => {

  const [tableRows, setTableRows] = useState([]);
  const [display, setDisplay] = useState(false);
  const [igniter, setIgniter] = useState({ ...newIgniter });
  const tableHeaders = headers;

  useEffect(() => {
    list().then((res) => {
      if (res.status === 200) {
        var igniters = res.data; 
        igniters = igniters.map( e => {
         return {...e, branchName: e.branch.name, branchId: e.branch.id}
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
    setIgniter({ ...newIgniter });
    setDisplay(true);
  };

  const handleDialogDisplay = (value) => () => {
    setDisplay(value);
  };

  return (
    <CRUD
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
    </CRUD>
  );
};

export default ContactCRUD;
