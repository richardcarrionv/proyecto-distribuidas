import { Button } from "@mui/material";
import React from "react";
import BasicInput from "../../inputs/basic/basicInput";
import "../forms.css"; 

const ContactForm = ({ contact, onSave, onContactChange }) => {

  const handleChange = (key) => (event) => {
    onContactChange(key)(event);
  };

  const handleSave = () => {
    onSave();
  };

  return (
    <>
    
      <BasicInput
        value={contact.name}
        name="Nombre"
        onChange={handleChange("name")}
      ></BasicInput>

      <BasicInput
        value={contact.surname}
        name="Apellido"
        onChange={handleChange("surname")}
      ></BasicInput>

      <BasicInput
        value={contact.branch}
        name=""
        onChange={handleChange("branch")}
      ></BasicInput>

      <BasicInput
        value={contact.phone}
        name="Telefono"
        onChange={handleChange("phone")}
      ></BasicInput>

      <Button className="button" color="success" variant="contained" onClick={handleSave}>
        Guardar
      </Button>
    </>
  );
};

export default ContactForm;
