import React, { useEffect, useState } from "react";

import ContactForm from "../../forms/contact/contactForm";
import ContactService from "../../../services/contactService";
import CRUD from "../CRUD"; 

const ContactCRUD = () => {
  let service = new ContactService();
  const voidContact = { 
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

  const [contact, setContact] = useState({...voidContact});

  const handleChange = (key) => (event) => {
    setContact({ ...contact, [key]: event });
  };

  const handleSave = () => {
    console.log("saving"); 
    setDisplay(false);
  };

  const handleEdit = (row) => () => {
    setContact(row);
    setDisplay(true);
  };

  const handleDelete = (id) => () => {
    console.log("Deleting")
  };

  const handleCreate = () => {
    setContact({...voidContact});
    setDisplay(true);
  };

  const handleDialogDisplay = (value) => () => {
    setDisplay(value);
  };

  return (
    <CRUD
      init={contact}
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
        contact={contact}
        onSave={handleSave}
        onChange={handleChange}
      />
    </CRUD>
  );
};

export default ContactCRUD;
