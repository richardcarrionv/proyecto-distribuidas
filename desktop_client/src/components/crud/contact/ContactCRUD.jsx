import React, { useState } from "react";

import ContactForm from "../../forms/contact/contactForm";
import ContactService from "../../../services/contact/contactService";
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
  const [contact, setContact] = useState({...voidContact});

  const handleChange = (key) => (event) => {
    setContact({ ...contact, [key]: event });
  };

  const rows=[
    { name: "Richard", surname: "Carrion", branch: "Sucursal 1", phone: "123" }
  ]

  const handleSave = (event) => {
    setDisplay(false);
  };

  const handleEdit = (row) => (event) => {
    setContact(row);
    setDisplay(true);
  };

  const handleDelete = (id) => (event) => {};

  const handleCreate = (event) => {
    setContact({...voidContact});
    setDisplay(true);
  };

  const handleDialogDisplay = (value) => (event) => {
    setDisplay(value);
  };

  return (
    <CRUD
      init={contact}
      title="Contactos"
      rows={rows}

      display={display}
      onToggleDisplay={handleDialogDisplay}

      service={service}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
    >
      <ContactForm
        contact={contact}
        onSave={handleSave}
        onContactChange={handleChange}
      />
    </CRUD>
  );
};

export default ContactCRUD;
