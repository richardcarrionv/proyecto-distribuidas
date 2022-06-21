import React from "react";
import BasicInput from "../../inputs/basic/basicInput";
import "../forms.css"; 

const ContactForm = ({ contact, onChange }) => {

  return (
    <>
      <BasicInput
        value={contact.name}
        name="Nombre"
        onChange={onChange("name")}
      ></BasicInput>

      <BasicInput
        value={contact.surname}
        name="Apellido"
        onChange={onChange("surname")}
      ></BasicInput>

      <BasicInput
        value={contact.branch}
        name=""
        onChange={onChange("branch")}
      ></BasicInput>

      <BasicInput
        value={contact.phone}
        name="Telefono"
        onChange={onChange("phone")}
      ></BasicInput>
    </>
  );
};

export default ContactForm;
