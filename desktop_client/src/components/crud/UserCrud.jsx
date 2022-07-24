import React, { useEffect, useState } from "react";
import {
  headers,
  newUser,
} from "../../services/userService";
import UserForm from "../forms/UserForm";
import Crud from "./Crud";
import useApi from "../../hooks/useApi";
import useDisplay from "../../hooks/useDisplay";
import useForm from "../../hooks/useForm";

const UserCrud = () => {
  const API_URL = "/users"
  const tableHeaders = headers;

  const formatter = (data) => {
    return data.map(d => {
      return {...d, presentable_role: d.role == "CLIENT" ? "Cliente" : "Administrador"}
    }).filter( d => d.role === "CLIENT");
  }

  const api = useApi(API_URL, formatter);

  const displayForm = useDisplay(false)

  const form = useForm({...newUser}, displayForm, api)

  return (
    <Crud
      title="Clientes"

      tableRows={api.data}
      tableHeaders={tableHeaders}

      display={displayForm.display}
      onToggleDisplay={displayForm.hide}

      init={form.entity}
      onSave={form.save}
      onEdit={form.edit}
      onDelete={form.del}
      onCreate={form.createNew}
    >
      <UserForm user={form.entity} onSave={form.save} onChange={form.handleChange} />
    </Crud>
  );
};

export default UserCrud;
